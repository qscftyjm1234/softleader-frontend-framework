<!-- 

# 渲染順序順序：
先渲染 `app.vue`     負責把對應路由的 page 插進 `<NuxtPage />` 裡。

# `<NuxtPage />`    負責「插入 route 對應的 pages/*.vue 元件」。

# `<NuxtLayout />`  負責控制固定佈局，預設為 layouts/default.vue。

-->

<script setup lang="ts">
import { useLoadingStore } from '~/stores/loading'

console.log('APP.vue')
const token = useCookie('token')
// 設定登入 token
token.value = 'abc123'

const loadingStore = useLoadingStore()
</script>
<template>
  <div
    v-if="loadingStore.isLoading"
    class="global-loading"
  >
    <div class="loading-spinner">Loading...</div>
  </div>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
}

.loading-spinner {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.7);
  padding: 1rem 2rem;
  border-radius: 8px;
}
</style>
