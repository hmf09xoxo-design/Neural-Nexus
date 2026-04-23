import { useCallback, useEffect, useState } from "react";
import type { DetectResponse, ExtensionSettings, RiskLevel } from "./types";
import { DEFAULT_SETTINGS } from "./utils";

// ── Risk-level colour tokens ──────────────────────────────────────────────────
const RISK_COLORS: Record<RiskLevel, { bg: string; border: string; text: string; badge: string }> = {
  safe:    { bg: "#0a1a12", border: "#22c55e", text: "#4ade80", badge: "#15803d" },
  warning: { bg: "#1a1200", border: "#f59e0b", text: "#fcd34d", badge: "#b45309" },
  danger:  { bg: "#1a0000", border: "#ef4444", text: "#fca5a5", badge: "#b91c1c" },
};

const RISK_ICONS: Record<RiskLevel, string> = {
  safe:    "✅",
  warning: "⚠️",
  danger:  "🛡️",
};

// ── Spinner ───────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "16px" }}>
      <div style={{
        width: 24, height: 24,
        border: "3px solid #334155",
        borderTop: "3px solid #8b5cf6",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
    </div>
  );
}

// ── Risk card ─────────────────────────────────────────────────────────────────
function RiskCard({ result }: { result: DetectResponse }) {
  const c = RISK_COLORS[result.risk_level];
  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: 10,
      padding: "12px 14px",
      marginTop: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 18 }}>{RISK_ICONS[result.risk_level]}</span>
        <span style={{ color: c.text, fontWeight: 700, fontSize: 13, textTransform: "capitalize" }}>
          {result.risk_level === "danger" ? "⚠ Phishing Detected" :
           result.risk_level === "warning" ? "Suspicious URL" : "URL Appears Safe"}
        </span>
      </div>

      {/* Risk meter */}
      <div style={{ margin: "8px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>
          <span>Risk Score</span>
          <span style={{ color: c.text }}>{Math.round(result.risk_score * 100)}%</span>
        </div>
        <div style={{ background: "#1e293b", borderRadius: 4, height: 6, overflow: "hidden" }}>
          <div style={{
            width: `${Math.round(result.risk_score * 100)}%`,
            height: "100%",
            background: c.border,
            borderRadius: 4,
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>
        <span style={{ color: "#64748b" }}>Confidence: </span>
        <span style={{ color: "#cbd5e1" }}>{Math.round(result.confidence * 100)}%</span>
        <span style={{ color: "#64748b", marginLeft: 8 }}>Latency: </span>
        <span style={{ color: "#cbd5e1" }}>{result.latency_ms}ms</span>
      </div>

      <div style={{
        fontSize: 11, color: "#94a3b8", lineHeight: 1.5,
        background: "#0f172a", borderRadius: 6, padding: "8px 10px", marginTop: 6,
      }}>
        {result.reason}
      </div>

      {result.details.suspicious_keywords.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <span style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>
            Keywords:
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
            {result.details.suspicious_keywords.map((kw) => (
              <span key={kw} style={{
                fontSize: 10, background: "#1e293b", color: "#94a3b8",
                padding: "2px 6px", borderRadius: 4,
              }}>{kw}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Settings panel ────────────────────────────────────────────────────────────
function SettingsPanel({
  settings,
  onSave,
  onBack,
}: {
  settings: ExtensionSettings;
  onSave: (s: ExtensionSettings) => void;
  onBack: () => void;
}) {
  const [local, setLocal] = useState(settings);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <button onClick={onBack} style={btnStyle("#1e293b", "#94a3b8")}>← Back</button>
        <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13 }}>Settings</span>
      </div>

      <Field label="API Base URL">
        <input
          value={local.apiBaseUrl}
          onChange={(e) => setLocal({ ...local, apiBaseUrl: e.target.value })}
          style={inputStyle}
        />
      </Field>

      <Toggle
        label="Enable Shield"
        checked={local.enabled}
        onChange={(v) => setLocal({ ...local, enabled: v })}
      />
      <Toggle
        label="Show safe notifications"
        checked={local.showSafeNotifications}
        onChange={(v) => setLocal({ ...local, showSafeNotifications: v })}
      />
      <Toggle
        label="Auto-block dangerous URLs"
        checked={local.autoBlockDanger}
        onChange={(v) => setLocal({ ...local, autoBlockDanger: v })}
      />

      <button
        onClick={() => onSave(local)}
        style={{ ...btnStyle("#7c3aed", "#fff"), width: "100%", marginTop: 12 }}
      >
        Save Settings
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ fontSize: 11, color: "#64748b", display: "block", marginBottom: 4 }}>{label}</label>
      {children}
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
      <span style={{ fontSize: 12, color: "#94a3b8" }}>{label}</span>
      <button
        onClick={() => onChange(!checked)}
        style={{
          width: 40, height: 22, borderRadius: 11, border: "none", cursor: "pointer",
          background: checked ? "#7c3aed" : "#334155",
          position: "relative", transition: "background 0.2s",
        }}
        aria-checked={checked}
        role="switch"
      >
        <span style={{
          position: "absolute", top: 3, left: checked ? 21 : 3,
          width: 16, height: 16, borderRadius: "50%",
          background: "#fff", transition: "left 0.2s",
        }} />
      </button>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  background: "#1e293b", border: "1px solid #334155",
  borderRadius: 6, padding: "6px 8px",
  color: "#e2e8f0", fontSize: 12, outline: "none",
};

function btnStyle(bg: string, color: string): React.CSSProperties {
  return {
    background: bg, color, border: "none", borderRadius: 6,
    padding: "6px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600,
  };
}

// ── Main popup ────────────────────────────────────────────────────────────────
export default function Popup() {
  const [tab, setTab] = useState<chrome.tabs.Tab | null>(null);
  const [result, setResult] = useState<DetectResponse | null>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<ExtensionSettings>(DEFAULT_SETTINGS);
  const [view, setView] = useState<"main" | "settings">("main");

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([t]) => {
      setTab(t ?? null);
    });
    chrome.runtime.sendMessage({ type: "GET_SETTINGS" }, (resp) => {
      if (resp?.settings) setSettings(resp.settings);
    });
  }, []);

  const scan = useCallback(() => {
    if (!tab?.url) return;
    setScanning(true);
    setError(null);
    setResult(null);
    chrome.runtime.sendMessage({ type: "SCAN_URL", url: tab.url }, (resp) => {
      setScanning(false);
      if (resp?.ok) setResult(resp.result);
      else setError(resp?.error ?? "Scan failed. Is the backend running?");
    });
  }, [tab]);

  const saveSettings = (s: ExtensionSettings) => {
    chrome.runtime.sendMessage({ type: "UPDATE_SETTINGS", settings: s }, () => {
      setSettings(s);
      setView("main");
    });
  };

  if (view === "settings") {
    return (
      <div style={containerStyle}>
        <Header />
        <SettingsPanel settings={settings} onSave={saveSettings} onBack={() => setView("main")} />
      </div>
    );
  }

  const displayUrl = tab?.url
    ? new URL(tab.url).hostname
    : "No active tab";

  return (
    <div style={containerStyle}>
      <Header onSettings={() => setView("settings")} />

      {/* Status pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: settings.enabled ? "#22c55e" : "#64748b",
        }} />
        <span style={{ fontSize: 11, color: "#64748b" }}>
          {settings.enabled ? "Shield active" : "Shield disabled"}
        </span>
      </div>

      {/* Current URL */}
      <div style={{
        background: "#1e293b", borderRadius: 8, padding: "8px 10px",
        fontSize: 12, color: "#94a3b8", marginBottom: 12,
        wordBreak: "break-all",
      }}>
        <span style={{ color: "#64748b", fontSize: 10 }}>Current page</span>
        <div style={{ color: "#e2e8f0", marginTop: 2 }}>{displayUrl}</div>
      </div>

      {/* Scan button */}
      <button
        onClick={scan}
        disabled={scanning || !tab?.url || !settings.enabled}
        style={{
          ...btnStyle(scanning ? "#1e293b" : "#7c3aed", scanning ? "#64748b" : "#fff"),
          width: "100%", padding: "10px",
          opacity: (!tab?.url || !settings.enabled) ? 0.5 : 1,
        }}
      >
        {scanning ? "Scanning…" : "🔍 Scan This Page"}
      </button>

      {scanning && <Spinner />}

      {result && <RiskCard result={result} />}

      {error && (
        <div style={{
          background: "#1a0000", border: "1px solid #ef4444",
          borderRadius: 8, padding: "10px 12px",
          color: "#fca5a5", fontSize: 12, marginTop: 10,
        }}>
          {error}
        </div>
      )}
    </div>
  );
}

function Header({ onSettings }: { onSettings?: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16,
        }}>🛡️</div>
        <div>
          <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 14 }}>HMF Shield</div>
          <div style={{ color: "#64748b", fontSize: 10 }}>URL Phishing Detection</div>
        </div>
      </div>
      {onSettings && (
        <button onClick={onSettings} style={{ ...btnStyle("transparent", "#64748b"), padding: "4px 8px" }}>
          ⚙
        </button>
      )}
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  width: 300,
  minHeight: 200,
  background: "#0d0e16",
  color: "#e2e8f0",
  padding: 16,
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  boxSizing: "border-box",
};
