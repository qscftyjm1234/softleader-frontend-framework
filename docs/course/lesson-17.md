<!-- Author: cindy -->

# 第十七課:資料列表與分頁

本課程教您如何實作標準的資料列表與分頁功能。

## 1. 使用 usePagination

### 步驟

1. 引入 `usePagination`
2. 設定初始參數
3. 綁定到 `IDataTable`

### 範例

```vue
<script setup lang="ts">
const { user } = useRepository()

const { currentPage, pageSize, total, setTotal, paginationConfig } = usePagination()

const data = ref([])
const loading = ref(false)

async function fetchData() {
  loading.value = true
  const res = await user.getUsers({
    page: currentPage.value,
    limit: pageSize.value
  })

  // 假設後端回傳格式與 Response 類型匹配
  if (res.data.value) {
    data.value = res.data.value.items
    setTotal(res.data.value.total)
  }
  loading.value = false
}

// 分頁改變時會自動觸發 onChange (需在 usePagination 設定或手動監聽)
// 這裡簡單示範手動監聽
watch([currentPage, pageSize], fetchData)

onMounted(fetchData)
</script>

<template>
  <IDataTable
    :data-source="data"
    :pagination="paginationConfig"
    :loading="loading"
  />
</template>
```

---

## 2. 小結

1. **核心**: `usePagination`
2. **組件**: `IDataTable`
3. **串接**: 將 API 回傳的 total 設定進去

---

[上一課:資料格式化工具](./lesson-16.md) | [下一課:搜尋與防抖](./lesson-18.md) | [回首頁](../../README.md)
