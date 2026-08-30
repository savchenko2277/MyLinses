import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages размещает сайт по адресу https://<user>.github.io/<repo>/,
// поэтому при сборке в Actions подставляется базовый путь /<repo>/.
// Локально base = '/', что корректно для `npm run dev` и `npm run preview`.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
})

