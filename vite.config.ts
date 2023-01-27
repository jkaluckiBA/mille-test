import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import '@/variables.scss';"
      }
    },
    modules: {
      localsConvention: 'dashesOnly'
    },
    devSourcemap: false
  },
  build: {
    sourcemap: 'inline'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
