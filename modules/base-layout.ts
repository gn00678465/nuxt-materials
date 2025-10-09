import { addComponent, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@nuxtjs/base-layout',
    compatibility: {
      nuxt: '^4.0.0'
    },
  },
  setup () {
    const resolver = createResolver(import.meta.url)

    addComponent({
      name: 'BaseLayout',
      filePath: resolver.resolve('runtime/base-layout/index.vue'),
      kebabName: 'base-layout',
      pascalName: 'BaseLayout',
    })
  },
})
