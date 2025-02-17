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
      description: '小數位數'
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
    }
  }
} satisfies Meta<typeof NumberAnimation>

export default meta
type Story = StoryObj<typeof meta>

// 基本用法
export const Basic: Story = {
  args: {
    to: 1234.56,
    precision: 2,
    showSeparator: true,
    active: true
  }
}

// 自定義格式化
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
