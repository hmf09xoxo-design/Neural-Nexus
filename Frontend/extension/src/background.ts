/**
 * HMF Shield — Service Worker (Manifest V3)
 *
 * Intercepts navigations via chrome.webNavigation.onBeforeNavigate,
 * shows an "Analyzing…" interstitial, scans the URL against the
 * HMF backend sandbox, then either allows the navigation or blocks it.
 * Blocked URLs are reported to the backend database.
 */

import type { DetectResponse, ExtensionSettings } from "./types";
import {
  cacheKey, getCached, getSettings, isInternalUrl,
  reportBlockedUrl, scanUrl, setCache, DEFAULT_SETTINGS,
} from "./utils";

// ── In-memory settings cache ──────────────────────────────────────────────────
// We need zero async gaps before chrome.tabs.update() so we keep settings
// in memory and update them via storage.onChanged. The async getSettings()
// call is only used at startup to seed the cache.
let _settings: ExtensionSettings = DEFAULT_SETTINGS;

getSettings().then((s) => { _settings = s; });

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.settings?.newValue) {
    _settings = { ...DEFAULT_SETTINGS, ...changes.settings.newValue };
  }
});

// ── In-flight deduplication: don't fire concurrent requests for same URL ──────
const _inflight = new Map<string, Promise<DetectResponse>>();

// ── Cleared URLs: allow these through without re-scanning ────────────────────
// After a safe result, the URL is marked cleared so the redirect back to the
// real site doesn't trigger another interception loop.
const _cleared = new Map<string, number>();
const CLEARED_TTL_MS = 15_000;

function isCleared(url: string): boolean {
  const t = _cleared.get(url);
  if (t === undefined) return false;
  if (Date.now() - t > CLEARED_TTL_MS) {
    _cleared.delete(url);
    return false;
  }
  return true;
}

function markCleared(url: string): void {
  _cleared.set(url, Date.now());
}

// ── Per-tab pending URL: guards against stale scan results ───────────────────
// Set synchronously before the async scan so the check is never racy.
// If the user navigates to a new URL mid-scan the map is overwritten and the
// old result is discarded rather than redirecting the wrong tab.
const _pending = new Map<number, string>(); // tabId → url being analyzed

// ── Scan with cache + deduplication ──────────────────────────────────────────
async function analyse(url: string): Promise<DetectResponse> {
  const key = cacheKey(url);

  const cached = await getCached(key);
  if (cached) return cached;

  if (_inflight.has(key)) return _inflight.get(key)!;

  const promise = scanUrl(url, _settings.apiBaseUrl)
    .then((result) => {
      setCache(key, result);
      return result;
    })
    .finally(() => _inflight.delete(key));

  _inflight.set(key, promise);
  return promise;
}

// ── Update extension badge ────────────────────────────────────────────────────
function setBadge(tabId: number, level: DetectResponse["risk_level"]): void {
  const config: Record<DetectResponse["risk_level"], { text: string; color: string }> = {
    safe:    { text: "",  color: "#22c55e" },
    warning: { text: "!", color: "#f59e0b" },
    danger:  { text: "✕", color: "#ef4444" },
  };
  const { text, color } = config[level];
  chrome.action.setBadgeText({ text, tabId });
  chrome.action.setBadgeBackgroundColor({ color, tabId });
}

// ── Core navigation interceptor ───────────────────────────────────────────────
function handleBeforeNavigate(
  details: chrome.webNavigation.WebNavigationParentedCallbackDetails
): void {
  // Only intercept top-level navigations
  if (details.frameId !== 0) return;

  const { url, tabId } = details;
  if (!url || isInternalUrl(url)) return;

  // Skip our own extension pages (analyzing.html, blocked.html)
  if (url.startsWith(chrome.runtime.getURL(""))) return;

  // Skip URLs already cleared as safe — this is the allowed redirect-back pass
  if (isCleared(url)) return;

  // Use in-memory cached settings — NO await before tabs.update so we win
  // the race against Chrome committing the navigation.
  if (!_settings.enabled) return;

  // Mark pending and redirect synchronously (no awaits above this point).
  _pending.set(tabId, url);

  const analyzingPage = chrome.runtime.getURL(
    `analyzing.html?url=${encodeURIComponent(url)}`
  );
  chrome.tabs.update(tabId, { url: analyzingPage });

  // Now do the async scan.
  analyse(url)
    .then((result) => {
      if (_pending.get(tabId) !== url) return;
      _pending.delete(tabId);

      setBadge(tabId, result.risk_level);

      if (result.risk_level === "safe") {
        markCleared(url);
        chrome.tabs.update(tabId, { url });
      } else {
        const blockedPage = chrome.runtime.getURL(
          `blocked.html?url=${encodeURIComponent(url)}&reason=${encodeURIComponent(result.reason)}&score=${Math.round(result.risk_score * 100)}`
        );
        chrome.tabs.update(tabId, { url: blockedPage });
        reportBlockedUrl(url, result, _settings.apiBaseUrl).catch((err) =>
          console.warn("[HMF Shield] Failed to report blocked URL:", err)
        );
      }
    })
    .catch((err) => {
      console.warn("[HMF Shield] Scan failed:", err);
      if (_pending.get(tabId) !== url) return;
      _pending.delete(tabId);
      // Fail-open: backend outage shouldn't break all browsing
      markCleared(url);
      chrome.tabs.update(tabId, { url });
    });
}

chrome.webNavigation.onBeforeNavigate.addListener(handleBeforeNavigate, {
  url: [{ schemes: ["http", "https"] }],
});

// ── Handle messages from popup ────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === "GET_SETTINGS") {
    sendResponse({ type: "SETTINGS", settings: _settings });
    return true;
  }

  if (msg.type === "UPDATE_SETTINGS") {
    import("./utils").then(({ saveSettings }) => {
      saveSettings(msg.settings).then(() => {
        _settings = { ..._settings, ...msg.settings };
        sendResponse({ ok: true });
      });
    });
    return true;
  }
});
