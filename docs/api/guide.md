[← 返回 README.md](../../README.md)

# API 開發進階參考

本文件為 `useApi` 與 `useClient` 的完整參數參考手冊。

> [!NOTE]
> 如果您是第一次使用，請先閱讀 [API 快速開始](./quick-start.md)。

---

## useClient 標準寫法

透過 `useClient` 建立具備特定路徑前綴的客戶端，減少重複代碼：

```typescript
// repositories/modules/policy.ts
import { useClient } from '~/composables/useApi'

const api = useClient('/jasmine-mar/mar/policy')

export default {
  getQotList: (params) => api.get('/qot', { query: params }),
  createQot: (data) => api.post('/qot', data)
}
```

---

## 動態路徑處理

當遇到類似結構但中間路徑不同時，使用參數化方式：

```typescript
const service = useClient('/jasmine-mar')

export default {
  /**
   * 取得保單詳情
   * @param type - 業務別 ('qot' | 'pos' | 'mod')
   * @param id - 單號
   */
  getDetail(type: 'qot' | 'pos' | 'mod', id: string) {
    return service.get(`/${type}/policies/detail/${id}`)
  }
}
```

---

## 完整參數參考表

### 核心參數

| 參數名稱  | 類型     | 預設值  | 說明                                   |
| --------- | -------- | ------- | -------------------------------------- |
| `method`  | `String` | `'GET'` | HTTP 方法 (GET, POST, PUT, DELETE)     |
| `query`   | `Object` | -       | URL 查詢參數 (轉為 `?page=1&q=search`) |
| `body`    | `Object` | -       | POST/PUT 的請求內容                    |
| `headers` | `Object` | -       | 自定義 HTTP Headers                    |

### 進階功能參數

| 參數名稱            | 類型           | 預設值  | 說明                                   |
| ------------------- | -------------- | ------- | -------------------------------------- |
| **`loadingRef`**    | `Ref<boolean>` | -       | 綁定 Loading 狀態，自動管理 true/false |
| **`watch`**         | `Array<Ref>`   | -       | 監聽變數變化，自動重新請求             |
| **`globalLoading`** | `Boolean`      | `true`  | 是否顯示全域 Loading 條                |
| `lazy`              | `Boolean`      | `false` | 是否延遲執行 (需手動呼叫 `execute()`)  |
| `immediate`         | `Boolean`      | `true`  | 是否立即執行                           |
| `server`            | `Boolean`      | `true`  | 是否在 SSR 時執行                      |

### 資料處理參數

| 參數名稱    | 類型            | 預設值 | 說明                                     |
| ----------- | --------------- | ------ | ---------------------------------------- |
| `transform` | `Function`      | -      | 資料轉換函式 `(data) => transformedData` |
| `pick`      | `Array<string>` | -      | 只取出指定欄位 `['id', 'name']`          |
| `default`   | `Function`      | -      | 預設值函式 `() => defaultValue`          |

### 通知與錯誤處理

| 參數名稱      | 類型                | 預設值  | 說明                                     |
| ------------- | ------------------- | ------- | ---------------------------------------- |
| `autoError`   | `Boolean`           | `true`  | 是否自動顯示錯誤通知                     |
| `autoSuccess` | `String \| Boolean` | `false` | 成功時自動顯示通知 (傳入字串為訊息內容)  |
| `auth`        | `Boolean`           | `true`  | 是否檢查 Token (登入 API 應設為 `false`) |

---

## 進階使用範例

### 1. 自動 Loading + 關閉全域進度條

```typescript
const isSubmitting = ref(false)

const { data } = await api.post('/create', payload, {
  loadingRef: isSubmitting, // 按鈕自動 Loading
  globalLoading: false, // 關閉上方藍條
  autoSuccess: '建立成功！' // 成功通知
})
```

### 2. 自動監聽變數重新請求

```typescript
const page = ref(1)
const search = ref('')

// 當 page 或 search 改變時，自動重新請求
const { data } = await api.get('/list', {
  query: { page, q: search },
  watch: [page, search]
})
```

### 3. 資料轉換與欄位篩選

```typescript
// 只取出 items，忽略其他欄位
const { data } = await api.get('/list', {
  transform: (response) => response.items
})

// 或使用 pick 只取特定欄位
const { data } = await api.get('/list', {
  pick: ['id', 'title', 'status']
})
```

### 4. 延遲執行 (Lazy Loading)

```typescript
const { data, execute } = await api.get('/heavy-data', {
  lazy: true // 不立即執行
})

// 稍後手動觸發
const handleLoad = () => {
  execute()
}
```

### 5. 自定義錯誤處理

```typescript
const { data, error } = await api.get('/list', {
  autoError: false // 關閉自動錯誤通知
})

if (error.value) {
  // 自定義錯誤處理
  myCustomErrorHandler(error.value)
}
```

---

## 回傳值說明

所有 API 呼叫都回傳 Nuxt 的 `AsyncData` 物件：

```typescript
const {
  data, // T | null - 已自動拆包的資料
  pending, // boolean - 是否正在載入
  error, // Error | null - 錯誤物件
  refresh, // () => Promise<void> - 重新請求
  execute, // () => Promise<void> - 執行請求 (lazy 模式)
  status // 'idle' | 'pending' | 'success' | 'error'
} = await api.get('/endpoint')
```

### 自動拆包機制

後端回傳：

```json
{
  "code": 200,
  "message": "success",
  "data": { "id": 1, "name": "Gino" }
}
```

前端取得：

```typescript
data.value // { "id": 1, "name": "Gino" }
```

---

## 延伸閱讀

- [API 快速開始](./quick-start.md) - 新手入門指南
- [Repository Pattern](./repository-pattern.md) - Repository 層設計
- [後端 API 規範](./backend-contract.md) - 後端格式規範
- [Mock Server](./mock-server.md) - Mock 系統使用
