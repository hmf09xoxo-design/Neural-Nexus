"use client"

import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { BitmapChevron } from "@/components/bitmap-chevron"
import { AnimatedNoise } from "@/components/animated-noise"
import { ThreatVisualization } from "@/components/AnalysisCharts"
import gsap from "gsap"
import { analyzeSms } from "@/lib/api/sms"
import { analyzeEmail } from "@/lib/api/email"
import { analyzeUrl } from "@/lib/api/url"
import { analyzeVoice } from "@/lib/api/voice"
import { analyzeAttachment } from "@/lib/api/attachment"
import { AnalysisResult, type AnalysisData } from "@/components/AnalysisResult"

// ─── Input style ──────────────────────────────────────────────────────────────

const INPUT_CLS =
  "bg-transparent border-t-0 border-l-0 border-r-0 border-b border-white/20 rounded-none h-14 px-0 font-mono text-sm focus-visible:ring-0 focus-visible:border-accent transition-all duration-400 placeholder:text-white/30 text-white/90"

// ─── Error block ──────────────────────────────────────────────────────────────

function ErrorBlock({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-red-500/40 px-5 py-4 mt-6 font-mono text-[10px] leading-relaxed"
      style={{ color: "rgba(239,68,68,0.9)" }}
    >
      <span className="uppercase tracking-[0.3em]" style={{ color: "rgba(239,68,68,0.6)" }}>
        Error //&nbsp;
      </span>
      {message}
    </motion.div>
  )
}

// ─── Scanning indicator ───────────────────────────────────────────────────────

function ScanningIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="mt-8 border px-6 py-6"
      style={{ borderColor: "rgba(232,117,0,0.25)" }}
    >
      <div className="flex items-center gap-5">
        <div className="flex items-end gap-[3px] h-5">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-[3px] bg-accent"
              animate={{ scaleY: [0.25, 1, 0.25] }}
              transition={{
                duration: 0.65,
                repeat: Infinity,
                delay: i * 0.09,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "bottom" }}
            />
          ))}
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em]"
            style={{ color: "rgba(232,117,0,0.85)" }}>
            Scanning Threat Vectors
          </p>
          <p className="font-mono text-[8px] tracking-[0.2em] mt-0.5"
            style={{ color: "rgba(255,255,255,0.35)" }}>
            Routing through intelligence mesh...
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Execute button ───────────────────────────────────────────────────────────

function ExecuteButton({
  onClick,
  loading,
  disabled,
}: {
  onClick: () => void
  loading: boolean
  disabled: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="group/btn relative inline-flex items-center gap-6 px-8 py-4 font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-300 disabled:cursor-not-allowed active:scale-[0.98] overflow-hidden"
      style={{
        border: "1px solid rgba(255,255,255,0.22)",
        color: disabled || loading ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.85)",
      }}
    >
      {/* Hover fill */}
      <span
        className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "rgba(232,117,0,0.07)", borderColor: "transparent" }}
      />
      <span
        className="absolute inset-0 border opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ borderColor: "rgba(232,117,0,0.7)" }}
      />

      <ScrambleTextOnHover
        text={loading ? "Processing..." : "Execute Analysis"}
        as="span"
        duration={0.5}
        className="relative group-hover/btn:text-accent transition-colors duration-300"
      />
      <BitmapChevron className="relative transition-all duration-500 ease-in-out group-hover/btn:rotate-45 group-hover/btn:text-accent" />
    </button>
  )
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({
  index,
  title,
  description,
}: {
  index: string
  title: string
  description: string
}) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-4 mb-6">
        <span
          className="font-mono text-[10px] px-2 py-1 shrink-0"
          style={{
            color: "rgba(232,117,0,0.9)",
            border: "1px solid rgba(232,117,0,0.35)",
          }}
        >
          {index}
        </span>
        <h2 className="font-[var(--font-bebas)] text-4xl md:text-5xl tracking-tight text-white group-hover:text-accent transition-colors duration-300">
          {title}
        </h2>
      </div>
      <p className="font-mono text-xs leading-relaxed max-w-sm"
        style={{ color: "rgba(255,255,255,0.6)" }}>
        {description}
      </p>
    </div>
  )
}

