// stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 👉 State
  const user = ref<{ name: string; email: string } | null>(null)
  const token = ref<string | null>(null)
  // 範例權限：通常會從後端 API 取得
  // 開發模式：使用 '*' 代表擁有所有權限
  const permissions = ref<string[]>(['*'])

  // 👉 Getter
  const isLoggedIn = computed(() => !!token.value)

  // 👉 Action
  function login(payload: { name: string; email: string; token: string }) {
    user.value = { name: payload.name, email: payload.email }
    token.value = payload.token
  }

  function logout() {
    user.value = null
    token.value = null
  }

  function fetchUserInfo() {
    // 模擬 API 請求
    setTimeout(() => {
      user.value = { name: '小王', email: 'demo@example.com' }
    }, 500)
  }

  // 要 return 出來的才會對外能用
  return {
    user,
    token,
    permissions,
    isLoggedIn,
    login,
    logout,
    fetchUserInfo
  }
})
