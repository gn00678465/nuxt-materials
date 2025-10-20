import { addComponent, addPlugin, addTypeTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'

interface ModuleOptions {
  baseLayout?: boolean
  circularReveal?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/materials',
    configKey: 'materials',
    compatibility: {
      nuxt: '^4.0.0',
    },
  },
  defaults: {
    baseLayout: true,
    circularReveal: true,
  },
  setup(moduleOptions) {
    const resolver = createResolver(import.meta.url)

    const enableBaseLayout = moduleOptions.baseLayout === true
    const enableCircularReveal = moduleOptions.circularReveal === true

    if (enableBaseLayout) {
      addComponent({
        name: 'BaseLayout',
        filePath: resolver.resolve('./runtime/base-layout/index.vue'),
        kebabName: 'base-layout',
        pascalName: 'BaseLayout',
      })
    }

    if (enableCircularReveal) {
      addPlugin(resolver.resolve('./runtime/circular-reveal/plugin/index.ts'))

      // 添加 circular-reveal 指令的型別聲明
      addTypeTemplate({
        filename: 'types/circular-reveal.d.ts',
        getContents: () => `
declare module '@vue/runtime-core' {
  export interface GlobalDirectives {
    vCircularReveal: {
      /** 切換狀態的回調函式 */
      toggle: () => void
      /** 獲取當前狀態的函式 */
      getCurrent: () => boolean
      /** 動畫持續時間（毫秒），預設 500 */
      duration?: number
      /** 緩動函式，預設 'ease-in-out' */
      easing?: string
    }
  }
}

export {}
        `.trim(),
      })
    }
  },
})
