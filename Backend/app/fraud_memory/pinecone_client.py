from __future__ import annotations

import json
import logging
import os
from datetime import datetime, timezone
from pathlib import Path
from threading import Lock
from typing import Any
from uuid import uuid4

import numpy as np
from dotenv import load_dotenv

load_dotenv()

DEFAULT_NAMESPACE = "fraud_vectors"
VECTOR_DIM = 384
FAISS_DATA_DIR = os.getenv("FAISS_DATA_DIR", str(Path(__file__).parent.parent.parent / "data" / "faiss"))

logger = logging.getLogger("zora.fraud_memory.faiss")

_store_lock = Lock()
_store_cache: dict[str, FAISSVectorStore] = {}


def _sanitize_metadata_value(value: Any) -> Any:
    if value is None:
        return None
    if isinstance(value, (str, int, float, bool)):
        return value
    if isinstance(value, list):
        if all(isinstance(item, str) for item in value):
            return value
        return json.dumps(value, ensure_ascii=True)
    if isinstance(value, dict):
        return json.dumps(value, ensure_ascii=True)
    return str(value)


def _sanitize_metadata(payload: dict[str, Any] | None) -> dict[str, Any]:
    if not payload:
        return {}
    return {
        str(k): _sanitize_metadata_value(v)
        for k, v in payload.items()
        if _sanitize_metadata_value(v) is not None
    }


def _uuid_to_int64(uid: str) -> int:
    """Hash a UUID/string into a stable int64 suitable for FAISS IDs."""
    import hashlib
    return int(hashlib.sha256(uid.encode()).hexdigest()[:16], 16) % (2**63)


class FAISSVectorStore:
    """
    Drop-in FAISS replacement for PineconeVectorStore.
    Stores each namespace as a separate .index + .meta.json pair on disk.
    """

    def __init__(self, namespace: str = DEFAULT_NAMESPACE, data_dir: str = FAISS_DATA_DIR):
        import faiss  # noqa: PLC0415

        self.namespace = (namespace or DEFAULT_NAMESPACE).strip()
        self.data_dir = Path(data_dir)
        self.data_dir.mkdir(parents=True, exist_ok=True)

        self._index_path = self.data_dir / f"{self.namespace}.index"
        self._meta_path = self.data_dir / f"{self.namespace}.meta.json"
        self._lock = Lock()

        if self._index_path.exists() and self._meta_path.exists():
            self._index = faiss.read_index(str(self._index_path))
            with open(self._meta_path, encoding="utf-8") as f:
                self._metadata: dict[str, dict[str, Any]] = json.load(f)
            logger.info(
                "Loaded FAISS index from disk",
                extra={"namespace": self.namespace, "total": self._index.ntotal},
            )
        else:
            flat = faiss.IndexFlatIP(VECTOR_DIM)
            self._index = faiss.IndexIDMap(flat)
            self._metadata = {}
            logger.info("Created new FAISS index", extra={"namespace": self.namespace})

    # ── persistence ────────────────────────────────────────────────────────────

    def _save(self) -> None:
        import faiss  # noqa: PLC0415

        faiss.write_index(self._index, str(self._index_path))
        with open(self._meta_path, "w", encoding="utf-8") as f:
            json.dump(self._metadata, f, ensure_ascii=False)

    # ── write operations ───────────────────────────────────────────────────────

    def upsert_embedding(self, embedding: list[float], text: str, fraud_label: str) -> str:
        point_id = str(uuid4())
        payload = {
            "text": text,
            "fraud_label": fraud_label,
            "label": fraud_label,
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
        self.upsert_point(point_id=point_id, vector=embedding, payload=payload)
        return point_id

    def upsert_point(self, point_id: str, vector: list[float], payload: dict[str, Any], wait: bool = True) -> str:
        _ = wait
        int_id = _uuid_to_int64(str(point_id))
        vec = np.array([vector], dtype=np.float32)
        norm = np.linalg.norm(vec)
        if norm > 0:
            vec /= norm

        with self._lock:
            self._index.add_with_ids(vec, np.array([int_id], dtype=np.int64))
            self._metadata[str(int_id)] = _sanitize_metadata(payload)
            self._save()

        logger.debug("Upserted vector", extra={"namespace": self.namespace, "id": point_id})
        return str(point_id)

    def upsert_points(self, points: list[dict[str, Any]], wait: bool = True) -> None:
        _ = wait
        if not points:
            return

        vectors, int_ids, metas = [], [], []
        for point in points:
            uid = str(point.get("id") or uuid4())
            raw_vec = list(point.get("vector") or [])
            if not raw_vec:
                continue
            int_id = _uuid_to_int64(uid)
            vec = np.array(raw_vec, dtype=np.float32)
            norm = np.linalg.norm(vec)
            if norm > 0:
                vec /= norm
            vectors.append(vec)
            int_ids.append(int_id)
            metas.append((str(int_id), _sanitize_metadata(point.get("payload") or {})))

        if not vectors:
            return

        batch_vecs = np.stack(vectors, axis=0).astype(np.float32)
        batch_ids = np.array(int_ids, dtype=np.int64)

        with self._lock:
            self._index.add_with_ids(batch_vecs, batch_ids)
            for meta_id, meta in metas:
                self._metadata[meta_id] = meta
            self._save()

        logger.info(
            "Upserted vector batch",
            extra={"namespace": self.namespace, "count": len(vectors)},
        )

    # ── read operations ────────────────────────────────────────────────────────

    def search(self, embedding: list[float], limit: int = 5) -> list[dict[str, str | float | None]]:
        with self._lock:
            total = self._index.ntotal

        if total == 0:
            logger.info("FAISS index is empty", extra={"namespace": self.namespace})
            return []

        query = np.array([embedding], dtype=np.float32)
        norm = np.linalg.norm(query)
        if norm > 0:
            query /= norm

        k = min(limit, total)

        with self._lock:
            scores, ids = self._index.search(query, k)
            meta_snapshot = self._metadata.copy()

        results: list[dict[str, str | float | None]] = []
        for score, int_id in zip(scores[0], ids[0]):
            if int_id == -1:
                continue
            meta = meta_snapshot.get(str(int_id), {})
            matched_label = meta.get("fraud_label") or meta.get("label")
            results.append({
                "text": meta.get("text"),
                "similarity": round(float(score), 4),
                "fraud_label": matched_label,
                "label": matched_label,
                "source": meta.get("source"),
                "source_file": meta.get("source_file"),
                "timestamp": meta.get("timestamp"),
            })

        logger.info(
            "FAISS similarity search completed",
            extra={"namespace": self.namespace, "matches": len(results)},
        )
        return results


# Keep old name as alias so existing code that references PineconeVectorStore still works
PineconeVectorStore = FAISSVectorStore


def get_pinecone_vector_store(namespace: str = DEFAULT_NAMESPACE) -> FAISSVectorStore:
    """Factory — returns a cached FAISS store per namespace."""
    global _store_cache
    if namespace not in _store_cache:
        with _store_lock:
            if namespace not in _store_cache:
                _store_cache[namespace] = FAISSVectorStore(namespace=namespace)
    return _store_cache[namespace]
