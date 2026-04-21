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

function Guard({ children }: { children: React.ReactNode }) {
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
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Guard><Dashboard /></Guard>} />
            <Route path="/sms" element={<Guard><SmsAnalysis /></Guard>} />
            <Route path="/email" element={<Guard><EmailAnalysis /></Guard>} />
            <Route path="/url" element={<Guard><UrlAnalysis /></Guard>} />
            <Route path="/voice" element={<Guard><VoiceAnalysis /></Guard>} />
            <Route path="/attachment" element={<Guard><AttachmentAnalysis /></Guard>} />
            <Route path="/api-keys" element={<Guard><ApiKeys /></Guard>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
