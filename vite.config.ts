import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import { VitePWA } from 'vite-plugin-pwa'

const manifestForPlugin = {
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
  manifest: {
    name: 'To Do App',
    short_name: 'My To Do App',
    description: 'My Awesome To Do App',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'android-launchericon-144-144.png',
        sizes: '144x144',
        type: 'image/png'
      },  {
        src: 'android-launchericon-192-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'android-launchericon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  workbox:{
    runtimeCaching:[
      {
        urlPattern: /^https:\/\/buylink\.pockethost\.io\/.*/i,
        handler: 'CacheFirst' as const,
        options: {
          cacheName: 'api-cache',
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
    ]
  }
}
export default defineConfig({
  plugins: [react(),   VitePWA(manifestForPlugin)],
});

