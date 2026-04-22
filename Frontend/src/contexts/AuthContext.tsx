import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '../types'
import { authApi } from '../api/auth'

interface AuthCtx {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signup: (email: string, full_name: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authApi.me()
      .then((r) => setUser(r.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    await authApi.login(email, password)
    // Backend sets HttpOnly cookies — fetch user via /auth/me
    const me = await authApi.me()
    setUser(me.data)
  }

  const logout = async () => {
    await authApi.logout()
    setUser(null)
  }

  const signup = async (email: string, full_name: string, password: string) => {
    await authApi.signup(email, full_name, password)
    // Signup also sets cookies — fetch user immediately
    const me = await authApi.me()
    setUser(me.data)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
