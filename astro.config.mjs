// @ts-check
import {defineConfig} from 'astro/config'
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite'

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  site: 'https://www.jonathanleivag.cl',
  integrations: [react(), sitemap()],
  adapter: vercel()
})