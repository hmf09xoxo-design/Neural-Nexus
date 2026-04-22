import { useState, useRef, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mic, Trash2, Radio, Square, CheckCircle2, AlertTriangle } from 'lucide-react'
import Layout from '../components/Layout'
import ThreatBadge from '../components/ThreatBadge'
import RiskMeter from '../components/RiskMeter'
import Spinner from '../components/Spinner'
import FileDropzone from '../components/FileDropzone'
import { voiceApi, createVoiceWebSocket } from '../api/voice'
import type { VoiceAnalysisResult } from '../types'

interface StreamChunk {
  chunk: number
  label?: string
  confidence?: number
  transcript?: string
}

export default function VoiceAnalysis() {
  const [result, setResult] = useState<VoiceAnalysisResult | null>(null)
  const [streaming, setStreaming] = useState(false)
  const [streamLog, setStreamLog] = useState<StreamChunk[]>([])
  const wsRef = useRef<WebSocket | null>(null)
  const mediaRef = useRef<MediaRecorder | null>(null)
  const qc = useQueryClient()

  const { data: history, isLoading: histLoading } = useQuery({
    queryKey: ['voice-history'],
    queryFn: () => voiceApi.history().then((r) => r.data),
  })

  const analyze = useMutation({
    mutationFn: (file: File) => voiceApi.analyze(file),
    onSuccess: (r) => {
      setResult(r.data)
      qc.invalidateQueries({ queryKey: ['voice-history'] })
    },
  })

  const clear = useMutation({
    mutationFn: voiceApi.clearHistory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['voice-history'] }),
  })

  const del = useMutation({
    mutationFn: (id: string) => voiceApi.deleteHistory(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['voice-history'] }),
  })

  const startStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const ws = createVoiceWebSocket()
    wsRef.current = ws
    setStreamLog([])
    setStreaming(true)

    ws.onmessage = (e) => {
      try {
        const data: StreamChunk = JSON.parse(e.data)
        setStreamLog((prev) => [...prev, data])
      } catch {}
    }
    ws.onclose = () => {
      setStreaming(false)
      stream.getTracks().forEach((t) => t.stop())
    }

    ws.onopen = () => {
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      mediaRef.current = recorder
      recorder.ondataavailable = (e) => {
        if (ws.readyState === WebSocket.OPEN && e.data.size > 0) {
          ws.send(e.data)
        }
      }
      recorder.start(500)
    }
  }, [])

  const stopStream = useCallback(() => {
    mediaRef.current?.stop()
    wsRef.current?.close()
    setStreaming(false)
  }, [])

  return (
    <Layout title="Voice Deepfake Detection" subtitle="ResNetBiLSTM model for real-time voice authenticity analysis">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Upload + Stream */}
        <div className="space-y-4">
          {/* File upload */}
          <div className="bg-[#0d0e16] border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Mic className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-semibold text-white">Upload Audio File</h2>
            </div>
            <FileDropzone
              onFile={(f) => analyze.mutate(f)}
              accept=".wav,.mp3,.ogg,.flac,.m4a,.webm"
              label="Drop audio file or click to upload"
            />
            {analyze.isPending && (
              <div className="flex items-center gap-2 mt-3 text-sm text-slate-400">
                <Spinner className="w-4 h-4" /> Analyzing with ResNetBiLSTM…
              </div>
            )}
          </div>

          {/* Live streaming */}
          <div className="bg-[#0d0e16] border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Radio className="w-4 h-4 text-red-400" />
              <h2 className="text-sm font-semibold text-white">Live Microphone Analysis</h2>
              <span className="text-[10px] bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full ml-auto">WebSocket</span>
            </div>
            {!streaming ? (
              <button
                onClick={startStream}
                className="w-full bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 font-semibold rounded-lg py-2.5 text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Mic className="w-4 h-4" /> Start Live Analysis
              </button>
            ) : (
              <button
                onClick={stopStream}
                className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded-lg py-2.5 text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Square className="w-4 h-4" /> Stop Recording
              </button>
            )}

            {streamLog.length > 0 && (
              <div className="mt-4 space-y-1.5 max-h-48 overflow-y-auto">
                {streamLog.map((chunk, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs bg-slate-800/40 rounded-lg px-3 py-2">
                    <span className="text-slate-500 font-mono w-16 flex-shrink-0">Chunk {chunk.chunk}</span>
                    {chunk.label && (
                      <ThreatBadge label={chunk.label} size="sm" />
                    )}
                    {chunk.transcript && (
                      <span className="text-slate-400 truncate italic">"{chunk.transcript}"</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upload result */}
          {result && (
            <div className="bg-[#0d0e16] border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white">Detection Result</h2>
                {result.label?.toLowerCase().includes('deep') || result.label?.toLowerCase().includes('spoof') ? (
                  <div className="flex items-center gap-1.5 text-red-400 text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4" /> Deepfake Voice
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4" /> Authentic Voice
                  </div>
                )}
              </div>
              <ThreatBadge label={result.label} score={result.risk_score} />
              <RiskMeter score={result.risk_score} />
              {result.transcript && (
                <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/50">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Whisper Transcript</p>
                  <p className="text-xs text-slate-300 italic">"{result.transcript}"</p>
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
              Analysis failed. Make sure the backend is running.
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
                    <p className="text-xs text-slate-300 truncate font-medium">
                      {String(item.filename ?? 'Audio file')}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <ThreatBadge
                        label={String(item.voice_result ?? (item.is_fraud ? 'Deepfake' : 'Authentic'))}
                        score={Number(item.risk_score ?? 0)}
                        size="sm"
                      />
                      <span className="text-[10px] text-slate-600">
                        {item.created_at ? new Date(item.created_at as string).toLocaleDateString() : ''}
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
            <div className="text-center py-12 text-slate-600 text-sm">No voice analyses yet</div>
          )}
        </div>
      </div>
    </Layout>
  )
}
