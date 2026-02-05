[← 返回 README.md](../../README.md)

# ESLint 開發規範完整指南

本專案採用嚴格的 ESLint 規則，確保程式碼品質與一致性。本文件詳細說明所有規則與範例。

## 規則等級說明

- **error** (錯誤) - 紅色提示，會阻止提交
- **warn** (警告) - 黃色提示，不阻止執行但應修正
- **off** (關閉) - 不檢查

---

## 命名規範

### 1. 布林值變數命名

**規則**: 布林值變數必須以特定前綴開頭，使用 camelCase

**允許的前綴**: `is`, `should`, `has`, `can`, `did`, `will`

#### ✅ 正確範例

```typescript
const isLoading = true
const shouldValidate = false
const hasPermission = true
const canEdit = false
const didComplete = true
const willUpdate = false
```

#### ❌ 錯誤範例

```typescript
const loading = true // ❌ 缺少前綴
const Loading = true // ❌ 使用 PascalCase
const validate = false // ❌ 缺少前綴
const permission = true // ❌ 缺少前綴
```

---

### 2. 函式命名

**規則**: 函式必須以動詞開頭，使用 camelCase 或 PascalCase

**允許的動詞前綴**:

#### 單一動作

- `get`, `set`, `fetch` - 取得/設定資料
- `handle`, `click`, `submit` - 處理事件
- `validate` - 驗證
- `create`, `update`, `delete` - CRUD 操作
- `toggle`, `show`, `hide`, `open`, `close` - UI 狀態切換
- `add`, `remove`, `clear`, `reset` - 資料操作

#### 流程性操作

- `initialize`, `init` - 初始化
- `process`, `execute`, `perform`, `complete` - 執行流程
- `setup`, `run` - 設定與執行

#### 判斷 (回傳 boolean)

- `is`, `has`, `should`, `can`, `will` - 判斷狀態
- `check`, `verify` - 檢查驗證

#### 特殊用途

- `on` - 事件處理
- `use` - Composables
- `format`, `mask`, `parse` - 資料處理
- `build`, `register`, `scan` - 系統建置

#### ✅ 正確範例

```typescript
// 單一動作
function getUserData() {}
function setConfig() {}
function handleClick() {}
function validateForm() {}
function createUser() {}
function toggleMenu() {}

// 流程性
function initializeApp() {}
function processPayment() {}
function executeTask() {}

// 判斷
function isValid() {}
function hasPermission() {}
function checkAuth() {}

// Composables
function useUserData() {}
function useAuth() {}

// 資料處理
function formatDate() {}
function parseJson() {}
```

#### ❌ 錯誤範例

```typescript
function userData() {} // ❌ 缺少動詞
function data() {} // ❌ 缺少動詞
function click() {} // ❌ 應該是 handleClick
function payment() {} // ❌ 應該是 processPayment
function valid() {} // ❌ 應該是 isValid 或 validateForm
function extractData() {} // ❌ extract 不在允許清單中，應使用 getData 或 parseData
```

---

### 3. 一般變數命名

**規則**: 使用 camelCase、UPPER_CASE (常數) 或 PascalCase (類別實例)

#### ✅ 正確範例

```typescript
const userName = 'John' // camelCase
const MAX_COUNT = 100 // UPPER_CASE (常數)
const API_BASE_URL = 'https://...' // UPPER_CASE (常數)
const UserService = new Service() // PascalCase (類別實例)
const _privateVar = 'test' // 允許底線開頭
```

#### ❌ 錯誤範例

```typescript
const user_name = 'John' // ❌ 不使用 snake_case
const UserName = 'John' // ❌ 一般變數不使用 PascalCase (除非是類別實例)
```

---

### 4. 類別、介面、型別命名

**規則**: 使用 PascalCase

#### ✅ 正確範例

```typescript
class UserService {}
interface UserData {}
type ApiResponse = {}
enum UserRole {}
```

#### ❌ 錯誤範例

```typescript
class userService {} // ❌ 應使用 PascalCase
interface userData {} // ❌ 應使用 PascalCase
type apiResponse = {} // ❌ 應使用 PascalCase
```

---

## Prettier 整合

**規則**: 程式碼格式必須符合 Prettier 規範

本專案使用 Prettier 進行程式碼格式化，所有格式問題都會被視為錯誤。

### 自動格式化

```bash
# 檢查格式
npm run format

# 自動修正格式
npm run format:write
```

### Prettier 設定

Prettier 設定檔位於 `.prettierrc.json`，包含：

- 單引號
- 無分號
- 2 空格縮排
- 120 字元行寬

---

## Vue 規範

### 0. Vue 檔案基本規則

#### v-html 使用

**規則**: 允許使用 `v-html`，但需注意 XSS 風險 (error 等級)

