import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: '192.168.10.44',
    host: '192.168.10.200',
    port: 3000,
  },
})
