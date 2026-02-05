[← 返回 README.md](../../README.md)

# 佈局系統 (Layout System)

本專案使用 Nuxt 3 的佈局系統,提供可重用的頁面框架,讓不同頁面共享相同的 UI 結構。

## 佈局架構

```
layouts/
├── default.vue       # 預設佈局 (含 Header + Sidebar + Footer)
├── portal.vue        # Portal 佈局 (含側邊欄)
└── blank.vue         # 空白佈局 (無任何框架)
```

---

## 1. default.vue - 預設佈局

### 用途

適用於大部分頁面的標準佈局,包含完整的導航結構。

### 結構組成

- **AppHeader** - 頁首導航列
- **AppSidebar** - 側邊選單
- **Main Content** - 頁面主要內容區
- **AppFooter** - 頁尾資訊
- **GlobalSnackbar** - 全域通知

### 使用範例

```vue
<!-- pages/dashboard.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'default' // 或不指定,預設就是 default
})
</script>

<template>
  <div>
    <h1>儀表板</h1>
    <!-- 頁面內容 -->
  </div>
</template>
```

### 特色功能

- **響應式側邊欄**: 桌面版固定,手機版可收合
- **自動初始化**: 載入應用程式設定
- **全域通知**: 整合 GlobalSnackbar
- **手機版遮罩**: 側邊欄開啟時顯示遮罩

---

## 2. portal.vue - Portal 佈局

### 用途

適用於需要側邊欄導航的管理後台或 Portal 頁面。

### 結構組成

- **PortalHeader** - Portal 專用標題列
- **AppSidebar** - 側邊選單
- **Main Content** - 頁面主要內容區

### 使用範例

```vue
<!-- pages/admin/users.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'portal'
})
</script>

<template>
  <div>
    <h1>使用者管理</h1>
    <!-- 管理頁面內容 -->
  </div>
</template>
```

---

## 3. blank.vue - 空白佈局

### 用途

適用於不需要任何框架的頁面,如登入頁、錯誤頁、全螢幕頁面。

### 結構組成

僅包含 `<slot />`,沒有任何額外元件。

### 使用範例

```vue
<!-- pages/login.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'blank'
})
</script>

<template>
  <div class="login-page">
    <LoginForm />
  </div>
</template>
```

---

## 佈局元件

### AppHeader.vue

頁首導航列,包含:

- Logo
- 主選單
- 使用者選單
- 通知圖示

```vue
<template>
  <header class="app-header">
    <div class="logo">My App</div>
    <nav class="main-nav">
      <!-- 導航連結 -->
    </nav>
    <HeaderUserMenu />
  </header>
</template>
```

### AppSidebar.vue

側邊選單,包含:

- 選單項目列表
- 展開/收合控制
- 響應式設計

```vue
<template>
  <aside
    class="app-sidebar"
    :class="{ open: isOpen }"
  >
    <nav>
      <NuxtLink to="/dashboard">儀表板</NuxtLink>
      <NuxtLink to="/users">使用者</NuxtLink>
      <!-- 更多選單項目 -->
    </nav>
  </aside>
</template>
```

### PortalHeader.vue

Portal 專用標題列,針對管理後台設計。

---

## 在頁面中使用佈局

### 方法一: 使用 definePageMeta

```vue
<script setup lang="ts">
definePageMeta({
  layout: 'portal'
})
</script>
```

### 方法二: 使用 setPageLayout (動態切換)

```vue
<script setup lang="ts">
const route = useRoute()

// 根據路由動態切換佈局
if (route.path.startsWith('/admin')) {
  setPageLayout('portal')
} else {
  setPageLayout('default')
}
</script>
```

### 方法三: 使用 NuxtLayout 元件

```vue
<template>
  <NuxtLayout name="blank">
    <div>自訂內容</div>
  </NuxtLayout>
</template>
```

---

## 佈局開發規範

### 1. 保持佈局簡潔

佈局應該只負責「框架」,不包含業務邏輯。

✅ **正確**: 僅定義結構

```vue
<!-- layouts/default.vue -->
<template>
  <div class="app-layout">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
```

❌ **錯誤**: 包含業務邏輯

```vue
<!-- layouts/default.vue -->
<template>
  <div>
    <AppHeader />
    <main>
      <!-- ❌ 不應該在佈局中寫業務邏輯 -->
      <UserList v-if="isAdmin" />
      <slot />
    </main>
  </div>
</template>
```

### 2. 使用 Slot 傳遞內容

