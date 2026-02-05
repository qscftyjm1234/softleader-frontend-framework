[← 返回 README.md](../../README.md)

# 狀態管理系統 (Pinia Stores)

本專案使用 Pinia 作為全域狀態管理工具,採用 Composition API 風格,提供型別安全的狀態管理。

## Store 架構總覽

```
stores/
├── app.ts           # 應用程式全域狀態
├── user.ts          # 使用者資料與權限
├── sidebar.ts       # 側邊欄狀態
└── features.ts      # 功能開關
```

---

## 1. app.ts - 應用程式全域狀態

### 職責

管理應用程式層級的全域狀態,包含主題、語言、載入狀態等。

### 主要狀態

```typescript
interface AppState {
  theme: 'light' | 'dark' // 主題模式
  locale: 'zh-TW' | 'en-US' // 語言設定
  isLoading: boolean // 全域載入狀態
  notifications: Notification[] // 通知列表
}
```

### 使用範例

```vue
<script setup lang="ts">
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()

// 讀取狀態
console.log(appStore.theme)

// 修改狀態
appStore.setTheme('dark')

// 切換主題
appStore.toggleTheme()
</script>
```

---

## 2. user.ts - 使用者狀態

### 職責

管理當前登入使用者的資料、權限、偏好設定。

### 主要狀態

```typescript
interface UserState {
  userData: User | null // 使用者資料
  token: string | null // 認證 Token
  permissions: string[] // 權限列表
  isAuthenticated: boolean // 是否已登入
}
```

### 主要 Actions

```typescript
{
  // 登入
  login(credentials: LoginCredentials): Promise<void>

  // 登出
  logout(): void

  // 取得使用者資料
  fetchUserData(): Promise<void>

  // 更新使用者資料
  updateUserData(data: Partial<User>): Promise<void>

  // 檢查權限
  hasPermission(permission: string): boolean
}
```

### 使用範例

```vue
<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

// 登入
await userStore.login({
  username: 'user@example.com',
  password: 'password123'
})

// 檢查登入狀態
if (userStore.isAuthenticated) {
  console.log('已登入:', userStore.userData?.name)
}

// 檢查權限
if (userStore.hasPermission('admin.users.edit')) {
  // 顯示編輯按鈕
}

// 登出
userStore.logout()
</script>
```

---

## 3. sidebar.ts - 側邊欄狀態

### 職責

管理側邊欄的展開/收合狀態、選單項目、導航狀態。

### 主要狀態

```typescript
interface SidebarState {
  isOpen: boolean // 是否展開
  isPinned: boolean // 是否固定
  activeItem: string | null // 當前選中項目
  menuItems: MenuItem[] // 選單項目列表
}
```

### 主要 Actions

```typescript
{
  // 切換側邊欄
  toggle(): void

  // 開啟側邊欄
  open(): void

  // 關閉側邊欄
  close(): void

  // 固定側邊欄
  pin(): void

  // 設定選中項目
  setActiveItem(itemId: string): void
}
```

### 使用範例

```vue
<script setup lang="ts">
import { useSidebarStore } from '~/stores/sidebar'

const sidebarStore = useSidebarStore()

// 切換側邊欄
const handleToggle = () => {
  sidebarStore.toggle()
}

// 響應式狀態
const isOpen = computed(() => sidebarStore.isOpen)
</script>

<template>
  <div>
    <button @click="handleToggle">{{ isOpen ? '關閉' : '開啟' }}側邊欄</button>

    <aside :class="{ open: isOpen }">
      <!-- 側邊欄內容 -->
    </aside>
  </div>
</template>
```

---

## 4. features.ts - 功能開關

### 職責

管理功能開關 (Feature Flags),控制特定功能的啟用/停用。

### 主要狀態

```typescript
interface FeaturesState {
  flags: Record<string, boolean> // 功能開關對照表
}
```

### 主要 Actions

```typescript
{
  // 檢查功能是否啟用
  isEnabled(feature: string): boolean

  // 啟用功能
  enable(feature: string): void

  // 停用功能
  disable(feature: string): void

  // 切換功能
  toggle(feature: string): void
}
```

