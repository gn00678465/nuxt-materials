import { computed, defineComponent, onMounted, type PropType, ref, watchEffect } from 'vue'
import { tween } from './utils'

export interface FormatOptions {
  thousandsSeparator?: string
  decimalSeparator?: string
}

export const numberAnimationProps = {
  to: {
    type: Number,
    default: 0
  },
  precision: {
    type: Number,
    default: 0
  },
  showSeparator: Boolean,
  from: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 2000
  },
  formatOptions: {
    type: Object as PropType<FormatOptions>,
    default: () => ({
      thousandsSeparator: ',',
      decimalSeparator: '.'
    })
  },
  onFinish: Function as PropType<() => void>
}

export interface NumberAnimationInst {
  play: () => void
}

export default defineComponent({
  name: 'NumberAnimation',
  props: numberAnimationProps,

  setup(props) {
    const displayedValueRef = ref(props.from)
    const { duration } = props

    let animating = false

    const onUpdate = (currentValue: number): void => {
      displayedValueRef.value = currentValue
    }

    const onFinish = (): void => {
      displayedValueRef.value = props.to
      animating = false
      props.onFinish?.()
    }

    const animate = (
      from: number = props.from,
      to: number = props.to
    ): void => {
      animating = true
      displayedValueRef.value = props.from

      if (from !== to) {
        tween({
          from,
          to,
          duration,
          onUpdate,
          onFinish
        })
      }
    }

    const formatNumber = (num: number, precision: number, options: FormatOptions): string => {
      const { thousandsSeparator = ',', decimalSeparator = '.' } = options
      const rounded = Math.round(num * (10 ** precision)) / (10 ** precision)
      const [integerPart, decimalPart = ''] = rounded.toString().split('.')

      // 處理整數部分的千分位
      const formattedInteger = props.showSeparator
        ? integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)
        : integerPart

      // 如果有小數部分，加上小數分隔符
      return decimalPart
        ? `${formattedInteger}${decimalSeparator}${decimalPart}`
        : formattedInteger
    }

    const formattedValueRef = computed(() => {
      const value = displayedValueRef.value
      const formatted = formatNumber(value, props.precision, props.formatOptions)
      const [integer, decimal = ''] = formatted.split(props.formatOptions.decimalSeparator ?? '.')

      return {
        integer,
        decimal,
        decimalSeparator: props.formatOptions.decimalSeparator
      }
    })

    function play(): void {
      if (animating) return
      animate()
    }

    onMounted(() => {
      watchEffect(() => {
        if (props.active) animate()
      })
    })

    const exposedMethods: NumberAnimationInst = {
      play
    }

    return {
      formattedValue: formattedValueRef,
      ...exposedMethods
    }
  },

  render() {
    const {
      formattedValue: { integer, decimal, decimalSeparator }
    } = this
    return [integer, decimal ? decimalSeparator : null, decimal]
  }
})
