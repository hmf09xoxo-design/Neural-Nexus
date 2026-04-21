from __future__ import annotations

import json
import logging
import os
import requests
from threading import Lock
from typing import Any

from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger("zora.attachment.llm_reasoner")

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "phi3:mini")
OLLAMA_TIMEOUT = float(os.getenv("OLLAMA_TIMEOUT_SECONDS", "30"))

_cache_lock = Lock()
_response_cache: dict[tuple[str, str], dict[str, Any]] = {}


def _normalize_label(value: Any) -> str:
    label = str(value or "").strip().lower()
    if label in {"malicious", "suspicious", "infected", "unsafe", "flagged"}:
        return "malicious"
    if label in {"safe", "clean", "benign", "genuine"}:
        return "clean"
    return "unknown"


def _build_prompt(report: dict[str, Any], filename: str) -> str:
    final_verdict = str(report.get("final_verdict", "unknown"))
    engines = report.get("engines", {})
    features = report.get("features", {})

    return (
        "You are a senior malware analyst. Analyze whether this file attachment is malicious or clean using ONLY provided evidence. Explain everything in short. "
        "Provide a concise explanation and practical recommendations. Return STRICT JSON only with no extra text.\n"
        "Required JSON schema:\n"
        '{"final_label":"malicious|clean","confidence":0.0,"explanation":"clear concise reason","key_indicators":["..."],"recommendations":["..."]}\n\n'
        f"Filename: {filename}\n"
        f"Static Pipeline Verdict: {final_verdict}\n"
        f"Engine Results: {json.dumps(engines, ensure_ascii=False)[:1500]}\n"
        f"Extracted Features: {json.dumps(features, ensure_ascii=False)[:1500]}\n"
    )


def _parse_response(raw_text: str) -> dict[str, Any]:
    fallback = {
        "final_label": "unknown",
        "confidence": 0.0,
        "explanation": "LLM explanation unavailable",
        "key_indicators": [],
        "recommendations": [],
    }

    text = (raw_text or "").strip()
    if not text:
        return fallback

    candidate = text
    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        candidate = text[start : end + 1]

    try:
        parsed = json.loads(candidate)
    except json.JSONDecodeError:
        return fallback

    final_label = _normalize_label(parsed.get("final_label"))
    explanation = str(parsed.get("explanation") or "").strip()

    try:
        confidence = float(parsed.get("confidence", 0.0))
    except (TypeError, ValueError):
        confidence = 0.0
    confidence = max(0.0, min(1.0, confidence))

    key_indicators_raw = parsed.get("key_indicators", [])
    recommendations_raw = parsed.get("recommendations", [])

    key_indicators = []
    if isinstance(key_indicators_raw, list):
        key_indicators = [str(item).strip() for item in key_indicators_raw if str(item).strip()][:8]

    recommendations = []
    if isinstance(recommendations_raw, list):
        recommendations = [str(item).strip() for item in recommendations_raw if str(item).strip()][:8]

    if final_label == "unknown" or not explanation:
        return fallback

    return {
        "final_label": final_label,
        "confidence": round(confidence, 4),
        "explanation": explanation,
        "key_indicators": key_indicators,
        "recommendations": recommendations,
    }


def _call_ollama(prompt: str) -> str:
    logger.info("Calling local Ollama attachment model=%s", OLLAMA_MODEL)
    resp = requests.post(
        OLLAMA_URL,
        json={"model": OLLAMA_MODEL, "prompt": prompt, "stream": False},
        timeout=OLLAMA_TIMEOUT,
    )
    resp.raise_for_status()
    return resp.json().get("response", "").strip()


def explain_attachment_with_llm(report: dict[str, Any], filename: str) -> dict[str, Any]:
    prompt = _build_prompt(report, filename)
    cache_key = (OLLAMA_MODEL, prompt)

    cached = _response_cache.get(cache_key)
    if cached is not None:
        logger.info("Using cached attachment LLM explanation")
        return cached

    try:
        raw_output = _call_ollama(prompt)
        parsed = _parse_response(raw_output)
    except Exception as exc:
        logger.warning("Attachment LLM call failed: %s", exc)
        parsed = {
            "final_label": "unknown",
            "confidence": 0.0,
            "explanation": "LLM explanation unavailable",
            "key_indicators": [],
            "recommendations": [],
        }

    with _cache_lock:
        _response_cache[cache_key] = parsed

    return parsed
