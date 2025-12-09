import { useApi } from '~/composables/useApi'

export default {
  /**
   * 登入
   * @param credentials - { username, password }
   */
  login(credentials: any) {
    return useApi('/auth/login', {
      method: 'POST',
      body: credentials
    })
  },

  /**
   * 登出
   */
  logout() {
    return useApi('/auth/logout', {
      method: 'POST'
    })
  },

  /**
   * 取得當前使用者資料
   */
  fetchUser() {
    return useApi('/auth/me', {
      method: 'GET'
    })
  }
}
