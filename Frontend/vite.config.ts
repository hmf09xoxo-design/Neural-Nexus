import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const backendProxy = {
  target: 'http://localhost:8080',
  changeOrigin: true,
  cookieDomainRewrite: 'localhost',
  secure: false,
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/auth':       backendProxy,
      '/text':       backendProxy,
      '/url':        backendProxy,
      '/voice':      backendProxy,
      '/attachment': backendProxy,
      '/api-keys':   backendProxy,
      '/portal':     backendProxy,
    },
  },
})