```vue
<!-- layouts/default.vue -->
<template>
  <div>
    <header>
      <!-- 具名 slot: 讓頁面自訂標題 -->
      <slot name="header">
        <h1>預設標題</h1>
      </slot>
    </header>

    <main>
      <!-- 預設 slot: 頁面主要內容 -->
      <slot />
    </main>

    <aside>
      <!-- 具名 slot: 側邊欄內容 -->
      <slot name="sidebar" />
    </aside>
  </div>
</template>
```

使用方式:

```vue
<!-- pages/dashboard.vue -->
<template>
  <div>
    <template #header>
      <h1>儀表板</h1>
    </template>

    <div>主要內容</div>

    <template #sidebar>
      <div>側邊欄內容</div>
    </template>
  </div>
</template>
```

### 3. 響應式設計

```vue
<template>
  <div class="app-layout">
    <!-- 桌面版: 固定側邊欄 -->
    <AppSidebar class="desktop-sidebar" />

    <!-- 手機版: 可收合側邊欄 -->
    <AppSidebar
      v-model="isMobileSidebarOpen"
      class="mobile-sidebar"
    />

    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.desktop-sidebar {
  display: none;
}

.mobile-sidebar {
  display: block;
}

@media (min-width: 768px) {
  .desktop-sidebar {
    display: block;
  }

  .mobile-sidebar {
    display: none;
  }
}
</style>
```

---

## 佈局狀態管理

### 使用 Store 管理佈局狀態

```typescript
// stores/app.ts
export const useAppStore = defineStore('app', () => {
  const drawer = ref(false)
  const config = ref({
    sidebar: {
      visible: true,
      pinned: false
    }
  })

  const toggleDrawer = () => {
    drawer.value = !drawer.value
  }

  return {
    drawer,
    config,
    toggleDrawer
  }
})
```

在佈局中使用:

```vue
<script setup lang="ts">
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()
</script>

<template>
  <div>
    <AppSidebar v-model="appStore.drawer" />
    <main>
      <slot />
    </main>
  </div>
</template>
```

---

## 最佳實踐

### 1. 為不同場景選擇合適的佈局

| 頁面類型 | 推薦佈局  | 原因         |
| :------- | :-------- | :----------- |
| 一般頁面 | `default` | 需要完整導航 |
| 管理後台 | `portal`  | 需要側邊欄   |
| 登入頁   | `blank`   | 不需要導航   |
| 錯誤頁   | `blank`   | 簡潔呈現     |
| 全螢幕頁 | `blank`   | 無框架干擾   |

### 2. 避免過度嵌套

❌ **不推薦**: 佈局中嵌套佈局

```vue
<!-- layouts/default.vue -->
<template>
  <NuxtLayout name="base">
    <AppHeader />
    <slot />
  </NuxtLayout>
</template>
```

✅ **推薦**: 使用元件組合

```vue
<!-- layouts/default.vue -->
<template>
  <div>
    <AppHeader />
    <slot />
  </div>
</template>
```

### 3. 使用 Transition 增加動畫

````vue
<template>
  <div>
    <AppHeader />
    <Transition name="page">
      <slot />
    </Transition>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>

--- ## 佈局切換的影響與注意事項 當切換到使用「不同佈局」的頁面時,Nuxt 會面臨以下情況： ### 1.
元件生命週期 (Component Lifecycle) - **重新掛載**: 當佈局名稱變更 (如從 `default` 換到
`blank`),舊佈局的元件會被卸載 (unmount),新佈局的元件會重新掛載 (mount)。 - **效能**:
如果佈局非常複雜,頻繁切換可能會有些微的渲染負擔。 ### 2. 狀態保存 (State Persistence) -
**元件內部狀態**: 儲存在佈局元件 (如 `AppHeader.vue`) 內的 `ref` 狀態**會遺失**。 - **全域狀態
(Pinia)**: 儲存在 Store 中的狀態**不會遺失**,這是跨頁面保存資料的最佳方式。 ### 3. 如何達成平滑切換
- **使用相同的佈局**: 如果只是選單收合或小部分 UI 變動,建議維持相同佈局,用 `v-if` 或 Store 控制。 -
**Layout Transitions**: 在 `app.vue` 或 `nuxt.config.ts` 設定過渡動畫,減少視覺閃爍。 ```typescript
// nuxt.config.ts export default defineNuxtConfig({ app: { layoutTransition: { name: 'layout', mode:
'out-in' } } })
````

---

## 相關文件

- [元件系統](./components.md)
- [開發規範](../guides/development.md)
- [Nuxt Layouts 官方文件](https://nuxt.com/docs/guide/directory-structure/layouts)
