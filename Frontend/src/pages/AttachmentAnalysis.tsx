import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Paperclip, Trash2, ShieldAlert, CheckCircle2 } from 'lucide-react'
import Layout from '../components/Layout'
import ThreatBadge from '../components/ThreatBadge'
import RiskMeter from '../components/RiskMeter'
import Spinner from '../components/Spinner'
import FileDropzone from '../components/FileDropzone'
import { attachmentApi } from '../api/attachment'
import type { AttachmentAnalysisResult } from '../types'

export default function AttachmentAnalysis() {
  const [result, setResult] = useState<AttachmentAnalysisResult | null>(null)
  const qc = useQueryClient()

  const { data: history, isLoading: histLoading } = useQuery({
    queryKey: ['attachment-history'],
    queryFn: () => attachmentApi.history().then((r) => r.data),
  })

  const analyze = useMutation({
    mutationFn: (file: File) => attachmentApi.analyze(file),
    onSuccess: (r) => {
      setResult(r.data)
      qc.invalidateQueries({ queryKey: ['attachment-history'] })
    },
  })

  const clear = useMutation({
    mutationFn: attachmentApi.clearHistory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['attachment-history'] }),
  })

  const del = useMutation({
    mutationFn: (id: string) => attachmentApi.deleteHistory(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['attachment-history'] }),
  })

  return (
    <Layout title="File Scan" subtitle="YARA + ClamAV + ML multi-engine malware detection">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Upload */}
        <div className="space-y-4">
          <div className="bg-[#0d0e16] border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Paperclip className="w-4 h-4 text-fuchsia-400" />
              <h2 className="text-sm font-semibold text-white">Upload File to Scan</h2>
            </div>
            <FileDropzone
              onFile={(f) => analyze.mutate(f)}
              label="Drop any file to scan for malware"
            />
            {analyze.isPending && (
              <div className="flex items-center gap-2 mt-3 text-sm text-slate-400">
                <Spinner className="w-4 h-4" /> Running YARA + ClamAV + ML analysis…
              </div>
            )}

            {/* Engine badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['YARA Rules', 'ClamAV', 'ML Classifier', 'PE Analysis', 'LLM Reasoning'].map((e) => (
                <span key={e} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-md border border-slate-700">
                  {e}
                </span>
              ))}
            </div>
          </div>

          {result && (
            <div className="bg-[#0d0e16] border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white">Scan Result</h2>
                {result.is_malicious ? (
                  <div className="flex items-center gap-1.5 text-red-400 text-xs font-semibold">
                    <ShieldAlert className="w-4 h-4" /> Malware Detected
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4" /> File is Clean
                  </div>
                )}
              </div>

              <div className="bg-slate-800/40 rounded-lg px-3 py-2 text-xs text-slate-400 border border-slate-700/50">
                {result.filename}
              </div>

              <ThreatBadge label={result.is_malicious ? 'Malicious' : 'Safe'} score={result.risk_score} />
              <RiskMeter score={result.risk_score} />

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Confidence</span>
                <span className="text-slate-200 font-medium">{Math.round(result.confidence * 100)}%</span>
              </div>

              {result.scan_results && (
                <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/50">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-2">Engine Results</p>
                  <pre className="text-[10px] text-slate-300 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(result.scan_results, null, 2)}
                  </pre>
                </div>
              )}

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
            <h2 className="text-sm font-semibold text-white">Scan History</h2>
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
                    <p className="text-xs text-slate-300 truncate font-medium">
                      {(item.filename as string) ?? 'File'}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <ThreatBadge
                        label={(item.result as Record<string, boolean>)?.is_malicious ? 'Malicious' : 'Safe'}
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
            <div className="text-center py-12 text-slate-600 text-sm">No file scans yet</div>
          )}
        </div>
      </div>
    </Layout>
  )
}
