"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import type { AnalysisData } from "@/components/AnalysisResult"

// ─── Color constants (hex only — CSS vars don't work inside SVG fills) ────────

const C_ORANGE  = "#e87500"
const C_RED     = "#ef4444"
const C_GREEN   = "#22c55e"
const C_DIM     = "rgba(255,255,255,0.05)"
const C_TRACK   = "rgba(255,255,255,0.08)"

function scoreColor(s: number): string {
  if (s < 0.3) return C_GREEN
  if (s <= 0.7) return C_ORANGE
  return C_RED
}

// ─── Data extraction (mirrors AnalysisResult's normalize without importing it) ─

interface ChartData {
  riskScore:   number | null
  confidence:  number | null
  predLabel:   string | null
  fraudType:   string | null
  flags:       string[]
  subScores:   { key: string; val: number }[]
}

function extract(d: AnalysisData): ChartData {
  const fr = d.fraud_report as { risk_score?: number; red_flags?: string[] } | undefined

  const riskScore =
    typeof d.risk_score          === "number" ? d.risk_score
    : typeof d.phishing_probability === "number" ? d.phishing_probability
    : typeof fr?.risk_score       === "number" ? fr.risk_score
    : null

  const confidence =
    typeof d.confidence           === "number" ? d.confidence
    : typeof d.llm_confidence     === "number" ? d.llm_confidence
    : typeof d.prediction?.confidence === "number" ? d.prediction!.confidence!
    : typeof d.voice_analysis?.confidence === "number" ? d.voice_analysis!.confidence!
    : null

  const predLabel  = d.prediction?.label ?? d.voice_analysis?.result ?? null
  const fraudType  =
    typeof d.fraud_type    === "string" ? d.fraud_type
    : typeof d.final_verdict === "string" ? d.final_verdict
    : null

  const flags: string[] = [
    ...(Array.isArray(d.flags)       ? (d.flags as string[]) : []),
    ...(Array.isArray(fr?.red_flags) ? fr!.red_flags!        : []),
  ]

  const subScores: { key: string; val: number }[] = [
    { key: "NLP",        val: d.nlp_score        as number },
    { key: "Similarity", val: d.similarity_score  as number },
    { key: "Stylometry", val: d.stylometry_score  as number },
    { key: "URL Risk",   val: d.url_risk_score    as number },
    { key: "Urgency",    val: d.urgency_score     as number },
  ].filter(s => typeof s.val === "number")

  return { riskScore, confidence, predLabel, fraudType, flags, subScores }
}

// ─── Risk donut ───────────────────────────────────────────────────────────────

