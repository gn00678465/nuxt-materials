import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  extends: ['..'],
  // app: {
  //   head: {
  //     script: [
  //       { src: 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4' }
  //     ]
  //   }
  // },
  modules: ['@nuxt/eslint'],
  css: ['~/styles/index.css'],
  eslint: {
    config: {
      // Use the generated ESLint config for lint root project as well
      rootDir: fileURLToPath(new URL('..', import.meta.url))
    }
  },
  vite: {
    css: {
      modules: {
        generateScopedName: (name, filename) => {
          // 使用檔案路徑和類名生成穩定的 hash
          const path = filename.split('/').slice(-2).join('/').replace(/\.[^.]+$/, '')
          return `_${name}_${path.replace(/[^a-zA-Z0-9]/g, '_')}`
        }
      }
    }
  }
})
