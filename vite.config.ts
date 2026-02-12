import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import { readFileSync } from 'node:fs'

// Read version from package.json for versioned output
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))
const version = pkg.version // e.g. "1.0.0"

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'design_system',
      filename: 'remoteEntry.js',
      exposes: {
        './BaseButton': './src/components/BaseButton.vue',
        './BaseCard': './src/components/BaseCard.vue',
        './BaseInput': './src/components/BaseInput.vue',
        './BaseNavbar': './src/components/BaseNavbar.vue',
        './BaseBadge': './src/components/BaseBadge.vue',
        './BaseSpinner': './src/components/BaseSpinner.vue',
      },
      shared: ['vue']
    })
  ],
  build: {
    target: 'esnext',
    // Versioned output: dist/v1.0.0/ → immutable artifact
    outDir: `dist/v${version}`,
  }
})
