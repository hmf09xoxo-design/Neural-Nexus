"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-[9999]">
      <div className="grid-bg fixed inset-0 opacity-30 pointer-events-none" aria-hidden="true" />
      
      <div className="relative z-10 text-center">
        <div className="inline-block px-8 py-4 border border-foreground/10 bg-background/50 backdrop-blur-sm">
          <h2 className="font-mono text-sm tracking-[0.4em] text-foreground uppercase">
            INITIALIZING DEFENSE SYSTEM…
          </h2>
          <div className="mt-4 flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-1 bg-accent animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
        
        <div className="absolute top-full left-0 right-0 mt-4 overflow-hidden h-[1px]">
          <div className="h-full bg-accent animate-[scan_2s_ease-in-out_infinite]" />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
