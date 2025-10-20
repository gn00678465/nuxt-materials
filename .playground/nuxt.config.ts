import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'color-scheme' , content: 'dark light' }
      ]
    }
  },
  extends: ['..'],
  modules: ['@nuxt/eslint'],
  css: ['~/styles/index.css'],
  eslint: {
    config: {
      // Use the generated ESLint config for lint root project as well
      rootDir: fileURLToPath(new URL('..', import.meta.url)),
      stylistic: true,
    },
  },
  materials: {
    baseLayout: true,
  },
})
