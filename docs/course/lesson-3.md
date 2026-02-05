# 第三課：頁面導航與路由

在 Nuxt 3 中，路由是根據檔案結構自動產生的 (File-system Routing)。這一課我們將學習如何在頁面間跳轉。

## 步驟 1: 建立列表頁面

我們已經有了 `pages/demo/index.vue` (首頁)，現在我們要建立一個列表頁 `pages/demo/list.vue`。

修改 `pages/demo/list.vue` (我們將在這裡建立列表頁)：

```vue
<!-- pages/demo/list.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'demo'
})

const router = useRouter()

// 模擬一些資料
const users = ref([
  { id: 1, name: '王小明', role: '前端工程師' },
  { id: 2, name: '李大華', role: '產品經理' },
  { id: 3, name: '張阿姨', role: '測試人員' }
])

const navigateToDetail = (id: number) => {
  router.push(`/user/${id}`)
}
</script>

<template>
  <div class="demo-list-page">
    <a-space
      direction="vertical"
      size="large"
      style="width: 100%"
    >
      <a-typography-title :level="2">使用者列表</a-typography-title>

      <p>
        這裡展示如何使用
        <code>v-for</code>
        渲染列表，並跳轉至動態路由。
      </p>

      <a-row :gutter="[16, 16]">
        <a-col
          :span="8"
          v-for="user in users"
          :key="user.id"
        >
          <!-- 使用 ICard (Interface Layer) -->
          <ICard class="h-full">
            <template #title>
              {{ user.name }}
            </template>

            <p>職稱: {{ user.role }}</p>
            <p>ID: {{ user.id }}</p>

            <a-divider />

            <!-- 使用 IButton -->
            <IButton
              variant="outlined"
              block
              @click="navigateToDetail(user.id)"
            >
              查看詳情
            </IButton>
          </ICard>
        </a-col>
      </a-row>

      <div class="mt-4">
        <IButton
          variant="secondary"
          to="/demo"
        >
          回 Demo 首頁
        </IButton>
      </div>
    </a-space>
  </div>
</template>
```

## 步驟 2: 建立動態路由頁面 (詳情頁)

建立一個新檔案 `pages/user/[id].vue`。
`[id]` 代表這是一個動態參數，可以匹配 `/user/1`, `/user/123` 等路徑。

```vue
<!-- pages/user/[id].vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'demo'
})

const route = useRoute()
const userId = route.params.id
</script>

<template>
  <div class="user-detail-page">
    <a-space
      direction="vertical"
      size="large"
    >
      <a-typography-title :level="2">使用者詳情頁</a-typography-title>

      <a-alert
        message="動態路由測試"
        :description="`你現在位於 User ID: ${userId} 的頁面`"
        type="info"
        show-icon
      />

      <ICard>
        <p>
          這是一個動態路由頁面 (
          <code>pages/user/[id].vue</code>
          )。
        </p>
        <p>
          Nuxt 會自動將網址中的 ID 放入
          <code>route.params.id</code>
          。
        </p>
      </ICard>

      <div>
        <IButton
          variant="secondary"
          to="/demo/list"
        >
          返回列表
        </IButton>
      </div>
    </a-space>
  </div>
</template>
```

## 步驟 3: 測試導航

1. 前往列表頁 `http://localhost:3000/demo/list`。
2. 點擊卡片上的「查看詳情」，應跳轉至 `/user/1`。
3. 在詳情頁，您應該會看到 "正在檢視使用者 ID: 1"。
4. 點擊「返回列表」，應回到上一頁。

---

[上一課：使用介面元件](./lesson-2.md) | [回首頁](../../README.md) | [下一課：API 串接與資料層](./lesson-4.md)
