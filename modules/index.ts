import { addComponent, addImports, createResolver, defineNuxtModule } from '@nuxt/kit'

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
      addImports({
        name: 'useCircularReveal',
        from: resolver.resolve('./runtime/circular-reveal/composables/useCircularReveal.ts'),
      })
    }
  },
})
