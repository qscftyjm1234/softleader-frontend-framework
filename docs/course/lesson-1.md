# 第一課：建立您的第一個頁面

完成環境建置後，請跟隨以下步驟建立您的第一個頁面。

## 步驟 1: 建立佈局 (Layout)

在 `layouts` 資料夾中建立 `tutorial.vue`，定義頁面的基本結構。

```vue
<!-- layouts/tutorial.vue -->
<script setup lang="ts">
// 這裡可以放置佈局特定的邏輯
</script>

<template>
  <div class="tutorial-layout">
    <header>Tutorial Header</header>
    <main>
      <slot />
      <!-- 這是頁面內容插入的地方 -->
    </main>
    <footer>Tutorial Footer</footer>
  </div>
</template>

<style scoped>
.tutorial-layout {
  padding: 20px;
  border: 2px dashed #ccc;
}
</style>
```

## 步驟 2: 建立頁面 (Page)

在 `pages` 資料夾中建立 `tutorial/index.vue`。
**注意**: 我們使用 Interface Layer 元件 (如 `IButton`) 來保持代碼與底層 UI 框架的解耦。

```vue
<!-- pages/tutorial/index.vue -->
<script setup lang="ts">
// 設定此頁面使用剛建立的 layout
definePageMeta({
  layout: 'tutorial'
})

const handleClick = () => {
  alert('Hello from Interface Layer!')
}
</script>

<template>
  <div class="tutorial-page">
    <h1>我的第一個頁面</h1>
    <p>這是一個示範頁面。</p>

    <!-- 使用 IButton (Interface Layer) 而非直接使用 UI 庫元件 -->
    <IButton
      variant="primary"
      @click="handleClick"
    >
      點擊我
    </IButton>
  </div>
</template>
```

## 步驟 3: 查看成果

前往 `http://localhost:3000/tutorial` 查看您的頁面。
您應該會看到帶有虛線邊框的佈局，以及一個功能正常的按鈕。

---

[回首頁](../../README.md) | [下一課：使用介面元件](./lesson-2.md)
