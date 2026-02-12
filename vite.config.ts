import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

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
    target: 'esnext'
  }
})
