import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link2, Trash2, Search, Globe, ShieldAlert, CheckCircle2 } from 'lucide-react'
import Layout from '../components/Layout'
import ThreatBadge from '../components/ThreatBadge'
import RiskMeter from '../components/RiskMeter'
import Spinner from '../components/Spinner'
import { urlApi } from '../api/url'
import type { UrlAnalysisResult } from '../types'

export default function UrlAnalysis() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<UrlAnalysisResult | null>(null)
  const qc = useQueryClient()

  const { data: history, isLoading: histLoading } = useQuery({
    queryKey: ['url-history'],
    queryFn: () => urlApi.history().then((r) => r.data),
  })

  const analyze = useMutation({
    mutationFn: () => urlApi.analyze(url),
    onSuccess: (r) => {
      setResult(r.data)
      qc.invalidateQueries({ queryKey: ['url-history'] })
    },
  })

  const clear = useMutation({
    mutationFn: urlApi.clearHistory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['url-history'] }),
  })

  const del = useMutation({
    mutationFn: (id: string) => urlApi.deleteHistory(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['url-history'] }),
  })

  return (
    <Layout title="URL Shield" subtitle="4-phase phishing URL analysis: lexical, TLS, homoglyph, sandbox">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-4">
          <div className="bg-[#0d0e16] border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Link2 className="w-4 h-4 text-violet-400" />
              <h2 className="text-sm font-semibold text-white">Analyze URL</h2>
            </div>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && url && analyze.mutate()}
                placeholder="https://example.com/suspicious-link"
                className="w-full bg-slate-800/60 border border-slate-700 text-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
              />
            </div>
            <button
              onClick={() => analyze.mutate()}
              disabled={!url.trim() || analyze.isPending}
              className="mt-3 w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold rounded-lg py-2.5 text-sm transition-colors flex items-center justify-center gap-2"
            >
              {analyze.isPending ? <Spinner className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              {analyze.isPending ? 'Scanning (may take 30–60s)…' : 'Scan URL'}
            </button>
            {analyze.isPending && (
              <p className="text-xs text-slate-500 text-center mt-2">
                Running 4-phase analysis: lexical → TLS → homoglyph → sandbox…
              </p>
            )}
          </div>

          {result && (
            <div className="bg-[#0d0e16] border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white">Scan Result</h2>
                {result.is_phishing ? (
                  <div className="flex items-center gap-1.5 text-red-400 text-xs font-semibold">
                    <ShieldAlert className="w-4 h-4" /> Phishing Detected
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4" /> URL Appears Safe
                  </div>
                )}
              </div>

              <div className="bg-slate-800/40 rounded-lg px-3 py-2 text-xs text-slate-400 break-all border border-slate-700/50">
                {result.url}
              </div>

              <RiskMeter score={result.risk_score} />

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Confidence</span>
                <span className="text-slate-200 font-medium">{Math.round(result.confidence * 100)}%</span>
              </div>

              {result.explanation && (
                <div className="bg-slate-800/40 rounded-lg p-3 text-xs text-slate-300 leading-relaxed border border-slate-700/50">
                  {result.explanation}
                </div>
              )}
            </div>
          )}

          {analyze.isError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
              Scan failed. Make sure the backend is running.
            </div>
          )}
        </div>

        {/* History */}
        <div className="bg-[#0d0e16] border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">History</h2>
            {Array.isArray(history) && history.length > 0 && (
              <button
                onClick={() => clear.mutate()}
                className="text-xs text-slate-500 hover:text-red-400 flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear all
              </button>
            )}
          </div>
          {histLoading ? (
            <div className="flex justify-center py-8"><Spinner /></div>
          ) : Array.isArray(history) && history.length > 0 ? (
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {history.map((item: Record<string, unknown>) => (
                <div
                  key={item.request_id as string}
                  className="flex items-start gap-3 bg-slate-800/30 rounded-lg p-3 hover:bg-slate-800/50 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-300 truncate">{(item.url as string) ?? 'URL'}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <ThreatBadge
                        label={(item.result as Record<string, boolean>)?.is_phishing ? 'Phishing' : 'Safe'}
                        size="sm"
                      />
                      <span className="text-[10px] text-slate-600">
                        {new Date(item.created_at as string).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => del.mutate(item.request_id as string)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-600 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-600 text-sm">No URL scans yet</div>
          )}
        </div>
      </div>
    </Layout>
  )
}
