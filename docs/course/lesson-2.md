<!-- Author: antigravity -->

# 第二課：建立您的第一個頁面

本課程教您如何建立一個新的頁面。透過簡單的三個步驟，讓您的網頁即時呈現。

---

## 1. 建立資料夾

請先確保專案中具備存放頁面的根目錄。

(1.) 檢查或建立 `pages/` 資料夾。

---

## 2. 建立檔案

在指定的路徑下建立新的頁面檔案。

(2.) 在 `pages/` 資料夾下建立 `hello.vue` 檔案。

---

## 3. 引入程式碼

將下方的完整程式碼貼入剛才建立的檔案中，即可完成一個功能完整的頁面。

(3.) 貼入以下程式碼：

```vue
<template>
  <div class="p-10 bg-slate-50 min-h-screen">
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <h1 class="text-3xl font-black text-slate-900 mb-4">歡迎來到我的首頁</h1>
      <p class="text-slate-600 leading-relaxed">
        這是透過開發包建立的第一個頁面，排板整齊且具備高品質的視覺效果。
      </p>
      <div class="mt-8 flex justify-end">
        <NuxtLink
          to="/"
          class="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
        >
          返回首頁
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: '哈囉世界',
  layout: 'portal'
})
</script>
```

---

## 4. 預覽頁面

啟動專案後，瀏覽 `http://localhost:3000/hello` 即可看到頁面。

---

## 5. 小結

一
頁面的檔案必須放在 `pages/` 資料夾中。
二
檔案的名稱就是網址的路徑。
三
使用開發包後，頁面會自動具備高品質的版面配置。

---

## 6. 延伸資源

一
[Nuxt 3 官方網站](https://nuxt.com/)

---

[上一課 第一課：開發包導論與介面理念](./lesson-1.md) | [下一課 第三課：建立您的第一個元件](./lesson-3.md) | [回首頁](../../README.md)
