import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import relay from 'vite-plugin-relay';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), relay],
  resolve: {
    alias: [{ find: '@/', replacement: './src' }],
  },
  optimizeDeps: {
    exclude: [],
  },
  server: {
    port: 3000,
  },
});
