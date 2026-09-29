import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: fileURLToPath(
        new URL('./src/index.essential.ts', import.meta.url)
      ),      name: 'VuePdfEmbed',
      fileName: 'index.essential',
      formats: ['es'],
    },
    rollupOptions: {
      external: [/^pdfjs-dist/, 'vue'],
    },
  },
})
