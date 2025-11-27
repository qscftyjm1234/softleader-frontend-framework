export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const itemsPerPage = Number(query.itemsPerPage) || 10
  const search = (query.q as string || '').toLowerCase()

  // 模擬大量資料 (生成 999 筆)
  const allUsers = Array.from({ length: 999 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user.${i + 1}@example.com`,
    role: i % 3 === 0 ? 'Admin' : (i % 3 === 1 ? 'Editor' : 'User')
  }))

  // 1. 搜尋
  let filteredUsers = allUsers
  if (search) {
    filteredUsers = allUsers.filter(user => 
      user.name.toLowerCase().includes(search) || 
      user.email.toLowerCase().includes(search)
    )
  }

  // 2. 分頁
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  const paginatedUsers = filteredUsers.slice(start, end)

  return {
    items: paginatedUsers,
    total: filteredUsers.length
  }
})
