export default {
  // [物件根結構的優點]
  // 1. 明確性：這裡直接宣告了 module: 'permission'，系統讀取時不用猜。
  // 2. 擴充性：未來如果要加模組層級的設定 (例如 order: 1, icon: 'mdi-key') 可以直接加在這一層。
  module: 'permission',

  items: [
    {
      label: '權限管理',
      icon: 'mdi-shield-key',
      // 透過 children 將相關功能包在一起，避免散落在根目錄
      children: [
        {
          label: '權限列表',
          icon: 'mdi-format-list-checks',
          to: '/permission/list',
          permission: 'permission.view'
        },
        {
          label: '角色設定',
          icon: 'mdi-account-cog',
          to: '/permission/roles',
          permission: 'role.view'
        },
        {
          label: '新增權限',
          icon: 'mdi-plus-box',
          to: '/permission/create',
          permission: 'permission.create'
        }
      ]
    },
    // 這裡可以放另一個大分類，例如 "稽核紀錄"
    {
      label: '稽核紀錄',
      icon: 'mdi-history',
      to: '/permission/audit-logs',
      permission: 'audit.view'
    }
  ]
}
