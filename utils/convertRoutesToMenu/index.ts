import type { RouteRecordRaw } from 'vue-router'
import type { BaseMenuItem, GroupMenuItem, MenuConversionOptions, ConvertRoutesToMenu } from './types'

export function joinPaths(parentPath: string, childPath: string): string {
  const normalizedParent = parentPath.endsWith('/') ? parentPath.slice(0, -1) : parentPath
  const normalizedChild = childPath.startsWith('/') ? childPath.slice(1) : childPath
  return `${normalizedParent}/${normalizedChild}`
}

function createDefaultMenuItem(route: RouteRecordRaw, parentPath = ''): BaseMenuItem {
  const path = parentPath ? joinPaths(parentPath, route.path) : route.path
  return {
    path,
    name: route.name as string,
    title: route.meta?.title as string,
    meta: route.meta
  }
}

function processRoutes<T = BaseMenuItem>(
  routes: RouteRecordRaw[],
  options: MenuConversionOptions<T> = {},
  parentPath = ''
): (T | GroupMenuItem)[] {
  // First, filter routes if needed
  let processedRoutes = routes.filter(route => !options.filter || options.filter(route))

  // Apply sorting before any transformation
  if (options.sort) {
    processedRoutes.sort(options.sort)
  }

  const result: (T | GroupMenuItem)[] = []

  for (const route of processedRoutes) {
    // Handle flattening
    if (options.shouldFlatten?.(route) && route.children?.length) {
      const flattenedChildren = processRoutes(
        route.children,
        options,
        joinPaths(parentPath, route.path)
      )
      result.push(...flattenedChildren)
      continue
    }

    // Check if route should be treated as a group
    if (options.groupTransform) {
      const groupItem = options.groupTransform(route, parentPath)
      if (groupItem) {
        const groupMenuItem: GroupMenuItem = {
          ...groupItem,
          path: parentPath ? joinPaths(parentPath, route.path) : route.path,
          type: 'group'
        }

        // Process children if they exist
        if (route.children?.length) {
          const sortedChildren = [...route.children]
          if (options.sort) {
            sortedChildren.sort(options.sort)
          }

          const children = processRoutes(
            sortedChildren,
            options,
            joinPaths(parentPath, route.path)
          )
          if (children.length) {
            groupMenuItem.children = children
          }
        }

        result.push(groupMenuItem)
        continue
      }
    }

    // Create menu item (transform after sorting)
    const menuItem = options.transform
      ? options.transform(route)
      : createDefaultMenuItem(route, parentPath) as unknown as T

    // Process children if they exist
    if (route.children?.length) {
      // Sort children before transformation
      const sortedChildren = [...route.children]
      if (options.sort) {
        sortedChildren.sort(options.sort)
      }

      const children = processRoutes(
        sortedChildren,
        options,
        joinPaths(parentPath, route.path)
      )
      if (children.length) {
        ;(menuItem as any).children = children
      }
    }

    result.push(menuItem)
  }

  return result
}

export const convertRoutesToMenu: ConvertRoutesToMenu = (routes, options = {}) => {
  return processRoutes(routes, options)
}
