import { Component, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import SmsAnalysis from './pages/SmsAnalysis'
import EmailAnalysis from './pages/EmailAnalysis'
import UrlAnalysis from './pages/UrlAnalysis'
import VoiceAnalysis from './pages/VoiceAnalysis'
import AttachmentAnalysis from './pages/AttachmentAnalysis'
import ApiKeys from './pages/ApiKeys'
import Spinner from './components/Spinner'

const qc = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
})

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null }
  static getDerivedStateFromError(error: Error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-[#0a0b10] flex items-center justify-center p-8">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 max-w-lg w-full">
            <h2 className="text-red-400 font-bold text-lg mb-2">Something went wrong</h2>
            <pre className="text-red-300 text-xs whitespace-pre-wrap break-all">
              {this.state.error.message}
            </pre>
            <button
              onClick={() => { this.setState({ error: null }); window.location.href = '/' }}
              className="mt-4 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function Guard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0b10] flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={qc}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Guard><ErrorBoundary><Dashboard /></ErrorBoundary></Guard>} />
              <Route path="/sms" element={<Guard><ErrorBoundary><SmsAnalysis /></ErrorBoundary></Guard>} />
              <Route path="/email" element={<Guard><ErrorBoundary><EmailAnalysis /></ErrorBoundary></Guard>} />
              <Route path="/url" element={<Guard><ErrorBoundary><UrlAnalysis /></ErrorBoundary></Guard>} />
              <Route path="/voice" element={<Guard><ErrorBoundary><VoiceAnalysis /></ErrorBoundary></Guard>} />
              <Route path="/attachment" element={<Guard><ErrorBoundary><AttachmentAnalysis /></ErrorBoundary></Guard>} />
              <Route path="/api-keys" element={<Guard><ErrorBoundary><ApiKeys /></ErrorBoundary></Guard>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