```vue
<!-- ✅ 允許使用，但要確保內容安全 -->
<div v-html="sanitizedContent"></div>

<!-- ⚠️ 注意：使用前請確保內容已經過 sanitize 處理 -->
```

#### 多根元素

**規則**: 允許多個根元素 (Vue 3 特性)

```vue
<template>
  <!-- ✅ Vue 3 允許多個根元素 -->
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</template>
```

#### 自閉合標籤

**規則**: 允許非自閉合標籤

```vue
<!-- ✅ 兩種寫法都允許 -->
<IButton></IButton>
<IButton />
```

#### 空 alt 屬性

**規則**: 允許空的 alt 屬性

```vue
<!-- ✅ 允許 -->
<img src="..." alt="" />
```

---

### 1. 元件命名

**規則**: 模板中的元件名稱必須使用 PascalCase

#### ✅ 正確範例

```vue
<template>
  <UserCard />
  <ProductList />
  <IButton />
</template>
```

#### ❌ 錯誤範例

```vue
<template>
  <user-card />
  <!-- ❌ 應使用 PascalCase -->
  <product-list />
  <!-- ❌ 應使用 PascalCase -->
</template>
```

---

### 2. 屬性換行規則

**規則**:

- 單行模式：最多 1 個屬性
- 多行模式：每行 1 個屬性

#### ✅ 正確範例

```vue
<!-- 單一屬性：可以單行 -->
<IButton variant="primary">送出</IButton>

<!-- 多個屬性：必須換行，每行一個 -->
<IButton variant="primary" size="large" :loading="isLoading" @click="handleSubmit">
  送出
</IButton>
```

#### ❌ 錯誤範例

```vue
<!-- ❌ 多個屬性不可單行 -->
<IButton variant="primary" size="large">送出</IButton>

<!-- ❌ 多行模式每行只能一個屬性 -->
<IButton variant="primary" size="large" :loading="isLoading">
  送出
</IButton>
```

---

### 3. 屬性順序

**規則**: 屬性必須按照以下順序排列

1. Definition (定義) - `is`, `v-is`
2. List Rendering (列表渲染) - `v-for`
3. Conditionals (條件) - `v-if`, `v-else-if`, `v-else`, `v-show`
4. Render Modifiers (渲染修飾符) - `v-pre`, `v-once`
5. Global Awareness (全域感知) - `id`
6. Unique (唯一性) - `ref`, `key`
7. Slot (插槽) - `v-slot`, `slot`
8. Two-Way Binding (雙向綁定) - `v-model`
9. Other Directives (其他指令) - `v-custom-directive`
10. Other Attributes (其他屬性) - `class`, `style`, 自定義屬性
11. Events (事件) - `@click`, `@input`
12. Content (內容) - `v-html`, `v-text`

#### ✅ 正確範例

```vue
<IButton
  ref="submitBtn"
  v-model="value"
  variant="primary"
  size="large"
  :disabled="isDisabled"
  @click="handleClick"
>
  送出
</IButton>
```

---

### 4. Boolean 屬性簡寫

**規則**: Boolean 屬性為 true 時應省略值

#### ✅ 正確範例

```vue
<IButton disabled>送出</IButton>
<IButton loading>載入中</IButton>
```

#### ❌ 錯誤範例

```vue
<IButton :disabled="true">送出</IButton>
<!-- ❌ 應簡寫為 disabled -->
<IButton :loading="true">載入中</IButton>
<!-- ❌ 應簡寫為 loading -->
```

---

### 5. Script 區塊語言

**規則**: 建議使用 TypeScript (警告等級)

#### ✅ 正確範例

```vue
<script setup lang="ts">
// TypeScript 程式碼
</script>
```

#### ⚠️ 警告範例

```vue
<script setup>
// JavaScript 程式碼 (會有警告)
</script>
```

---

### 6. 行長度限制

**規則**: 每行最多 120 字元 (程式碼與模板)

#### ✅ 正確範例

```vue
<template>
  <!-- 超過 120 字元應換行 -->
  <div class="very-long-class-name another-class">內容</div>
</template>

<script setup lang="ts">
// 超過 120 字元應換行
const veryLongVariableName = 'This is a very long string that exceeds 120 characters limit'
</script>
```

---

### 7. Options API 排序 (如使用 Options API)

**規則**: Options API 的選項必須按照特定順序排列

**順序**:

1. `name`
2. `components`
3. `props`
4. `data`
5. `computed`
6. `watch`
7. `methods`
8. `lifecycle hooks` (created, mounted, etc.)

#### ✅ 正確範例

```vue
<script>
export default {
  name: 'MyComponent',
  components: { UserCard },
  props: {
    title: String
  },
  data() {
    return {
      count: 0
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log('mounted')
  }
}
</script>
```

---

### 8. 禁止無用的 v-bind

**規則**: 禁止無意義的 v-bind

