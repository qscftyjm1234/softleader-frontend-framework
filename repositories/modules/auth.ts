import type { UseFetchOptions } from 'nuxt/app'

export default {
  /**
   * 使用者登入
   * @param credentials { username, password }
   * @param options
   */
  login(credentials: any, options: UseFetchOptions<any> = {}) {
    return useClient('/auth').post('/login', credentials, options)
  },

  /**
   * 使用者登出 (如果有的話)
   */
  logout() {
    return useClient('/auth').post('/logout')
  },

  /**
   * 取得當前使用者資訊 (Session/Me)
   */
  getProfile() {
    return useClient('/auth').get('/me')
  }
}
