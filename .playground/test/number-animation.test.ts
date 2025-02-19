import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NumberAnimation from '../../components/number-animation/NumberAnimation'

describe.skip('NumberAnimation', () => {
  it('renders with default props', async () => {
    const wrapper = mount(NumberAnimation)
    expect(wrapper.text()).toBe('0')
  })

  it('formats number with custom precision', async () => {
    const wrapper = mount(NumberAnimation, {
      props: {
        to: 1234.5678,
        precision: 2
      }
    })
    expect(wrapper.text()).toBe('1234.57')
  })

  it('applies thousand separator when showSeparator is true', async () => {
    const wrapper = mount(NumberAnimation, {
      props: {
        to: 1234567,
        showSeparator: true
      }
    })
    expect(wrapper.text()).toBe('1,234,567')
  })

  it('uses custom format options', async () => {
    const wrapper = mount(NumberAnimation, {
      props: {
        to: 1234.56,
        precision: 2,
        showSeparator: true,
        formatOptions: {
          thousandsSeparator: ' ',
          decimalSeparator: ','
        }
      }
    })
    expect(wrapper.text()).toBe('1 234,56')
  })

  it('starts animation when active prop is true', async () => {
    const wrapper = mount(NumberAnimation, {
      props: {
        from: 0,
        to: 100,
        active: true,
        duration: 100
      }
    })

    // 等待動畫完成
    await new Promise(resolve => setTimeout(resolve, 150))
    expect(wrapper.text()).toBe('100')
  })

  it('calls onFinish callback after animation completes', async () => {
    let finished = false
    mount(NumberAnimation, {
      props: {
        from: 0,
        to: 100,
        active: true,
        duration: 100,
        onFinish: () => {
          finished = true
        }
      }
    })

    await new Promise(resolve => setTimeout(resolve, 150))
    expect(finished).toBe(true)
  })
})
