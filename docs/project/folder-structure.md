[← 返回文件導覽](../index.md)

# 專案資料夾結構與命名規範

## 📁 資料夾結構總覽

### 1. **pages/** - 頁面路由

**用途**: Nuxt 自動根據檔案結構生成路由

**結構規則**:

```
pages/
├── index.vue              # 首頁 (/)
├── about.vue              # 關於頁面 (/about)
├── users/
│   ├── index.vue          # 使用者列表 (/users)
│   ├── [id].vue           # 動態路由 (/users/123)
│   └── create.vue         # 新增使用者 (/users/create)
└── [...all].vue           # 404 頁面
```

**命名規範**:

- ✅ 使用 **kebab-case** (小寫 + 連字號)
- ✅ 動態路由用 `[id].vue`, `[slug].vue`
- ✅ Catch-all 路由用 `[...all].vue`
- ❌ 不要用 PascalCase: `UserList.vue` ❌
- ❌ 不要用 camelCase: `userList.vue` ❌

**範例**:

```
✅ user-profile.vue
✅ order-history.vue
✅ [id].vue
❌ UserProfile.vue
❌ userProfile.vue
```

---

### 2. **layouts/** - 頁面版型

**用途**: 定義頁面的共用框架 (header, footer, sidebar)

**結構規則**:

```
layouts/
├── default.vue            # 預設版型
├── portal.vue             # Portal 版型 (有側邊欄)
└── auth.vue               # 登入頁面版型 (無 header/footer)
```

**命名規範**:

- ✅ 使用 **kebab-case**
- ✅ 檔名要語意化,描述版型用途
- ❌ 不要用 `layout1.vue`, `layout2.vue`

---

### 3. **components/** - UI 元件

**用途**: 可重複使用的 Vue 元件

**結構規則**:

```
components/
├── uiInterface/           # 純 UI 元件 (無業務邏輯)
│   ├── IButton.vue        # 按鈕
│   ├── ICard.vue          # 卡片
│   ├── IInput.vue         # 輸入框
│   └── IModal.vue         # 彈窗
├── uiBusiness/            # 有邏輯的 UI 元件
│   ├── UserCard.vue       # 使用者卡片
│   ├── ProductList.vue    # 產品列表
│   └── OrderTable.vue     # 訂單表格
└── business/              # 純業務邏輯元件
    ├── GlobalSnackbar.vue # 全域通知
    └── ErrorBoundary.vue  # 錯誤邊界
```

**命名規範**:

