<!-- Author: cindy -->

# 第六課:頁面導航與路由

本課程教您如何在頁面間跳轉。

## 1. 檔案路由

Nuxt 使用檔案系統路由。

- `pages/index.vue` -> `/`
- `pages/about.vue` -> `/about`
- `pages/users/[id].vue` -> `/users/123`

---

## 2. 導航方式

### 使用 NuxtLink (推薦)

```vue
<NuxtLink to="/about">
  <IButton>關於我們</IButton>
</NuxtLink>
```

### 使用 Router

```vue
<script setup lang="ts">
const router = useRouter()

function goHome() {
  router.push('/')
}
</script>
```

---

## 3. 取得參數

在 `pages/users/[id].vue` 中：

```vue
<script setup lang="ts">
const route = useRoute()
console.log(route.params.id)
</script>
```

---

## 4. 小結

1. **路由**: 檔案即路由
2. **跳轉**: `<NuxtLink>` 或 `router.push`
3. **參數**: `route.params`

---

[上一課:客製化圖示系統](./lesson-5.md) | [下一課:API 串接與資料層](./lesson-7.md) | [回首頁](../../README.md)
