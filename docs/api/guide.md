[← 返回文件導覽](../index.md)

# 前端 API 開發規範指引

本專案採用 Nuxt 3 `useFetch` 為核心，並封裝成 `useApi` 與 `useClient`。
請遵循以下規範以確保程式碼統一、簡潔、易維護。

## API 指南

(`useClient`)

這是我們最新的標準寫法。透過 `useClient` 建立具備特定路徑前綴 (Prefix) 的客戶端，能大幅減少重複代碼。

### ❌ 舊寫法 (不推薦)

每次都要重複寫 prefix，容易出錯且冗長。

```typescript
useApi('/list', { prefix: '/jasmine-mar/policy', method: 'GET' })
```

### ✅ 新寫法 (標準)

```typescript
// repositories/modules/policy.ts
import { useClient } from '~/composables/useApi'

// 1. 定義 Client (集中管理路徑)
const api = useClient('/jasmine-mar/mar/policy')

export default {
  // 2. 直接使用 (就像 axios 一樣直覺)
  getQotList: (params) => api.get('/qot', { query: params }),
  createQot: (data) => api.post('/qot', data)
}
```

---

## 2. 處理動態路徑 (Dynamic Paths)

當遇到類似結構但中間路徑不同 (如 `/qot`, `/pos`, `/mod`) 時，請使用**參數化**方式，不要複製貼上多個 function。

```typescript
// 定義基底 Client
const service = useClient('/jasmine-mar')

export default {
  /**
   * 取得保單詳情
   * @param type - 業務別 ('qot' | 'pos' | 'mod')
   * @param id - 單號
   */
  getDetail(type: 'qot' | 'pos' | 'mod', id: string) {
    // 自動組裝：/jasmine-mar/qot/policies/detail/123
    return service.get(`/${type}/policies/detail/${id}`)
  }
}
```

---

## 3. 參數總覽 (Options)

`useClient` 的第二個參數 (或是 `get` 的第二個參數) 支援所有強大功能：

| 參數名稱            | 類型     | 預設   | 重點功能描述                                                                                          |
| :------------------ | :------- | :----- | :---------------------------------------------------------------------------------------------------- |
| **`loadingRef`**    | `Ref`    | -      | **✨ 自動 Loading**：傳入 `ref(false)`，API 發送時自動變 `true`，結束變 `false`。省去手動開關的麻煩。 |
| **`watch`**         | `Array`  | -      | **✨ 自動重打**：傳入 `[page, filter]`，當這些變數改變時，API 會自動重新發送。                        |
| **`globalLoading`** | `Bool`   | `true` | **介面優化**：是否顯示瀏覽器最上方的藍色進度條。若已有按鈕動畫，建議設為 `false` 以免干擾。           |
| `query`             | `Object` | -      | URL 查詢參數 (會轉為 `?page=1`)。                                                                     |
| `body`              | `Object` | -      | POST / PUT 的資料內容。                                                                               |
| `headers`           | `Object` | -      | 自定義 HTTP Headers (如 `{ 'X-Custom': '1' }`)。                                                      |
| `auth`              | `Bool`   | `true` | 是否檢查 Token。設為 `false` 可允許未登入呼叫 (如登入 API)。                                          |
| `autoError`         | `Bool`   | `true` | 是否自動跳出紅底錯誤通知。                                                                            |
| `transform`         | `Func`   | -      | **資料清洗**：`(res) => res.items`。在資料傳給前端前先過濾，減少 Payload。                            |
| `pick`              | `Array`  | -      | **欄位篩選**：`['id', 'name']`。只取出需要的欄位，節省資源。                                          |

### ✨ 進階技巧範例

```typescript
// 完整火力展示
api.get('/list', {
  // 1. 綁定按鈕，自動轉圈圈
  loadingRef: isBtnLoading,

  // 2. 既然有按鈕轉圈了，就把上面藍條關掉
  globalLoading: false,

  // 3. 當頁碼或搜尋改變時，自動重打 (省去 watch 程式碼)
  watch: [page, search],

  // 4. 只取需要的欄位 (優化效能)
  // 注意：這是針對 "已經拆包後" 的資料做篩選 (對 business data 做 pick，不是 response envelope)
  pick: ['id', 'title']
})
```

### 完整範例

```typescript
const { data, pending } = await api.get('/list', {
  query: { page: 1 },
  loadingRef: isSubmitting, // 按鈕會自動轉圈圈
  globalLoading: false, // 關掉上方藍條
  autoSuccess: '儲存成功！' // 成功時自動跳綠色通知
})
```

---

## 4. 回傳值與回應處理 (Response)

`useApi` 與 `useClient` 回傳的是 Nuxt 原生的 **AsyncData** 物件。
但請注意：**我們已經自動拆包 (Auto Unwrap)**。

### 什麼是自動拆包？

後端回傳的格式通常是：

```json
{
  "code": 200,
  "message": "success",
  "data": { "id": 1, "name": "Gino" }
}
```

但在前端，您拿到的 `data.value` 會直接是 `{ "id": 1, "name": "Gino" }`，不需要再寫 `.data.data`。

### 常用變數解構

```typescript
import repository from '~/repositories/modules/policy'

// 呼叫 Repository 方法 (其底層就是 useApi)
const {
  data, // T | null (您的資料, e.g. QotListResponse)
  pending, // boolean (是否正在載入，可用於 Skeleton)
  error, // error | null (若發生錯誤會有值)
  refresh, // function (呼叫可重新打一次 API)
  execute // function (同 refresh，但在 lazy: true 時很有用)
} = await repository.policy.getQotList({ page: 1 })

// 使用資料 (請注意：要用 .value 取值)
console.log(data.value?.items)
```

### 錯誤處理流程

1. **自動攔截 (預設)**：`autoError: true` 會自動跳出紅底 Notify，通常您不需要在 Component 寫 `if (error.value)`。
2. **手動處理**：若您想自己控制錯誤 UI：

```typescript
const { error } = await api.get('/list', { autoError: false })

if (error.value) {
  // 自己處理介面顯示
  myErrorState.value = true
}
```

---
