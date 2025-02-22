# routeToMenu

將 Vue Router 路由配置轉換為選單結構，支援群組、巢狀結構、自定義轉換等功能。

## 功能特點

- 基本路由轉換：將路由配置轉換為選單項
- 群組支援：可將特定路由轉換為群組類型
- 巢狀結構：支援多層巢狀選單
- 自定義轉換：完全自定義的選單項結構
- 路徑處理：自動處理巢狀路徑
- 排序與過濾：支援選單項排序和過濾

## API

### convertRoutesToMenu

```typescript
function convertRoutesToMenu<T = BaseMenuItem>(
  routes: RouteRecordRaw[],
  options?: MenuConversionOptions<T>
): (T | GroupMenuItem)[]
```

#### 選項

```typescript
interface MenuConversionOptions<T> {
  // 過濾路由
  filter?: (route: RouteRecordRaw) => boolean

  // 判斷是否需要扁平化處理
  shouldFlatten?: (route: RouteRecordRaw) => boolean

  // 排序函數
  sort?: (a: RouteRecordRaw, b: RouteRecordRaw) => number

  // 轉換函數
  transform?: (route: RouteRecordRaw) => T
}
```

#### 回傳型別

```typescript
// 基本選單項
interface BaseMenuItem {
  path: string
  name: string
  title: string
  children?: (BaseMenuItem | GroupMenuItem)[]
  meta?: {
    [key: string]: unknown
  }
  [key: string]: unknown
}

// 群組選單項
interface GroupMenuItem extends Omit<BaseMenuItem, 'children'> {
  type: 'group'
  children?: (BaseMenuItem | GroupMenuItem)[]
}
```

## 使用範例

### 基本使用

```typescript
import { convertRoutesToMenu } from '@/shared/routeToMenu'

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { title: 'Dashboard' }
  },
  {
    path: '/users',
    name: 'Users',
    meta: { title: 'Users' }
  }
]

const menu = convertRoutesToMenu(routes)
```
### 自定義轉換

```typescript
interface CustomMenu {
  key: string
  label: string
  icon?: string
}

const menu = convertRoutesToMenu<CustomMenu>(routes, {
  transform: (route) => ({
    key: route.path,
    label: route.meta?.title as string,
    icon: route.meta?.icon as string
  })
})
```

### 排序與過濾

```typescript
const menu = convertRoutesToMenu(routes, {
  // 過濾隱藏的路由
  filter: (route) => !route.meta?.hidden,
  
  // 根據順序排序
  sort: (a, b) => ((a.meta?.order as number) || 0) - ((b.meta?.order as number) || 0)
})
```

### 扁平化處理

```typescript
const menu = convertRoutesToMenu(routes, {
  // 扁平化包裝用的路由
  shouldFlatten: (route) => route.meta?.isWrapper === true
})
