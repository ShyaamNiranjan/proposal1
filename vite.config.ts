import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project site: https://shyaamniranjan.github.io/proposal1/
// Custom domain: xoomproposal.yniidi.com (CNAME in /public)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/proposal1/',
})
