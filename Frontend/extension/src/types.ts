export type RiskLevel = "safe" | "warning" | "danger";

export interface DetectResponse {
  risk_level: RiskLevel;
  confidence: number;
  risk_score: number;
  is_phishing: boolean;
  reason: string;
  url: string;
  latency_ms: number;
  details: {
    url_length: number;
    has_ip_address: boolean;
    num_subdomains: number;
    has_at_symbol: boolean;
    num_hyphens: number;
    suspicious_keywords: string[];
    ml_engine_used: boolean;
  };
}

export interface CacheEntry {
  result: DetectResponse;
  timestamp: number;
}

export interface ExtensionSettings {
  enabled: boolean;
  apiBaseUrl: string;
  showSafeNotifications: boolean;
  autoBlockDanger: boolean;
}

export type MessageType =
  | { type: "URL_RESULT"; result: DetectResponse }
  | { type: "SCAN_URL"; url: string }
  | { type: "GET_SETTINGS" }
  | { type: "SETTINGS"; settings: ExtensionSettings }
  | { type: "UPDATE_SETTINGS"; settings: Partial<ExtensionSettings> };
