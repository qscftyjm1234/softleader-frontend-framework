import { useClient } from '~/composables/useApi'
import type { LoginResponse } from '~/types/api'

// 1. 定義 Client
const api = useClient('/auth')

export default {
  /**
   * 登入
   * @param credentials - { username, password }
   */
  login(credentials: any) {
    return api.post<LoginResponse>('/login', credentials)
  },

  /**
   * 登出
   */
  logout() {
    return api.post('/logout')
  },

  /**
   * 取得當前使用者資料
   */
  fetchUser() {
    return api.get('/me')
  }
}
