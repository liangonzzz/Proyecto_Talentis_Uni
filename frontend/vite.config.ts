import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'src/infrastructure/ui/modules/auth/login/login-principal/login.html'),
        forgotPassword: resolve(__dirname, 'src/infrastructure/ui/modules/auth/login/forgot-password/forgot-password.html'),
        resetPassword: resolve(__dirname, 'src/infrastructure/ui/modules/auth/login/reset-password/reset-password.html'),
        provicional: resolve(__dirname, 'src/infrastructure/ui/modules/auth/login/provicional/provicional.html'),
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
});