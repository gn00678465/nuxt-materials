/** Header config */
interface BaseLayoutHeaderConfig {
  /**
   * Whether header is visible
   *
   * @default true
   */
  headerVisible?: boolean;
  /**
   * Header class
   *
   * @default ''
   */
  headerClass?: string;
  /**
   * Header height
   *
   * @default 56px
   */
  headerHeight?: number;
}

/** Tab config */
interface BaseLayoutTabConfig {
  /**
   * Whether tab is visible
   *
   * @default true
   */
  tabVisible?: boolean;
  /**
   * Tab class
   *
   * @default ''
   */
  tabClass?: string;
  /**
   * Tab height
   *
   * @default 48px
   */
  tabHeight?: number;
}

/** Sider config */
interface BaseLayoutSiderConfig {
  /**
   * Whether sider is visible
   *
   * @default true
   */
  siderVisible?: boolean;
  /**
   * Sider class
   *
   * @default ''
   */
  siderClass?: string;
  /**
   * Mobile sider class
   *
   * @default ''
   */
  mobileSiderClass?: string;
  /**
   * Sider collapse status
   *
   * @default false
   */
  siderCollapse?: boolean;
  /**
   * Sider width when collapse is false
   *
   * @default '220px'
   */
  siderWidth?: number;
  /**
   * Sider width when collapse is true
   *
   * @default '64px'
   */
  siderCollapsedWidth?: number;
}

/** Content config */
export interface BaseLayoutContentConfig {
  /**
   * Content class
   *
   * @default ''
   */
  contentClass?: string;
  /**
   * Whether content is full the page
   *
   * If true, other elements will be hidden by `display: none`
   */
  fullContent?: boolean;
}

/** Footer config */
export interface BaseLayoutFooterConfig {
  /**
   * Whether footer is visible
   *
   * @default true
   */
  footerVisible?: boolean;
  /**
   * Whether footer is fixed
   *
   * @default true
   */
  fixedFooter?: boolean;
  /**
   * Footer class
   *
   * @default ''
   */
  footerClass?: string;
  /**
   * Footer height
   *
   * @default 48px
   */
  footerHeight?: number;
  /**
   * Whether footer is on the right side
   *
   * When the layout is vertical, the footer is on the right side
   */
  rightFooter?: boolean;
}

/**
 * Layout mode
 *
 * - Horizontal
 * - Vertical
 */
export type LayoutMode = 'horizontal' | 'vertical';

/**
 * The scroll mode when content overflow
 *
 * - Wrapper: the layout component's wrapper element has a scrollbar
 * - Content: the layout component's content element has a scrollbar
 *
 * @default 'wrapper'
 */
export type LayoutScrollMode = 'wrapper' | 'content';

/** Admin layout props */
export interface BaseLayoutProps
  extends BaseLayoutHeaderConfig,
    BaseLayoutTabConfig,
    BaseLayoutSiderConfig,
    BaseLayoutContentConfig,
    BaseLayoutFooterConfig {
  /**
   * Layout mode
   *
   * - {@link LayoutMode}
   */
  mode?: LayoutMode;
  /** Is mobile layout */
  isMobile?: boolean;
  /**
   * Scroll mode
   *
   * - {@link ScrollMode}
   */
  scrollMode?: LayoutScrollMode;
  /**
   * The id of the scroll element of the layout
   *
   * It can be used to get the corresponding Dom and scroll it
   *
   * @example
   *   use the default id by import
   *   ```ts
   *   import { BaseLayoutScrollElId } from '@sa/vue-materials';
   *   ```
   *
   * @default
   * ```ts
   * const BaseLayoutScrollElId = '__ADMIN_LAYOUT_SCROLL_EL_ID__'
   * ```
   */
  scrollElId?: string;
  /** The class of the scroll element */
  scrollElClass?: string;
  /** The class of the scroll wrapper element */
  scrollWrapperClass?: string;
  /**
   * The common class of the layout
   *
   * Is can be used to configure the transition animation
   *
   * @default 'transition-all-300'
   */
  commonClass?: string;
  /**
   * Whether fix the header and tab
   *
   * @default true
   */
  fixedTop?: boolean;
  /**
   * The max z-index of the layout
   *
   * The z-index of Header,Tab,Sider and Footer will not exceed this value
   */
  maxZIndex?: number;
}

type Kebab<S extends string> = S extends Uncapitalize<S> ? S : `-${Uncapitalize<S>}`;

type KebabCase<S extends string> = S extends `${infer Start}${infer End}`
  ? `${Uncapitalize<Start>}${KebabCase<Kebab<End>>}`
  : S;

type Prefix = '--';

export type LayoutCssVarsProps = Pick<
  BaseLayoutProps,
  'headerHeight' | 'tabHeight' | 'siderWidth' | 'siderCollapsedWidth' | 'footerHeight'
> & {
  headerZIndex?: number;
  tabZIndex?: number;
  siderZIndex?: number;
  mobileSiderZIndex?: number;
  footerZIndex?: number;
};

export type LayoutCssVars = {
  [K in keyof LayoutCssVarsProps as `${Prefix}${KebabCase<K>}`]: string | number;
};

