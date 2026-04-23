"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { BitmapChevron } from "@/components/bitmap-chevron"
import { AnimatedNoise } from "@/components/animated-noise"
import gsap from "gsap"

const sections = [
  {
    id: "sms",
    num: "01",
    title: "SMS Analysis",
    placeholder: "Enter SMS content for threat vectoring...",
    description: "Detect phishing patterns and malicious intent in mobile communications.",
  },
  {
    id: "email",
    num: "02",
    title: "Email Analysis",
    placeholder: "Paste email headers or body...",
    description: "Deep packet inspection of SMTP artifacts and social engineering markers.",
  },
  {
    id: "url",
    num: "03",
    title: "URL Analysis",
    placeholder: "https://",
    description: "Real-time domain reputation and recursive redirect tracing.",
  },
  {
    id: "voice",
    num: "04",
    title: "Voice Analysis",
    placeholder: "Upload audio sample path...",
    description: "ResNetBiLSTM analysis for synthetic voice and deepfake detection.",
  },
  {
    id: "attachment",
    num: "05",
    title: "File Analysis",
    placeholder: "Select artifact for scanning...",
    description: "YARA-based signature matching and behavioral sandbox analysis.",
  },
]

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null)

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

  return (
    <main ref={containerRef} className="relative min-h-screen bg-background text-foreground selection:bg-accent selection:text-background">
      <AnimatedNoise opacity={0.02} />
      <div className="grid-bg fixed inset-0 opacity-20 pointer-events-none" aria-hidden="true" />

      {/* Minimal Top Nav */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 border-b border-border/10 backdrop-blur-md bg-background/40">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Rapid3</span>
          <span className="h-px w-8 bg-border/40" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Operative Interface</span>
        </div>
        <Link 
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors"
        >
          Logout // Disconnect
        </Link>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:px-12 md:py-24">
        {/* Header Area */}
        <header className="dashboard-header mb-24 max-w-2xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent block mb-4">Command Center</span>
          <h1 className="font-[var(--font-bebas)] text-7xl md:text-9xl tracking-tighter leading-[0.8] mb-8">
            DASHBOARD
          </h1>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-md">
            Active defensive layers are online. Deploy localized intelligence across multiple threat vectors.
          </p>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-32">
          {sections.map((section) => (
            <section key={section.id} className="dashboard-section group relative">
              {/* Section Index */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-mono text-[10px] text-accent border border-accent/20 px-2 py-1">
                  {section.num}
                </span>
                <h2 className="font-[var(--font-bebas)] text-4xl md:text-5xl tracking-tight group-hover:text-accent transition-colors duration-300">
                  {section.title}
                </h2>
              </div>

              {/* Description */}
              <p className="font-mono text-xs text-muted-foreground mb-10 leading-relaxed max-w-sm">
                {section.description}
              </p>

              {/* Action Area */}
              <div className="space-y-6">
                <div className="relative">
                  <Input 
                    placeholder={section.placeholder}
                    className="bg-transparent border-t-0 border-l-0 border-r-0 border-b border-border/30 rounded-none h-14 px-0 font-mono text-sm focus-visible:ring-0 focus-visible:border-accent transition-all duration-500 placeholder:text-muted-foreground/30"
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
                </div>
                
                <div className="flex justify-end">
                  <button className="group/btn inline-flex items-center gap-6 border border-foreground/10 px-8 py-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground hover:border-accent hover:text-accent transition-all duration-300">
                    <ScrambleTextOnHover text="Execute Analysis" as="span" duration={0.5} />
                    <BitmapChevron className="transition-transform duration-500 ease-in-out group-hover/btn:rotate-45" />
                  </button>
                </div>
              </div>

              {/* Background Accent */}
              <div className="absolute -inset-8 -z-10 bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
            </section>
          ))}
        </div>

        {/* System Status Footer */}
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

      {/* Floating Info Tag */}
      <div className="fixed bottom-12 right-12 hidden xl:block z-50">
        <div className="border border-border/30 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground backdrop-blur-md bg-background/20">
          INTERFACE_V01 // DEFENSIVE_STATE
        </div>
      </div>
    </main>
  )
}
