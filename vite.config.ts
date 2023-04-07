import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
 

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['taskmatelogo.png'],
  manifest: {
    "name": "Protaskmate",
    "short_name": "Protaskmate",
    "description": "A Task management app that uses the kanban methodology to organize files",
    "icons": [
      {
        "src": "taskmatelogo.png",
        "sizes": "192x192",
        "type": "image/png/svg"
      },
      {
        "src": "taskmatelogo.png",
        "sizes": "512x512",
        "type": "image/png/svg"
      }
    ],
    "start_url": "/",
    "display": "standalone",
    "background_color": "#F4F7FD",
    "theme_color": "#F4F7FD",
    "orientation": "portrait"
  }
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
})
