"""Fast URL detection endpoint for browser extension.

Uses phase-1 lexical features + ML risk engine only — no sandbox,
no TLS fetch, no WHOIS — to stay under 500 ms.
"""
from __future__ import annotations

import logging
import time
from typing import Any
from urllib.parse import urlparse

from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, field_validator
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import BlockedLink
from app.url_analysis.feature_extractor import extract_url_features
from app.url_analysis.ml_risk_engine import URLMLRiskEngine

logger = logging.getLogger("zora.extension_detection")

router = APIRouter(prefix="/api/detect", tags=["extension"])

# ── ML risk engine (loaded once at module import) ────────────────────────────
_risk_engine = URLMLRiskEngine()
_engine_ready = False
_engine_error: str | None = None


def _get_engine() -> tuple[URLMLRiskEngine | None, str | None]:
    global _engine_ready, _engine_error
    if _engine_ready:
        return _risk_engine, None
    if _engine_error:
        return None, _engine_error
    try:
        _risk_engine.load()
        _engine_ready = True
        return _risk_engine, None
    except Exception as exc:  # noqa: BLE001
        _engine_error = str(exc)
        logger.warning("Extension ML risk engine unavailable: %s", exc)
        return None, _engine_error


# ── Request / Response schemas ───────────────────────────────────────────────

class ExtensionDetectRequest(BaseModel):
    url: str
    user_id: str | None = None
    extension: bool = True

    @field_validator("url")
    @classmethod
    def _validate_url(cls, v: str) -> str:
        raw = (v or "").strip()
        if not raw:
            raise ValueError("url is required")
        if not raw.startswith(("http://", "https://")):
            raw = f"https://{raw}"
        parsed = urlparse(raw)
        if not parsed.netloc:
            raise ValueError("Invalid URL")
        return raw


class ExtensionDetectResponse(BaseModel):
    risk_level: str          # "safe" | "warning" | "danger"
    confidence: float        # 0.0–1.0
    risk_score: float        # raw 0.0–1.0
    is_phishing: bool
    reason: str
    details: dict[str, Any]
    url: str
    latency_ms: int


# ── Heuristic fallback when ML engine is unavailable ────────────────────────

_PHISHING_KEYWORDS = (
    "login", "verify", "secure", "account", "update", "bank",
    "confirm", "password", "signin", "wallet", "paypal", "amazon",
    "apple", "google", "microsoft", "reset", "suspend", "urgent",
)

# Any of these in the URL path/domain is near-certain malicious intent.
# Each hit adds 0.5 so a single match pushes past the "danger" threshold (0.65).
_DANGER_KEYWORDS = (
    "phishing", "malware", "ransomware", "spyware", "trojan",
    "exploit", "botnet", "virus", "keylogger", "rootkit",
    "credential", "harvester", "dropper",
)

_SUSPICIOUS_TLDS = {".tk", ".ml", ".ga", ".cf", ".gq", ".xyz", ".top", ".click", ".link"}


def _heuristic_score(url: str, features: dict[str, Any]) -> float:
    score = 0.0
    lower = url.lower()

    # High-confidence danger keywords — one match is enough to flag as danger
    danger_hits = sum(1 for kw in _DANGER_KEYWORDS if kw in lower)
    score += min(danger_hits * 0.7, 0.9)

    kw_hits = sum(1 for kw in _PHISHING_KEYWORDS if kw in lower)
    score += min(kw_hits * 0.08, 0.35)

    parsed = urlparse(url)
    netloc = (parsed.netloc or "").lower()
    for tld in _SUSPICIOUS_TLDS:
        if netloc.endswith(tld):
            score += 0.2
            break

    if features.get("has_ip_address"):
        score += 0.25
    if features.get("url_length", 0) > 100:
        score += 0.10
    if features.get("num_subdomains", 0) > 3:
        score += 0.12
    if features.get("has_at_symbol"):
        score += 0.15
    if features.get("num_hyphens", 0) > 3:
        score += 0.08
    if features.get("has_double_slash_redirect"):
        score += 0.12

    return min(round(score, 4), 1.0)


def _risk_level(score: float) -> str:
    if score >= 0.65:
        return "danger"
    if score >= 0.35:
        return "warning"
    return "safe"


