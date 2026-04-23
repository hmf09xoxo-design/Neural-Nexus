"use client"

import { useEffect, useRef, type ReactNode } from "react"

// ─── Shape definitions ──────────────────────────────────────────────────────

interface Prediction {
  label?: string
  confidence?: number
}

interface FraudReport {
  risk_score?: number
  is_fraud?: boolean
  system_logic?: string
  red_flags?: string[]
}

interface VoiceAnalysis {
  result?: string
  confidence?: number
}

export interface AnalysisData {
  request_id?: string
  // scores
  risk_score?: number
  confidence?: number
  phishing_probability?: number
  risk_level?: string
  // classification
  fraud_type?: string
  final_verdict?: string
  // text signals
  flags?: string[]
  explanation?: string
  llm_explanation?: string
  llm_confidence?: number
  // sub-scores
  nlp_score?: number
  similarity_score?: number
  stylometry_score?: number
  url_risk_score?: number
  urgency_score?: number
  // nested shapes (voice / attachment)
  prediction?: Prediction
  fraud_report?: FraudReport
  voice_analysis?: VoiceAnalysis
  [key: string]: unknown
}

// ─── Normalize heterogeneous API shapes ─────────────────────────────────────

type RiskLevel = "LOW" | "MEDIUM" | "HIGH"

function deriveLevel(score: number | null, provided?: string): RiskLevel | null {
  if (provided) {
    const u = provided.toUpperCase()
    if (u === "LOW" || u === "MEDIUM" || u === "HIGH") return u as RiskLevel
  }
  if (score === null) return null
  if (score < 0.3) return "LOW"
  if (score <= 0.7) return "MEDIUM"
  return "HIGH"
}

function normalize(r: AnalysisData) {
  const riskScore =
    typeof r.risk_score === "number" ? r.risk_score
    : typeof r.fraud_report?.risk_score === "number" ? r.fraud_report!.risk_score!
    : typeof r.phishing_probability === "number" ? r.phishing_probability
    : null

  const confidence =
    typeof r.confidence === "number" ? r.confidence
    : typeof r.llm_confidence === "number" ? r.llm_confidence
    : null

  const fraudType =
    typeof r.fraud_type === "string" ? r.fraud_type
    : typeof r.final_verdict === "string" ? r.final_verdict
    : typeof r.fraud_report?.is_fraud === "boolean"
      ? (r.fraud_report!.is_fraud ? "fraud" : "clean")
    : null

  const predLabel =
    r.prediction?.label
    ?? r.voice_analysis?.result
    ?? null

  const predConfidence =
    typeof r.prediction?.confidence === "number" ? r.prediction!.confidence!
    : typeof r.voice_analysis?.confidence === "number" ? r.voice_analysis!.confidence!
    : null

  const flags: string[] = [
    ...(Array.isArray(r.flags) ? (r.flags as string[]) : []),
    ...(Array.isArray(r.fraud_report?.red_flags) ? r.fraud_report!.red_flags! : []),
  ]

  const explanation =
    (typeof r.llm_explanation === "string" && r.llm_explanation.trim())
      ? r.llm_explanation.trim()
    : (typeof r.explanation === "string" && r.explanation.trim())
      ? r.explanation.trim()
    : (typeof r.fraud_report?.system_logic === "string" && r.fraud_report!.system_logic!.trim())
      ? r.fraud_report!.system_logic!.trim()
    : null

  const riskLevel = deriveLevel(riskScore, r.risk_level)

  const nlpScore = typeof r.nlp_score === "number" ? r.nlp_score : null
  const simScore = typeof r.similarity_score === "number" ? r.similarity_score : null
  const styloScore = typeof r.stylometry_score === "number" ? r.stylometry_score : null
  const urlRisk = typeof r.url_risk_score === "number" ? r.url_risk_score : null
  const urgency = typeof r.urgency_score === "number" ? r.urgency_score : null

  const hasAdvanced = [nlpScore, simScore, styloScore, urlRisk, urgency].some((v) => v !== null)

  const reqId = typeof r.request_id === "string" ? r.request_id : null

  const SAFE_LABELS = new Set(["safe", "clean", "ham", "real (bonafide)"])
  const isThreat = !!fraudType && !SAFE_LABELS.has(fraudType.toLowerCase())
  const isPredThreat = !!predLabel && !SAFE_LABELS.has(predLabel.toLowerCase())

  return {
    riskScore,
    riskLevel,
    confidence,
    fraudType,
    predLabel,
    predConfidence,
    flags,
    explanation,
    nlpScore,
    simScore,
    styloScore,
    urlRisk,
    urgency,
    hasAdvanced,
    reqId,
    isThreat,
    isPredThreat,
  }
}

