[← 返回文件導覽](../index.md)

# 插件系統 (Plugins)

Nuxt 3 的插件系統允許在應用程式啟動時註冊全域功能、第三方套件或自訂邏輯。

## 插件架構

```
plugins/
├── api.ts                # API 整合層
├── ant-design.ts         # Ant Design Vue 框架
├── dayjs.global.ts       # Day.js 日期處理
└── security.client.ts    # 前端資安防護 (僅客戶端)
```

---

## 1. api.ts - API 整合層

### 職責

將 `repositories` (資料層) 掛載到 Nuxt App,提供全域 `$api` 存取點。

### 實作方式

```typescript
import repositories from '~/repositories'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      api: repositories
    }
  }
})
```

### 使用範例

```vue
<script setup lang="ts">
const { $api } = useNuxtApp()

// 呼叫 User 模組
const { data: users } = await $api.user.getUsers()

// 呼叫 Order 模組
const { data: order } = await $api.order.getOrderById(1)
</script>
```

### 優點

- **全域存取**: 在任何元件中都能使用 `$api`
- **型別安全**: 完整的 TypeScript 支援
- **集中管理**: 所有 API 呼叫統一管理

---

## 2. ant-design.ts - UI 框架

### 職責

初始化 Ant Design Vue UI 框架,提供豐富的企業級 UI 元件。

### 實作方式

透過 `@ant-design-vue/nuxt` 模組自動處理大部分配置。但在需要進階自訂 (如全域配置 ConfigProvider) 時，可透過插件進行設定。

Nuxt Config:

```typescript
export default defineNuxtConfig({
  modules: ['@ant-design-vue/nuxt', '@nuxtjs/tailwindcss'],
  antd: {
    // 這裡可以配置 Ant Design Vue 全域選項
  }
})
```

### 使用範例

```vue
<template>
  <a-button type="primary">按鈕</a-button>
  <a-card
    title="卡片標題"
    class="shadow-md"
  >
    <p>卡片內容</p>
  </a-card>
</template>
```

### 樣式整合 (Tailwind CSS)

Ant Design Vue 元件可以無縫搭配 Tailwind CSS Utility Classes 使用：

```vue
<a-button class="!bg-teal-500 hover:!bg-teal-600">自訂顏色按鈕</a-button>
```

---

## 3. dayjs.global.ts - 日期處理

### 職責

初始化 Day.js 日期處理庫,提供全域日期格式化功能。

### 實作方式

```typescript
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'

export default defineNuxtPlugin(() => {
  // 設定語言
  dayjs.locale('zh-tw')

  // 載入插件
  dayjs.extend(relativeTime)
  dayjs.extend(customParseFormat)

  return {
    provide: {
      dayjs
    }
  }
})
```

### 使用範例

```vue
<script setup lang="ts">
const { $dayjs } = useNuxtApp()

// 格式化日期
const formattedDate = $dayjs().format('YYYY-MM-DD')

// 相對時間
const relativeTime = $dayjs('2024-01-01').fromNow() // "3 個月前"

// 解析日期
const parsed = $dayjs('2024-01-01', 'YYYY-MM-DD')
</script>
```

---

## 4. security.client.ts - 前端資安防護

### 職責

實作前端資安防護機制,增加資料洩漏難度。

> **注意**: `.client.ts` 後綴表示此插件僅在客戶端執行

### 主要功能

1. **禁用右鍵選單** - 防止複製內容
2. **禁用開發者工具快捷鍵** - 阻止 F12、Ctrl+Shift+I
3. **禁用文字選取** - 防止複製文字
4. **禁用拖曳** - 防止拖曳圖片/連結
5. **截圖偵測** - 偵測 PrintScreen 按鍵
6. **視窗失焦模糊** - 切換視窗時模糊畫面
7. **螢幕錄影偵測** - 偵測 Screen Capture API
8. **閒置超時鎖定** - 閒置一段時間後鎖定畫面
9. **Kiosk 模式** - 全螢幕模式

### 啟用方式