- ✅ **uiInterface/**: 使用 `I` 前綴 + PascalCase
  - `IButton.vue`, `ICard.vue`, `IInput.vue`
- ✅ **uiBusiness/**: 使用 PascalCase,描述業務功能
  - `UserCard.vue`, `ProductList.vue`
- ✅ **business/**: 使用 PascalCase,描述業務邏輯
  - `GlobalSnackbar.vue`, `ErrorBoundary.vue`

**範例**:

```
✅ uiInterface/IButton.vue
✅ uiBusiness/UserCard.vue
✅ business/GlobalSnackbar.vue
❌ uiInterface/button.vue
❌ uiBusiness/user-card.vue
```

---

### 4. **composables/** - 共用邏輯

**用途**: Vue Composition API,可重複使用的邏輯

**結構規則**:

```
composables/
├── useAuth.ts             # 認證相關
├── useApi.ts              # API 呼叫
├── useValidation.ts       # 表單驗證
├── useFileUpload.ts       # 檔案上傳
└── useLocalStorage.ts     # LocalStorage 操作
```

**命名規範**:

- ✅ **必須**以 `use` 開頭
- ✅ 使用 **camelCase**
- ✅ 檔名 = 函式名稱
- ❌ 不要用 `auth.ts`, `api.ts`

**範例**:

```typescript
// ✅ 正確: useAuth.ts
export const useAuth = () => {
  const login = () => {}
  return { login }
}

// ❌ 錯誤: auth.ts
export const auth = () => {}
```

---

### 5. **stores/** - 全域狀態

**用途**: Pinia 狀態管理

**結構規則**:

```
stores/
├── user.ts                # 使用者狀態
├── cart.ts                # 購物車狀態
├── auth.ts                # 認證狀態
└── ui.ts                  # UI 狀態 (側邊欄、主題等)
```

**命名規範**:

- ✅ 使用 **camelCase**
- ✅ 檔名描述狀態類型
- ✅ Store ID 使用相同名稱

**範例**:

```typescript
// ✅ 正確: user.ts
export const useUserStore = defineStore('user', () => {
  const userData = ref(null)
  return { userData }
})

// ❌ 錯誤: userStore.ts (多餘的 Store 後綴)
```

---

### 6. **core/** - 核心功能

**用途**: 專案核心邏輯,不依賴特定業務

**結構規則**:

```
core/
├── api/
│   ├── client.ts          # API 客戶端
│   ├── interceptors.ts    # 攔截器
│   └── endpoints.ts       # API 端點定義
├── errors/
│   ├── handler.ts         # 錯誤處理器
│   └── types.ts           # 錯誤類型
└── constants/
    ├── api.ts             # API 常數
    └── routes.ts          # 路由常數
```

**命名規範**:

- ✅ 使用 **camelCase**
- ✅ 按功能分類到子資料夾
- ✅ 檔名要語意化

---

### 7. **repositories/** - 資料層

**用途**: API 呼叫的封裝 (Repository Pattern)

**結構規則**:

```
repositories/
├── userRepo.ts            # 使用者相關 API
├── orderRepo.ts           # 訂單相關 API
└── productRepo.ts         # 產品相關 API
```

**命名規範**:

- ✅ 使用 **camelCase** + `Repo` 後綴
- ✅ 一個 Repository = 一個業務實體

**範例**:

```typescript
// ✅ 正確: userRepo.ts
export const userRepo = {
  getUsers: () => api.get('/users'),
  getUserById: (id: number) => api.get(`/users/${id}`),
  createUser: (data: User) => api.post('/users', data)
}

// ❌ 錯誤: user.ts (沒有 Repo 後綴)
```

---

### 8. **modules/** - 功能模組

**用途**: 依功能分類的獨立模組

**結構規則**:

```
modules/
├── showcase/              # 範例展示模組
│   ├── pages/             # 模組專屬頁面
│   ├── components/        # 模組專屬元件
│   └── composables/       # 模組專屬邏輯
└── auth/                  # 登入認證模組
    ├── pages/
    ├── components/
    └── stores/
```

**命名規範**:

- ✅ 模組資料夾使用 **kebab-case**
- ✅ 內部結構遵循對應的命名規範
- ✅ 模組要自包含,減少外部依賴

---

### 9. **utils/** - 工具函式

**用途**: 純函式,不依賴 Vue

**結構規則**:

```
utils/
├── format/
│   ├── date.ts            # 日期格式化
│   ├── number.ts          # 數字格式化
│   └── string.ts          # 字串處理
├── validation/
│   ├── email.ts           # Email 驗證
│   └── phone.ts           # 電話驗證
└── helpers/
    ├── array.ts           # 陣列操作
    └── object.ts          # 物件操作
```

**命名規範**:

- ✅ 使用 **camelCase**
- ✅ 按功能分類到子資料夾
- ✅ 函式名稱要描述性強

**範例**:

```typescript
// ✅ 正確: format/date.ts
export const formatDate = (date: Date) => {}
export const parseDate = (str: string) => {}

// ❌ 錯誤: dateUtils.ts (不要用 Utils 後綴)
```

---

### 10. **types/** - 型別定義

**用途**: TypeScript 介面與型別

**結構規則**:

```
types/
├── api/
│   ├── user.ts            # 使用者相關型別
│   ├── order.ts           # 訂單相關型別
│   └── response.ts        # API 回應型別
├── models/
│   ├── User.ts            # User 模型
│   └── Product.ts         # Product 模型
└── enums/
    ├── UserRole.ts        # 使用者角色列舉
    └── OrderStatus.ts     # 訂單狀態列舉
```

**命名規範**:

- ✅ Interface/Type: 使用 **PascalCase**
- ✅ Enum: 使用 **PascalCase**
- ✅ 檔名 = 主要型別名稱

**範例**:

```typescript
// ✅ 正確: api/user.ts
export interface UserData {
  id: number
  name: string
}

export type UserRole = 'admin' | 'user'

// ✅ 正確: enums/UserRole.ts
export enum UserRole {
  Admin = 'admin',
  User = 'user'
}
```

---

### 11. **mock/** - 模擬資料

**用途**: 開發用的假資料

**結構規則**:

```
mock/
├── handlers/
│   ├── user.ts            # 使用者 API mock
│   ├── order.ts           # 訂單 API mock
│   └── product.ts         # 產品 API mock
└── data/
    ├── users.ts           # 假使用者資料
    └── products.ts        # 假產品資料
```

**命名規範**:

- ✅ 使用 **camelCase**
- ✅ handlers/ 對應 API 端點
- ✅ data/ 存放靜態假資料

---

### 12. **plugins/** - Nuxt 外掛

**用途**: Nuxt 外掛 (Vuetify, i18n 等)

**結構規則**:

```
plugins/
├── vuetify.ts             # Vuetify 設定
├── i18n.ts                # 國際化設定
└── api.ts                 # API 客戶端註冊
```

**命名規範**:

- ✅ 使用 **camelCase**
- ✅ 檔名 = 外掛名稱
- ✅ 檔案會自動載入

---

### 13. **middleware/** - 路由守衛

**用途**: 路由中介層 (權限檢查等)

**結構規則**:

```
middleware/
├── auth.ts                # 認證檢查
├── guest.ts               # 訪客限制
└── admin.ts               # 管理員權限
```

**命名規範**:

- ✅ 使用 **kebab-case**
- ✅ 檔名描述守衛用途

---

### 14. **assets/** - 靜態資源

**用途**: CSS、圖片、字型

**結構規則**:

```
assets/
├── css/
│   ├── main.css           # 主要樣式
│   └── variables.css      # CSS 變數
├── images/
│   ├── logo.png
│   └── icons/
└── fonts/
    └── custom-font.woff2
```

**命名規範**:

- ✅ 使用 **kebab-case**
- ✅ 圖片用描述性名稱
- ❌ 不要用 `img1.png`, `pic2.jpg`

---

### 15. **public/** - 公開檔案

**用途**: 直接複製到根目錄的檔案

**結構規則**:

```
public/
├── favicon.ico
├── robots.txt
└── sitemap.xml
```

**命名規範**:

- ✅ 保持原始檔名 (SEO 相關)
- ✅ 不會被 Webpack 處理

---

## 📝 命名規範總結

| 類型                    | 命名方式         | 範例               |
| ----------------------- | ---------------- | ------------------ |
| **頁面**                | kebab-case       | `user-profile.vue` |
| **版型**                | kebab-case       | `default.vue`      |
| **UI 元件 (Interface)** | I + PascalCase   | `IButton.vue`      |
| **UI 元件 (Business)**  | PascalCase       | `UserCard.vue`     |
| **Composables**         | use + camelCase  | `useAuth.ts`       |
| **Stores**              | camelCase        | `user.ts`          |
| **Repositories**        | camelCase + Repo | `userRepo.ts`      |
| **Utils**               | camelCase        | `formatDate.ts`    |
| **Types/Interfaces**    | PascalCase       | `UserData`         |
| **Enums**               | PascalCase       | `UserRole`         |
| **常數**                | UPPER_SNAKE_CASE | `API_BASE_URL`     |

---

## ⚠️ 常見錯誤

### ❌ 錯誤示範:

```
pages/UserProfile.vue          # 應該用 kebab-case
components/button.vue          # UI 元件應該用 PascalCase
composables/auth.ts            # 應該用 useAuth.ts
stores/userStore.ts            # 不需要 Store 後綴
repositories/user.ts           # 應該用 userRepo.ts
utils/dateUtils.ts             # 不需要 Utils 後綴
```

### ✅ 正確示範:

```
pages/user-profile.vue
components/uiInterface/IButton.vue
composables/useAuth.ts
stores/user.ts
repositories/userRepo.ts
utils/format/date.ts
```
