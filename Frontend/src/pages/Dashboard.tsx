import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck, MessageSquare, Mail, Link2, Mic,
  Paperclip, TrendingUp, AlertTriangle, CheckCircle2, Activity,
} from 'lucide-react'
import Layout from '../components/Layout'
import { textApi } from '../api/text'
import { urlApi } from '../api/url'
import { voiceApi } from '../api/voice'
import { attachmentApi } from '../api/attachment'

interface Stats {
  sms: number
  email: number
  url: number
  voice: number
  attachment: number
}

const modules = [
  {
    to: '/sms',
    icon: MessageSquare,
    label: 'SMS Analysis',
    desc: 'Detect phishing SMS & smishing attacks',
    color: 'from-blue-600 to-blue-700',
    glow: 'shadow-blue-900/30',
    key: 'sms' as keyof Stats,
  },
  {
    to: '/email',
    icon: Mail,
    label: 'Email Analysis',
    desc: 'Identify phishing emails & malicious senders',
    color: 'from-indigo-600 to-indigo-700',
    glow: 'shadow-indigo-900/30',
    key: 'email' as keyof Stats,
  },
  {
    to: '/url',
    icon: Link2,
    label: 'URL Shield',
    desc: 'Real-time phishing URL detection & sandbox',
    color: 'from-violet-600 to-violet-700',
    glow: 'shadow-violet-900/30',
    key: 'url' as keyof Stats,
  },
  {
    to: '/voice',
    icon: Mic,
    label: 'Voice Deepfake',
    desc: 'ResNetBiLSTM deepfake voice detection',
    color: 'from-purple-600 to-purple-700',
    glow: 'shadow-purple-900/30',
    key: 'voice' as keyof Stats,
  },
  {
    to: '/attachment',
    icon: Paperclip,
    label: 'File Scan',
    desc: 'YARA + ClamAV + ML malware detection',
    color: 'from-fuchsia-600 to-fuchsia-700',
    glow: 'shadow-fuchsia-900/30',
    key: 'attachment' as keyof Stats,
  },
]

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ sms: 0, email: 0, url: 0, voice: 0, attachment: 0 })

  useEffect(() => {
    const load = async () => {
      const results = await Promise.allSettled([
        textApi.smsHistory(),
        textApi.emailHistory(),
        urlApi.history(),
        voiceApi.history(),
        attachmentApi.history(),
      ])
      const get = (r: PromiseSettledResult<{ data: unknown[] }>) =>
        r.status === 'fulfilled' ? (Array.isArray(r.value.data) ? r.value.data.length : 0) : 0
      setStats({
        sms: get(results[0] as PromiseSettledResult<{ data: unknown[] }>),
        email: get(results[1] as PromiseSettledResult<{ data: unknown[] }>),
        url: get(results[2] as PromiseSettledResult<{ data: unknown[] }>),
        voice: get(results[3] as PromiseSettledResult<{ data: unknown[] }>),
        attachment: get(results[4] as PromiseSettledResult<{ data: unknown[] }>),
      })
    }
    load()
  }, [])

  const total = Object.values(stats).reduce((a, b) => a + b, 0)

  return (
    <Layout title="Dashboard" subtitle="Real-time threat intelligence overview">
      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Scans', value: total, icon: Activity, color: 'text-violet-400' },
          { label: 'Protected Users', value: 1, icon: ShieldCheck, color: 'text-emerald-400' },
          { label: 'Threats Detected', value: 0, icon: AlertTriangle, color: 'text-red-400' },
          { label: 'Safe Results', value: total, icon: CheckCircle2, color: 'text-emerald-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#0d0e16] border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{label}</p>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Module cards */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-slate-500" />
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Detection Modules</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {modules.map(({ to, icon: Icon, label, desc, color, glow, key }) => (
            <Link
              key={to}
              to={to}
              className="group bg-[#0d0e16] border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} shadow-lg ${glow} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-xs text-slate-500">{stats[key]} scans</span>
                <span className="text-xs text-violet-400 font-medium group-hover:text-violet-300">
                  Open →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-violet-600/10 border border-violet-500/20 rounded-xl p-5 flex items-start gap-4">
        <ShieldCheck className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-violet-300">Multi-layer Protection Active</p>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            HMF Shield combines ML models (ResNetBiLSTM, Transformers, LightGBM), vector similarity search (Pinecone),
            local LLM reasoning (Ollama/phi3), and cloud inference (Gemini 2.0 Flash) to detect deepfakes and phishing in real-time.
          </p>
        </div>
      </div>
    </Layout>
  )
}
