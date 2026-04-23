"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { BitmapChevron } from "@/components/bitmap-chevron"
import { AnimatedNoise } from "@/components/animated-noise"
import gsap from "gsap"
import { analyzeSms } from "@/lib/api/sms"
import { analyzeEmail } from "@/lib/api/email"
import { analyzeUrl } from "@/lib/api/url"
import { analyzeVoice } from "@/lib/api/voice"
import { analyzeAttachment } from "@/lib/api/attachment"
import { AnalysisResult, type AnalysisData } from "@/components/AnalysisResult"

const INPUT_CLS =
  "bg-transparent border-t-0 border-l-0 border-r-0 border-b border-border/30 rounded-none h-14 px-0 font-mono text-sm focus-visible:ring-0 focus-visible:border-accent transition-all duration-500 placeholder:text-muted-foreground/30"

function ErrorBlock({ message }: { message: string }) {
  return (
    <div className="border border-destructive/25 px-5 py-4 mt-6 font-mono text-[10px] text-destructive/70 leading-relaxed">
      <span className="text-destructive/50 uppercase tracking-[0.3em]">Error // </span>
      {message}
    </div>
  )
}

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
      className="group/btn inline-flex items-center gap-6 border border-foreground/10 px-8 py-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground hover:border-accent hover:text-accent transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <ScrambleTextOnHover
        text={loading ? "Processing..." : "Execute Analysis"}
        as="span"
        duration={0.5}
      />
      <BitmapChevron className="transition-transform duration-500 ease-in-out group-hover/btn:rotate-45" />
    </button>
  )
}

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  // SMS
  const [smsText, setSmsText] = useState("")
  const [smsLoading, setSmsLoading] = useState(false)
  const [smsResult, setSmsResult] = useState<AnalysisData | null>(null)
  const [smsError, setSmsError] = useState<string | null>(null)

  // Email
  const [emailSender, setEmailSender] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailResult, setEmailResult] = useState<AnalysisData | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)

  // URL
  const [urlValue, setUrlValue] = useState("")
  const [urlLoading, setUrlLoading] = useState(false)
  const [urlResult, setUrlResult] = useState<AnalysisData | null>(null)
  const [urlError, setUrlError] = useState<string | null>(null)

  // Voice
  const [voiceFile, setVoiceFile] = useState<File | null>(null)
  const [voiceLoading, setVoiceLoading] = useState(false)
  const [voiceResult, setVoiceResult] = useState<AnalysisData | null>(null)
  const [voiceError, setVoiceError] = useState<string | null>(null)

  // Attachment
  const [attachFile, setAttachFile] = useState<File | null>(null)
  const [attachLoading, setAttachLoading] = useState(false)
  const [attachResult, setAttachResult] = useState<AnalysisData | null>(null)
  const [attachError, setAttachError] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(".dashboard-section", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      })
      gsap.from(".dashboard-header", {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const handleSms = useCallback(async () => {
    console.log("CLICK [SMS]")
    if (!smsText.trim()) return
    setSmsLoading(true)
    setSmsResult(null)
    setSmsError(null)
    const payload = { text: smsText, include_llm_explanation: false }
    console.log("REQUEST [SMS]:", payload)
    try {
      const result = await analyzeSms(payload)
      console.log("RESPONSE [SMS]:", result)
      setSmsResult(result)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Analysis failed"
      console.error("ERROR [SMS]:", err)
      setSmsError(msg)
    } finally {
      setSmsLoading(false)
    }
  }, [smsText])

  const handleEmail = useCallback(async () => {
    console.log("CLICK [Email]")
    if (!emailSender.trim() || !emailBody.trim()) return
    setEmailLoading(true)
    setEmailResult(null)
    setEmailError(null)
    const payload = {
      sender: emailSender,
      subject: emailSubject,
      body: emailBody,
      with_llm_explanation: false,
    }
    console.log("REQUEST [Email]:", payload)
    try {
      const result = await analyzeEmail(payload)
      console.log("RESPONSE [Email]:", result)
      setEmailResult(result)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Analysis failed"
      console.error("ERROR [Email]:", err)
      setEmailError(msg)
    } finally {
      setEmailLoading(false)
    }
  }, [emailSender, emailSubject, emailBody])

  const handleUrl = useCallback(async () => {
    console.log("CLICK [URL]")
    if (!urlValue.trim()) return
    setUrlLoading(true)
    setUrlResult(null)
    setUrlError(null)
    const payload = { url: urlValue, with_llm_explanation: false }
    console.log("REQUEST [URL]:", payload)
    try {
      const result = await analyzeUrl(payload)
      console.log("RESPONSE [URL]:", result)
      setUrlResult(result)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Analysis failed"
      console.error("ERROR [URL]:", err)
      setUrlError(msg)
    } finally {
      setUrlLoading(false)
    }
  }, [urlValue])

  const handleVoice = useCallback(async () => {
    console.log("CLICK [Voice]")
    if (!voiceFile) return
    setVoiceLoading(true)
    setVoiceResult(null)
    setVoiceError(null)
    console.log("REQUEST [Voice]:", { file: voiceFile.name, size: voiceFile.size })
    try {
      const result = await analyzeVoice(voiceFile)
      console.log("RESPONSE [Voice]:", result)
      setVoiceResult(result)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Analysis failed"
      console.error("ERROR [Voice]:", err)
      setVoiceError(msg)
    } finally {
      setVoiceLoading(false)
    }
  }, [voiceFile])

  const handleAttachment = useCallback(async () => {
    console.log("CLICK [Attachment]")
    if (!attachFile) return
    setAttachLoading(true)
    setAttachResult(null)
    setAttachError(null)
    console.log("REQUEST [Attachment]:", { file: attachFile.name, size: attachFile.size })
    try {
      const result = await analyzeAttachment(attachFile, false)
      console.log("RESPONSE [Attachment]:", result)
      setAttachResult(result)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Analysis failed"
      console.error("ERROR [Attachment]:", err)
      setAttachError(msg)
    } finally {
      setAttachLoading(false)
    }
  }, [attachFile])

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen bg-background text-foreground selection:bg-accent selection:text-background"
    >
      <AnimatedNoise opacity={0.02} />
      <div className="grid-bg fixed inset-0 opacity-20 pointer-events-none" aria-hidden="true" />

      {/* Top Nav */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 border-b border-border/10 backdrop-blur-md bg-background/40">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Rapid3</span>
          <span className="h-px w-8 bg-border/40" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Operative Interface
          </span>
        </div>
        <Link
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors"
        >
          Logout // Disconnect
        </Link>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:px-12 md:py-24">
        {/* Header */}
        <header className="dashboard-header mb-24 max-w-2xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent block mb-4">
            Command Center
          </span>
          <h1 className="font-[var(--font-bebas)] text-7xl md:text-9xl tracking-tighter leading-[0.8] mb-8">
            DASHBOARD
          </h1>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-md">
            Active defensive layers are online. Deploy localized intelligence across multiple threat vectors.
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-32">

          {/* 01 — SMS */}
          <section className="dashboard-section group relative">
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-mono text-[10px] text-accent border border-accent/20 px-2 py-1">01</span>
              <h2 className="font-[var(--font-bebas)] text-4xl md:text-5xl tracking-tight group-hover:text-accent transition-colors duration-300">
                SMS Analysis
              </h2>
            </div>
            <p className="font-mono text-xs text-muted-foreground mb-10 leading-relaxed max-w-sm">
              Detect phishing patterns and malicious intent in mobile communications.
            </p>
            <div className="space-y-6">
              <div className="relative">
                <Input
                  value={smsText}
                  onChange={(e) => setSmsText(e.target.value)}
                  placeholder="Enter SMS content for threat vectoring..."
                  className={INPUT_CLS}
                />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
              </div>
              <div className="flex justify-end">
                <ExecuteButton
                  onClick={handleSms}
                  loading={smsLoading}
                  disabled={!smsText.trim()}
                />
              </div>
              {smsError && <ErrorBlock message={smsError} />}
              {smsResult && <AnalysisResult data={smsResult} />}
            </div>
            <div className="absolute -inset-8 -z-10 bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
          </section>

          {/* 02 — Email */}
          <section className="dashboard-section group relative">
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-mono text-[10px] text-accent border border-accent/20 px-2 py-1">02</span>
              <h2 className="font-[var(--font-bebas)] text-4xl md:text-5xl tracking-tight group-hover:text-accent transition-colors duration-300">
                Email Analysis
              </h2>
            </div>
            <p className="font-mono text-xs text-muted-foreground mb-10 leading-relaxed max-w-sm">
              Deep packet inspection of SMTP artifacts and social engineering markers.
            </p>
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
              <div className="relative">
                <Input
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Subject line..."
                  className={INPUT_CLS}
                />
              </div>
              <div className="relative">
                <Input
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Paste email body or headers..."
                  className={INPUT_CLS}
                />
              </div>
              <div className="flex justify-end">
                <ExecuteButton
                  onClick={handleEmail}
                  loading={emailLoading}
                  disabled={!emailSender.trim() || !emailBody.trim()}
                />
              </div>
              {emailError && <ErrorBlock message={emailError} />}
              {emailResult && <AnalysisResult data={emailResult} />}
            </div>
            <div className="absolute -inset-8 -z-10 bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
          </section>

          {/* 03 — URL */}
          <section className="dashboard-section group relative">
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-mono text-[10px] text-accent border border-accent/20 px-2 py-1">03</span>
              <h2 className="font-[var(--font-bebas)] text-4xl md:text-5xl tracking-tight group-hover:text-accent transition-colors duration-300">
                URL Analysis
              </h2>
            </div>
            <p className="font-mono text-xs text-muted-foreground mb-10 leading-relaxed max-w-sm">
              Real-time domain reputation and recursive redirect tracing.
            </p>
            <div className="space-y-6">
              <div className="relative">
                <Input
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.target.value)}
                  placeholder="https://"
                  className={INPUT_CLS}
                />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
              </div>
              <div className="flex justify-end">
                <ExecuteButton
                  onClick={handleUrl}
                  loading={urlLoading}
                  disabled={!urlValue.trim()}
                />
              </div>
              {urlError && <ErrorBlock message={urlError} />}
              {urlResult && <AnalysisResult data={urlResult} />}
            </div>
            <div className="absolute -inset-8 -z-10 bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
          </section>

          {/* 04 — Voice */}
          <section className="dashboard-section group relative">
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-mono text-[10px] text-accent border border-accent/20 px-2 py-1">04</span>
              <h2 className="font-[var(--font-bebas)] text-4xl md:text-5xl tracking-tight group-hover:text-accent transition-colors duration-300">
                Voice Analysis
              </h2>
            </div>
            <p className="font-mono text-xs text-muted-foreground mb-10 leading-relaxed max-w-sm">
              ResNetBiLSTM analysis for synthetic voice and deepfake detection.
            </p>
            <div className="space-y-6">
              <div className="relative border-b border-border/30">
                <label className="flex items-center h-14 px-0 font-mono text-sm cursor-pointer">
                  <input
                    type="file"
                    accept="audio/*"
                    className="sr-only"
                    onChange={(e) => {
                      const f = e.target.files?.[0] ?? null
                      setVoiceFile(f)
                      setVoiceResult(null)
                      setVoiceError(null)
                    }}
                  />
                  {voiceFile ? (
                    <span className="text-accent/70">{voiceFile.name}</span>
                  ) : (
                    <span className="text-muted-foreground/30">Upload audio sample...</span>
                  )}
                </label>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
              </div>
              <div className="flex justify-end">
                <ExecuteButton
                  onClick={handleVoice}
                  loading={voiceLoading}
                  disabled={!voiceFile}
                />
              </div>
              {voiceError && <ErrorBlock message={voiceError} />}
              {voiceResult && <AnalysisResult data={voiceResult} />}
            </div>
            <div className="absolute -inset-8 -z-10 bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
          </section>

          {/* 05 — Attachment */}
          <section className="dashboard-section group relative">
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-mono text-[10px] text-accent border border-accent/20 px-2 py-1">05</span>
              <h2 className="font-[var(--font-bebas)] text-4xl md:text-5xl tracking-tight group-hover:text-accent transition-colors duration-300">
                File Analysis
              </h2>
            </div>
            <p className="font-mono text-xs text-muted-foreground mb-10 leading-relaxed max-w-sm">
              YARA-based signature matching and behavioral sandbox analysis.
            </p>
            <div className="space-y-6">
              <div className="relative border-b border-border/30">
                <label className="flex items-center h-14 px-0 font-mono text-sm cursor-pointer">
                  <input
                    type="file"
                    className="sr-only"
                    onChange={(e) => {
                      const f = e.target.files?.[0] ?? null
                      setAttachFile(f)
                      setAttachResult(null)
                      setAttachError(null)
                    }}
                  />
                  {attachFile ? (
                    <span className="text-accent/70">{attachFile.name}</span>
                  ) : (
                    <span className="text-muted-foreground/30">Select artifact for scanning...</span>
                  )}
                </label>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
              </div>
              <div className="flex justify-end">
                <ExecuteButton
                  onClick={handleAttachment}
                  loading={attachLoading}
                  disabled={!attachFile}
                />
              </div>
              {attachError && <ErrorBlock message={attachError} />}
              {attachResult && <AnalysisResult data={attachResult} />}
            </div>
            <div className="absolute -inset-8 -z-10 bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
          </section>

        </div>

        {/* Footer */}
        <footer className="mt-48 pt-12 border-t border-border/10 flex flex-col md:flex-row justify-between gap-8 font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground/40">
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

      {/* Floating Tag */}
      <div className="fixed bottom-12 right-12 hidden xl:block z-50">
        <div className="border border-border/30 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground backdrop-blur-md bg-background/20">
          INTERFACE_V01 // DEFENSIVE_STATE
        </div>
      </div>
    </main>
  )
}
