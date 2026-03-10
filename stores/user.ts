// stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 👉 狀態 (State)
  const user = ref<{ name: string; email: string } | null>(null)
  const token = ref<string | null>(null)
  // 範例權限：通常會從後端 API 取得
  // 開發模式：使用 '*' 代表擁有所有權限
  const permissions = ref<string[]>(['*'])

  // 👉 計算屬性 (Getters)
  const isLoggedIn = computed(() => !!token.value)

  // 👉 動作 (Actions)
  /**
   * 登入
   * @param payload - 登入資訊
   * @param payload.name - 名稱
   * @param payload.email - Email
   * @param payload.token - 權限 token
   */
  function handleLogin(payload: { name: string; email: string; token: string }) {
    user.value = { name: payload.name, email: payload.email }
    token.value = payload.token
  }

  /**
   *
   */
  function handleLogout() {
    user.value = null
    token.value = null
  }

  /**
   *
   */
  function fetchUserInfo() {
    // 模擬 API 請求
    setTimeout(() => {
      user.value = { name: '小王', email: 'demo@example.com' }
    }, 500)
  }

  // 必須回傳才能對外公開使用
  return {
    user,
    token,
    permissions,
    isLoggedIn,
    login: handleLogin,
    logout: handleLogout,
    fetchUserInfo
  }
})
