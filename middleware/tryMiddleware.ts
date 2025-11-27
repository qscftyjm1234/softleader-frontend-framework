export default defineNuxtRouteMiddleware((to, from) => {
  // const isLoggedIn = useCookie("token")?.value;
  console.log('前往/middlewareAuth頁面有走這')
  // if (!isLoggedIn && to.path !== "/login") {
  //   return navigateTo("/login");
  // }
})
