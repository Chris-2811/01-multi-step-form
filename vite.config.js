import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'plan.html'),
        addOn: resolve(__dirname, 'add-on.html'),
        confirmation: resolve(__dirname, 'confirmation.html'),
        summary: resolve(__dirname, 'summary.html'),
      },
    },
  },
});
