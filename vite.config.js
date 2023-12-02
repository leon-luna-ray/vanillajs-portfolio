import { defineConfig } from 'vite';
import { resolve } from 'path'

export default defineConfig({
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
