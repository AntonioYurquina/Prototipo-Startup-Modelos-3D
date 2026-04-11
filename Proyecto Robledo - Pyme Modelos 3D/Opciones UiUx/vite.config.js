import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Esta es la línea que soluciona la pantalla blanca:
  base: '/Prototipo-Startup-Modelos-3D/', 
  build: {
    outDir: 'dist', // Te sugiero usar 'dist' que es el estándar de Vite 8
    emptyOutDir: true,
  }
})