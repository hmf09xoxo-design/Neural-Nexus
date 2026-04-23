import { NavLink } from 'react-router-dom'
import {
  ShieldCheck, LayoutDashboard, MessageSquare, Mail,
  Link2, Mic, Paperclip, Key, LogOut, ChevronRight,
} from 'lucide-react'
import clsx from 'clsx'
import { useAuth } from '../contexts/AuthContext'

const nav = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/sms', icon: MessageSquare, label: 'SMS Analysis' },
  { to: '/email', icon: Mail, label: 'Email Analysis' },
  { to: '/url', icon: Link2, label: 'URL Shield' },
  { to: '/voice', icon: Mic, label: 'Voice Deepfake' },
  { to: '/attachment', icon: Paperclip, label: 'File Scan' },
  { to: '/api-keys', icon: Key, label: 'API Keys' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0d0e16] border-r border-slate-800 flex flex-col z-40">
      {/* Brand */}
      <div className="px-5 py-5 flex items-center gap-3 border-b border-slate-800">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-900/40">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-white text-sm leading-none">HMF Shield</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Deepfake & Phishing Guard</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group',
                isActive
                  ? 'bg-violet-600/20 text-violet-300 shadow-sm shadow-violet-900/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={clsx('w-4 h-4 flex-shrink-0', isActive ? 'text-violet-400' : 'text-slate-500 group-hover:text-slate-300')} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-violet-400/60" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 pb-4 border-t border-slate-800 pt-3">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/40">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {(user?.full_name ?? user?.email ?? 'U')[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-slate-200 text-xs font-medium truncate">{user?.full_name ?? user?.email ?? 'User'}</p>
            <p className="text-slate-500 text-[10px] truncate">{user?.email ?? ''}</p>
          </div>
          <button
            onClick={logout}
            className="p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
