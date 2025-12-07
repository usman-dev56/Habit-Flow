import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'; // if you want the plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(), 
  ],
})



