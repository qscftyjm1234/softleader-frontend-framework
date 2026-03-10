<!-- Author: antigravity -->

# 第七課：UI 組件開發規範

本課程說明本專案的 UI 開發規範。核心目標是：一律使用核心開發包封裝好的組件。

---

## 1. 使用核心組件

在開發頁面或業務組件時，應優先使用系統提供的標準零件。

(1.) 開啟您的頁面檔案（例如 `pages/hello.vue`）。
(2.) 檢查標籤名稱，確保使用 `I` 開頭的組件。

---

## 3. 擴充組件功能

如果您發現現有的組件（例如 `ISelect`）缺少您需要的功能，請不要繞過它，而是選擇擴充它。

(1.) 找到組件路徑：`components/uiInterface/ISelect.vue`。
(2.) 在 `defineProps` 中新增您的參數。
(3.) 貼入以下完整範例代碼：

```vue
<script setup lang="ts">
// 增加搜尋功能參數
defineProps<{
  showSearch?: boolean
}>()
</script>

<template>
  <!-- 將參數往下傳給底層組件 -->
  <a-select :show-search="showSearch">
    <slot />
  </a-select>
</template>
```

---

## 4. 建立業務組件

如果組件包含特定的業務邏輯（例如直接向後端抓資料），應將其放在業務資料夾中。

(1.) 建立 `components/business/` 資料夾。
(2.) 建立 `UserSelect.vue` 檔案。
(3.) 貼入以下完整程式碼：

```vue
<script setup lang="ts">
// 在這裡處理業務邏輯，例如抓取使用者清單
const users = [
  { label: '王小明', value: '001' },
  { label: '李小華', value: '002' }
]
</script>

<template>
  <ISelect
    :options="users"
    placeholder="請選擇對應的員工"
    class="w-full"
  />
</template>
```

---

## 5. 小結

一
看到介面零件就打 `I`，不要打 `a`。
二
功能不夠就去改 `I`，不要繞過去用原生組件。
三
業務邏輯請放在 `business/` 子目錄中。

---

```vue
<script setup lang="ts">
definePageMeta({
  title: '資料列表範例',
  layout: 'portal'
})
</script>
```

---

[上一課 第六課：UI 框架介紹與實戰 (Ant Design Vue)](./lesson-6.md) | [下一課 第八課：客製化圖示系統](./lesson-8.md) | [回首頁](../../README.md)
