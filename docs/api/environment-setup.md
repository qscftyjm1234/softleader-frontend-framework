[← 返回 README.md](../../README.md)

# 環境設定指南

## 目標讀者

負責設定開發/測試/正式環境的工程師。

## 本文件說明

本文件說明所有環境變數的用途與設定方式,以及不同環境的建議設定。

---

## 環境變數完整說明

### API 相關

#### `NUXT_PUBLIC_API_BASE_URL`

**說明**: 後端 API 的基礎網址

**類型**: `string`

**必填**: ✅ (當 Mock 關閉時)

**範例**:

```bash
# 開發環境
NUXT_PUBLIC_API_BASE_URL=http://localhost:8080/api

# 測試環境
NUXT_PUBLIC_API_BASE_URL=https://test-api.yourapp.com/api

# 正式環境
NUXT_PUBLIC_API_BASE_URL=https://api.yourapp.com/api
```

> [!TIP]
> 建議在網址結尾加上 `/api`,這樣前端呼叫 `/users` 時,實際請求會是 `https://api.yourapp.com/api/users`

---

#### `NUXT_PUBLIC_API_TIMEOUT`

**說明**: API 請求的超時時間 (毫秒)

**類型**: `number`

**預設值**: `30000` (30 秒)

**範例**:

```bash
# 一般情況 (30 秒)
NUXT_PUBLIC_API_TIMEOUT=30000

# 如果後端處理較慢 (60 秒)
NUXT_PUBLIC_API_TIMEOUT=60000
```

---

#### `NUXT_PUBLIC_API_RETRY`

**說明**: API 請求失敗時的重試次數

**類型**: `number`

**預設值**: `1`

**範例**:

```bash
# 不重試
NUXT_PUBLIC_API_RETRY=0

# 重試 1 次 (建議)
NUXT_PUBLIC_API_RETRY=1

# 重試 3 次
NUXT_PUBLIC_API_RETRY=3
```

> [!WARNING]
> 重試次數過多可能導致使用者等待時間過長,建議設定為 0-2 次。

---

#### `NUXT_PUBLIC_API_GLOBAL_LOADING`

**說明**: 是否顯示全域 Loading 進度條 (瀏覽器上方的藍色進度條)

**類型**: `boolean`

**預設值**: `true`

**範例**:

```bash
# 顯示全域 Loading
NUXT_PUBLIC_API_GLOBAL_LOADING=true

# 關閉全域 Loading
NUXT_PUBLIC_API_GLOBAL_LOADING=false
```

---

### Mock 相關

#### `NUXT_PUBLIC_FEATURE_API_MOCK`

**說明**: 是否啟用 Mock 模式 (使用假資料,不發送真實 API 請求)

**類型**: `boolean`

**預設值**: `false`

**範例**:

```bash
# 啟用 Mock (開發初期)
NUXT_PUBLIC_FEATURE_API_MOCK=true

# 關閉 Mock (串接真實 API)
NUXT_PUBLIC_FEATURE_API_MOCK=false
```

> [!IMPORTANT]
> 當 Mock 啟用時,所有 API 請求都會返回假資料,不會發送到後端。

---

#### `NUXT_PUBLIC_MOCK_DELAY`

**說明**: Mock 資料的延遲時間 (毫秒),用於模擬網路延遲

**類型**: `number`

**預設值**: `500`

**範例**:

```bash
# 快速回應 (200ms)
NUXT_PUBLIC_MOCK_DELAY=200

# 一般延遲 (500ms)
NUXT_PUBLIC_MOCK_DELAY=500

# 模擬慢速網路 (2 秒)
NUXT_PUBLIC_MOCK_DELAY=2000
```

---

### 應用程式相關

#### `NUXT_PUBLIC_APP_NAME`

**說明**: 應用程式名稱,會顯示在瀏覽器標題列

**類型**: `string`

**預設值**: `Nuxt3 App`

**範例**:

```bash
NUXT_PUBLIC_APP_NAME=我的應用程式
```

---

#### `NUXT_PUBLIC_APP_DESCRIPTION`

**說明**: 應用程式描述,用於 SEO

**類型**: `string`

**範例**:

```bash
NUXT_PUBLIC_APP_DESCRIPTION=這是一個很棒的應用程式
```

---

