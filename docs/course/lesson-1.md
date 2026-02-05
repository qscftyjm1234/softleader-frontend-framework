# 第一課：建立您的第一個頁面

完成環境建置後，請跟隨以下步驟建立您的第一個頁面。

## 步驟 1: 建立佈局 (Layout)

在 `layouts` 資料夾中建立 `demo.vue`，定義頁面的基本結構。

```vue
<!-- layouts/demo.vue -->
<script setup lang="ts">
// 使用 Ant Design 的 Layout 元件
</script>

<template>
  <a-layout class="demo-layout">
    <a-layout-header class="header">
      <div class="logo">Demo Project</div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="home">
          <NuxtLink to="/demo">首頁</NuxtLink>
        </a-menu-item>
        <a-menu-item key="list">
          <NuxtLink to="/demo/list">列表</NuxtLink>
        </a-menu-item>
      </a-menu>
    </a-layout-header>

    <a-layout-content style="padding: 0 50px; margin-top: 64px">
      <div class="site-layout-content">
        <slot />
        <!-- 這是頁面內容插入的地方 -->
      </div>
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      Nuxt3 Demo Project ©2024 Created by Ant Design Vue
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.demo-layout {
  min-height: 100vh;
}

.header {
  position: fixed;
  z-index: 1;
  width: 100%;
}

.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  text-align: center;
  line-height: 31px;
  font-weight: bold;
}

.site-layout-content {
  background: #fff;
  padding: 24px;
  min-height: 380px;
  margin-top: 24px;
}
</style>
```

## 步驟 2: 建立頁面 (Page)

在 `pages` 資料夾中建立 `demo/index.vue`。
**注意**: 我們使用 Interface Layer 元件 (如 `IButton`) 來保持代碼與底層 UI 框架的解耦。

```vue
<!-- pages/demo/index.vue -->
<script setup lang="ts">
// 設定此頁面使用剛建立的 layout
definePageMeta({
  layout: 'demo'
})

const handleClick = () => {
  alert('Hello from Interface Layer!')
}
</script>

<template>
  <div class="demo-page">
    <a-space
      direction="vertical"
      size="large"
    >
      <a-typography-title :level="2">歡迎來到 Demo 範例區</a-typography-title>

      <a-typography-paragraph>
        這個區域展示了 Nuxt 3 的路由與佈局功能。你可以透過上方的導覽列切換不同的範例頁面。
      </a-typography-paragraph>

      <a-row :gutter="16">
        <a-col :span="8">
          <a-card
            title="列表頁面"
            hoverable
            @click="$router.push('/demo/list')"
          >
            <p>展示列表渲染與動態路由連結。</p>
          </a-card>
        </a-col>
      </a-row>

      <a-typography-paragraph>
        並且試試看點擊右上角的「聯絡我們」，它是一個位於根目錄的獨立頁面。
      </a-typography-paragraph>

      <a-card
        title="互動測試"
        style="width: 100%"
      >
        <p>測試按鈕與事件：</p>
        <IButton
          variant="primary"
          @click="handleClick"
        >
          點擊我測試
        </IButton>
      </a-card>
    </a-space>
  </div>
</template>
```

### 補充：檔案路徑與 URL 的對應關係

Nuxt 使用 **檔案系統路由 (File System Routing)**，也就是說「資料夾結構」直接決定了「網址」。

| 檔案路徑               | 對應 URL     | 說明                  |
| :--------------------- | :----------- | :-------------------- |
| `pages/demo/index.vue` | `/demo`      | demo 資料夾的首頁     |
| `pages/demo/list.vue`  | `/demo/list` | 一般頁面              |
| `pages/user/[id].vue`  | `/user/123`  | 動態路由 (詳見第三課) |

包含範例的 layout UI 要一體並且相互有關連性，因此我們在 Layout 中加入了導覽列。為了讓導覽列的連結都能正常工作，請參考以下內容建立其他範例頁面。

### 步驟 2-1: 建立新範例頁面

為了讓 Layout 中的導覽連結有效，我們需要建立對應的頁面：

#### 1. 列表頁面 (`pages/demo/list.vue`)

展示列表渲染與連結。

```vue
<!-- pages/demo/list.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'demo'
})
const users = ref([
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' }
])
</script>

<template>
  <div>
    <h2>使用者列表</h2>
    <ul>
      <li
        v-for="user in users"
        :key="user.id"
      >
        <NuxtLink :to="`/user/${user.id}`">{{ user.name }}</NuxtLink>
      </li>
    </ul>
    <IButton to="/demo">回首頁</IButton>
  </div>
</template>
```

## 步驟 3: 查看成果

前往 `http://localhost:3000/demo` 查看您的頁面。
您應該會看到帶有虛線邊框的佈局，以及一個功能正常的按鈕。

---

[回首頁](../../README.md) | [下一課：使用介面元件](./lesson-2.md)
