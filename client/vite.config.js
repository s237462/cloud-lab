import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'https://mern-backend-s237462.onrender.com',
        changeOrigin: true
      }
    }
  },

  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: ['mern-frontend-s237462.onrender.com']
  }
})