// ─── File input ───────────────────────────────────────────────────────────────

function FileInputRow({
  file,
  placeholder,
  accept,
  onFile,
}: {
  file: File | null
  placeholder: string
  accept?: string
  onFile: (f: File | null) => void
}) {
  return (
    <div className="relative" style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
      <label className="flex items-center h-14 px-0 font-mono text-sm cursor-pointer">
        <input
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
        {file ? (
          <span style={{ color: "rgba(232,117,0,0.9)" }}>{file.name}</span>
        ) : (
          <span style={{ color: "rgba(255,255,255,0.3)" }}>{placeholder}</span>
        )}
      </label>
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
    </div>
  )
}

// ─── Analytics: session threat level ─────────────────────────────────────────

function sessionLevel(threats: number, total: number): {
  label: string
  color: string
} {
  if (total === 0) return { label: "NOMINAL",  color: "rgba(255,255,255,0.4)" }
  if (threats === 0) return { label: "NOMINAL", color: "#22c55e" }
  const r = threats / total
  if (r < 0.4)  return { label: "ELEVATED",  color: "#e87500" }
  if (r < 0.85) return { label: "HIGH",      color: "#f97316" }
  return            { label: "CRITICAL",  color: "#ef4444" }
}

// ─── Analytics strip ──────────────────────────────────────────────────────────

