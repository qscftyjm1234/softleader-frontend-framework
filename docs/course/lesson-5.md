<!-- Author: antigravity -->

# 第五課：環境變數設定

本課程教您如何針對不同環境（開發、測試、正式）管理系統參數。透過環境變數，您可以輕鬆切換 API 網址而無需修改程式碼。

---

## 1. 建立環境配置檔

系統會根據目前的執行模式自動讀取對應的檔案。以下是指令與環境變數檔案的對應關係：

| 執行指令                | 模式 (Mode)   | 優先載入的環境變數檔案 | 適用場景        |
| :---------------------- | :------------ | :--------------------- | :-------------- |
| `npm run dev`           | `development` | `.env.development`     | 本機開發、除錯  |
| `npm run build`         | `production`  | `.env.production`      | 正式環境佈署    |
| `npm run build:staging` | `staging`     | `.env.staging`         | 測試/預發布環境 |

> [!NOTE]
> 載入規則：`.env` (通用設定) 會先被讀取，接著讀取特定模式的檔案（如 `.env.development`）。若兩者有同名變數，則**模式特定檔案**的優先權較高，會覆蓋通用設定。

(1.) 在專案根目錄下建立 `.env.development` 檔案。
(2.) 貼入以下完整設定：

```ini
# API 基礎網址
NUXT_PUBLIC_API_BASE=https://dev-api.example.com

# 頁面標題前綴
NUXT_PUBLIC_SITE_NAME=開發版系統
```

---

## 2. 存取環境變數

在程式碼中，我們統一透過 `useRuntimeConfig` 組合式函式來讀取這些設定。

(1.) 在 `pages/` 資料夾下建立 `env-test.vue`。
(2.) 貼入以下完整程式碼：

```vue
<template>
  <div class="p-10 min-h-screen bg-slate-50 flex items-center justify-center">
    <div class="max-w-md w-full bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm">
      <h1 class="text-2xl font-black text-slate-900 mb-6">環境變數讀取測試</h1>

      <div class="space-y-4">
        <div class="p-6 bg-blue-50 rounded-2xl border border-blue-100">
          <label class="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
            目前站台名稱
          </label>
          <div class="text-xl font-black text-blue-900">{{ config.public.siteName }}</div>
        </div>

        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            API 基礎網址
          </label>
          <div class="text-sm font-bold text-slate-600 break-all">{{ config.public.apiBase }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 取得全域執行環境設定
const config = useRuntimeConfig()

definePageMeta({
  title: '環境變數範例',
  layout: 'portal'
})
</script>
```

---

## 3. 小結

一
環境變數檔必須放在根目錄，並遵循 `.env.[mode]` 的命名規則。
二
開發模式對應 `.env.development`，正式模式對應 `.env.production`。
三
在程式碼中僅讀取 `config.public`，絕對不要將機密資訊（如 API Key）直接寫死在程式碼中。
四
修改任何以 `.env` 開頭的檔案後，必須重啟開發伺服器 (`npm run dev`) 才能確保變數正確載入。

---

[上一課 第四課：頁面導航與路由](./lesson-4.md) | [下一課 第六課：UI 框架介紹與實戰 (Ant Design Vue)](./lesson-6.md) | [回首頁](../../README.md)
