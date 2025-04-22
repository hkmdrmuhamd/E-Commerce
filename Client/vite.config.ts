import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{ //3000 portu altında projenin çalıştırılmasını sağlar.
    port: 3000,
  },
  plugins: [react()],
})
