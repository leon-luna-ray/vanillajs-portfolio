import { defineConfig } from 'vite';
import { resolve } from 'path'

export default defineConfig({
  build: {
    target: 'esnext',
    // assetsInclude: ['**/*.html'],
    // rollupOptions: {
    //   input: {
    //     main: resolve(__dirname, 'index.html'),
    //     home: resolve(__dirname, 'src/pages/home.html'),
    //   },
    // },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
