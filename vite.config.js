import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  const apiPort = Number(process.env.API_PORT ?? 4000)
  const devPort = Number(process.env.PORT ?? 4173)
  return {
    plugins: [react()],
    server: {
      host: process.env.HOST ?? '0.0.0.0',
      port: devPort,
      proxy: {
        '/api': {
          target: process.env.VITE_API_PROXY_TARGET ?? `http://localhost:${apiPort}`,
          changeOrigin: true,
        },
      },
    },
  }
})
