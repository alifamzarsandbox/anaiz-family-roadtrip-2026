import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/anaiz-family-roadtrip-2026/',
  plugins: [react(), tailwindcss()],
})
