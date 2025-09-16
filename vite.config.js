// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    strictPort: true, // fail if 3000 is taken (helps avoid surprises)
    host: true,       // allows access from other devices on your network
    open: true,       // auto-open browser

    // 🔁 Proxy frontend /api calls to your local dev API server
    proxy: {
      '/api': {
        target: 'http://localhost:8787', // matches server.js (dev API)
        changeOrigin: true,
        // leave path as-is (/api/...)
        // rewrite: (p) => p,
      },
    },
  },
});