### 使用範例

```vue
<script setup lang="ts">
import { useFeaturesStore } from '~/stores/features'

const featuresStore = useFeaturesStore()

// 檢查功能是否啟用
const showNewFeature = computed(() => featuresStore.isEnabled('new-dashboard'))
</script>

<template>
  <div>
    <NewDashboard v-if="showNewFeature" />
    <OldDashboard v-else />
  </div>
</template>
```

---

## Store 開發規範

### 1. 使用 Composition API 風格

✅ **推薦**: Setup Store

```typescript
export const useUserStore = defineStore('user', () => {
  // State
  const userData = ref<User | null>(null)
  const isAuthenticated = ref(false)

  // Getters
  const userName = computed(() => userData.value?.name ?? '訪客')

  // Actions
  const login = async (credentials: LoginCredentials) => {
    const { data } = await $api.auth.login(credentials)
    userData.value = data.user
    isAuthenticated.value = true
  }

  return {
    userData,
    isAuthenticated,
    userName,
    login
  }
})
```

### 2. 型別定義

```typescript
// types/store.ts
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

export interface LoginCredentials {
  username: string
  password: string
}
```

### 3. 持久化 (可選)

使用 `pinia-plugin-persistedstate` 持久化狀態:

```typescript
export const useUserStore = defineStore(
  'user',
  () => {
    // ...
  },
  {
    persist: {
      storage: localStorage,
      paths: ['userData', 'token']
    }
  }
)
```

---

## 最佳實踐

### 1. Store 職責單一

❌ **錯誤**: 一個 Store 管理太多東西

```typescript
// ❌ 不好: appStore 管理所有東西
export const useAppStore = defineStore('app', () => {
  const user = ref(null)
  const sidebar = ref(false)
  const theme = ref('light')
  const products = ref([])
  // ...太多狀態
})
```

✅ **正確**: 按職責拆分

```typescript
// ✅ 好: 拆分成多個 Store
export const useUserStore = defineStore('user', () => {
  /* ... */
})
export const useSidebarStore = defineStore('sidebar', () => {
  /* ... */
})
export const useThemeStore = defineStore('theme', () => {
  /* ... */
})
```

### 2. 使用 Getters 計算衍生狀態

```typescript
export const useUserStore = defineStore('user', () => {
  const userData = ref<User | null>(null)

  // ✅ 使用 computed 建立 getter
  const isAdmin = computed(() => userData.value?.role === 'admin')
  const fullName = computed(() => `${userData.value?.firstName} ${userData.value?.lastName}`)

  return { userData, isAdmin, fullName }
})
```

### 3. Actions 處理非同步邏輯

```typescript
export const useUserStore = defineStore('user', () => {
  const userData = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchUser = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await $api.users.getById(id)
      userData.value = data
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  return { userData, loading, error, fetchUser }
})
```

### 4. Store 之間的互動

```typescript
export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()

  const addToCart = (product: Product) => {
    // 檢查使用者是否登入
    if (!userStore.isAuthenticated) {
      navigateTo('/login')
      return
    }

    // 新增到購物車邏輯
  }

  return { addToCart }
})
```

---

## 在元件中使用 Store

### 基本用法

```vue
<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

// 直接使用
console.log(userStore.userData)

// 響應式解構 (需要使用 storeToRefs)
import { storeToRefs } from 'pinia'
const { userData, isAuthenticated } = storeToRefs(userStore)

// Actions 可以直接解構
const { login, logout } = userStore
</script>
```

### 在 Composables 中使用

```typescript
// composables/useAuth.ts
export const useAuth = () => {
  const userStore = useUserStore()

  const login = async (credentials: LoginCredentials) => {
    await userStore.login(credentials)
    navigateTo('/dashboard')
  }

  return { login }
}
```

---

## 相關文件

- [API 指南](../api/guide.md)
- [Composables](../../composables/README.md)
- [開發規範](../guides/development.md)
