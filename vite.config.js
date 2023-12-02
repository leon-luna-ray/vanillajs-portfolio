import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
  },
  pages: {
    '/projects': {
      entry: 'src/pages/projects.html'
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
