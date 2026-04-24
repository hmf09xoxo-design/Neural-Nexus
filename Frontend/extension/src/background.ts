/**
 * HMF Shield — Service Worker (Manifest V3)
 *
 * Intercepts navigations via chrome.webNavigation.onBeforeNavigate,
 * shows an "Analyzing…" interstitial, scans the URL against the
 * HMF backend sandbox, then either allows the navigation or blocks it.
 * Blocked URLs are reported to the backend database.
 */

import type { DetectResponse, ExtensionSettings } from "./types";
import { cacheKey, getCached, getSettings, isInternalUrl, reportBlockedUrl, scanUrl, setCache } from "./utils";

// ── In-flight deduplication: don't fire concurrent requests for same URL ──────
const _inflight = new Map<string, Promise<DetectResponse>>();

// ── Cleared URLs: allow these through without re-scanning ────────────────────
// After a safe result, the URL is marked cleared so the redirect back to the
// real site doesn't trigger another interception loop.
const _cleared = new Map<string, number>();
const CLEARED_TTL_MS = 15_000;

// ── Per-tab pending URL: guards against stale scan results ───────────────────
// Set synchronously before the async scan so the check is never racy.
// If the user navigates to a new URL mid-scan, the map is overwritten and the
// old result is discarded rather than redirecting to the wrong place.
const _pending = new Map<number, string>(); // tabId → url being analyzed

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

// ── Scan with cache + deduplication ──────────────────────────────────────────
async function analyse(
  url: string,
  settings: ExtensionSettings
): Promise<DetectResponse> {
  const key = cacheKey(url);

  const cached = await getCached(key);
  if (cached) return cached;

  if (_inflight.has(key)) return _inflight.get(key)!;

  const promise = scanUrl(url, settings.apiBaseUrl)
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
  const config: Record<
    DetectResponse["risk_level"],
    { text: string; color: string }
  > = {
    safe:    { text: "",  color: "#22c55e" },
    warning: { text: "!", color: "#f59e0b" },
    danger:  { text: "✕", color: "#ef4444" },
  };
  const { text, color } = config[level];
  chrome.action.setBadgeText({ text, tabId });
  chrome.action.setBadgeBackgroundColor({ color, tabId });
}

// ── Core navigation interceptor ───────────────────────────────────────────────
async function handleBeforeNavigate(
  details: chrome.webNavigation.WebNavigationParentedCallbackDetails
): Promise<void> {
  // Only intercept top-level navigations
  if (details.frameId !== 0) return;

  const { url, tabId } = details;
  if (!url || isInternalUrl(url)) return;

  // Skip our own extension pages (analyzing.html, blocked.html)
  if (url.startsWith(chrome.runtime.getURL(""))) return;

  // Skip URLs already cleared as safe — this is the allowed redirect-back pass
  if (isCleared(url)) return;

  const settings = await getSettings();
  if (!settings.enabled) return;

  // Mark this tab as pending synchronously — before any await — so the check
  // below is never racy regardless of how fast the scan returns.
  _pending.set(tabId, url);

  // Redirect to analyzing interstitial so the user sees feedback immediately.
  const analyzingPage = chrome.runtime.getURL(
    `analyzing.html?url=${encodeURIComponent(url)}`
  );
  chrome.tabs.update(tabId, { url: analyzingPage });

  try {
    const result = await analyse(url, settings);

    // If the user navigated to a different URL mid-scan, _pending was
    // overwritten. Discard the result so we don't redirect the wrong tab.
    if (_pending.get(tabId) !== url) return;
    _pending.delete(tabId);

    setBadge(tabId, result.risk_level);

    if (result.risk_level === "safe") {
      // Allow through — mark cleared first to skip the next onBeforeNavigate
      markCleared(url);
      chrome.tabs.update(tabId, { url });
    } else {
      // Block: redirect to the blocked page and report to DB
      const blockedPage = chrome.runtime.getURL(
        `blocked.html?url=${encodeURIComponent(url)}&reason=${encodeURIComponent(result.reason)}&score=${Math.round(result.risk_score * 100)}`
      );
      chrome.tabs.update(tabId, { url: blockedPage });
      reportBlockedUrl(url, result, settings.apiBaseUrl).catch((err) =>
        console.warn("[HMF Shield] Failed to report blocked URL:", err)
      );
    }
  } catch (err) {
    console.warn("[HMF Shield] Scan failed:", err);
    if (_pending.get(tabId) !== url) return;
    _pending.delete(tabId);
    // Fail-open: let the user through so a backend outage doesn't break browsing
    markCleared(url);
    chrome.tabs.update(tabId, { url });
  }
}

chrome.webNavigation.onBeforeNavigate.addListener(handleBeforeNavigate, {
  url: [{ schemes: ["http", "https"] }],
});

// ── Handle messages from popup ────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === "GET_SETTINGS") {
    getSettings().then((settings) =>
      sendResponse({ type: "SETTINGS", settings })
    );
    return true;
  }

  if (msg.type === "UPDATE_SETTINGS") {
    import("./utils").then(({ saveSettings }) => {
      saveSettings(msg.settings).then(() => sendResponse({ ok: true }));
    });
    return true;
  }
});