在 `nuxt.config.ts` 中設定:

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      enableSecurityMode: true // 啟用資安模式
    }
  }
})
```

### 環境變數

```bash
# .env
NUXT_PUBLIC_ENABLE_SECURITY_MODE=true
```

### 自訂配置

```typescript
// core/config/security/options.ts
export const defaultSecurityOptions = {
  disableContextMenu: true, // 禁用右鍵
  disableDevTools: true, // 禁用開發者工具
  disableTextSelection: true, // 禁用文字選取
  disablePrintScreen: true, // 禁用截圖
  blurOnVisibilityChange: true, // 失焦時模糊
  idleTimeoutBlur: true, // 閒置超時
  idleTimeoutDuration: 300000, // 5 分鐘
  enableKioskMode: false // Kiosk 模式
}
```

---

## 插件開發規範

### 1. 插件命名規範

| 後綴         | 執行環境          | 範例                 |
| :----------- | :---------------- | :------------------- |
| `.ts`        | 伺服器端 + 客戶端 | `api.ts`             |
| `.client.ts` | 僅客戶端          | `security.client.ts` |
| `.server.ts` | 僅伺服器端        | `database.server.ts` |

### 2. 插件結構

```typescript
export default defineNuxtPlugin((nuxtApp) => {
  // 初始化邏輯
  const myService = createMyService()

  // 提供全域存取
  return {
    provide: {
      myService
    }
  }
})
```

### 3. 使用 provide 提供全域功能

```typescript
export default defineNuxtPlugin(() => {
  return {
    provide: {
      hello: (name: string) => `Hello ${name}!`
    }
  }
})
```

使用方式:

```vue
<script setup lang="ts">
const { $hello } = useNuxtApp()
console.log($hello('World')) // "Hello World!"
</script>
```

### 4. 型別定義

```typescript
// types/plugins.d.ts
declare module '#app' {
  interface NuxtApp {
    $hello: (name: string) => string
    $dayjs: typeof import('dayjs')
  }
}

export {}
```

---

## 常見插件範例

### 1. Toast 通知插件

```typescript
// plugins/toast.ts
export default defineNuxtPlugin(() => {
  const toast = {
    success: (message: string) => {
      console.log('✅', message)
    },
    error: (message: string) => {
      console.error('❌', message)
    },
    info: (message: string) => {
      console.info('ℹ️', message)
    }
  }

  return {
    provide: { toast }
  }
})
```

使用:

```vue
<script setup lang="ts">
const { $toast } = useNuxtApp()

$toast.success('操作成功!')
$toast.error('發生錯誤')
</script>
```

### 2. 權限檢查插件

```typescript
// plugins/permission.ts
export default defineNuxtPlugin(() => {
  const hasPermission = (permission: string) => {
    const userStore = useUserStore()
    return userStore.permissions.includes(permission)
  }

  return {
    provide: { hasPermission }
  }
})
```

使用:

```vue
<script setup lang="ts">
const { $hasPermission } = useNuxtApp()

if ($hasPermission('admin.users.edit')) {
  // 顯示編輯按鈕
}
</script>
```

### 3. 全域事件總線

```typescript
// plugins/eventBus.ts
import mitt from 'mitt'

export default defineNuxtPlugin(() => {
  const emitter = mitt()

  return {
    provide: {
      event: emitter
    }
  }
})
```

使用:

```vue
<script setup lang="ts">
const { $event } = useNuxtApp()

// 發送事件
$event.emit('user-updated', { id: 1 })

// 監聽事件
$event.on('user-updated', (data) => {
  console.log('User updated:', data)
})
</script>
```

---

## 插件執行順序

Nuxt 會按照以下順序載入插件:

1. **Nuxt 內建插件**
2. **專案 plugins/ 目錄中的插件** (按字母順序)
3. **模組註冊的插件**

### 控制執行順序

使用數字前綴:

```
plugins/
├── 01.api.ts          # 第一個執行
├── 02.ant-design.ts   # 第二個執行
└── 03.security.client.ts
```

---

## 最佳實踐

### 1. 保持插件輕量

❌ **不推薦**: 在插件中執行大量邏輯

```typescript
export default defineNuxtPlugin(async () => {
  // ❌ 不要在插件中執行耗時操作
  await fetchLargeData()
  await initializeHeavyLibrary()
})
```

✅ **推薦**: 僅註冊,實際邏輯延遲執行

```typescript
export default defineNuxtPlugin(() => {
  return {
    provide: {
      fetchData: () => fetchLargeData() // 需要時才呼叫
    }
  }
})
```

### 2. 使用環境變數控制

```typescript
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  if (!config.public.enableFeature) {
    return // 功能未啟用,直接返回
  }

  // 初始化功能
})
```

### 3. 錯誤處理

```typescript
export default defineNuxtPlugin(() => {
  try {
    const service = initializeService()
    return { provide: { service } }
  } catch (error) {
    console.error('Plugin initialization failed:', error)
    // 提供降級方案
    return { provide: { service: null } }
  }
})
```

---

## 相關文件

- [API 指南](../api/guide.md)
- [資安機制](./security.md)
- [Nuxt Plugins 官方文件](https://nuxt.com/docs/guide/directory-structure/plugins)
