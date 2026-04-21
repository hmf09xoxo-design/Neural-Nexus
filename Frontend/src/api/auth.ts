import api from './client'
import type { User } from '../types'

export const authApi = {
  signup: (email: string, username: string, password: string) =>
    api.post('/auth/signup', { email, username, password }),

  login: (email: string, password: string) =>
    api.post<{ user: User }>('/auth/login', { email, password }),

  me: () => api.get<User>('/auth/me'),

  logout: () => api.post('/auth/logout'),
}