function RiskDonut({ score }: { score: number }) {
  const color   = scoreColor(score)
  const pct     = Math.round(score * 100)
  const pieData = [{ value: score }, { value: Math.max(0, 1 - score) }]

  return (
    <div className="relative flex-shrink-0" style={{ width: 156, height: 156 }}>
      <PieChart width={156} height={156}>
        <Pie
          data={pieData}
          cx={73}
          cy={73}
          innerRadius={50}
          outerRadius={66}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          strokeWidth={0}
          isAnimationActive
          animationBegin={80}
          animationDuration={1100}
          animationEasing="ease-out"
        >
          <Cell fill={color} />
          <Cell fill={C_DIM} />
        </Pie>
      </PieChart>

      {/* Center overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span
          className="font-[var(--font-bebas)] text-4xl leading-none"
          style={{ color }}
        >
          {pct}
        </span>
        <span className="font-mono text-[7px] uppercase tracking-[0.25em] mt-0.5"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          risk%
        </span>
      </div>
    </div>
  )
}

// ─── Confidence bar ───────────────────────────────────────────────────────────

function ConfidenceBar({ confidence }: { confidence: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-[8px] uppercase tracking-[0.3em]"
          style={{ color: "rgba(255,255,255,0.45)" }}>
          Model Confidence
        </span>
        <span className="font-mono text-[11px]"
          style={{ color: "rgba(255,255,255,0.9)" }}>
          {Math.round(confidence * 100)}%
        </span>
      </div>
      <div className="h-px relative overflow-hidden" style={{ background: C_TRACK }}>
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{ background: `linear-gradient(to right, ${C_ORANGE}, rgba(232,117,0,0.35))` }}
          initial={{ width: 0 }}
          animate={{ width: `${confidence * 100}%` }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.25 }}
        />
      </div>
    </div>
  )
}

// ─── Score breakdown ──────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BreakdownTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null
  const item = payload[0]
  return (
    <div
      className="border px-3 py-2 font-mono text-[10px]"
      style={{
        background: "#0a0a0a",
        borderColor: "rgba(255,255,255,0.15)",
        color: "rgba(255,255,255,0.85)",
      }}
    >
      {item.payload.name}&nbsp;&nbsp;{(item.value * 100).toFixed(0)}%
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ValueLabel = ({ x, y, width, value, height }: any) => (
  <text
    x={x + width + 7}
    y={y + height / 2}
    dominantBaseline="middle"
    fill="rgba(255,255,255,0.65)"
    fontSize={9}
    fontFamily="IBM Plex Mono, monospace"
  >
    {(value * 100).toFixed(0)}
  </text>
)

function ScoreBreakdown({ scores }: { scores: { key: string; val: number }[] }) {
  const data = scores.map(s => ({ name: s.key, value: s.val }))
  const h    = scores.length * 32 + 12

  return (
    <ResponsiveContainer width="100%" height={h}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 44, left: 0, bottom: 0 }}
        barSize={7}
        barCategoryGap={14}
      >
        <XAxis type="number" domain={[0, 1]} hide />
        <YAxis
          type="category"
          dataKey="name"
          width={76}
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "rgba(255,255,255,0.5)",
            fontSize: 8,
            fontFamily: "IBM Plex Mono, monospace",
            letterSpacing: "0.08em",
          }}
          tickFormatter={(v: string) => v.toUpperCase()}
        />
        <Tooltip
          content={<BreakdownTooltip />}
          cursor={{ fill: "rgba(255,255,255,0.025)" }}
        />
        <Bar
          dataKey="value"
          background={{ fill: C_TRACK, radius: 0 }}
          radius={0}
          isAnimationActive
          animationBegin={150}
          animationDuration={900}
          animationEasing="ease-out"
          label={<ValueLabel />}
        >
          {data.map((item, i) => (
            <Cell
              key={i}
              fill={`rgba(232,117,0,${0.45 + item.value * 0.55})`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// ─── Prediction block ─────────────────────────────────────────────────────────

const SAFE = new Set(["safe", "clean", "ham", "real (bonafide)"])

function PredictionBlock({ label, type }: { label: string | null; type: string | null }) {
  const raw = label ?? type
  if (!raw) return null

  const isSafe = SAFE.has(raw.toLowerCase())
  const color  = isSafe ? C_GREEN : C_ORANGE

  return (
    <div className="border px-4 py-3" style={{ borderColor: `${color}22` }}>
      <p className="font-mono text-[8px] uppercase tracking-[0.3em] mb-1.5"
        style={{ color: "rgba(255,255,255,0.4)" }}>
        Classification
      </p>
      <p className="font-[var(--font-bebas)] text-[2.25rem] leading-none tracking-tight"
        style={{ color }}>
        {raw.toUpperCase()}
      </p>
    </div>
  )
}

// ─── Flag tags ─────────────────────────────────────────────────────────────────

function FlagTags({ flags }: { flags: string[] }) {
  if (!flags.length) {
    return (
      <p className="font-mono text-[9px] uppercase tracking-[0.15em]"
        style={{ color: "rgba(255,255,255,0.28)" }}>
        No active threat indicators
      </p>
    )
  }
  return (
    <div className="flex flex-wrap gap-2">
      {flags.map((f, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.04, duration: 0.22 }}
          className="font-mono text-[9px] uppercase tracking-[0.12em] px-2.5 py-1"
          style={{
            border:     "1px solid rgba(232,117,0,0.38)",
            color:      "rgba(232,117,0,0.9)",
            background: "rgba(232,117,0,0.07)",
          }}
        >
          {f.replace(/_/g, " ")}
        </motion.span>
      ))}
    </div>
  )
}

// ─── Section divider ──────────────────────────────────────────────────────────

function PanelDivider() {
  return <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function ThreatVisualization({ data }: { data: AnalysisData }) {
  const d = useMemo(() => extract(data), [data])
  const hasChartData = d.riskScore !== null || d.confidence !== null || d.predLabel !== null || d.fraudType !== null
  if (!hasChartData && !d.subScores.length && !d.flags.length) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
      className="mt-5 overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.45em]"
          style={{ color: "rgba(255,255,255,0.5)" }}>
          Threat Visualization
        </span>
        <span className="font-mono text-[8px] uppercase tracking-[0.2em]"
          style={{ color: "rgba(232,117,0,0.6)" }}>
          Claude Intelligence Layer
        </span>
      </div>

      {/* Row 1: Donut + Prediction + Confidence */}
      {(d.riskScore !== null || d.confidence !== null || d.predLabel || d.fraudType) && (
        <>
          <div className="flex flex-col sm:flex-row"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>

            {d.riskScore !== null && (
              <div
                className="flex items-center justify-center px-6 py-6 shrink-0"
                style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}
              >
                <RiskDonut score={d.riskScore} />
              </div>
            )}

            <div className="flex-1 px-5 py-6 flex flex-col gap-5 justify-center">
              <PredictionBlock label={d.predLabel} type={d.fraudType} />
              {d.confidence !== null && <ConfidenceBar confidence={d.confidence} />}
            </div>
          </div>
        </>
      )}

      {/* Row 2: Score breakdown */}
      {d.subScores.length > 0 && (
        <>
          <PanelDivider />
          <div className="px-5 pt-5 pb-3">
            <p className="font-mono text-[8px] uppercase tracking-[0.4em] mb-4"
              style={{ color: "rgba(255,255,255,0.38)" }}>
              Score Breakdown
            </p>
            <ScoreBreakdown scores={d.subScores} />
          </div>
        </>
      )}

      {/* Row 3: Flags */}
      <PanelDivider />
      <div className="px-5 py-5">
        <p className="font-mono text-[8px] uppercase tracking-[0.4em] mb-3"
          style={{ color: "rgba(255,255,255,0.38)" }}>
          Active Signals [{d.flags.length}]
        </p>
        <FlagTags flags={d.flags} />
      </div>
    </motion.div>
  )
}
