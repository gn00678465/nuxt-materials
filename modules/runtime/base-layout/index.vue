<script setup lang="ts">
import type { VNode } from 'vue'
import { computed } from 'vue'
import type { BaseLayoutProps } from './types'
import { LAYOUT_MAX_Z_INDEX, LAYOUT_SCROLL_EL_ID, createLayoutCssVars } from './helpers'

defineOptions({
  name: 'BaseLayout',
})

const props = withDefaults(defineProps<BaseLayoutProps>(), {
  mode: 'vertical',
  scrollMode: 'content',
  scrollElId: LAYOUT_SCROLL_EL_ID,
  commonClass: 'transition-all-300',
  fixedTop: true,
  maxZIndex: LAYOUT_MAX_Z_INDEX,
  headerVisible: true,
  headerHeight: 56,
  tabVisible: true,
  tabHeight: 48,
  siderVisible: true,
  siderCollapse: false,
  siderWidth: 220,
  siderCollapsedWidth: 64,
  footerVisible: true,
  footerHeight: 48,
  rightFooter: false,
})

interface Emits {
  /** Update siderCollapse */
  (e: 'update:siderCollapse', collapse: boolean): void
}

const emit = defineEmits<Emits>()

type SlotFn = (props?: Record<string, unknown>) => VNode | VNode[]

type Slots = {
  /** Main */
  default?: SlotFn
  /** Header */
  header?: SlotFn
  /** Tab */
  tab?: SlotFn
  /** Sider */
  sider?: SlotFn
  /** Footer */
  footer?: SlotFn
}

const slots = defineSlots<Slots>()

const cssVars = computed(() => createLayoutCssVars(props))

// config visible
const showHeader = computed(() => Boolean(slots.header) && props.headerVisible)
const showTab = computed(() => Boolean(slots.tab) && props.tabVisible)
const showSider = computed(() => !props.isMobile && Boolean(slots.sider) && props.siderVisible)
const showMobileSider = computed(() => props.isMobile && Boolean(slots.sider) && props.siderVisible)
const showFooter = computed(() => Boolean(slots.footer) && props.footerVisible)

// scroll mode
const isWrapperScroll = computed(() => props.scrollMode === 'wrapper')
const isContentScroll = computed(() => props.scrollMode === 'content')

// layout direction
const isVertical = computed(() => props.mode === 'vertical')
const isHorizontal = computed(() => props.mode === 'horizontal')

const fixedHeaderAndTab = computed(() => props.fixedTop || (isHorizontal.value && isWrapperScroll.value))

// css
const leftGapClass = computed(() => {
  if (!props.fullContent && showSider.value) {
    return props.siderCollapse ? 'left-gap_collapsed' : 'left-gap'
  }

  return ''
})

const headerLeftGapClass = computed(() => (isVertical.value ? leftGapClass.value : ''))

const footerLeftGapClass = computed(() => {
  const shouldApplyGap = isVertical.value
    || (isHorizontal.value && isWrapperScroll.value && !props.fixedFooter)
    || (isHorizontal.value && props.rightFooter)

  return shouldApplyGap ? leftGapClass.value : ''
})

const siderPaddingClass = computed(() => {
  const classes = []

  if (showHeader.value && !headerLeftGapClass.value) {
    classes.push('sider-padding-top')
  }
  if (showFooter.value && !footerLeftGapClass.value) {
    classes.push('sider-padding-bottom')
  }

  return classes.join(' ')
})

function handleClickMask() {
  emit('update:siderCollapse', true)
}
</script>

<template>
  <div
    :class="['layout-container', commonClass]"
    :style="cssVars"
  >
    <div
      :id="isWrapperScroll ? scrollElId : undefined"
      :class="[
        'scroll-wrapper',
        commonClass,
        scrollWrapperClass,
        isWrapperScroll && 'scroll-wrapper-scrollable',
      ]"
    >
      <!-- Header -->
      <template v-if="showHeader">
        <header
          v-show="!fullContent"
          :class="[
            'layout-header-base',
            'layout-header',
            commonClass,
            headerClass,
            headerLeftGapClass,
            fixedHeaderAndTab && 'layout-header-fixed',
          ]"
        >
          <slot name="header" />
        </header>
        <div
          v-show="!fullContent && fixedHeaderAndTab"
          class="layout-header-placement"
        />
      </template>

      <!-- Tab -->
      <template v-if="showTab">
        <div
          :class="[
            'layout-tab-base',
            'layout-tab',
            commonClass,
            tabClass,
            (fullContent || !showHeader) && 'layout-tab-top',
            leftGapClass,
            fixedHeaderAndTab && 'layout-tab-fixed',
          ]"
        >
          <slot name="tab" />
        </div>
        <div
          v-show="!fullContent && fixedHeaderAndTab"
          class="layout-tab-placement"
        />
      </template>

      <!-- Sider -->
      <template v-if="showSider">
        <aside
          v-show="!fullContent"
          :class="[
            'layout-sider-base',
            commonClass,
            siderClass,
            siderPaddingClass,
            siderCollapse ? 'layout-sider_collapsed' : 'layout-sider',
          ]"
        >
          <slot name="sider" />
        </aside>
      </template>

      <!-- Mobile Sider -->
      <template v-if="showMobileSider">
        <aside
          :class="[
            'layout-mobile-sider-base',
            commonClass,
            mobileSiderClass,
            'layout-mobile-sider',
            siderCollapse ? 'layout-mobile-sider-hidden' : 'layout-sider',
          ]"
        >
          <slot name="sider" />
        </aside>
        <div
          v-show="!siderCollapse"
          :class="['layout-mobile-sider-mask-base', 'layout-mobile-sider-mask']"
          @click="handleClickMask"
        />
      </template>

      <!-- Main Content -->
      <main
        :id="isContentScroll ? scrollElId : undefined"
        :class="[
          'layout-content',
          commonClass,
          contentClass,
          leftGapClass,
          isContentScroll && 'layout-content-scrollable',
        ]"
      >
        <slot />
      </main>

      <!-- Footer -->
      <template v-if="showFooter">
        <footer
          v-show="!fullContent"
          :class="[
            'layout-footer-base',
            'layout-footer',
            commonClass,
            footerClass,
            footerLeftGapClass,
            fixedFooter && 'layout-footer-fixed',
          ]"
        >
          <slot name="footer" />
        </footer>
        <div
          v-show="!fullContent && fixedFooter"
          class="layout-footer-placement"
        />
      </template>
    </div>
  </div>
</template>

<style scoped src="./styles/index.css" />
