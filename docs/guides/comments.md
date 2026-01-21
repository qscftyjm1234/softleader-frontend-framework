[← 返回文件導覽](../index.md)

# 程式碼註解規範 (Code Comments Guidelines)

## 目錄

- [基本原則](#基本原則)
- [JSDoc 規範](#jsdoc-規範)
- [標籤註解規範](#標籤註解規範)
- [版本與時間標記](#版本與時間標記)
- [範例](#範例)

---

## 基本原則

1. **註解要說明「為什麼」，而不是「做什麼」**
   - ❌ 不好：`// 設定 count 為 0`
   - ✅ 好：`// 重置計數器以避免累積錯誤`

2. **保持註解與程式碼同步**
   - 修改程式碼時，必須同步更新相關註解

3. **使用中文註解**
   - 團隊溝通語言為中文，註解也使用中文

---

## JSDoc 規範

### 函式註解

所有 exported 函式都必須包含 JSDoc 註解：

```javascript
/**
 * 計算兩個數字的總和
 *
 * @param {number} a - 第一個數字
 * @param {number} b - 第二個數字
 * @returns {number} 兩數之和
 * @throws {TypeError} 當參數不是數字時
 *
 * @example
 * add(1, 2) // returns 3
 *
 * @author Gino Huang
 * @since 2024-12-24
 * @version 1.0.0
 */
function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('參數必須是數字')
  }
  return a + b
}
```

### 必要標籤

- `@param` - 參數說明
- `@returns` - 回傳值說明
- `@throws` - 可能拋出的錯誤
- `@author` - 作者
- `@since` - 建立日期 (YYYY-MM-DD)
- `@version` - 版本號

### 選用標籤

- `@example` - 使用範例
- `@deprecated` - 標記為過時
- `@see` - 參考連結
- `@todo` - 待辦事項

### Vue Composable 註解

```typescript
/**
 * 使用者認證相關的 Composable
 *
 * @description
 * 提供登入、登出、取得使用者資訊等功能
 *
 * @returns {Object} 認證相關的方法與狀態
 * @returns {Ref<User|null>} returns.user - 當前使用者
 * @returns {Function} returns.login - 登入函式
 * @returns {Function} returns.logout - 登出函式
 *
 * @example
 * const { user, login, logout } = useAuth()
 * await login({ username, password })
 *
 * @author Gino Huang
 * @since 2024-12-24
 * @version 1.0.0
 */
export function useAuth() {
  // ...
}
```

---

## 標籤註解規範

### 標準標籤

使用以下標準標籤來標記特殊註解：

#### TODO - 待辦事項

```javascript
// TODO: [作者] 需要實作的功能 (YYYY-MM-DD)
// TODO: [Gino] 加入錯誤處理機制 (2024-12-24)
```

#### FIXME - 需要修復

```javascript
// FIXME: [作者] 已知問題描述 (YYYY-MM-DD)
// FIXME: [Gino] 當輸入為空時會拋出錯誤 (2024-12-24)
```

#### HACK - 臨時解決方案

```javascript
// HACK: [作者] 暫時性的解決方案，需要重構 (YYYY-MM-DD)
// HACK: [Gino] 使用 setTimeout 避免競態條件，待改用 Promise (2024-12-24)
```

#### NOTE - 重要說明

```javascript
// NOTE: [作者] 重要的實作細節或注意事項 (YYYY-MM-DD)
// NOTE: [Gino] 此處必須使用深拷貝以避免狀態污染 (2024-12-24)
```

#### OPTIMIZE - 效能優化點

```javascript
// OPTIMIZE: [作者] 可以優化的地方 (YYYY-MM-DD)
// OPTIMIZE: [Gino] 考慮使用 memoization 減少重複計算 (2024-12-24)
```

#### DEPRECATED - 已棄用

```javascript
// DEPRECATED: [作者] 此功能已棄用，請使用 XXX 替代 (YYYY-MM-DD)
// DEPRECATED: [Gino] 請使用 useAuthV2 替代 (2024-12-24)
```

### 標籤格式規範

**標準格式：**

```
// [標籤]: [作者] 說明內容 (YYYY-MM-DD)
```

**必要元素：**

1. 標籤名稱（大寫）
2. 作者名稱
3. 說明內容
4. 日期（ISO 格式）

---

## 版本與時間標記

### 商業邏輯變更追蹤

當商業邏輯發生變更時，使用以下格式記錄：

```javascript
/**
 * 計算訂單折扣
 *
 * @changelog
 * - 2024-12-24 v1.2.0 [Gino] 新增會員等級折扣邏輯
 * - 2024-11-15 v1.1.0 [Alice] 修改折扣計算公式
 * - 2024-10-01 v1.0.0 [Bob] 初始版本
 */
function calculateDiscount(order, user) {
  // v1.2.0: 新增會員等級判斷
  if (user.memberLevel === 'VIP') {
    return order.total * 0.8
  }

  // v1.1.0: 原有折扣邏輯
  return order.total * 0.9
}
```

### 重要決策記錄

```javascript
/**
 * 使用者資料快取策略
 *
 * @decision
 * 決策日期: 2024-12-24
 * 決策者: Gino Huang
 * 決策內容: 使用 localStorage 快取使用者資料，有效期 24 小時
 * 原因: 減少 API 呼叫次數，提升使用者體驗
 * 替代方案: SessionStorage (但會在關閉瀏覽器後失效)
 */
```

---

## 範例

### 完整的函式註解範例

```typescript
/**
 * 取得使用者的訂單列表
 *
 * @description
 * 從 API 取得指定使用者的所有訂單，並依照日期排序。
 * 支援分頁與篩選功能。
 *
 * @param {string} userId - 使用者 ID
 * @param {Object} options - 查詢選項
 * @param {number} [options.page=1] - 頁碼
 * @param {number} [options.pageSize=10] - 每頁筆數
 * @param {string} [options.status] - 訂單狀態篩選
 *
 * @returns {Promise<OrderListResponse>} 訂單列表回應
 * @returns {Order[]} returns.items - 訂單陣列
 * @returns {number} returns.total - 總筆數
 * @returns {number} returns.page - 當前頁碼
 *
 * @throws {Error} 當 userId 為空時
 * @throws {ApiError} 當 API 呼叫失敗時
 *
 * @example
 * // 取得第一頁訂單
 * const result = await getUserOrders('user123', { page: 1 })
 *
 * @example
 * // 篩選已完成的訂單
 * const completed = await getUserOrders('user123', {
 *   status: 'completed',
 *   pageSize: 20
 * })
 *
 * @author Gino Huang
 * @since 2024-12-24
 * @version 1.0.0
 *
 * @changelog
 * - 2024-12-24 v1.0.0 [Gino] 初始版本
 *
 * @see {@link https://api.example.com/docs/orders|訂單 API 文件}
 */
export async function getUserOrders(
  userId: string,
  options: OrderQueryOptions = {}
): Promise<OrderListResponse> {
  // NOTE: [Gino] 使用預設值確保分頁參數正確 (2024-12-24)
  const { page = 1, pageSize = 10, status } = options

  if (!userId) {
    throw new Error('userId 不可為空')
  }

  // TODO: [Gino] 加入快取機制減少 API 呼叫 (2024-12-24)
  const response = await api.get('/orders', {
    params: { userId, page, pageSize, status }
  })

  return response.data
}
```

### Vue Component 註解範例

```vue
<script setup lang="ts">
/**
 * 使用者個人資料編輯表單
 *
 * @component UserProfileForm
 * @description
 * 提供使用者編輯個人資料的表單介面，包含即時驗證與自動儲存功能
 *
 * @author Gino Huang
 * @since 2024-12-24
 * @version 1.0.0
 *
 * @changelog
 * - 2024-12-24 v1.0.0 [Gino] 初始版本
 */

interface Props {
  /** 使用者 ID */
  userId: string
  /** 是否為編輯模式 */
  editable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  editable: true
})

// NOTE: [Gino] 使用 debounce 避免頻繁儲存 (2024-12-24)
const debouncedSave = useDebounceFn(saveProfile, 1000)
</script>
```

---

## 工具整合

### ESLint 檢查

專案已整合 `eslint-plugin-jsdoc`，會自動檢查：

- JSDoc 格式是否正確
- 必要標籤是否完整
- 參數與實際程式碼是否一致

### VSCode 擴充套件

建議安裝以下擴充套件：

- **Better Comments** - 為不同標籤提供顏色標記
- **TODO Highlight** - 高亮顯示 TODO/FIXME 等標籤
- **Document This** - 快速產生 JSDoc 註解

---

## 檢查清單

提交程式碼前，請確認：

- [ ] 所有 exported 函式都有 JSDoc 註解
- [ ] JSDoc 包含必要標籤（@param, @returns, @author, @since, @version）
- [ ] TODO/FIXME 標籤包含作者與日期
- [ ] 商業邏輯變更有記錄在 @changelog
- [ ] 註解與程式碼保持同步
- [ ] 沒有過時或錯誤的註解