#### ✅ 正確範例

```vue
<template>
  <div :class="dynamicClass"></div>
  <div class="static-class"></div>
</template>
```

#### ❌ 錯誤範例

```vue
<template>
  <!-- ❌ 靜態值不應使用 v-bind -->
  <div :class="'static-class'"></div>
</template>
```

---

## Nuxt 特殊規則

### 自動導入

**規則**: 關閉 `no-undef` 檢查

Nuxt 會自動導入 composables、components 等，因此關閉未定義變數檢查。

```vue
<script setup lang="ts">
// ✅ 不需要 import，Nuxt 自動導入
const route = useRoute()
const { data } = await useFetch('/api/users')
</script>
```

---

## 檔案與目錄忽略規則

### 完整忽略清單

以下檔案/目錄**不會被 ESLint 檢查**：

#### 測試相關

- `tests/` - 測試目錄
- `playwright/` - E2E 測試
- `**/*-test.{js,ts,vue}` - 以 `-test` 結尾的檔案
- `**/*.test.{js,ts,vue}` - 包含 `.test.` 的檔案

#### 建置與快取

- `node_modules/` - 套件目錄
- `dist/` - 編譯輸出
- `.nuxt` - Nuxt 快取
- `.output` - Nuxt 輸出
- `.config/` - 設定檔目錄

#### 外掛與生成

- `plugins/` - 外掛目錄
- `generate/` - 生成檔案目錄
- `public/js/hanlinks/` - 第三方 JS

#### 設定檔

- `tsconfig.json` - TypeScript 設定

#### 手動忽略

- `**/*.ignore.{js,ts,vue}` - 標記為 `.ignore.` 的檔案

### 如何忽略特定檔案

在檔案名稱中加入 `.ignore.`：

```
my-component.ignore.vue  // 此檔案會被忽略
test-file.ignore.ts      // 此檔案會被忽略
```

---

## JavaScript/TypeScript 規範

### 1. 使用嚴格相等

**規則**: 必須使用 `===` 和 `!==`

#### ✅ 正確範例

```typescript
if (value === 0) {
}
if (name !== '') {
}
```

#### ❌ 錯誤範例

```typescript
if (value == 0) {
} // ❌ 應使用 ===
if (name != '') {
} // ❌ 應使用 !==
```

---

### 2. 變數宣告

**規則**:

- 禁止使用 `var`
- 優先使用 `const`

#### ✅ 正確範例

```typescript
const name = 'John'
let count = 0
```

#### ❌ 錯誤範例

```typescript
var name = 'John' // ❌ 禁止使用 var
let name = 'John' // ⚠️ 如果不會重新賦值，應使用 const
```

---

### 3. 控制語句大括號

**規則**: 所有控制語句必須使用大括號

#### ✅ 正確範例

```typescript
if (condition) {
  doSomething()
}

if (condition) {
  doThis()
} else {
  doThat()
}
```

#### ❌ 錯誤範例

```typescript
if (condition) doSomething() // ❌ 缺少大括號

if (condition) doSomething() // ❌ 缺少大括號
```

---

### 4. 箭頭函式

**規則**: 能省略大括號時應省略

#### ✅ 正確範例

```typescript
const double = (x) => x * 2
const getUser = () => ({ name: 'John' })
```

#### ❌ 錯誤範例

```typescript
const double = (x) => {
  return x * 2
} // ❌ 應省略大括號
const getUser = () => {
  return { name: 'John' }
} // ❌ 應省略大括號
```

---

### 5. 樣板字面值

**規則**: 優先使用樣板字面值而非字串連接

#### ✅ 正確範例

```typescript
const message = `Hello, ${name}!`
const url = `${baseUrl}/users/${id}`
```

#### ❌ 錯誤範例

```typescript
const message = 'Hello, ' + name + '!' // ❌ 應使用樣板字面值
const url = baseUrl + '/users/' + id // ❌ 應使用樣板字面值
```

---

### 6. 物件屬性簡寫

**規則**: 使用物件屬性簡寫

#### ✅ 正確範例

```typescript
const name = 'John'
const age = 25

const user = { name, age }
const obj = {
  getValue() {
    return 42
  }
}
```

#### ❌ 錯誤範例

```typescript
const user = { name: name, age: age } // ❌ 應使用簡寫
const obj = {
  getValue: function () {
    return 42
  } // ❌ 應使用簡寫
}
```

---

### 7. else if 使用

**規則**: 禁止 `else { if }`，應使用 `else if`

#### ✅ 正確範例

```typescript
if (condition1) {
  doThis()
} else if (condition2) {
  doThat()
}
```

#### ❌ 錯誤範例

```typescript
if (condition1) {
  doThis()
} else {
  if (condition2) {
    // ❌ 應使用 else if
    doThat()
  }
}
```

---

## JSDoc 註解規範

