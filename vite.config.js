import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/GitHubProfileTracker/',
  plugins: [react()],
  server:{
    port:2024
  }
})
