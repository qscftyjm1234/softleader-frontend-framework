<!-- Author: antigravity -->

# 第十課：API 串接與資料層

本課程教您如何串接後端資料。我們採用「資料倉庫（Repository）」模式，讓您的程式碼保持整潔且具備高度維護性。

---

## 1. 整體架構

本專案的 API 資料層分為三層：

一
`useClient('/endpoint')` — 建立 API 客戶端，提供 `.get()`、`.post()`、`.put()`、`.delete()` 等方法。
二
`repositories/modules/xxx.ts` — 定義各模組的 API 方法，每個檔案負責一個功能領域。
三
`useRepository()` — 在元件中呼叫的入口，一行即可取得所有模組。

流程如下：

```
元件呼叫 useRepository()
  → 取得 { user, auth, ... }
    → 各模組內部使用 useClient() 發送請求
```

---

## 2. 建立資料倉庫模組

每個模組檔案放在 `repositories/modules/` 下，負責一個功能領域的所有 API。

### 2.1 範例：使用者模組

(1.) 在 `repositories/modules/` 資料夾下建立 `user.ts`。
(2.) 貼入以下完整程式碼：

```typescript
import type { UseFetchOptions } from 'nuxt/app'

type MaybeRef<T> = T | Ref<T>

interface UserQueryParams {
  page?: MaybeRef<number>
  itemsPerPage?: MaybeRef<number>
  q?: MaybeRef<string>
}

// 定義 Client，指向 /users
const api = useClient('/users')

export default {
  /**
   * 取得使用者列表
   * @param params - 查詢參數 (如分頁、搜尋關鍵字)
   * @param options - 其他 Fetch 選項
   */
  getUsers(params: UserQueryParams = {}, options: UseFetchOptions<any> = {}) {
    return api.get('/', {
      query: params,
      ...options
    })
  },

  /**
   * 根據 ID 取得單一使用者
   * @param id - 使用者 ID
   */
  getUserById(id: MaybeRef<number>) {
    return api.get(`/${unref(id)}`)
  },

  /**
   * 建立使用者
   */
  createUser(userData: any) {
    return api.post('/', userData)
  },

  /**
   * 更新使用者
   */
  updateUser(id: number, userData: any) {
    return api.put(`/${id}`, userData)
  },

  /**
   * 刪除使用者
   */
  deleteUser(id: number) {
    return api.delete(`/${id}`)
  }
}
```

### 2.2 範例：認證模組

```typescript
import type { UseFetchOptions } from 'nuxt/app'

// 定義 Client，指向 /auth
const api = useClient('/auth')

export default {
  /**
   * 使用者登入
   * @param credentials { username, password }
   */
  login(credentials: any, options: UseFetchOptions<any> = {}) {
    return api.post('/login', credentials, options)
  },

  /**
   * 使用者登出
   */
  logout() {
    return api.post('/logout')
  },

  /**
   * 取得當前使用者資訊
   */
  getProfile() {
    return api.get('/me')
  }
}
```

---

## 3. 註冊模組

所有模組都需要在 `repositories/index.ts` 中統一註冊。

(1.) 開啟 `repositories/index.ts`。
(2.) 將新模組 import 進來並加入物件中：

```typescript
import user from './modules/user'
import auth from './modules/auth'

/**
 * Repository Index (資料層)
 *
 * 職責：
 * 1. 匯入 modules 資料夾下的所有模組
 * 2. 將它們打包成一個大物件匯出
 */

const repositories = {
  user,
  auth
}

export default repositories
```

> 新增模組時，只需在 `modules/` 下建立檔案，然後在這裡 import 並加入 `repositories` 物件即可。

---

## 4. 在頁面中使用

透過 `useRepository()` 取得所有模組，然後直接呼叫方法。

(1.) 在 `pages/` 資料夾下建立 `user-list.vue`。
(2.) 貼入以下完整程式碼：

