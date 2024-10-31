import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'
import CleanCSS from 'clean-css'
import type { RollupOptions } from 'rollup'
import { resolve } from 'path'

export const rollupOptions: RollupOptions = {
  external: ['pdfjs-dist', 'vue'],
  output: {
    globals: {
      'pdfjs-dist': 'pdfjsLib',
      vue: 'Vue',
    },
    exports: 'named',
    assetFileNames: (assetInfo) => {
      switch (assetInfo.name) {
        case 'style.css':
          return 'styles/index.css'
        default:
          return assetInfo.name as string
      }
    },
    compact: true,
    inlineDynamicImports: true,
  },
}

export default defineConfig({
  plugins: [
    copy({
      hook: 'writeBundle',
      targets: Object.entries({
        textLayer: [
          [2936, 2945],
          [441, 568],
        ],
        annotationLayer: [
          [2936, 2945],
          [569, 933],
        ],
      }).map(([key, ranges]) => ({
        src: 'node_modules/pdfjs-dist/web/pdf_viewer.css',
        dest: 'dist/styles',
        rename: `${key}.css`,
        transform: (contents) => {
          const lines = contents.toString().split('\n')
          const css = ranges.reduce((acc, [start, end]) => {
            return acc + lines.slice(start, end).join('\n')
          }, '')
          return new CleanCSS().minify(css).styles + '\n'
        },
      })),
    }),
    vue(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'VuePdfEmbed',
      fileName: 'index',
    },
    rollupOptions,
  },
})
