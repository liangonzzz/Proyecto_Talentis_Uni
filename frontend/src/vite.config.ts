import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'src/infrastructure/ui/modules/auth/login/login.html'),
      }
    }
  },
  server: {
    port: 5173
  }
});