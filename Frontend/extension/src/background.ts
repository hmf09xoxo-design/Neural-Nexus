/**
 * HMF Shield — Service Worker (Manifest V3)
 *
 * Intercepts navigations via chrome.webNavigation, scans URLs against the
 * HMF backend, caches results in IndexedDB, and broadcasts findings to the
 * content script on the active tab.
 */

import type { DetectResponse, ExtensionSettings } from "./types";
import { cacheKey, getCached, getSettings, isInternalUrl, scanUrl, setCache } from "./utils";

// ── In-flight deduplication: don't fire concurrent requests for same URL ──────
const _inflight = new Map<string, Promise<DetectResponse>>();

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

// ── Send result to content script on the given tab ───────────────────────────
function notifyTab(tabId: number, result: DetectResponse): void {
  chrome.tabs
    .sendMessage(tabId, { type: "URL_RESULT", result })
    .catch(() => {
      // Content script may not be injected yet — ignore
    });
}

// ── Update extension badge ────────────────────────────────────────────────────
function setBadge(tabId: number, level: DetectResponse["risk_level"]): void {
  const config: Record<
    DetectResponse["risk_level"],
    { text: string; color: string }
  > = {
    safe: { text: "", color: "#22c55e" },
    warning: { text: "!", color: "#f59e0b" },
    danger: { text: "✕", color: "#ef4444" },
  };
  const { text, color } = config[level];
  chrome.action.setBadgeText({ text, tabId });
  chrome.action.setBadgeBackgroundColor({ color, tabId });
}

// ── Core navigation handler ───────────────────────────────────────────────────
async function handleNavigation(
  details: chrome.webNavigation.WebNavigationFramedCallbackDetails
): Promise<void> {
  // Only act on top-level frame navigations
  if (details.frameId !== 0) return;

  const url = details.url;
  if (!url || isInternalUrl(url)) return;

  const settings = await getSettings();
  if (!settings.enabled) return;

  try {
    const result = await analyse(url, settings);

    setBadge(details.tabId, result.risk_level);
    notifyTab(details.tabId, result);

    // Auto-block dangerous URLs if the user enabled that option
    if (settings.autoBlockDanger && result.risk_level === "danger") {
      chrome.tabs.update(details.tabId, {
        url: chrome.runtime.getURL(
          `public/blocked.html?url=${encodeURIComponent(url)}&reason=${encodeURIComponent(result.reason)}`
        ),
      });
    }
  } catch (err) {
    console.warn("[HMF Shield] Scan failed:", err);
  }
}

chrome.webNavigation.onCommitted.addListener(handleNavigation, {
  url: [{ schemes: ["http", "https"] }],
});

// ── Handle messages from popup and content scripts ───────────────────────────
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === "SCAN_URL") {
    getSettings().then((settings) => {
      analyse(msg.url, settings)
        .then((result) => sendResponse({ ok: true, result }))
        .catch((err) =>
          sendResponse({ ok: false, error: String(err) })
        );
    });
    return true; // keep message channel open for async response
  }

  if (msg.type === "GET_SETTINGS") {
    getSettings().then((settings) => sendResponse({ type: "SETTINGS", settings }));
    return true;
  }

  if (msg.type === "UPDATE_SETTINGS") {
    import("./utils").then(({ saveSettings }) => {
      saveSettings(msg.settings).then(() => sendResponse({ ok: true }));
    });
    return true;
  }
});
