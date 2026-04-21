import api from './client'
import type { AttachmentAnalysisResult } from '../types'

export const attachmentApi = {
  analyze: (file: File) => {
    const form = new FormData()
    form.append('file', file)
    return api.post<AttachmentAnalysisResult>('/attachment/analyze', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  history: () => api.get('/attachment/history'),

  deleteHistory: (id: string) => api.delete(`/attachment/history/${id}`),

  clearHistory: () => api.delete('/attachment/history'),
}
