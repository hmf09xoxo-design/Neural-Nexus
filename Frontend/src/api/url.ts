import api from './client'
import type { UrlAnalysisResult } from '../types'

export const urlApi = {
  analyze: (url: string) =>
    api.post<UrlAnalysisResult>('/url/analyze', { url }),

  history: () => api.get('/url/history'),

  deleteHistory: (id: string) => api.delete(`/url/history/${id}`),

  clearHistory: () => api.delete('/url/history'),

  feedback: (request_id: string, correct_label: string) =>
    api.post('/url/feedback', { request_id, correct_label }),
}
