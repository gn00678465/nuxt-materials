# NumberAnimation 數字動畫組件

一個支援 SSR 的數字動畫組件，提供平滑的數值過渡動畫和靈活的格式化選項。

## 特點

- ✨ 平滑的數值過渡動畫
- 🎯 支援自定義動畫時長
- 🔢 靈活的數字格式化選項
- 🖥️ SSR 友好
- 🎮 提供手動控制介面

## 安裝

```bash
# 如果使用 npm
npm install @nuxt-materials/number-animation

# 如果使用 yarn
yarn add @nuxt-materials/number-animation

# 如果使用 pnpm
pnpm add @nuxt-materials/number-animation
```

## 基本使用

```vue
<template>
  <NumberAnimation
    :to="1234.56"
    :precision="2"
    :show-separator="true"
  />
</template>

<script setup lang="ts">
import { NumberAnimation } from '@nuxt-materials/number-animation'
</script>
```

## Props

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| to | number | 0 | 目標數值 |
| from | number | 0 | 起始數值 |
| precision | number | 0 | 小數位數 |
| showSeparator | boolean | false | 是否顯示千分位分隔符 |
| active | boolean | true | 是否啟動動畫 |
| duration | number | 2000 | 動畫持續時間（毫秒） |
| formatOptions | FormatOptions | { thousandsSeparator: ',', decimalSeparator: '.' } | 格式化選項 |
| onFinish | () => void | - | 動畫完成時的回調函數 |

### FormatOptions 介面

```typescript
interface FormatOptions {
  thousandsSeparator?: string  // 千分位分隔符
  decimalSeparator?: string    // 小數點分隔符
}
```

## 進階使用範例

### 自定義格式化

```vue
<template>
  <NumberAnimation
    :to="9876543.21"
    :precision="2"
    :show-separator="true"
    :format-options="{
      thousandsSeparator: ' ',
      decimalSeparator: ','
    }"
  />
</template>
```

輸出：`9 876 543,21`

### 手動控制動畫

```vue
<template>
  <div>
    <NumberAnimation
      ref="animation"
      :from="0"
      :to="10000"
      :duration="3000"
      :show-separator="true"
      :active="false"
    />
    <button @click="startAnimation">開始動畫</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NumberAnimation, type NumberAnimationInst } from '@nuxt-materials/number-animation'

const animation = ref<NumberAnimationInst>()

const startAnimation = () => {
  animation.value?.play()
}
</script>
```

### 動態更新數值

```vue
<template>
  <div>
    <NumberAnimation
      :to="currentValue"
      :precision="2"
      :show-separator="true"
    />
    <button @click="updateValue">更新數值</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NumberAnimation } from '@nuxt-materials/number-animation'

const currentValue = ref(0)

const updateValue = () => {
  currentValue.value = Math.random() * 10000
}
</script>
```

## 注意事項

1. 組件使用原生 JavaScript 方法進行數字格式化，確保 SSR 相容性
2. 動畫使用 requestAnimationFrame 實現，在不支援的環境中會直接顯示最終值
3. precision 屬性會影響數值的精確度，建議根據實際需求設置合適的值
4. 當 active 為 false 時，可以使用 play() 方法手動觸發動畫

## License

MIT
