<!-- Author: cindy -->

# 第十一課:環境變數設定

本課程教您如何**實戰**管理不同環境 (開發、測試、正式) 的變數設定。

## 1. 為什麼需要環境變數? (實戰情境)

在真實專案中，我們通常會有三種環境，對應不同的 API 主機：

1.  **開發環境 (Development)**: 本機開發，連接 `localhost` 或測試機，通常會**開啟 Mock** 假資料功能。
2.  **測試環境 (Staging)**: 部署到測試伺服器，連接真實的測試資料庫，給 QA 測試用。
3.  **正式環境 (Production)**: 給真實用戶使用，連接正式資料庫，**絕對不能開啟 Mock**。

我們不希望每次切換環境都要手動修改程式碼，這時候就是 `.env` 派上用場的時候。

---

## 2. 建立設定檔

請在專案根目錄建立以下三個檔案：

### `.env.development` (本地開發用)

```ini
# API 網址指向本機或測試機
NUXT_PUBLIC_API_BASE=https://dev-api.example.com
# 開發時開啟 Mock，方便前端獨立作業
NUXT_PUBLIC_FEATURE_API_MOCK=true
# 顯示除錯工具
NUXT_PUBLIC_SHOW_DEV_TOOLS=true
```

### `.env.staging` (測試站用)

```ini
# API 網址指向測試伺服器 (SIT/UAT)
NUXT_PUBLIC_API_BASE=https://staging-api.example.com
# 測試站通常關閉 Mock，要測真實 API
NUXT_PUBLIC_FEATURE_API_MOCK=false
# 關閉除錯工具
NUXT_PUBLIC_SHOW_DEV_TOOLS=false
```

### `.env.production` (正式站用)

```ini
# API 網址指向正式伺服器
NUXT_PUBLIC_API_BASE=https://api.example.com
# 正式站嚴格禁止 Mock
NUXT_PUBLIC_FEATURE_API_MOCK=false
# 關閉除錯工具
NUXT_PUBLIC_SHOW_DEV_TOOLS=false
```

---

## 3. 實戰: 如何切換環境?

### 情境 A: 我現在是工程師，要在本機開發

直接執行：

```bash
npm run dev
```

Nuxt 會自動讀取 `.env.development`。
此時你的 API 會連到 `dev-api`，而且 `Mock` 功能是開啟的。

### 情境 B: 我要打包測試站版本 (CI/CD)

當程式碼推送到測試分支，CI/CD Server 會執行：

```bash
# 指定模式為 staging
npx nuxt build --dotenv .env.staging
```

或者有些團隊習慣在 CI/CD 介面直接設定變數，這時候 **環境變數 (Environment Variables) 的權重最高**，會覆寫檔案裡的設定。

### 情境 C: 我要打包正式站版本

```bash
# 預設 build 會讀取 .env.production
npm run build
```

這樣打包出來的程式，API 就會自動連到 `api.example.com`，而且 Mock 功能被強制關閉。

---

## 4. 程式碼如何讀取?

我們**不需要**在程式碼裡寫 `if (env === 'dev')` 這種判斷式。
而是直接讀取變數：

```typescript
// composables/useApi.ts

export const useApi = (url, options) => {
  const config = useRuntimeConfig()

  // 自動根據環境切換 API 網址
  const baseURL = config.public.apiBase

  // 自動判斷是否啟用 Mock
  const enableMock = config.public.featureApiMock

  if (enableMock) {
    // 走 Mock 邏輯...
  } else {
    // 走真實 API...
  }
}
```

---

## 5. 小結

1.  **檔案分流**: 準備 `.env.development`, `.env.staging`, `.env.production`。
2.  **自動切換**: `npm run dev` 讀開發設定，`npm run build` 讀正式設定。
3.  **程式解耦**: 程式碼只管讀取 `config.public.xxx`，不要寫死任何網址。

這就是業界標準的環境變數實戰用法！

---

[上一課:資安與權限控管](./lesson-10.md) | [下一課:進階表單處理](./lesson-12.md) | [回首頁](../../README.md)
