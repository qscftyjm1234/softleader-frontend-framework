<script setup lang="ts">
// 1. 定義欄位 (Columns)
const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '姓名', dataIndex: 'name' },
  { title: 'Email', dataIndex: 'email' },
  { title: '角色', dataIndex: 'role' },
  { title: '狀態', dataIndex: 'status' }
]

// 2. 定義資料容器
const data = ref([])
const loading = ref(false)

// 1. 引入分頁工具
// usePagination 是專案標準的分頁模組
const { currentPage, pageSize, total, setTotal } = usePagination({
  currentPage: 1,
  pageSize: 10
})

// 2. 定義表格分頁設定 (傳遞給 IDataTable)
const paginationConfig = computed(() => ({
  total: total.value,
  current: currentPage.value,
  pageSize: pageSize.value,
  showSizeChanger: true,
  showTotal: (total: number) => `共 ${total} 筆`,
  // 當頁碼或每頁筆數改變時觸發
  onChange: (page: number, size: number) => {
    currentPage.value = page
    pageSize.value = size
    fetchData()
  }
}))

const fetchData = async () => {
  loading.value = true

  // 模擬網路延遲
  await new Promise((r) => setTimeout(r, 500))

  console.log(`Fetching page ${currentPage.value}...`)

  // 更新總筆數 (假設後端回傳 55 筆)
  setTotal(55)

  // 產生當前頁的資料
  data.value = Array.from({ length: pageSize.value }, (_, i) => ({
    id: (currentPage.value - 1) * pageSize.value + i + 1,
    name: `User ${Math.random().toString(36).substr(2, 5)}`,
    email: `user${i}@example.com`,
    role: Math.random() > 0.5 ? 'Admin' : 'User',
    status: 'Active'
  }))

  loading.value = false
}

// 進入頁面時自動載入
onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">使用者列表</h1>

    <div class="bg-white p-6 rounded shadow">
      <IDataTable
        :columns="columns"
        :data-source="data"
        :pagination="paginationConfig"
        :loading="loading"
        row-key="id"
      >
        <!-- 自訂欄位顯示 -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'status'">
            <a-tag :color="record.status === 'Active' ? 'green' : 'red'">
              {{ record.status }}
            </a-tag>
          </template>
        </template>
      </IDataTable>
    </div>
  </div>
</template>
