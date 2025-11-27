export default {
  module: 'user',
  routes: [
    {
      label: '會員管理',
      icon: 'mdi-account',
      permission: 'user.view',
      children: [
        {
          path: '/user/list',
          label: '會員列表',
          icon: 'mdi-format-list-bulleted',
          permission: 'user.view'
        },
        {
          path: '/user/create',
          label: '新增會員',
          icon: 'mdi-account-plus',
          permission: 'user.create'
        }
      ]
    }
  ]
}
