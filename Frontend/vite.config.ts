import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/auth': { target: 'http://localhost:8000', changeOrigin: true },
      '/text': { target: 'http://localhost:8000', changeOrigin: true },
      '/url': { target: 'http://localhost:8000', changeOrigin: true },
      '/voice': { target: 'http://localhost:8000', changeOrigin: true },
      '/attachment': { target: 'http://localhost:8000', changeOrigin: true },
      '/api-keys': { target: 'http://localhost:8000', changeOrigin: true },
      '/portal': { target: 'http://localhost:8000', changeOrigin: true },
    },
  },
})
