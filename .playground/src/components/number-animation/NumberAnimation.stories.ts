import type { Meta, StoryObj } from '@storybook/vue3'
import NumberAnimation from '../../../../components/number-animation/NumberAnimation'

const meta = {
  title: 'Components/NumberAnimation',
  component: NumberAnimation,
  tags: ['autodocs'],
  argTypes: {
    to: {
      control: { type: 'number' },
      description: '目標數值'
    },
    from: {
      control: { type: 'number' },
      description: '起始數值'
    },
    precision: {
      control: { type: 'number', min: 0, max: 10 },
      description: '小數位數（設定後會強制顯示指定位數的小數）'
    },
    showSeparator: {
      control: 'boolean',
      description: '是否顯示千分位分隔符'
    },
    active: {
      control: 'boolean',
      description: '是否啟動動畫'
    },
    duration: {
      control: { type: 'number', min: 100, max: 5000 },
      description: '動畫持續時間（毫秒）'
    },
    formatOptions: {
      control: 'object',
      description: '格式化選項'
    },
    formatter: {
      control: false,
      description: '自定義格式化函數 (value: number, precision: number) => string，需確保返回值包含指定的小數位數'
    }
  }
} satisfies Meta<typeof NumberAnimation>

export default meta
type Story = StoryObj<typeof meta>

// 基本用法
export const Basic: Story = {
  args: {
    to: 123,
    precision: 2,
    showSeparator: true,
    active: true
  }
}

// 自定義格式化選項
export const CustomFormat: Story = {
  args: {
    to: 9876543.21,
    precision: 2,
    showSeparator: true,
    formatOptions: {
      thousandsSeparator: ' ',
      decimalSeparator: ','
    },
    active: true
  }
}

// 使用 Intl 格式化
export const IntlFormat: Story = {
  args: {
    to: 1234567.89,
    precision: 2,
    active: true,
    formatter: (value: number, precision: number) => {
      if (typeof Intl === 'undefined') {
        return value.toFixed(precision)
      }
      return new Intl.NumberFormat('zh-TW', {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
      }).format(value)
    }
  }
}

// 貨幣格式化
export const CurrencyFormat: Story = {
  args: {
    to: 9876.54,
    precision: 2,
    active: true,
    formatter: (value: number, precision: number) => {
      if (typeof Intl === 'undefined') {
        return `$${value.toFixed(precision)}`
      }
      return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD',
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
      }).format(value)
    }
  }
}

// 整數顯示小數
export const IntegerWithDecimals: Story = {
  args: {
    to: 123,
    precision: 2,
    showSeparator: true,
    active: true
  },
  parameters: {
    docs: {
      description: {
        story: '當設定 precision 時，即使是整數也會顯示指定位數的小數位'
      }
    }
  }
}

// 動畫控制
export const AnimationControl: Story = {
  args: {
    from: 0,
    to: 10000,
    duration: 3000,
    showSeparator: true,
    active: true
  }
}

// 高精度
export const HighPrecision: Story = {
  args: {
    to: 123.456789,
    precision: 6,
    showSeparator: true,
    active: true
  }
}

// 無分隔符
export const NoSeparator: Story = {
  args: {
    to: 1234567.89,
    precision: 2,
    showSeparator: false,
    active: true
  }
}
