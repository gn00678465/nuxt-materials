export interface CircularRevealConfig {
  /** 切換狀態的回調函式 */
  toggle: () => void
  /** 獲取當前狀態的函式 */
  getCurrent: () => boolean
  /** 動畫持續時間（毫秒），預設 500 */
  duration?: number
  /** 緩動函式，預設 'ease-in-out' */
  easing?: string
}

export async function circularReveal(e: Event, config: CircularRevealConfig): Promise<void> {
  // 檢查瀏覽器是否支援 View Transition API 和使用者偏好設定
  const supportsViewTransition
    = !!document.startViewTransition
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!supportsViewTransition || !document.startViewTransition) {
    // 不支援時直接切換狀態
    config.toggle()
    return
  }

  try {
    // 開始 View Transition
    const transition = document.startViewTransition(() => {
      config.toggle()
    })

    // 等待快照準備就緒後執行圓形展開動畫
    await transition.ready

    const isClosing = config.getCurrent()
    const target = e.target as HTMLElement
    const rect = target.getBoundingClientRect()

    // 計算點擊位置（相對於元素中心）
    const clickX = rect.left + rect.width / 2
    const clickY = rect.top + rect.height / 2

    // 計算到畫面邊緣的最大距離作為展開半徑
    const endRadius = Math.hypot(
      Math.max(clickX, innerWidth - clickX),
      Math.max(clickY, innerHeight - clickY),
    )

    // 轉換為百分比座標和半徑
    const clickXPercent = (100 * clickX) / innerWidth
    const clickYPercent = (100 * clickY) / innerHeight
    const referenceRadius = Math.hypot(innerWidth, innerHeight) / Math.SQRT2
    const radiusPercent = (100 * endRadius) / referenceRadius

    // 定義圓形 clip-path 動畫路徑
    const clipPath = [
      `circle(0% at ${clickXPercent}% ${clickYPercent}%)`,
      `circle(${radiusPercent}% at ${clickXPercent}% ${clickYPercent}%)`,
    ]

    // 執行動畫，根據當前狀態決定動畫方向和目標偽元素
    document.documentElement.animate(
      {
        clipPath: isClosing ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: config.duration || 500,
        easing: config.easing || 'ease-in-out',
        fill: 'both',
        pseudoElement: isClosing
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  }
  catch (error) {
    // 如果 transition 失敗，至少確保切換成功
    config.toggle()
    console.error('Circular reveal transition failed:', error)
  }
}