function AnalyticsStrip({
  analysisCount,
  threatCount,
  cleanCount,
  channelStates,
}: {
  analysisCount: number
  threatCount:   number
  cleanCount:    number
  channelStates: { label: string; done: boolean; scanning: boolean }[]
}) {
  const level = sessionLevel(threatCount, analysisCount)

  const stats = [
    {
      label: "Engines Online",
      value: "5 / 5",
      sub:   "All channels active",
      accent: false,
    },
    {
      label: "Models Active",
      value: "3",
      sub:   "NLP · BiLSTM · Claude LLM",
      accent: true,
    },
    {
      label: "Session Scans",
      value: analysisCount === 0 ? "—" : String(analysisCount),
      sub:   analysisCount === 0
        ? "Awaiting first scan"
        : `${threatCount} threat · ${cleanCount} clean`,
      accent: false,
    },
    {
      label: "Detection Rate",
      value: "99.2%",
      sub:   "30-day baseline",
      accent: false,
    },
    {
      label: "Avg Latency",
      value: "340ms",
      sub:   "Mesh efficiency",
      accent: false,
    },
  ]

  return (
    <div
      className="mb-12 overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.12)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.45em]"
            style={{ color: "rgba(255,255,255,0.55)" }}>
            System Intelligence
          </span>
          <span className="h-px w-12" style={{ background: "rgba(255,255,255,0.1)" }} />
          <span className="font-mono text-[8px] uppercase tracking-[0.3em] flex items-center gap-1.5"
            style={{ color: "rgba(232,117,0,0.8)" }}>
            <motion.span
              className="inline-block w-1.5 h-1.5 bg-accent"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            Live
          </span>
        </div>

        {/* Session threat level */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[8px] uppercase tracking-[0.25em]"
            style={{ color: "rgba(255,255,255,0.35)" }}>
            Threat Level:
          </span>
          <span className="font-[var(--font-bebas)] text-base tracking-wide"
            style={{ color: level.color }}>
            {level.label}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div
        className="grid grid-cols-2 md:grid-cols-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        {stats.map(({ label, value, sub, accent }, i) => (
          <div
            key={label}
            className="px-5 py-5"
            style={{
              borderRight: i < 4 ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}
          >
            <p className="font-mono text-[8px] uppercase tracking-[0.35em] mb-2"
              style={{ color: "rgba(255,255,255,0.45)" }}>
              {label}
            </p>
            <p
              className="font-[var(--font-bebas)] text-3xl tracking-tight mb-1"
              style={{ color: accent ? "#e87500" : "rgba(255,255,255,0.95)" }}
            >
              {value}
            </p>
            <p className="font-mono text-[8px] tracking-[0.1em]"
              style={{ color: "rgba(255,255,255,0.38)" }}>
              {sub}
            </p>
          </div>
        ))}
      </div>

      {/* Channel status row */}
      <div className="px-5 py-4 flex flex-wrap gap-x-8 gap-y-3 items-center">
        <span className="font-mono text-[8px] uppercase tracking-[0.35em]"
          style={{ color: "rgba(255,255,255,0.35)" }}>
          Channels:
        </span>
        {channelStates.map(({ label, done, scanning }) => {
          const dotColor = scanning ? "#e87500"
            : done    ? "rgba(255,255,255,0.8)"
            : "rgba(255,255,255,0.2)"
          const txtColor = scanning ? "rgba(232,117,0,0.9)"
            : done    ? "rgba(255,255,255,0.75)"
            : "rgba(255,255,255,0.38)"
          const status   = scanning ? "scanning" : done ? "done" : "idle"

          return (
            <div key={label} className="flex items-center gap-2">
              <motion.span
                className="inline-block w-1.5 h-1.5"
                style={{ background: dotColor }}
                animate={scanning ? { opacity: [1, 0.2, 1] } : { opacity: 1 }}
                transition={{ duration: 0.8, repeat: scanning ? Infinity : 0 }}
              />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em]"
                style={{ color: txtColor }}>
                {label}
              </span>
              <span className="font-mono text-[7px] tracking-[0.15em] uppercase"
                style={{ color: "rgba(255,255,255,0.25)" }}>
                [{status}]
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const [smsText,      setSmsText]      = useState("")
  const [smsLoading,   setSmsLoading]   = useState(false)
  const [smsResult,    setSmsResult]    = useState<AnalysisData | null>(null)
  const [smsError,     setSmsError]     = useState<string | null>(null)

  const [emailSender,  setEmailSender]  = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody,    setEmailBody]    = useState("")
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailResult,  setEmailResult]  = useState<AnalysisData | null>(null)
  const [emailError,   setEmailError]   = useState<string | null>(null)

  const [urlValue,     setUrlValue]     = useState("")
  const [urlLoading,   setUrlLoading]   = useState(false)
  const [urlResult,    setUrlResult]    = useState<AnalysisData | null>(null)
  const [urlError,     setUrlError]     = useState<string | null>(null)

  const [voiceFile,    setVoiceFile]    = useState<File | null>(null)
  const [voiceLoading, setVoiceLoading] = useState(false)
  const [voiceResult,  setVoiceResult]  = useState<AnalysisData | null>(null)
  const [voiceError,   setVoiceError]   = useState<string | null>(null)

  const [attachFile,    setAttachFile]   = useState<File | null>(null)
  const [attachLoading, setAttachLoading] = useState(false)
  const [attachResult,  setAttachResult] = useState<AnalysisData | null>(null)
  const [attachError,   setAttachError]  = useState<string | null>(null)

  // ── Derived analytics ────────────────────────────────────────────────────

  const allResults = useMemo(
    () => [smsResult, emailResult, urlResult, voiceResult, attachResult],
    [smsResult, emailResult, urlResult, voiceResult, attachResult],
  )

  const analysisCount = allResults.filter(Boolean).length

  const threatCount = allResults.filter((r) => {
    if (!r) return false
    const s = typeof r.risk_score === "number" ? r.risk_score
      : typeof r.phishing_probability === "number" ? r.phishing_probability
      : 0
    return s > 0.3
  }).length

  const cleanCount = analysisCount - threatCount

  const channelStates = [
    { label: "SMS",   done: !!smsResult,    scanning: smsLoading    },
    { label: "Email", done: !!emailResult,  scanning: emailLoading  },
    { label: "URL",   done: !!urlResult,    scanning: urlLoading    },
    { label: "Voice", done: !!voiceResult,  scanning: voiceLoading  },
    { label: "File",  done: !!attachResult, scanning: attachLoading },
  ]

  // ── GSAP entrance ────────────────────────────────────────────────────────

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(".dashboard-section", {
        y: 48,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: "power3.out",
      })
      gsap.from(".dashboard-header", {
        x: -36,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
      })
      gsap.from(".analytics-panel", {
        y: 22,
        opacity: 0,
        duration: 0.65,
        delay: 0.35,
        ease: "power3.out",
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleSms = useCallback(async () => {
    if (!smsText.trim()) return
    setSmsLoading(true); setSmsResult(null); setSmsError(null)
    try {
      setSmsResult(await analyzeSms({ text: smsText, include_llm_explanation: false }))
    } catch (err: unknown) {
      setSmsError(err instanceof Error ? err.message : "Analysis failed")
    } finally { setSmsLoading(false) }
  }, [smsText])

  const handleEmail = useCallback(async () => {
    if (!emailSender.trim() || !emailBody.trim()) return
    setEmailLoading(true); setEmailResult(null); setEmailError(null)
    try {
      setEmailResult(await analyzeEmail({
        sender: emailSender, subject: emailSubject,
        body: emailBody, with_llm_explanation: false,
      }))
    } catch (err: unknown) {
      setEmailError(err instanceof Error ? err.message : "Analysis failed")
    } finally { setEmailLoading(false) }
  }, [emailSender, emailSubject, emailBody])

  const handleUrl = useCallback(async () => {
    if (!urlValue.trim()) return
    setUrlLoading(true); setUrlResult(null); setUrlError(null)
    try {
      setUrlResult(await analyzeUrl({ url: urlValue, with_llm_explanation: false }))
    } catch (err: unknown) {
      setUrlError(err instanceof Error ? err.message : "Analysis failed")
    } finally { setUrlLoading(false) }
  }, [urlValue])

  const handleVoice = useCallback(async () => {
    if (!voiceFile) return
    setVoiceLoading(true); setVoiceResult(null); setVoiceError(null)
    try {
      setVoiceResult(await analyzeVoice(voiceFile))
    } catch (err: unknown) {
      setVoiceError(err instanceof Error ? err.message : "Analysis failed")
    } finally { setVoiceLoading(false) }
  }, [voiceFile])

  const handleAttachment = useCallback(async () => {
    if (!attachFile) return
    setAttachLoading(true); setAttachResult(null); setAttachError(null)
    try {
      setAttachResult(await analyzeAttachment(attachFile, false))
    } catch (err: unknown) {
      setAttachError(err instanceof Error ? err.message : "Analysis failed")
    } finally { setAttachLoading(false) }
  }, [attachFile])

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen bg-background text-foreground selection:bg-accent selection:text-background"
    >
      <AnimatedNoise opacity={0.028} />

      {/* Grid */}
      <div className="grid-bg fixed inset-0 pointer-events-none" style={{ opacity: 0.22 }} aria-hidden="true" />

      {/* Scanlines */}
      <div className="scanlines fixed inset-0 pointer-events-none z-[9000]" aria-hidden="true" />

      {/* Ambient orange glow — bottom */}
      <div className="ambient-glow fixed bottom-0 left-0 right-0 h-[40vh] pointer-events-none z-0" aria-hidden="true" />

      {/* ── Nav ────────────────────────────────────────────────────────── */}
      <nav
        className="relative z-50 flex items-center justify-between px-6 py-5 md:px-12 backdrop-blur-md"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          background:   "rgba(0,0,0,0.6)",
        }}
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent font-bold">
            Rapid3
          </span>
          <span className="h-px w-8" style={{ background: "rgba(255,255,255,0.2)" }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em]"
            style={{ color: "rgba(255,255,255,0.65)" }}>
            Operative Interface
          </span>
        </div>
        <Link
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.3em] transition-colors duration-300 hover:text-accent"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Logout // Disconnect
        </Link>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:px-12 md:py-24">

        {/* ── Page header ────────────────────────────────────────────────── */}
        <header className="dashboard-header mb-16 max-w-2xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent block mb-4">
            Command Center
          </span>
          <h1 className="font-[var(--font-bebas)] text-7xl md:text-9xl tracking-tighter leading-[0.82] mb-8 text-white">
            DASHBOARD
          </h1>
          <p className="font-mono text-sm leading-relaxed max-w-md"
            style={{ color: "rgba(255,255,255,0.65)" }}>
            Active defensive layers are online. Deploy localized intelligence across multiple threat vectors.
          </p>
        </header>

        {/* ── Analytics panel ────────────────────────────────────────────── */}
        <div className="analytics-panel mb-20">
          <AnalyticsStrip
            analysisCount={analysisCount}
            threatCount={threatCount}
            cleanCount={cleanCount}
            channelStates={channelStates}
          />
        </div>

        {/* ── Analysis sections ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-28">

          {/* 01 SMS */}
          <section
            className="dashboard-section group relative"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="absolute left-0 top-0 w-px h-0 bg-accent transition-all duration-500 group-hover:h-full"
              style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
            />
            <div className="pl-6">
              <SectionHeader
                index="01"
                title="SMS Analysis"
                description="Detect phishing patterns and malicious intent in mobile communications."
              />
              <div className="space-y-6">
                <div className="relative">
                  <Input
                    value={smsText}
                    onChange={(e) => setSmsText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSms()}
                    placeholder="Enter SMS content for threat vectoring..."
                    className={INPUT_CLS}
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
                </div>
                <div className="flex justify-end">
                  <ExecuteButton onClick={handleSms} loading={smsLoading} disabled={!smsText.trim()} />
                </div>
                <AnimatePresence mode="wait">
                  {smsLoading && <ScanningIndicator key="loading" />}
                </AnimatePresence>
                {smsError && <ErrorBlock message={smsError} />}
                {smsResult && (
                  <>
                    <AnalysisResult data={smsResult} />
                    <ThreatVisualization data={smsResult} />
                  </>
                )}
              </div>
            </div>
          </section>

          {/* 02 Email */}
          <section
            className="dashboard-section group relative"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="absolute left-0 top-0 w-px h-0 bg-accent transition-all duration-500 group-hover:h-full"
              style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }} />
            <div className="pl-6">
              <SectionHeader
                index="02"
                title="Email Analysis"
                description="Deep packet inspection of SMTP artifacts and social engineering markers."
              />
              <div className="space-y-6">
                <div className="relative">
                  <Input
                    value={emailSender}
                    onChange={(e) => setEmailSender(e.target.value)}
                    placeholder="Sender address..."
                    className={INPUT_CLS}
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
                </div>
                <Input
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Subject line..."
                  className={INPUT_CLS}
                />
                <Input
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Paste email body or headers..."
                  className={INPUT_CLS}
                />
                <div className="flex justify-end">
                  <ExecuteButton
                    onClick={handleEmail}
                    loading={emailLoading}
                    disabled={!emailSender.trim() || !emailBody.trim()}
                  />
                </div>
                <AnimatePresence mode="wait">
                  {emailLoading && <ScanningIndicator key="loading" />}
                </AnimatePresence>
                {emailError && <ErrorBlock message={emailError} />}
                {emailResult && (
                  <>
                    <AnalysisResult data={emailResult} />
                    <ThreatVisualization data={emailResult} />
                  </>
                )}
              </div>
            </div>
          </section>

          {/* 03 URL */}
          <section
            className="dashboard-section group relative"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="absolute left-0 top-0 w-px h-0 bg-accent transition-all duration-500 group-hover:h-full"
              style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }} />
            <div className="pl-6">
              <SectionHeader
                index="03"
                title="URL Analysis"
                description="Real-time domain reputation and recursive redirect tracing."
              />
              <div className="space-y-6">
                <div className="relative">
                  <Input
                    value={urlValue}
                    onChange={(e) => setUrlValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleUrl()}
                    placeholder="https://"
                    className={INPUT_CLS}
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
                </div>
                <div className="flex justify-end">
                  <ExecuteButton onClick={handleUrl} loading={urlLoading} disabled={!urlValue.trim()} />
                </div>
                <AnimatePresence mode="wait">
                  {urlLoading && <ScanningIndicator key="loading" />}
                </AnimatePresence>
                {urlError && <ErrorBlock message={urlError} />}
                {urlResult && (
                  <>
                    <AnalysisResult data={urlResult} />
                    <ThreatVisualization data={urlResult} />
                  </>
                )}
              </div>
            </div>
          </section>

          {/* 04 Voice */}
          <section
            className="dashboard-section group relative"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="absolute left-0 top-0 w-px h-0 bg-accent transition-all duration-500 group-hover:h-full"
              style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }} />
            <div className="pl-6">
              <SectionHeader
                index="04"
                title="Voice Analysis"
                description="ResNetBiLSTM analysis for synthetic voice and deepfake detection."
              />
              <div className="space-y-6">
                <FileInputRow
                  file={voiceFile}
                  placeholder="Upload audio sample..."
                  accept="audio/*"
                  onFile={(f) => { setVoiceFile(f); setVoiceResult(null); setVoiceError(null) }}
                />
                <div className="flex justify-end">
                  <ExecuteButton onClick={handleVoice} loading={voiceLoading} disabled={!voiceFile} />
                </div>
                <AnimatePresence mode="wait">
                  {voiceLoading && <ScanningIndicator key="loading" />}
                </AnimatePresence>
                {voiceError && <ErrorBlock message={voiceError} />}
                {voiceResult && (
                  <>
                    <AnalysisResult data={voiceResult} />
                    <ThreatVisualization data={voiceResult} />
                  </>
                )}
              </div>
            </div>
          </section>

          {/* 05 File */}
          <section
            className="dashboard-section group relative"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="absolute left-0 top-0 w-px h-0 bg-accent transition-all duration-500 group-hover:h-full"
              style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }} />
            <div className="pl-6">
              <SectionHeader
                index="05"
                title="File Analysis"
                description="YARA-based signature matching and behavioral sandbox analysis."
              />
              <div className="space-y-6">
                <FileInputRow
                  file={attachFile}
                  placeholder="Select artifact for scanning..."
                  onFile={(f) => { setAttachFile(f); setAttachResult(null); setAttachError(null) }}
                />
                <div className="flex justify-end">
                  <ExecuteButton onClick={handleAttachment} loading={attachLoading} disabled={!attachFile} />
                </div>
                <AnimatePresence mode="wait">
                  {attachLoading && <ScanningIndicator key="loading" />}
                </AnimatePresence>
                {attachError && <ErrorBlock message={attachError} />}
                {attachResult && (
                  <>
                    <AnalysisResult data={attachResult} />
                    <ThreatVisualization data={attachResult} />
                  </>
                )}
              </div>
            </div>
          </section>

        </div>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <footer
          className="mt-48 pt-10 flex flex-col md:flex-row justify-between gap-8 font-mono text-[9px] uppercase tracking-[0.4em]"
          style={{
            borderTop:  "1px solid rgba(255,255,255,0.12)",
            color:      "rgba(255,255,255,0.45)",
          }}
        >
          <div className="flex gap-8">
            <span>Uptime: 99.9997%</span>
            <span>Latency: 12ms</span>
            <span>Nodes: Active [32]</span>
          </div>
          <div className="flex gap-8">
            <span>SECURE_SESSION: RF-9021</span>
            <span>ENCRYPTION: AES-256-GCM</span>
          </div>
        </footer>
      </div>

      {/* ── Floating tag ───────────────────────────────────────────────── */}
      <div className="fixed bottom-10 right-10 hidden xl:block z-50">
        <div
          className="px-5 py-3 font-mono text-[9px] uppercase tracking-[0.3em] backdrop-blur-md"
          style={{
            border:     "1px solid rgba(255,255,255,0.15)",
            color:      "rgba(255,255,255,0.5)",
            background: "rgba(0,0,0,0.4)",
          }}
        >
          INTERFACE_V02 // DEFENSIVE_STATE
        </div>
      </div>
    </main>
  )
}
