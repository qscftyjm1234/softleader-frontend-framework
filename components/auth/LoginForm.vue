<script setup lang="ts">
const { $api } = useNuxtApp()
const router = useRouter()

defineProps<{
  title?: string
  subtitle?: string
}>()

const form = reactive({
  username: '',
  password: ''
})

const loading = ref(false)
const errorMsg = ref('')

/**
 *
 */
async function handleLogin() {
  loading.value = true
  errorMsg.value = ''

  try {
    // 1. 呼叫登入 API
    const { data, error } = await $api.auth.login(form)

    if (error.value) {
      throw new Error(error.value.message || '登入失敗')
    }

    // 2. 儲存 Token 到 Cookie
    const config = useRuntimeConfig()
    const token = useCookie(config.public.auth.tokenKey as string, {
      maxAge: Number(config.public.auth.maxAge)
    })
    token.value = (data.value as any)?.accessToken

    // 3. 導向首頁
    router.push('/')
  } catch (err: any) {
    errorMsg.value = err.message || '發生未知錯誤'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="fill-height justify-center">
    <v-card
      width="400"
      class="pa-4"
    >
      <v-card-title class="text-center text-h5 mb-4">
        {{ title || '登入' }}
      </v-card-title>
      <v-card-subtitle
        v-if="subtitle"
        class="text-center mb-4"
      >
        {{ subtitle }}
      </v-card-subtitle>

      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="form.username"
            label="帳號"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            class="mb-2"
          />

          <v-text-field
            v-model="form.password"
            label="密碼"
            type="password"
            prepend-inner-icon="mdi-lock"
            variant="outlined"
            class="mb-4"
          />

          <v-alert
            v-if="errorMsg"
            type="error"
            variant="tonal"
            class="mb-4"
            closable
          >
            {{ errorMsg }}
          </v-alert>

          <v-btn
            type="submit"
            block
            color="primary"
            size="large"
            :loading="loading"
          >
            登入
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
