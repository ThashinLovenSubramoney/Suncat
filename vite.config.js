import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: {
    port: 3000,
    strictPort: true, // fail if 3000 is taken (helps avoid surprises)
    host: true,       // allows access from other devices on your network
    open: true        // auto-open browser
  }
})

