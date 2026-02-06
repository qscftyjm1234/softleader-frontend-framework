<!-- Author: cindy -->

# 第二課:建立您的第一個元件

本課程教您如何建立並使用 components.

## 1. 建立組件 (components/MyCard.vue)

```vue
<template>
  <div class="border p-4 rounded shadow">
    <h3 class="text-xl font-bold">
      <slot name="title">預設標題</slot>
    </h3>
    <div class="text-gray-600 mt-2">
      <slot>預設內容</slot>
    </div>
  </div>
</template>
```

## 2. 使用組件

在頁面中直接使用，Nuxt 會自動引入。

```vue
<template>
  <div class="p-8">
    <MyCard>
      <template #title>歡迎光臨</template>
      這是一個卡片組件。
    </MyCard>
  </div>
</template>
```

---

[上一課:建立您的第一個頁面](./lesson-1.md) | [下一課:UI 框架介紹](./lesson-3.md) | [回首頁](../../README.md)
