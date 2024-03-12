import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  proxy:'http://localhost:3000',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/testSetup.js',
  }
})
