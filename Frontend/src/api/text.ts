import api from './client'
import type { SmsAnalysisResult, EmailAnalysisResult } from '../types'

export const textApi = {
  analyzeSms: (text: string) =>
    api.post<SmsAnalysisResult>('/text/sms/analyze', { text }),

  smsHistory: () => api.get('/text/sms/history'),

  deleteSmsHistory: (id: string) => api.delete(`/text/sms/history/${id}`),

  clearSmsHistory: () => api.delete('/text/sms/history'),

  smsFeedback: (request_id: string, correct_label: string) =>
    api.post('/text/sms/feedback', { request_id, correct_label }),

  analyzeEmail: (subject: string, body: string, sender?: string) =>
    api.post<EmailAnalysisResult>('/text/email/analyze/extension', {
      subject,
      body,
      sender,
    }),

  emailHistory: () => api.get('/text/email/history'),

  deleteEmailHistory: (id: string) => api.delete(`/text/email/history/${id}`),

  clearEmailHistory: () => api.delete('/text/email/history'),

  emailFeedback: (request_id: string, correct_label: string) =>
    api.post('/text/email/feedback', { request_id, correct_label }),
}
