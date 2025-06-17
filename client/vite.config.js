import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/.well-known': {
        target: 'https://api.flow-demo.store',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path, // Keep the path as-is
      }
    }
  },
  preview: {
    proxy: {
      '/.well-known': {
        target: 'https://api.flow-demo.store',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path,
      }
    }
  }
})
