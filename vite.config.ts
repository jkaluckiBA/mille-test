import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import '@/variables';"
      }
    },
    modules: {
      localsConvention: 'dashesOnly'
    },
    devSourcemap: false
  },
  build: {
    sourcemap: 'hidden'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
