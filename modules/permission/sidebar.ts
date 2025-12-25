export default {
  module: 'permission',
  routes: [
    {
      label: '權限管理',
      icon: 'mdi-shield-key',
      children: [
        {
          label: '權限列表',
          icon: 'mdi-format-list-checks',
          path: '/permission/list',
          permission: 'permission.view'
        },
        {
          label: '角色設定',
          icon: 'mdi-account-cog',
          path: '/permission/roles',
          permission: 'role.view'
        },
        {
          label: '新增權限',
          icon: 'mdi-plus-box',
          path: '/permission/create',
          permission: 'permission.create'
        }
      ]
    },
    {
      label: '稽核紀錄',
      icon: 'mdi-history',
      path: '/permission/audit-logs',
      permission: 'audit.view'
    }
  ]
}
