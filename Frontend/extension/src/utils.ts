import type { CacheEntry, DetectResponse, ExtensionSettings } from "./types";

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const CACHE_STORE = "url-scan-cache";
const DB_NAME = "hmf-shield";
const DB_VERSION = 1;

// ── Default settings ──────────────────────────────────────────────────────────
export const DEFAULT_SETTINGS: ExtensionSettings = {
  enabled: true,
  apiBaseUrl: "http://localhost:8000",
  showSafeNotifications: false,
  autoBlockDanger: false,
};

// ── Settings helpers ──────────────────────────────────────────────────────────
export async function getSettings(): Promise<ExtensionSettings> {
  return new Promise((resolve) => {
    chrome.storage.sync.get("settings", (data) => {
      resolve({ ...DEFAULT_SETTINGS, ...(data.settings ?? {}) });
    });
  });
}

export async function saveSettings(
  patch: Partial<ExtensionSettings>
): Promise<void> {
  const current = await getSettings();
  return new Promise((resolve) => {
    chrome.storage.sync.set({ settings: { ...current, ...patch } }, resolve);
  });
}

// ── IndexedDB cache ───────────────────────────────────────────────────────────
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(CACHE_STORE, { keyPath: "url" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getCached(url: string): Promise<DetectResponse | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(CACHE_STORE, "readonly");
      const req = tx.objectStore(CACHE_STORE).get(url);
      req.onsuccess = () => {
        const entry: (CacheEntry & { url: string }) | undefined = req.result;
        if (!entry) return resolve(null);
        if (Date.now() - entry.timestamp > CACHE_TTL_MS) return resolve(null);
        resolve(entry.result);
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function setCache(
  url: string,
  result: DetectResponse
): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(CACHE_STORE, "readwrite");
      tx.objectStore(CACHE_STORE).put({ url, result, timestamp: Date.now() });
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch {
    // silently ignore cache write failures
  }
}

// ── API call ──────────────────────────────────────────────────────────────────
export async function scanUrl(
  url: string,
  apiBaseUrl: string
): Promise<DetectResponse> {
  const resp = await fetch(`${apiBaseUrl}/api/detect/url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, extension: true }),
    signal: AbortSignal.timeout(8000),
  });
  if (!resp.ok) throw new Error(`API error ${resp.status}`);
  return resp.json() as Promise<DetectResponse>;
}

// ── Report a blocked URL to the backend database ──────────────────────────────
export async function reportBlockedUrl(
  url: string,
  result: DetectResponse,
  apiBaseUrl: string
): Promise<void> {
  const resp = await fetch(`${apiBaseUrl}/api/blocked/report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url,
      risk_level: result.risk_level,
      risk_score: result.risk_score,
      reason: result.reason,
      blocked_at: new Date().toISOString(),
    }),
    signal: AbortSignal.timeout(5000),
  });
  if (!resp.ok) throw new Error(`Report API error ${resp.status}`);
}

// ── Normalise URL (strip query/hash for cache key) ────────────────────────────
export function cacheKey(url: string): string {
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.hostname}${u.pathname}`;
  } catch {
    return url;
  }
}

export function isInternalUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return (
      u.protocol === "chrome:" ||
      u.protocol === "chrome-extension:" ||
      u.protocol === "about:" ||
      u.protocol === "moz-extension:" ||
      u.hostname === "localhost" ||
      u.hostname === "127.0.0.1" ||
      u.hostname === "::1"
    );
  } catch {
    return true;
  }
}