### 安全性相關

#### `NUXT_PUBLIC_ENABLE_CSRF`

**說明**: 是否啟用 CSRF (Cross-Site Request Forgery) 防護

**類型**: `boolean`

**預設值**: `false`

**範例**:

```bash
# 啟用 CSRF 防護
NUXT_PUBLIC_ENABLE_CSRF=true

# 關閉 CSRF 防護
NUXT_PUBLIC_ENABLE_CSRF=false
```

> [!NOTE]
> 如果啟用 CSRF,後端也需要配合驗證 `X-CSRF-Token` Header。

---

## 不同環境的設定範例

### 開發環境 (`.env.development`)

**使用時機**: 本地開發

**特點**:

- 使用 Mock 資料 (不需要後端)
- 快速回應
- 顯示詳細錯誤訊息

```bash
# ========================================
# 開發環境設定
# ========================================

# 應用程式
NUXT_PUBLIC_APP_NAME=我的應用程式 (開發)

# API 設定
NUXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NUXT_PUBLIC_API_TIMEOUT=30000
NUXT_PUBLIC_API_RETRY=1
NUXT_PUBLIC_API_GLOBAL_LOADING=true

# Mock 設定 (啟用 Mock,不需要後端)
NUXT_PUBLIC_FEATURE_API_MOCK=true
NUXT_PUBLIC_MOCK_DELAY=500

# 安全性
NUXT_PUBLIC_ENABLE_CSRF=false
```

---

### 測試環境 (`.env.staging`)

**使用時機**: 測試伺服器部署

**特點**:

- 連接測試環境後端
- 關閉 Mock
- 可能需要 CSRF 防護

```bash
# ========================================
# 測試環境設定
# ========================================

# 應用程式
NUXT_PUBLIC_APP_NAME=我的應用程式 (測試)

# API 設定
NUXT_PUBLIC_API_BASE_URL=https://test-api.yourapp.com/api
NUXT_PUBLIC_API_TIMEOUT=30000
NUXT_PUBLIC_API_RETRY=1
NUXT_PUBLIC_API_GLOBAL_LOADING=true

# Mock 設定 (關閉 Mock,使用真實 API)
NUXT_PUBLIC_FEATURE_API_MOCK=false

# 安全性
NUXT_PUBLIC_ENABLE_CSRF=true
```

---

### 正式環境 (`.env.production`)

**使用時機**: 正式上線

**特點**:

- 連接正式環境後端
- 啟用所有安全性設定
- 優化效能

```bash
# ========================================
# 正式環境設定
# ========================================

# 應用程式
NUXT_PUBLIC_APP_NAME=我的應用程式

# API 設定
NUXT_PUBLIC_API_BASE_URL=https://api.yourapp.com/api
NUXT_PUBLIC_API_TIMEOUT=30000
NUXT_PUBLIC_API_RETRY=1
NUXT_PUBLIC_API_GLOBAL_LOADING=true

# Mock 設定 (絕對不要在正式環境啟用 Mock!)
NUXT_PUBLIC_FEATURE_API_MOCK=false

# 安全性
NUXT_PUBLIC_ENABLE_CSRF=true
```

> [!CAUTION]
> 正式環境**絕對不要**啟用 Mock 模式!

---

### Demo 環境 (`.env.demo`)

**使用時機**: 給客戶展示,但沒有後端

**特點**:

- 使用 Mock 資料
- 模擬真實操作
- 較短的延遲時間

```bash
# ========================================
# Demo 環境設定
# ========================================

# 應用程式
NUXT_PUBLIC_APP_NAME=我的應用程式 (展示)

# API 設定 (不會真的用到,但還是要設定)
NUXT_PUBLIC_API_BASE_URL=https://demo-api.yourapp.com/api
NUXT_PUBLIC_API_TIMEOUT=30000
NUXT_PUBLIC_API_RETRY=0
NUXT_PUBLIC_API_GLOBAL_LOADING=true

# Mock 設定 (啟用 Mock,快速回應)
NUXT_PUBLIC_FEATURE_API_MOCK=true
NUXT_PUBLIC_MOCK_DELAY=300

# 安全性
NUXT_PUBLIC_ENABLE_CSRF=false
```

---

## 如何使用不同環境的設定

### 方法 1: 使用 `.env` 檔案

