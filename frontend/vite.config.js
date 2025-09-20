import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr({exportAsDefault: true})],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
