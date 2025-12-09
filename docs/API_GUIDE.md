# API 開發指南 (API Development Guide)

歡迎加入團隊！這份文件將教你如何在這個專案中新增與使用 API。

## 1. 架構概覽

我們使用 Nuxt 3 的 Plugin 機制與 TypeScript 來提供全域的 API 存取。

- **`$api`**: 全域變數，可在任何地方使用。
- **`repositories/modules/*.ts`**: API 定義檔 (Repository)。
- **`scripts/generate-module.js`**: 自動生成模組與註冊 API 的腳本。

## 2. 如何使用 API

在 Vue Component (`.vue`) 或 Composable (`.ts`) 中：

```typescript
const { $api } = useNuxtApp()

// 範例：取得使用者列表
const { data: users } = await $api.user.getUsers()

// 範例：取得訂單詳情
const { data: order } = await $api.order.getOrderById(123)
```

> **💡 提示**：VS Code 支援自動補全，輸入 `$api.` 就會看到所有可用的模組。

## 3. 如何新增 API 模組

假設你要新增一個 `product` (產品) 模組：

### 步驟一：建立設定檔
在 `module-templates/` 新增 `product.yaml`：

```yaml
name: product
routes:
  - path: /list
    label: 產品列表
```

### 步驟二：執行生成腳本
開啟終端機執行：

```bash
node scripts/generate-module.js product
```

這個腳本會自動幫你做完所有事情：
1.  生成 `modules/product` 頁面結構。
2.  生成 `repositories/modules/product.ts` (API 定義檔)。
3.  **自動註冊** 到 `repositories/index.ts`。

### 步驟三：開始寫 API
去編輯 `repositories/modules/product.ts`，加入你的 API 方法：

```typescript
import { useApi } from '~/composables/useApi'

export default {
  getProducts() {
    return useApi('/products', { method: 'GET' })
  }
}
```

搞定！現在你可以直接用 `$api.product.getProducts()` 了。

## 4. 參數參考 (Reference)

### `useApi(url, options)`

`useApi` 繼承了 Nuxt `useFetch` 的所有參數，以下是常用參數說明：

#### 1. 請求相關 (Request)

| 參數 | 類型 | 說明 | 範例 |
| :--- | :--- | :--- | :--- |
| `method` | `'GET' \| 'POST' \| 'PUT' \| 'DELETE'` | HTTP 請求方法 (預設為 GET) | `method: 'POST'` |
| `query` | `Object` | URL 查詢參數，會自動轉為 `?key=value` | `query: { page: 1, q: 'keyword' }` |
| `body` | `Object` | Request Body，通常用於 POST/PUT，會自動轉為 JSON | `body: { name: 'Gino', age: 18 }` |
| `headers` | `Object` | 自定義 HTTP Headers | `headers: { 'X-Custom': 'value' }` |
| `params` | `Object` | 同 `query`，這是 `useFetch` 的別名 | `params: { id: 1 }` |

#### 2. 響應式與觸發 (Reactivity)

| 參數 | 類型 | 說明 | 範例 |
| :--- | :--- | :--- | :--- |
| `watch` | `Array<Ref>` | 當陣列中的變數改變時，自動重新發送請求 | `watch: [page, keyword]` |
| `immediate` | `boolean` | 是否在元件建立時立即發送請求 (預設 true) | `immediate: false` (手動觸發用) |

#### 3. 效能與體驗 (Performance)

| 參數 | 類型 | 說明 | 範例 |
| :--- | :--- | :--- | :--- |
| `lazy` | `boolean` | 是否延遲載入 (不阻塞頁面導航) | `lazy: true` (配合 pending 狀態顯示 Loading) |
| `server` | `boolean` | 是否在伺服器端執行 (預設 true) | `server: false` (只在瀏覽器端發送) |
| `pick` | `Array<string>` | 只回傳指定的欄位 (減少資料傳輸) | `pick: ['id', 'title']` |

#### 4. 回傳值 (Return Values)

`useApi` 回傳一個物件，包含以下響應式變數 (Ref)：

- `data`: API 回傳的資料 (成功時有值)。
- `pending`: `true` 代表請求中，可用來顯示 Loading。
- `error`: 失敗時的錯誤物件。
- `refresh()`: 函式，呼叫後可強制重新發送請求。
