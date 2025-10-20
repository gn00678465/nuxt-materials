import type { CircularRevealConfig } from '../utils'
import { circularReveal } from '../utils'

export interface UseCircularRevealOptions extends
  Omit<CircularRevealConfig, 'toggle' | 'getCurrent'> {
  /** 切換圓形揭示狀態 */
  toggle: () => void | Promise<void>
  /** 獲取當前圓形揭示狀態 */
  getCurrent: () => boolean
}

export interface UseCircularRevealReturn {
  /** 處理點擊事件的函數 */
  handleClick: (e: Event) => Promise<void>
}

export function useCircularReveal(options: UseCircularRevealOptions): UseCircularRevealReturn {
  const isProcessing = ref(false)

  const handleClick = async (e: Event) => {
    // 如果正在處理中,忽略重複的點擊事件
    if (isProcessing.value) {
      return
    }

    isProcessing.value = true

    // 執行 circular reveal 動畫
    await circularReveal(e, {
      toggle: options.toggle,
      getCurrent: options.getCurrent,
      duration: options.duration,
      easing: options.easing,
    })

    // 在下一個事件循環重置標記
    setTimeout(() => {
      isProcessing.value = false
    }, 0)
  }

  return {
    handleClick,
  }
}
