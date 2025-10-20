import type { StateTransitionConfig } from "../utils";
import { circularReveal } from "../utils";

interface ElementWithHandler extends HTMLElement {
  _circularRevealHandler?: (e: Event) => Promise<void>
}

export default defineNuxtPlugin({
  name: 'circular-reveal',
  async setup(nuxtApp) {
    nuxtApp.vueApp.directive('circular-reveal', {
      mounted (el: ElementWithHandler, binding) {
        let isProcessing = false
        const config: StateTransitionConfig = binding.value

        // 驗證必要的配置
        if (!config || typeof config.toggle !== 'function' || typeof config.getCurrent !== 'function') {
          console.error('circular-reveal directive requires a valid StateTransitionConfig with toggle and getCurrent functions')
          return
        }

        const handleClick = async (e: Event) => {
          // 如果正在處理中,忽略重複的點擊事件
          if (isProcessing) {
            return
          }

          isProcessing = true

          // 執行 circular reveal 動畫
          await circularReveal(e, config)

          // 在下一個事件循環重置標記
          setTimeout(() => {
            isProcessing = false
          }, 0)
        }
        el.addEventListener('click', handleClick)
        // 將 handler 存儲在元素上以便卸載時移除
        el._circularRevealHandler = handleClick
      },
      unmounted (el: ElementWithHandler) {
        if (el._circularRevealHandler) {
          el.removeEventListener('click', el._circularRevealHandler)
          delete el._circularRevealHandler
        }
      },
      getSSRProps (_binding, _vnode) {
        // you can provide SSR-specific props here
        return {}
      },
    })
  }
})
