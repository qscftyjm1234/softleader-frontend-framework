<!-- Author: antigravity -->

# 第一課：開發包導論與介面理念

本課程將帶領您了解專案的地基：核心開發包。我們會從環境配置開始，教您如何建立第一個模組與頁面，並介紹我們追求的企業級設計規範。

---

## 1. 建立模組資料夾

首先，您需要在專案根目錄下建立模組的基本結構，以便系統能自動偵測到您的功能。

(1.) 建立 `modules/` 資料夾（如果尚未建立）。
(2.) 在 `modules/` 下建立您的新模組目錄（例如 `my-project/`）。
(3.) 在該目錄下建立 `pages/` 子目錄。

---

## 2. 建立頁面檔案與引入程式碼

接著，我們要在剛才建立的路徑中新增一個功能頁面，並貼入完整的程式碼。

(2.) 在 `modules/my-project/pages/` 下建立 `index.vue`。
(3.) 貼入以下完整程式碼：

```vue
<template>
  <div class="p-10">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-black text-slate-900 mb-6">我的第一個模組頁面</h1>
      <p class="text-lg text-slate-600 leading-relaxed">
        這是一個透過模組化架構建立的頁面。系統會自動根據目錄結構產生對應的路徑。
      </p>

      <div class="mt-8 bg-blue-50 border border-blue-100 p-8 rounded-3xl">
        <h2 class="text-xl font-bold text-blue-900 mb-2">掌握開發核心</h2>
        <p class="text-blue-700">保持程式碼整潔，嚴格遵守中文繁體與無符號的設計原則。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: '初探開發包',
  layout: 'portal'
})
</script>
```

---

## 3. 啟用產品設定

最後，您必須在全域設定中宣告這個新模組，系統才會正式將其納入路由。

(1.) 開啟 `configs/default.json`。
(2.) 貼入或修改以下內容：

```json
{
  "name": "Vue前端開發包系統",
  "modules": ["showcase", "my-project"]
}
```

---

## 4. 介面設計理念

我們對美感有著絕對的堅持，所有開發者都應遵循以下信條：

一
清爽大氣：善用留白，讓使用者感到舒適。
二
在地化文字：使用台灣繁體中文，去除所有不必要的括號與外文註釋。
三
去符號化：除非是程式語法需要，否則不使用額外的裝飾符號。

---

## 5. 小結

一
開發包透過自動化掃描，大幅減少了手動改設定的時間。
二
遵循 (1)(2)(3) 步驟，即可快速擴充專案功能。
三
隨時保持對美感的追求，讓系統具備一致的企業級品質。

---

[回首頁](../../README.md) | [下一課 第二課：建立您的第一個頁面](./lesson-2.md)
