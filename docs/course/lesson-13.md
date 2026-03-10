<!-- Author: antigravity -->

# 第十三課：資料列表與分頁

本課程教您如何實作具備分頁功能的資料表格。透過 `usePagination` 勾子，您可以輕鬆管理頁碼切換並與資料表格（IDataTable）進行連動。

---

## 1. 建立資料管理頁面

(1.) 在 `pages/` 資料夾下建立 `table-demo.vue`。
(2.) 準備好資料存放與分頁配置。

---

## 2. 引入完整程式碼

這裡展示了如何結合 `IDataTable` 與自動化分頁邏輯的完整實例。

(3.) 貼入以下完整程式碼：

```vue
<template>
  <div class="p-10 min-h-screen bg-slate-50">
    <div class="max-w-7xl mx-auto bg-white border border-slate-100 p-10 rounded-[3rem] shadow-sm">
      <div class="flex justify-between items-center mb-10 px-2">
        <div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">資料列表展示</h1>
          <p class="text-slate-400 mt-1 font-bold">自動化分頁整合範例</p>
        </div>
        <IButton
          variant="primary"
          icon="mdi-plus"
          class="px-8"
        >
          新增資料
        </IButton>
      </div>

      <!-- 資料表格 -->
      <IDataTable
        :data-source="mockData"
        :columns="columns"
        :pagination="paginationConfig"
        :loading="loading"
        class="border border-slate-50 rounded-2xl overflow-hidden"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入分頁控制勾子
const { currentPage, pageSize, total, paginationConfig } = usePagination()

const loading = ref(false)
const mockData = ref([
  { id: 1, name: '專案開發包 A', status: '進行中', date: '2026-02-26' },
  { id: 2, name: '專案開發包 B', status: '已完成', date: '2026-02-25' },
  { id: 3, name: '專案開發包 C', status: '待處理', date: '2026-02-24' }
])

const columns = [
  { title: '編號', dataIndex: 'id', key: 'id', width: 80 },
  { title: '專案名稱', dataIndex: 'name', key: 'name' },
  { title: '當前狀態', dataIndex: 'status', key: 'status' },
  { title: '更新日期', dataIndex: 'date', key: 'date' }
]

// 模擬抓取資料邏輯
async function fetchData() {
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 800))
  // 模擬依據分頁產生資料
  const startId = (currentPage.value - 1) * pageSize.value + 1
  mockData.value = Array.from({ length: pageSize.value }).map((_, i) => ({
    id: startId + i,
    name: `專案資料 第 ${currentPage.value} 頁 - 項目 ${i + 1}`,
    status: Math.random() > 0.5 ? '進行中' : '已完成',
    date: new Date().toISOString().split('T')[0]
  }))
  // 在這裡更新 total 數值
  total.value = 100
  loading.value = false
}

// 監聽分頁變化
watch([currentPage, pageSize], fetchData)

onMounted(fetchData)

definePageMeta({
  title: '資料列表範例',
  layout: 'portal'
})
</script>
```

---

## 3. 小結

一
統一使用 `IDataTable` 來呈現清單資料，它已針對企業美感進行了深度封裝。
二
`usePagination` 勾子提供了開箱即用的 `paginationConfig`，直接傳入組件即可使用。
三
當分頁狀態改變時，應透過 `watch` 機制重新觸發資料抓取函數。

---

[上一課 第十二課：選項數據管理](./lesson-12.md) | [下一課 第十四課：搜尋與防抖](./lesson-14.md) | [回首頁](../../README.md)
