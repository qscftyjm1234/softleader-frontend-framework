<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue'
import IButton from '@/components/uiInterface/IButton.vue'
import HeaderUserMenu from '~/components/layout/header/HeaderUserMenu.vue'
import HeaderLanguage from '~/components/layout/header/HeaderLanguage.vue'
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()
const config = useRuntimeConfig()
const appName = config.public.app.productConfig?.meta?.title || 'Frontend Kit'

definePageMeta({
  layout: 'auth-portal' // 使用企業級 Auth Portal Layout
})
</script>

<template>
  <div class="login-content">
    <LoginForm
      title="歡迎回來"
      subtitle="請輸入您的帳號密碼"
    />
  </div>
</template>

<style scoped>
.login-content {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
