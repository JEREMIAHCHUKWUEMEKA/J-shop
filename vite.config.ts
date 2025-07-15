// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.thewatchapi.com', // The actual target API
        changeOrigin: true, // Needed for many APIs to handle virtual hosting
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes the /api prefix when forwarding
        // secure: false, // Only if your target API has an invalid SSL certificate (not recommended for production)
      },
    },
  },
});