// ─── Formatters ──────────────────────────────────────────────────────────────

const pct = (n: number | null) => (n === null ? "—" : `${(n * 100).toFixed(0)}%`)
const f2  = (n: number | null) => (n === null ? "—" : n.toFixed(2))

// ─── Risk visual tokens ──────────────────────────────────────────────────────

const RISK_TEXT: Record<RiskLevel, string> = {
  LOW:    "text-foreground/70",
  MEDIUM: "text-accent",
  HIGH:   "text-destructive",
}

const RISK_BORDER: Record<RiskLevel, string> = {
  LOW:    "border-border/35",
  MEDIUM: "border-accent/45",
  HIGH:   "border-destructive/55",
}

const RISK_BAR: Record<RiskLevel, string> = {
  LOW:    "bg-foreground/40",
  MEDIUM: "bg-accent/75",
  HIGH:   "bg-destructive/85",
}

const RISK_FLAG_BORDER: Record<RiskLevel, string> = {
  LOW:    "border-border/30",
  MEDIUM: "border-accent/35",
  HIGH:   "border-destructive/45",
}

// ─── Internal atoms ──────────────────────────────────────────────────────────

function Divider() {
  return <div className="border-b border-border/15" />
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-muted-foreground/55 mb-4">
      {children}
    </p>
  )
}

function CoreMetric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="font-mono text-[8px] uppercase tracking-[0.35em] text-muted-foreground/50 mb-1.5">
        {label}
      </p>
      <p className={`font-mono text-sm tracking-[0.03em] ${accent ? "text-accent" : "text-foreground/90"}`}>
        {value}
      </p>
    </div>
  )
}

