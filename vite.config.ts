import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: ['unitec-front.onrender.com'],
    host: true,   // разрешает доступ с локальной сети
    port: 5174,   // можно изменить порт при необходимости
  },
})
