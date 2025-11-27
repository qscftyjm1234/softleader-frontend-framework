<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

function handleLogin() {
  userStore.login({
    name: '全球人壽小編',
    email: 'hi@glic.com',
    token: '123456token'
  })
}
</script>

<template>
  <div>
    <h2 v-if="userStore.isLoggedIn">歡迎，{{ userStore.user?.name }}</h2>
    <v-btn @click="handleLogin">登入</v-btn>
    <v-btn @click="userStore.logout" v-if="userStore.isLoggedIn">登出</v-btn>
  </div>
</template>
