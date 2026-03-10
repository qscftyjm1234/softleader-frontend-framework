<!-- Author: antigravity -->

# 第八課：客製化圖示系統

本課程教您如何在專案中使用圖示。我們已經整合了豐富的圖示庫，讓您能透過簡單的參數來增強介面的識別度。

---

## 1. 使用圖示組件

本專案統一使用 `IIcon` 來處理所有的圖示顯示需求。

(1.) 開啟您的頁面檔案。
(2.) 準備好要使用的圖示名稱（預設支援 MDI 圖示庫）。

---

## 2. 引入完整程式碼

這裡展示了如何調整圖示的大小、顏色以及結合按鈕使用的完整範例。

(3.) 貼入以下完整程式碼：

```vue
<template>
  <div class="p-10 bg-slate-50 min-h-screen">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- 基礎圖示展示 -->
      <div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center">
        <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
          不同大小與顏色的圖示
        </h3>
        <div class="flex items-center justify-center gap-10">
          <IIcon
            icon="mdi-home"
            size="24"
            class="text-slate-400"
          />
          <IIcon
            icon="mdi-heart"
            size="32"
            class="text-red-500"
          />
          <IIcon
            icon="mdi-star"
            size="48"
            class="text-yellow-400"
          />
        </div>
      </div>

      <!-- 按鈕整合展示 -->
      <div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
        <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 text-center">
          帶有圖示的按鈕
        </h3>
        <div class="flex flex-col md:flex-row items-center justify-center gap-4">
          <IButton
            icon="mdi-plus"
            variant="primary"
            class="px-8"
          >
            新增資料
          </IButton>

          <IButton
            icon="mdi-delete"
            class="bg-red-50 text-red-600 border border-red-100"
          >
            刪除項目
          </IButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: '圖示使用大會',
  layout: 'portal'
})
</script>
```

---

## 3. 圖示搜尋方法

如果您需要尋找更多圖示，請按照以下步驟操作。

(1.) 前往圖示庫官網搜尋。
(2.) 複製您喜歡的名稱（例如 `mdi-cog`）。
(3.) 直接填入 `IIcon` 的 `icon` 參數中。

---

## 4. 實戰：使用自定義 SVG

除了推薦的 MDI 圖示，您也可以使用自己設計的 SVG 檔案。

(1.) 將您的 SVG 檔案（例如 `smile.svg`）放入 `assets/icons/` 資料夾下。
(2.) 系統會自動完成掃描，您無需修改任何註冊檔案。
(3.) 在組件中使用時，名稱請加上 `svg-` 前綴（例如 `svg-smile`）。

```vue
<template>
  <div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center">
    <!-- 引用 assets/icons/smile.svg -->
    <IIcon
      icon="svg-smile"
      size="32"
      class="text-blue-500"
    />
    <span class="ml-2 font-bold">自定義專案標誌</span>
  </div>
</template>
```

---

## 5. 小結

一
統一使用 `<IIcon />` 組件，不要直接寫原生的圖示標籤。
二
可以使用 `mdi-` 名稱調用內建圖示，或使用 `svg-` 名稱調用 `assets/icons/` 下的自訂檔案。
三
可以直接用 Tailwind 的類別來控制顏色與特效。
四
按鈕組件內建 `icon` 屬性，可以直接傳入名稱進行顯示。

---

## 6. 延伸資源

一
[Iconify 萬用圖示搜尋網](https://iconify.design/)
二
[Nuxt Icon 模組文檔](https://nuxt.com/modules/icon)

---

[上一課 第七課：UI 組件開發規範](./lesson-7.md) | [下一課 第九課：資料格式化工具](./lesson-9.md) | [回首頁](../../README.md)