Nuxt 會自動根據 `NODE_ENV` 載入對應的 `.env` 檔案:

```bash
# 開發環境 (預設)
npm run dev
# 會載入 .env.development

# 測試環境
NODE_ENV=staging npm run build
# 會載入 .env.staging

# 正式環境
NODE_ENV=production npm run build
# 會載入 .env.production
```

### 方法 2: 手動指定環境變數

```bash
# 臨時覆蓋環境變數
NUXT_PUBLIC_API_BASE_URL=https://custom-api.com npm run dev
```

### 方法 3: 使用 `.env.local` (本地覆蓋)

建立 `.env.local` 檔案,這個檔案會覆蓋其他 `.env` 檔案的設定:

```bash
# .env.local (不要提交到 Git!)
NUXT_PUBLIC_API_BASE_URL=http://192.168.1.100:8080/api
```

> [!TIP]
> `.env.local` 適合用於個人開發環境的特殊設定,記得加入 `.gitignore`!

---

## 如何檢查環境變數

### 在程式碼中檢查

```typescript
// 任何 .vue 或 .ts 檔案
const config = useRuntimeConfig()

console.log('API Base URL:', config.public.api.baseUrl)
console.log('Mock 啟用:', config.public.featureApiMock)
console.log('App Name:', config.public.appName)
```

### 在瀏覽器 Console 檢查

```javascript
// 打開瀏覽器 DevTools > Console
const config = useRuntimeConfig()
console.log(config.public)
```

---

## 安全性注意事項

### 1. 不要在環境變數中存放敏感資訊

> [!CAUTION]
> 所有 `NUXT_PUBLIC_*` 開頭的環境變數都會**暴露在前端**!

**❌ 錯誤做法**:

```bash
# 這些資訊會暴露在前端,非常危險!
NUXT_PUBLIC_DB_PASSWORD=secret123
NUXT_PUBLIC_API_SECRET_KEY=abc123
```

**✅ 正確做法**:

```bash
# 敏感資訊不要加 PUBLIC 前綴,這樣只會在伺服器端使用
NUXT_DB_PASSWORD=secret123
NUXT_API_SECRET_KEY=abc123
```

### 2. 不要提交 `.env` 到 Git

確保 `.gitignore` 包含:

```gitignore
# 環境變數檔案
.env
.env.local
.env.*.local
```

### 3. 使用 `.env.example` 作為範本

提供 `.env.example` 給團隊成員參考:

```bash
# .env.example
NUXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NUXT_PUBLIC_FEATURE_API_MOCK=true
NUXT_PUBLIC_MOCK_DELAY=500
```

---

## 常見問題排除

### Q1: 修改 `.env` 後沒有生效

**原因**: Nuxt 只在啟動時讀取環境變數

**解決方法**: 重新啟動開發伺服器

```bash
# 停止伺服器 (Ctrl+C)
# 重新啟動
npm run dev
```

### Q2: 環境變數在程式碼中是 `undefined`

**原因**: 環境變數名稱錯誤,或沒有加 `NUXT_PUBLIC_` 前綴

**解決方法**: 確認環境變數名稱正確,且前端使用的變數必須加 `NUXT_PUBLIC_` 前綴

### Q3: 正式環境的環境變數如何設定?

**解決方法**: 根據你的部署平台設定:

- **Vercel**: 在 Project Settings > Environment Variables 設定
- **Netlify**: 在 Site Settings > Build & Deploy > Environment 設定
- **Docker**: 在 `docker-compose.yml` 或啟動指令中設定
- **傳統伺服器**: 在 `.env.production` 設定

---

## 延伸閱讀

- [快速開始:API 串接](./quick-start.md) - API 串接指南
- [後端 API 規範](./backend-contract.md) - 後端 API 格式規範
- [Nuxt 官方文件:Runtime Config](https://nuxt.com/docs/guide/going-further/runtime-config)

---

## 總結

**核心要點**:

- ✅ 使用 `NUXT_PUBLIC_*` 前綴的環境變數會暴露在前端
- ✅ 不同環境使用不同的 `.env` 檔案
- ✅ 修改環境變數後需要重新啟動伺服器
- ✅ 不要在環境變數中存放敏感資訊
- ✅ 使用 `.env.example` 作為範本
