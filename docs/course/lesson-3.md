# 第三課：頁面導航與路由

在 Nuxt 3 中，路由是根據檔案結構自動產生的 (File-system Routing)。這一課我們將學習如何在頁面間跳轉。

## 步驟 1: 建立列表頁面

我們已經有了 `pages/demo/index.vue`，現在把它當作列表頁。我們需要修改它，讓它可以導向到詳情頁。

修改 `pages/demo/index.vue`：

```vue
<!-- pages/demo/index.vue -->
<template>
  <div class="demo-page">
    <h1>使用者列表</h1>

    <div class="user-list">
      <!-- 連結到詳情頁 ID: 1 -->
      <NuxtLink to="/demo/1">
        <ICard class="mb-2 p-4 cursor-pointer hover:bg-gray-50">使用者 1 (點擊查看詳情)</ICard>
      </NuxtLink>

      <!-- 連結到詳情頁 ID: 2 -->
      <NuxtLink to="/demo/2">
        <ICard class="mb-2 p-4 cursor-pointer hover:bg-gray-50">使用者 2 (點擊查看詳情)</ICard>
      </NuxtLink>
    </div>

    <div class="mt-4">
      <IButton
        variant="outlined"
        to="/"
      >
        回首頁
      </IButton>
    </div>
  </div>
</template>
```

## 步驟 2: 建立動態路由頁面 (詳情頁)

建立一個新檔案 `pages/demo/[id].vue`。
`[id]` 代表這是一個動態參數，可以匹配 `/demo/1`, `/demo/123` 等路徑。

```vue
<!-- pages/demo/[id].vue -->
<script setup lang="ts">
const route = useRoute()
const router = useRouter()

// 獲取網址上的 id 參數
const userId = route.params.id

// 返回上一頁的函式
const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="detail-page">
    <h1>使用者詳情</h1>
    <p>正在檢視使用者 ID: {{ userId }}</p>

    <ICard class="mt-4 p-8">這裡可以放使用者的詳細資料...</ICard>

    <div class="actions mt-4">
      <IButton
        variant="secondary"
        @click="goBack"
      >
        返回列表
      </IButton>
    </div>
  </div>
</template>
```

## 步驟 3: 測試導航

1. 在列表頁點擊卡片，應跳轉至 `/demo/1`。
2. 在詳情頁，您應該會看到 "正在檢視使用者 ID: 1"。
3. 點擊「返回列表」，應回到上一頁。

---

[上一課：使用介面元件](./lesson-2.md) | [回首頁](../../README.md) | [下一課：API 串接與資料層](./lesson-4.md)
