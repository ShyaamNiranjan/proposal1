import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom domain (xoomproposal.yniidi.com) is served from domain root,
// so base must be '/' — NOT '/proposal1/'.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
})
