import api from './client'
import type { VoiceAnalysisResult } from '../types'

export const voiceApi = {
  analyze: (file: File) => {
    const form = new FormData()
    form.append('file', file)
    return api.post<VoiceAnalysisResult>('/voice/analyse', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  history: () => api.get('/voice/history'),

  deleteHistory: (id: string) => api.delete(`/voice/history/${id}`),

  clearHistory: () => api.delete('/voice/history'),
}

export const createVoiceWebSocket = (): WebSocket => {
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
  return new WebSocket(`${protocol}://localhost:8000/voice/stream`)
}
