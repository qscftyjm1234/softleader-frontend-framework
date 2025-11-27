export default defineNuxtRouteMiddleware((to, from) => {
  console.log('各頁登入檢查')
  if (to.path === '/login') return // ← 直接中斷，不做驗證
  const token = '12334'
  if (!token) {
    return navigateTo('/login')
  }
})
