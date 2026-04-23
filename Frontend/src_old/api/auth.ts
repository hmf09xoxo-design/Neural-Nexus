import api from './client'
import type { User } from '../types'

export const authApi = {
  signup: (email: string, full_name: string, password: string) =>
    api.post('/auth/signup', { email, full_name, password }),

  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  me: () => api.get<User>('/auth/me'),

  logout: () => api.post('/auth/logout'),
}
