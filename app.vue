<!-- 

# 渲染順序順序：
先渲染 `app.vue`     負責把對應路由的 page 插進 `<NuxtPage />` 裡。

# `<NuxtPage />`    負責「插入 route 對應的 pages/*.vue 元件」。

# `<NuxtLayout />`  負責控制固定佈局，預設為 layouts/default.vue。

-->

<script setup>
console.log('APP.vue')
const token = useCookie('token')
// 設定登入 token
token.value = 'abc123'
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
