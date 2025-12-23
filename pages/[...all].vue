<script setup lang="ts">
const router = useRouter()
const goHome = () => router.push('/')
</script>

<template>
  <v-container
    class="fill-height d-flex flex-column justify-center align-center text-center"
  >
    <v-icon color="error" size="96">mdi-alert-circle</v-icon>
    <h1 class="text-h2 font-weight-bold text-error mb-2">404 - 找不到頁面</h1>
    <p class="text-subtitle-1 mb-6">您所尋找的頁面不存在或已被移除。</p>
    <v-btn color="primary" prepend-icon="mdi-home" @click="goHome">
      返回首頁
    </v-btn>
  </v-container>
</template>
