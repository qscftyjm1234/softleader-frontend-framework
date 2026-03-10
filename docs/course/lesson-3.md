<!-- Author: antigravity -->

# 第三課：建立您的第一個元件

本課程教您如何建立並使用元件。透過元件化開發，您可以提高程式碼的重用性。

---

## 1. 建立資料夾

元件通常存放在專案的指定目錄中。

(1.) 檢查或建立 `components/` 資料夾。

---

## 2. 建立檔案

建立一個新的元件檔案，我們這裡以卡片元件為例。

(2.) 在 `components/` 資料夾下建立 `MyCard.vue` 檔案。

---

## 3. 引入程式碼

將下方的完整程式碼貼入檔案中。這個元件使用了插槽（Slot）技術，讓它可以靈活顯示不同的內容。

(3.) 貼入以下程式碼：

```vue
<template>
  <div
    class="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all"
  >
    <div class="flex items-center gap-3 mb-4">
      <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
        <slot name="icon">
          <!-- 預設圖示 -->
          <span class="font-bold">？</span>
        </slot>
      </div>
      <h3 class="text-xl font-bold text-slate-800">
        <slot name="title">預設標題</slot>
      </h3>
    </div>
    <div class="text-slate-500 leading-relaxed">
      <slot>預設內容</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// 無需複雜邏輯即可使用
</script>
```

---

## 4. 在頁面中使用元件

建立好元件後，您可以直接在任何頁面中呼叫它。

(1.) 建立或開啟 `pages/demo-card.vue`。
(2.) 貼入以下完整頁面程式碼：

```vue
<template>
  <div class="p-10 bg-slate-50 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-black text-slate-900 mb-8">元件使用範例</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MyCard>
          <template #title>快速入門</template>
          這是一個卡片元件的基礎用法，它會自動套用高品質的陰影與圓角。
        </MyCard>

        <MyCard>
          <template #title>進階擴充</template>
          您可以透過插槽來放入任何您想要的內容。
        </MyCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: '元件示範頁',
  layout: 'portal'
})
</script>
```

---

## 5. 小結

一
元件放在 `components/` 資料夾。
二
使用插槽讓元件更具備彈性。
三
在頁面中直接寫標籤，系統會自動幫您找到該元件。

---

## 6. 延伸資源

一
[Nuxt 3 官方網站](https://nuxt.com/)

---

[上一課 第二課：建立您的第一個頁面](./lesson-2.md) | [下一課 第四課：頁面導航與路由](./lesson-4.md) | [回首頁](../../README.md)
