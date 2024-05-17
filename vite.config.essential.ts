import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { rollupOptions } from './vite.config'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/index.essential.ts',
      name: 'VuePdfEmbed',
      fileName: 'index.essential',
      formats: ['es'],
    },
    rollupOptions,
  },
})
