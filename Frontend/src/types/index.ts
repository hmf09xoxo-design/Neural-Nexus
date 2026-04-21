export interface User {
  id: string
  email: string
  username: string
  role: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export interface ThreatResult {
  label: string
  confidence: number
  risk_score: number
  explanation?: string
}

export interface HistoryItem {
  request_id: string
  created_at: string
  input_preview: string
  result: ThreatResult
}

export interface SmsAnalysisResult {
  request_id: string
  prediction: string
  confidence: number
  risk_score: number
  explanation?: string
  features?: Record<string, unknown>
}

export interface EmailAnalysisResult {
  request_id: string
  prediction: string
  confidence: number
  risk_score: number
  explanation?: string
}

export interface UrlAnalysisResult {
  request_id: string
  url: string
  is_phishing: boolean
  risk_score: number
  confidence: number
  explanation?: string
  phases?: Record<string, unknown>
}

export interface VoiceAnalysisResult {
  request_id: string
  label: string
  confidence: number
  risk_score: number
  transcript?: string
  explanation?: string
}

export interface AttachmentAnalysisResult {
  request_id: string
  filename: string
  is_malicious: boolean
  risk_score: number
  confidence: number
  scan_results?: Record<string, unknown>
  explanation?: string
}

export interface ApiKey {
  key_id: string
  masked_key: string
  created_at: string
  expires_at: string
  label?: string
}
