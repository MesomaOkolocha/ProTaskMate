import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
 

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['taskmatelogo.png'],
  manifest: {
    "name": "Protaskmate",
    "short_name": "Protaskmate",
    "description": "A task management app that uses the kanban methodology to organize files",
    "icons": [
      {
        "src": "https://kanban-app-jay.netlify.app/assets/logo-mobile.c1810dc7.svg",
        "sizes": "48x48 72x72 96x96 144x144 192x192 256x256 384x384 512x512",
        "type": "image/png/svg+xml",
        "purpose": "any"
      },
      {
        "src": "https://kanban-app-jay.netlify.app/assets/logo-mobile.c1810dc7.svg",
        "sizes": "any",
        "type": "image/svg+xml",
        "purpose": "any"
      }
    ],
    "start_url": "/",
    "scope": "/",
    "display": "standalone",
    "background_color": "#F4F7FD",
    "theme_color": "#3366cc",
    "orientation": "portrait"
  }
  
};
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), VitePWA(manifestForPlugin)],
});
