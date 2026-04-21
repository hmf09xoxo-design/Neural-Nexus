import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Key, Plus, Eye, EyeOff, Copy, Check } from 'lucide-react'
import Layout from '../components/Layout'
import Spinner from '../components/Spinner'
import { apiKeysApi } from '../api/apikeys'
import type { ApiKey } from '../types'

export default function ApiKeys() {
  const [label, setLabel] = useState('')
  const [revealed, setRevealed] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState<string | null>(null)
  const qc = useQueryClient()

  const { data: keys, isLoading } = useQuery({
    queryKey: ['api-keys'],
    queryFn: () => apiKeysApi.list().then((r) => r.data),
  })

  const create = useMutation({
    mutationFn: () => apiKeysApi.request(label || undefined),
    onSuccess: () => {
      setLabel('')
      qc.invalidateQueries({ queryKey: ['api-keys'] })
    },
  })

  const reveal = async (key_id: string) => {
    if (revealed[key_id]) {
      setRevealed((p) => { const n = { ...p }; delete n[key_id]; return n })
      return
    }
    const r = await apiKeysApi.reveal(key_id)
    setRevealed((p) => ({ ...p, [key_id]: r.data.key }))
  }

  const copy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const daysLeft = (expiresAt: string) => {
    const diff = new Date(expiresAt).getTime() - Date.now()
    return Math.max(0, Math.floor(diff / 86400000))
  }

  return (
    <Layout title="API Keys" subtitle="Manage your HMF Shield API credentials (90-day expiry)">
      {/* Create */}
      <div className="bg-[#0d0e16] border border-slate-800 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Key className="w-4 h-4 text-violet-400" />
          <h2 className="text-sm font-semibold text-white">Create New Key</h2>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Key label (optional)"
            className="flex-1 bg-slate-800/60 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
          />
          <button
            onClick={() => create.mutate()}
            disabled={create.isPending}
            className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors flex items-center gap-2"
          >
            {create.isPending ? <Spinner className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {create.isPending ? 'Creating…' : 'Create Key'}
          </button>
        </div>
        {create.isSuccess && create.data && (
          <div className="mt-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-emerald-400 font-semibold">Key created — copy it now, it won't show again</p>
            </div>
          </div>
        )}
      </div>

      {/* Keys list */}
      <div className="bg-[#0d0e16] border border-slate-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-white mb-4">Your API Keys</h2>
        {isLoading ? (
          <div className="flex justify-center py-8"><Spinner /></div>
        ) : Array.isArray(keys) && keys.length > 0 ? (
          <div className="space-y-3">
            {keys.map((k: ApiKey) => {
              const days = daysLeft(k.expires_at)
              return (
                <div key={k.key_id} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {k.label && (
                        <p className="text-xs font-semibold text-white mb-1">{k.label}</p>
                      )}
                      <div className="flex items-center gap-2">
                        <code className="text-xs text-violet-300 font-mono bg-slate-800 px-2 py-1 rounded break-all">
                          {revealed[k.key_id] ?? k.masked_key}
                        </code>
                        <button
                          onClick={() => reveal(k.key_id)}
                          className="p-1.5 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-700 transition-colors flex-shrink-0"
                          title={revealed[k.key_id] ? 'Hide' : 'Reveal'}
                        >
                          {revealed[k.key_id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        {revealed[k.key_id] && (
                          <button
                            onClick={() => copy(revealed[k.key_id], k.key_id)}
                            className="p-1.5 rounded text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors flex-shrink-0"
                            title="Copy"
                          >
                            {copied === k.key_id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`text-xs font-medium ${days > 14 ? 'text-emerald-400' : days > 3 ? 'text-amber-400' : 'text-red-400'}`}>
                        {days}d left
                      </span>
                      <p className="text-[10px] text-slate-600 mt-0.5">
                        Created {new Date(k.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-600 text-sm">No API keys yet. Create one above.</div>
        )}
      </div>
    </Layout>
  )
}