### 1. 必須寫註解的情況

**規則**: 以下情況必須寫 JSDoc 註解

- 一般函式宣告 (`function foo() {}`)
- 類別方法
- 類別宣告
- 所有 exported 函式 (包含箭頭函式)

#### ✅ 正確範例

```typescript
/**
 * 計算兩個數字的總和
 * @param {number} a - 第一個數字
 * @param {number} b - 第二個數字
 * @returns {number} 兩數之和
 */
function add(a, b) {
  return a + b
}

/**
 * 取得使用者資料
 * @param {string} id - 使用者 ID
 * @returns {Promise<User>} 使用者資料
 */
export const getUserData = async (id) => {
  return await api.get(`/users/${id}`)
}
```

#### ❌ 錯誤範例

```typescript
// ❌ 缺少 JSDoc 註解
function add(a, b) {
  return a + b
}

// ❌ 缺少 JSDoc 註解
export const getUserData = async (id) => {
  return await api.get(`/users/${id}`)
}
```

---

### 2. 不需要寫註解的情況

- 箭頭函式 (非 exported)
- 函式表達式 (非 exported)
- 元件內的方法

```typescript
// ✅ 不需要註解
const handleClick = () => {
  console.log('clicked')
}

// ✅ 不需要註解
const process = function () {
  // ...
}
```

---

## 環境相關規則

### 1. console 與 debugger

**規則**:

- 開發環境：允許使用
- 正式環境：會有警告

```typescript
// 開發環境：OK
console.log('debug info')
debugger

// 正式環境：會有警告，應移除
```

---

### 2. 未使用的變數

**規則**: 未使用的變數會有警告

#### ✅ 正確範例

```typescript
const name = 'John'
console.log(name) // 有使用
```

#### ⚠️ 警告範例

```typescript
const name = 'John' // ⚠️ 未使用的變數
const age = 25 // ⚠️ 未使用的變數
```

---

## 設定檔位置

### ESLint 設定檔

- **主設定檔**: `eslint.config.mjs` (專案根目錄)
- **Prettier 設定**: `.prettierrc.json`
- **Prettier 忽略**: `.prettierignore`

### 查看完整設定

```bash
# 查看 ESLint 設定
cat eslint.config.mjs

# 查看 Prettier 設定
cat .prettierrc.json
```

---

## 忽略檢查的檔案

詳細的忽略清單請參考上方「[檔案與目錄忽略規則](#檔案與目錄忽略規則)」章節。

---

## 快速參考

### 命名規範速查表

| 類型        | 格式             | 範例                         |
| ----------- | ---------------- | ---------------------------- |
| 布林值變數  | camelCase + 前綴 | `isLoading`, `hasPermission` |
| 函式        | camelCase + 動詞 | `getUserData`, `handleClick` |
| 一般變數    | camelCase        | `userName`, `itemCount`      |
| 常數        | UPPER_CASE       | `MAX_COUNT`, `API_URL`       |
| 類別        | PascalCase       | `UserService`, `ApiClient`   |
| 介面        | PascalCase       | `UserData`, `ApiResponse`    |
| 型別        | PascalCase       | `UserId`, `ResponseType`     |
| Composables | use + PascalCase | `useUserData`, `useAuth`     |

### 函式動詞速查表

| 用途     | 動詞                                            |
| -------- | ----------------------------------------------- |
| 取得資料 | `get`, `fetch`                                  |
| 設定資料 | `set`                                           |
| 事件處理 | `handle`, `on`                                  |
| CRUD     | `create`, `update`, `delete`                    |
| UI 切換  | `toggle`, `show`, `hide`, `open`, `close`       |
| 資料操作 | `add`, `remove`, `clear`, `reset`               |
| 初始化   | `initialize`, `init`, `setup`                   |
| 執行流程 | `process`, `execute`, `perform`, `run`          |
| 判斷     | `is`, `has`, `should`, `can`, `check`, `verify` |
| 資料處理 | `format`, `parse`, `mask`                       |

---

## 常見問題

### Q: 如何暫時忽略某個規則？

```typescript
// eslint-disable-next-line rule-name
const problematicCode = ...

/* eslint-disable rule-name */
// 多行程式碼
/* eslint-enable rule-name */
```

### Q: 如何查看完整的 ESLint 設定？

查看專案根目錄的 `eslint.config.mjs` 檔案。

### Q: 如何執行 ESLint 檢查？

```bash
npm run lint
```

### Q: 如何自動修正可修正的錯誤？

```bash
npm run lint
```

(專案的 lint 指令已包含 `--fix` 參數)

---

## 延伸閱讀

- [註解規範](./comments.md) - JSDoc 完整規範
- [開發手冊](./development-manual.md) - 完整開發指南
- [程式碼風格](./coding-standards.md) - 程式碼風格指南
