"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SideNav } from "@/components/side-nav"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { BitmapChevron } from "@/components/bitmap-chevron"

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated authentication clearance
    router.push("/dashboard")
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6">
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />
      
      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-12">
          <h1 className="font-[var(--font-bebas)] text-5xl tracking-tight text-foreground uppercase">
            Authenticate
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-2">
            Access Defensive Intelligence
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Identifier (Email)
            </Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="user@neural-nexus.io"
              className="bg-transparent border-foreground/10 rounded-none h-12 font-mono text-sm focus-visible:border-accent focus-visible:ring-0 focus:border-accent"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Passcode
            </Label>
            <Input 
              id="password" 
              type="password" 
              className="bg-transparent border-foreground/10 rounded-none h-12 font-mono text-sm focus-visible:border-accent focus-visible:ring-0 focus:border-accent"
            />
          </div>

          <button
            type="submit"
            className="w-full group inline-flex items-center justify-between border border-foreground/20 px-6 py-4 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
          >
            <ScrambleTextOnHover text="Establish Connection" as="span" duration={0.6} />
            <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
          </button>
        </form>

        <div className="mt-12 pt-6 border-t border-border/40">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground text-center">
            New operative?{" "}
            <Link href="/signup" className="text-foreground hover:text-accent transition-colors">
              Request Access
            </Link>
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 hidden md:block">
        <div className="border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          SECURE_AUTH // V.01
        </div>
      </div>
    </main>
  )
}
