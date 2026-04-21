import type { ReactNode } from 'react'
import Sidebar from './Sidebar'

interface Props {
  children: ReactNode
  title: string
  subtitle?: string
}

export default function Layout({ children, title, subtitle }: Props) {
  return (
    <div className="flex min-h-screen bg-[#0a0b10]">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen">
        <div className="border-b border-slate-800 bg-[#0d0e16] px-8 py-5">
          <h1 className="text-xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
