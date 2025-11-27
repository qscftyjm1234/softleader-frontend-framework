<template>
  <form @submit.prevent="submit">
    <input v-model="username" placeholder="帳號" />
    <input v-model="password" placeholder="密碼" type="password"/>
    <button type="submit">登入</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { authService } from '../../../services/authService'
import { useAuthStore } from '../store'

const username = ref('')
const password = ref('')
const store = useAuthStore()

const submit = async () => {
  const res = await authService.login(username.value, password.value)
  store.login(res.data.token, res.data.user)
  // 導向 onboarding flow
}
</script>