function TinySignal({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/40">
        {label}
      </span>
      <span className="font-mono text-[10px] text-muted-foreground/60">{value}</span>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AnalysisResult({ data }: { data: AnalysisData }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const d = normalize(data)

  // Smooth entrance — no library required
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    el.style.opacity = "0"
    el.style.transform = "translateY(10px)"
    const raf = requestAnimationFrame(() => {
      el.style.transition =
        "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)"
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  const riskText      = d.riskLevel ? RISK_TEXT[d.riskLevel]       : "text-foreground/50"
  const riskBorder    = d.riskLevel ? RISK_BORDER[d.riskLevel]     : "border-border/25"
  const riskBar       = d.riskLevel ? RISK_BAR[d.riskLevel]        : "bg-foreground/30"
  const riskFlagBorder = d.riskLevel ? RISK_FLAG_BORDER[d.riskLevel] : "border-border/30"

  return (
    <div ref={rootRef} className={`border ${riskBorder} mt-8`}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-muted-foreground/55">
          Threat Assessment
        </span>
        {d.reqId && (
          <span className="font-mono text-[8px] text-muted-foreground/35 tracking-[0.15em]">
            {d.reqId.slice(0, 8).toUpperCase()}
          </span>
        )}
      </div>
      <Divider />

      {/* ── 1. Primary Signal ───────────────────────────────────────────────── */}
      <div className="px-5 pt-8 pb-5">
        <SectionLabel>Risk Level</SectionLabel>
        <div className="flex items-end gap-3">
          {d.riskLevel === "HIGH" && (
            <span className="inline-block w-1.5 h-1.5 bg-destructive self-center shrink-0 animate-pulse mb-1" />
          )}
          {d.riskLevel === "MEDIUM" && (
            <span className="inline-block w-1.5 h-1.5 bg-accent self-center shrink-0 mb-1" />
          )}
          <span
            className={`font-[var(--font-bebas)] text-6xl md:text-7xl leading-none tracking-tight ${riskText}`}
          >
            {d.riskLevel ?? "UNKNOWN"}
          </span>
          {d.riskScore !== null && (
            <span className="font-mono text-[10px] text-muted-foreground/50 mb-1.5 tracking-[0.1em]">
              {pct(d.riskScore)} raw
            </span>
          )}
        </div>

        {/* ── Risk Score Bar ────────────────────────────────────────────────── */}
        {d.riskScore !== null && (
          <div className="mt-5 h-px bg-border/20 relative overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 ${riskBar} transition-all duration-700 ease-out`}
              style={{ width: `${(d.riskScore * 100).toFixed(0)}%` }}
            />
          </div>
        )}
      </div>
      <Divider />

      {/* ── 2. Core Metrics ─────────────────────────────────────────────────── */}
      <div className="px-5 py-6">
        <SectionLabel>Core Metrics</SectionLabel>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5">
          <CoreMetric label="Risk Score"  value={pct(d.riskScore)} />
          <CoreMetric label="Confidence"  value={pct(d.confidence)} />
          <CoreMetric
            label="Prediction"
            value={d.predLabel ? d.predLabel.toUpperCase() : "—"}
            accent={d.isPredThreat}
          />
          <CoreMetric
            label="Fraud Type"
            value={d.fraudType ? d.fraudType.toUpperCase() : "—"}
            accent={d.isThreat}
          />
        </div>
      </div>
      <Divider />

      {/* ── 3. Active Signals ───────────────────────────────────────────────── */}
      <div className="px-5 py-6">
        <SectionLabel>
          {d.flags.length > 0 ? `Active Signals [${d.flags.length}]` : "Active Signals"}
        </SectionLabel>
        {d.flags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {d.flags.map((flag, i) => (
              <span
                key={i}
                className={`font-mono text-[9px] uppercase tracking-[0.15em] border ${riskFlagBorder} px-2.5 py-1 text-muted-foreground/70`}
              >
                {flag.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        ) : (
          <p className="font-mono text-[10px] text-muted-foreground/45 tracking-[0.1em]">
            No active threat indicators
          </p>
        )}
      </div>

      {/* ── 4. Explanation ──────────────────────────────────────────────────── */}
      {d.explanation && (
        <>
          <Divider />
          <div className="px-5 py-6">
            <SectionLabel>Analysis Report //</SectionLabel>
            <p className="font-mono text-[11px] text-muted-foreground/75 leading-relaxed max-w-prose">
              {d.explanation}
            </p>
          </div>
        </>
      )}

      {/* ── 5. Extended Telemetry ───────────────────────────────────────────── */}
      {d.hasAdvanced && (
        <>
          <Divider />
          <div className="px-5 py-4">
            <SectionLabel>Extended Telemetry</SectionLabel>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {d.nlpScore   !== null && <TinySignal label="NLP"        value={f2(d.nlpScore)} />}
              {d.simScore   !== null && <TinySignal label="Similarity" value={f2(d.simScore)} />}
              {d.styloScore !== null && <TinySignal label="Stylometry" value={f2(d.styloScore)} />}
              {d.urlRisk    !== null && <TinySignal label="URL Risk"   value={f2(d.urlRisk)} />}
              {d.urgency    !== null && <TinySignal label="Urgency"    value={f2(d.urgency)} />}
            </div>
          </div>
        </>
      )}

    </div>
  )
}
