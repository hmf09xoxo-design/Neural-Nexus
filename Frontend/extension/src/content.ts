/**
 * HMF Shield — Content Script
 *
 * Displays an unobtrusive banner at the top of the page when the background
 * service worker sends a URL_RESULT message.  Danger results show a prominent
 * red warning; warnings show amber; safe pages show nothing by default.
 */

import type { DetectResponse, RiskLevel } from "./types";

const BANNER_ID = "hmf-shield-banner";

// ── Banner styles injected once ───────────────────────────────────────────────
function injectStyles(): void {
  if (document.getElementById("hmf-shield-styles")) return;
  const style = document.createElement("style");
  style.id = "hmf-shield-styles";
  style.textContent = `
    #hmf-shield-banner {
      all: initial;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2147483647;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 13px;
      line-height: 1.4;
      box-shadow: 0 2px 8px rgba(0,0,0,.35);
      animation: hmf-slide-in 0.25s ease;
    }
    @keyframes hmf-slide-in {
      from { transform: translateY(-100%); opacity: 0; }
      to   { transform: translateY(0);     opacity: 1; }
    }
    #hmf-shield-banner.hmf-danger  { background:#1a0000; border-bottom:3px solid #ef4444; color:#fca5a5; }
    #hmf-shield-banner.hmf-warning { background:#1a1200; border-bottom:3px solid #f59e0b; color:#fcd34d; }
    #hmf-shield-banner .hmf-icon   { font-size:20px; margin-right:10px; flex-shrink:0; }
    #hmf-shield-banner .hmf-body   { flex:1; }
    #hmf-shield-banner .hmf-title  { font-weight:700; margin-bottom:2px; }
    #hmf-shield-banner .hmf-reason { opacity:.85; font-size:11px; }
    #hmf-shield-banner .hmf-score  { font-size:11px; opacity:.6; margin-top:2px; }
    #hmf-shield-banner .hmf-close  {
      all: unset;
      cursor:pointer;
      font-size:18px;
      margin-left:12px;
      opacity:.6;
      flex-shrink:0;
    }
    #hmf-shield-banner .hmf-close:hover { opacity:1; }
  `;
  document.head?.appendChild(style);
}

// ── Remove existing banner ────────────────────────────────────────────────────
function removeBanner(): void {
  document.getElementById(BANNER_ID)?.remove();
}

// ── Show banner ───────────────────────────────────────────────────────────────
function showBanner(result: DetectResponse): void {
  if (result.risk_level === "safe") return;

  injectStyles();
  removeBanner();

  const cfg: Record<RiskLevel, { icon: string; title: string }> = {
    safe:    { icon: "✅", title: "Site appears safe" },
    warning: { icon: "⚠️",  title: "Suspicious URL detected" },
    danger:  { icon: "🛡️",  title: "Phishing / Malicious URL Blocked" },
  };
  const { icon, title } = cfg[result.risk_level];

  const banner = document.createElement("div");
  banner.id = BANNER_ID;
  banner.className = `hmf-${result.risk_level}`;
  banner.innerHTML = `
    <span class="hmf-icon" aria-hidden="true">${icon}</span>
    <div class="hmf-body">
      <div class="hmf-title">HMF Shield — ${title}</div>
      <div class="hmf-reason">${escapeHtml(result.reason)}</div>
      <div class="hmf-score">Risk score: ${Math.round(result.risk_score * 100)}% · Confidence: ${Math.round(result.confidence * 100)}%</div>
    </div>
    <button class="hmf-close" aria-label="Dismiss">✕</button>
  `;

  banner.querySelector(".hmf-close")?.addEventListener("click", removeBanner);

  document.documentElement.prepend(banner);

  // Auto-dismiss warnings after 8 seconds; keep danger banner indefinitely
  if (result.risk_level === "warning") {
    setTimeout(removeBanner, 8000);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Message listener ──────────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "URL_RESULT") {
    showBanner(msg.result as DetectResponse);
  }
});
