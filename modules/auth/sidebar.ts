export default {
  module: 'auth',
  routes: [
    {
      label: '會員管理',
      icon: 'mdi-account',
      permission: 'user.view',
      children: [
        {
          label: '會員列表',
          path: '/auth/user/list',
          permission: 'user.view'
        },
        {
          label: '新增會員',
          path: '/auth/user/create',
          permission: 'user.create'
        }
      ]
    },
    {
      label: '登入',
      path: '/login'
    }
  ]
}
