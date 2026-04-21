import api from './client'
import type { ApiKey } from '../types'

export const apiKeysApi = {
  list: () => api.get<ApiKey[]>('/api-keys'),

  request: (label?: string) => api.post<ApiKey>('/api-keys/request', { label }),

  reveal: (key_id: string) =>
    api.get<{ key: string }>(`/api-keys/${key_id}/reveal`),
}
