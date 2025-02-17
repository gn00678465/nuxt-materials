import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  extends: ['..'],
  modules: ['@nuxt/eslint', '@nuxt/test-utils', '@nuxtjs/storybook'],

  eslint: {
    config: {
      // Use the generated ESLint config for lint root project as well
      rootDir: fileURLToPath(new URL('..', import.meta.url)),
      standalone: false,
      stylistic: true
    },
  },
  storybook: {
    enabled: true
  },
  compatibilityDate: '2025-02-17'
})
