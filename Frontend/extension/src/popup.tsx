import { useEffect, useState } from "react";
import type { ExtensionSettings } from "./types";
import { DEFAULT_SETTINGS } from "./utils";

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
  const [settings, setSettings] = useState<ExtensionSettings>(DEFAULT_SETTINGS);
  const [view, setView] = useState<"main" | "settings">("main");

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "GET_SETTINGS" }, (resp) => {
      if (resp?.settings) setSettings(resp.settings);
    });
  }, []);

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

  return (
    <div style={containerStyle}>
      <Header onSettings={() => setView("settings")} />

      {/* Status pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: settings.enabled ? "#22c55e" : "#64748b",
        }} />
        <span style={{ fontSize: 11, color: settings.enabled ? "#4ade80" : "#64748b", fontWeight: 600 }}>
          {settings.enabled ? "Shield active" : "Shield disabled"}
        </span>
      </div>

      {/* Info card */}
      <div style={{
        background: settings.enabled ? "#0a1a12" : "#0f172a",
        border: `1px solid ${settings.enabled ? "#166534" : "#1e293b"}`,
        borderRadius: 10,
        padding: "14px 16px",
      }}>
        {settings.enabled ? (
          <>
            <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 600, marginBottom: 6 }}>
              Auto-analysis enabled
            </div>
            <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>
              Every link you click is automatically scanned against the sandbox before loading.
              Safe sites open normally. Threats are blocked and reported.
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600, marginBottom: 6 }}>
              Shield is off
            </div>
            <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>
              Enable the shield in settings to automatically analyze links before they load.
            </div>
          </>
        )}
      </div>
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
          <div style={{ color: "#64748b", fontSize: 10 }}>Phishing & Malware Protection</div>
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