```vue
<template>
  <div class="p-10 min-h-screen bg-slate-50">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-black text-slate-900 mb-8 px-2">使用者管理</h1>

      <!-- 讀取狀態 -->
      <div
        v-if="pending"
        class="flex justify-center p-20"
      >
        <div
          class="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"
        ></div>
      </div>

      <!-- 資料清單 -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div
          v-for="item in data"
          :key="item.id"
          class="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black"
            >
              {{ item.id }}
            </div>
            <div>
              <h3 class="text-xl font-bold text-slate-800">{{ item.name }}</h3>
              <p class="text-slate-400 text-sm italic">{{ item.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 取得 user 模組
const { user } = useRepository()

// 呼叫 API 並取得響應式資料
const { data, pending } = await user.getUsers()

definePageMeta({
  title: '使用者清單範例',
  layout: 'portal'
})
</script>
```

---

## 5. useClient 提供的方法

`useClient` 建立的客戶端提供以下常用方法：

| 方法                             | 用途     | 範例                          |
| -------------------------------- | -------- | ----------------------------- |
| `api.get(path, options?)`        | 查詢資料 | `api.get('/')`                |
| `api.post(path, body, options?)` | 新增資料 | `api.post('/', userData)`     |
| `api.put(path, body, options?)`  | 更新資料 | `api.put(`/${id}`, userData)` |
| `api.delete(path, options?)`     | 刪除資料 | `api.delete(`/${id}`)`        |

---

## 6. Options 常用選項

方法中的 `options` 參數型態是 `UseFetchOptions`，以下是最常用的設定：

### 請求相關

| 選項      | 型態     | 說明                          | 範例                      |
| --------- | -------- | ----------------------------- | ------------------------- |
| `query`   | `object` | 查詢參數，會變成 `?key=value` | `{ page: 1, q: 'test' }`  |
| `headers` | `object` | 自訂請求標頭                  | `{ 'X-Custom': 'value' }` |
| `timeout` | `number` | 逾時時間（毫秒）              | `5000`                    |

### 行為控制

| 選項        | 型態        | 說明                                         |
| ----------- | ----------- | -------------------------------------------- |
| `immediate` | `boolean`   | `false` = 不立即執行，等手動呼叫 `execute()` |
| `server`    | `boolean`   | `false` = 只在客戶端執行，不在 SSR 時呼叫    |
| `watch`     | `Ref[]`     | 監聽的響應式變數，變化時自動重新請求         |
| `default`   | `() => any` | 資料的預設值，例如 `() => []`                |

### 回呼函式

| 選項                              | 說明                                     |
| --------------------------------- | ---------------------------------------- |
| `onRequest({ request, options })` | 請求送出前攔截，可修改 headers 等        |
| `onResponse({ response })`        | 收到回應後處理                           |
| `onRequestError({ error })`       | 請求失敗時處理（例如網路斷線）           |
| `onResponseError({ response })`   | 回應狀態碼非 2xx 時處理（例如 401、500） |

### 實際範例

```typescript
getUsers(params: UserQueryParams = {}, options: UseFetchOptions<any> = {}) {
  return api.get('/', {
    query: params,
    default: () => [],       // 預設空陣列
    watch: [params.page],    // page 變化時自動重新請求
    ...options               // 讓呼叫端可以覆蓋任何設定
  })
}
```

> 最後的 `...options` 是關鍵：模組裡設好預設值，但呼叫的頁面還是可以覆蓋任何選項。

---

## 7. 設定開發環境

如果是本地開發且後端尚未準備好，本系統提供完整的模擬資料功能。

(1.) 開啟 `.env.development` 檔案。
(2.) 確保以下設定已啟用：

```ini
NUXT_PUBLIC_FEATURE_API_MOCK=true
```

---

## 8. 小結

一
使用 `useClient('/endpoint')` 建立 API 客戶端，集中管理請求的基礎路徑。
二
每個功能領域建立獨立的模組檔案（如 `user.ts`、`auth.ts`），放在 `repositories/modules/` 下。
三
在 `repositories/index.ts` 中統一註冊所有模組。
四
在元件中透過 `useRepository()` 取得模組，例如 `const { user } = useRepository()`。
五
善用系統內建的讀取狀態控制（Pending），提供更好的使用體驗。

---

[上一課 第九課：資料格式化工具](./lesson-9.md) | [下一課 第十一課：全域狀態管理 (Pinia)](./lesson-11.md) | [回首頁](../../README.md)
