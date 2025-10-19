import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  extends: ['..'],
  modules: ['@nuxt/eslint'],
  css: ['~/styles/index.css'],
  eslint: {
    config: {
      // Use the generated ESLint config for lint root project as well
      rootDir: fileURLToPath(new URL('..', import.meta.url)),
      stylistic: true
    },
  },
  materials: {
    baseLayout: true
  },
  vite: {
    css: {
      modules: {
        generateScopedName: (name, filename) => {
          // Generate a stable hash using the file path and class name
          const path = filename.split('/').slice(-2).join('/').replace(/\.[^.]+$/, '')
          return `_${name}_${path.replace(/[^a-zA-Z0-9]/g, '_')}`
        }
      }
    }
  }
})
