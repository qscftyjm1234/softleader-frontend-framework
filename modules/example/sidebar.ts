export default {
  module: 'example',
  routes: [
  {
    label: "範例模組",
    icon: "mdi-star",
    permission: "example.view",
    children: [
      {
        label: "範例列表",
        path: "/example/list",
        permission: "example.list.view"
      }
    ]
  }
]
}
