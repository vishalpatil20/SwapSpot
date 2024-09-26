import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'window', // Define `global` as `window`
        process: 'process',
        Buffer: 'buffer',
      },
    },
  },
});
