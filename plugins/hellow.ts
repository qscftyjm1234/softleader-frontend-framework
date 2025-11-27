/**
 * @目的　目的：　定義全域函數的註冊
 * @名詞 `defineNuxtPlugin`：註冊 plugin 的方法
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('hellow', (name: string) => `Hello, ${name}!`)
})
