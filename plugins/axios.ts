/**
 * @目的　第三方套件初始化（ex. Axios.js)
 * @指令 `pnpm add axios`
 * @名詞 `defineNuxtPlugin`：註冊 plugin 的方法
 */

import axios from 'axios'

export default defineNuxtPlugin(() => {
  const instance = axios.create({
    baseURL: 'https://api.example.com'
  })

  return {
    provide: {
      axios: instance
    }
  }
})