def _build_reason(score: float, url: str, features: dict[str, Any]) -> str:
    if score < 0.35:
        return "URL appears safe based on lexical and structural analysis."

    issues: list[str] = []
    lower = url.lower()
    danger_hits = [kw for kw in _DANGER_KEYWORDS if kw in lower]
    if danger_hits:
        issues.append(f"high-risk content indicator: {', '.join(danger_hits[:3])}")
    kw_hits = [kw for kw in _PHISHING_KEYWORDS if kw in lower]
    if kw_hits:
        issues.append(f"suspicious keywords: {', '.join(kw_hits[:3])}")
    if features.get("has_ip_address"):
        issues.append("IP address used instead of domain")
    if features.get("url_length", 0) > 100:
        issues.append("unusually long URL")
    if features.get("num_subdomains", 0) > 3:
        issues.append("excessive subdomains")
    if features.get("has_at_symbol"):
        issues.append("@ symbol in URL")

    parsed = urlparse(url)
    netloc = (parsed.netloc or "").lower()
    for tld in _SUSPICIOUS_TLDS:
        if netloc.endswith(tld):
            issues.append(f"high-risk TLD ({tld})")
            break

    if not issues:
        return "Structural anomalies detected in URL."
    return "Flagged: " + "; ".join(issues) + "."


# ── Main endpoint ─────────────────────────────────────────────────────────────

@router.post("/url", response_model=ExtensionDetectResponse, status_code=status.HTTP_200_OK)
async def detect_url(body: ExtensionDetectRequest) -> ExtensionDetectResponse:
    t0 = time.monotonic()
    url = body.url

    try:
        features = extract_url_features(url)
    except Exception as exc:  # noqa: BLE001
        logger.warning("Feature extraction failed for %s: %s", url, exc)
        features = {}

    engine, err = _get_engine()

    if engine is not None and not err:
        try:
            # Build a minimal fused-feature dict for the ML engine
            from app.url_analysis.feature_fusion_engine import FeatureFusionEngine
            fusion = FeatureFusionEngine()
            fused = fusion.fuse(
                url_features=features,
                domain_features={},
                tls_features={},
                homoglyph_features={},
                sandbox_features={},
                cookie_features={},
                behavior_features={},
                fpb_features={},
            )
            risk_result = engine.score_risk(
                phishing_probability=float(fused.get("composite_score") or 0.0),
                sub_scores=fused.get("sub_scores") or {},
                cookie_score=0.0,
            )
            risk_score = float(risk_result.get("risk_score") or 0.0)
            confidence = float(risk_result.get("confidence") or 0.5)
        except Exception as exc:  # noqa: BLE001
            logger.warning("ML engine scoring failed (%s), using heuristic", exc)
            risk_score = _heuristic_score(url, features)
            confidence = 0.6
    else:
        risk_score = _heuristic_score(url, features)
        confidence = 0.6

    level = _risk_level(risk_score)
    is_phishing = risk_score >= 0.65
    reason = _build_reason(risk_score, url, features)
    latency_ms = int((time.monotonic() - t0) * 1000)

    logger.info(
        "extension_detect url=%s level=%s score=%.4f latency_ms=%d",
        url, level, risk_score, latency_ms,
    )

    return ExtensionDetectResponse(
        risk_level=level,
        confidence=round(confidence, 4),
        risk_score=round(risk_score, 4),
        is_phishing=is_phishing,
        reason=reason,
        url=url,
        latency_ms=latency_ms,
        details={
            "url_length": features.get("url_length", 0),
            "has_ip_address": bool(features.get("has_ip_address")),
            "num_subdomains": int(features.get("num_subdomains") or 0),
            "has_at_symbol": bool(features.get("has_at_symbol")),
            "num_hyphens": int(features.get("num_hyphens") or 0),
            "suspicious_keywords": [kw for kw in _PHISHING_KEYWORDS if kw in url.lower()][:5],
            "ml_engine_used": engine is not None and not err,
        },
    )


# ── Blocked link report endpoint ──────────────────────────────────────────────

class BlockedLinkRequest(BaseModel):
    url: str
    risk_level: str
    risk_score: float
    reason: str | None = None
    blocked_at: str | None = None


@router.post("/blocked/report", status_code=status.HTTP_201_CREATED)
async def report_blocked_link(
    body: BlockedLinkRequest,
    db: Session = Depends(get_db),
) -> dict:
    try:
        record = BlockedLink(url=body.url)
        db.add(record)
        db.commit()
        db.refresh(record)
        logger.info("blocked_link saved link_id=%s url=%s", record.link_id, body.url)
        return {"ok": True, "id": str(record.link_id)}
    except Exception as exc:
        db.rollback()
        logger.error("blocked_link insert failed: %s", exc)
        raise HTTPException(status_code=500, detail=str(exc))
