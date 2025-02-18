# NumberAnimation 數字動畫組件

一個支援 SSR 的數字動畫組件，提供平滑的數值過渡動畫和靈活的格式化選項。

## 特點

- ✨ 平滑的數值過渡動畫
- 🎯 支援自定義動畫時長
- 🔢 靈活的數字格式化選項
- 🖥️ SSR 友好
- 🎮 提供手動控制介面
- 🌐 支援自定義格式化函數

## Props

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| to | number | 0 | 目標數值 |
| from | number | 0 | 起始數值 |
| precision | number | 0 | 小數位數（設定後會強制顯示指定位數的小數） |
| showSeparator | boolean | false | 是否顯示千分位分隔符 |
| active | boolean | true | 是否啟動動畫 |
| duration | number | 2000 | 動畫持續時間（毫秒） |
| formatOptions | FormatOptions | { thousandsSeparator: ',', decimalSeparator: '.' } | 格式化選項 |
| formatter | (value: number, precision: number) => string | null | 自定義格式化函數 |
| onFinish | () => void | - | 動畫完成時的回調函數 |

## 基本使用

```vue
<template>
  <NumberAnimation
    :to="1234.10"
    :precision="2"
    :show-separator="true"
  />
</template>

<script setup lang="ts">
import { NumberAnimation } from '@nuxt-materials/number-animation'
</script>
```

輸出：`1,234.10`

```vue
<template>
  <NumberAnimation
    :to="123"
    :precision="2"
    :show-separator="true"
  />
</template>
```

輸出：`123.00`

## 進階使用範例

### 使用 Intl 進行本地化格式化

```vue
<template>
  <NumberAnimation
    :to="1234.56"
    :precision="2"
    :formatter="intlFormatter"
  />
</template>

<script setup lang="ts">
const intlFormatter = (value: number, precision: number) => {
  // SSR 環境檢查
  if (typeof Intl === 'undefined') {
    return value.toFixed(precision)  // 確保顯示指定位數的小數
  }
  
  return new Intl.NumberFormat('zh-TW', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  }).format(value)
}
</script>
```

### 使用 nuxt-i18n 格式化

```vue
<template>
  <NumberAnimation
    :to="1234.56"
    :precision="2"
    :formatter="i18nFormatter"
  />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { n } = useI18n()
const i18nFormatter = (value: number, precision: number) => {
  return n(value, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  })
}
</script>
```

### 貨幣格式化

```vue
<template>
  <NumberAnimation
    :to="1234.56"
    :precision="2"
    :formatter="currencyFormatter"
  />
</template>

<script setup lang="ts">
const currencyFormatter = (value: number, precision: number) => {
  if (typeof Intl === 'undefined') {
    return `$${value.toFixed(precision)}`  // 確保顯示指定位數的小數
  }

  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  }).format(value)
}
</script>
```

## 注意事項

1. precision 設定：
   - 當設定 precision 時，即使是整數也會顯示指定位數的小數
   - 例如：precision: 2 時，123 會顯示為 123.00

2. 自定義 formatter 函數：
   - 需要確保返回值包含指定的小數位數
   - 在 SSR 環境中需要提供降級方案
   - 建議使用 toFixed() 確保小數位數符合要求

3. SSR 相容性：
   - 檢查 `typeof Intl !== 'undefined'`
   - 提供降級方案時需遵循 precision 規則

4. 效能考量：
   - 避免在 formatter 中進行複雜計算
   - 考慮使用 memoization 優化重複計算

5. 錯誤處理：
   - 當 formatter 函數執行出錯時，會自動降級使用內建的格式化邏輯
   - 內建格式化邏輯會確保符合 precision 規則

## License

MIT
