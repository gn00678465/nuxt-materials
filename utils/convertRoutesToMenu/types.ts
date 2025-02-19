import type { RouteRecordRaw } from 'vue-router'

export interface BaseMenuItem {
  path: string
  name: string
  title: string
  children?: (BaseMenuItem | GroupMenuItem)[]
  meta?: {
    [key: string]: unknown
  }
  [key: string]: unknown
}

export interface GroupMenuItem extends Omit<BaseMenuItem, 'children'> {
  type: 'group'
  children?: unknown[]
}

export interface MenuConversionOptions<T> {
  /**
   * Filter function to exclude routes from menu
   */
  filter?: (route: RouteRecordRaw) => boolean

  /**
   * Function to determine if a route should be flattened
   */
  shouldFlatten?: (route: RouteRecordRaw) => boolean

  /**
   * Sort function for routes before transformation
   * This runs before transform to ensure sorting is based on original route data
   */
  sort?: (a: RouteRecordRaw, b: RouteRecordRaw) => number

  /**
   * Transform function to convert route to custom menu item type
   * This runs after sorting to ensure proper order is maintained
   * If provided, the return value will completely replace the default menu item
   */
  transform?: (route: RouteRecordRaw) => T

  /**
   * Transform function to convert route to group menu item
   * This runs after sorting and before regular transform
   * If provided and returns a value, the route will be treated as a group
   */
  groupTransform?: (route: RouteRecordRaw, parentPath: string) => Omit<GroupMenuItem, 'type'> | null
}

export type ConvertRoutesToMenu = <T = BaseMenuItem>(
  routes: RouteRecordRaw[],
  options?: MenuConversionOptions<T>
) => (T | GroupMenuItem)[]
