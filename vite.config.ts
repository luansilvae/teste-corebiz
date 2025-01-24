import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteImagemin from 'vite-plugin-imagemin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteImagemin({
    pngquant: {
      quality: [0.6, 0.8]
    },
    mozjpeg: {
      quality: 75
    }
  })],
})
