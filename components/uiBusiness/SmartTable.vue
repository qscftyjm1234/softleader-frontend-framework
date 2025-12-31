<script setup lang="ts">
/**
 * SmartTable - 智慧表格元件
 *
 * 業務層 (Business Layer)：使用 uiInterface 層元件 + composables
 * 遵循三層架構：
 * - UI: 使用 ICard, IDataTable, ITextField 等介面層元件
 * - Logic: 使用 useTableData 管理資料載入
 */
import ICard from '~/components/uiInterface/ICard.vue'
import ITextField from '~/components/uiInterface/ITextField.vue'
import IDivider from '~/components/uiInterface/IDivider.vue'
import IChip from '~/components/uiInterface/IChip.vue'

interface Column {
  label: string
  field: string
  sortable?: boolean
  type?: 'text' | 'tag' | 'action'
}

interface Props {
  title?: string
  columns: Column[]
  data?: any[]
  api?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  api: '',
  data: () => []
})

// 使用 composable 管理表格資料
const tableData = useTableData({
  api: props.api,
  staticData: props.data
})

// 轉換 columns 格式
const headers = computed(() =>
  props.columns.map((col) => ({
    key: col.field,
    label: col.label,
    sortable: col.sortable !== false
  }))
)

// 取得欄位顏色 (for tag type)
const getTagColor = (value: string): string => {
  if (value === 'Admin') return '#1976D2'
  if (value === 'Editor') return '#4CAF50'
  return '#9E9E9E'
}
</script>

<template>
  <ICard
    elevation="0"
    class="smart-table"
  >
    <!-- 搜尋標題區 -->
    <div class="table-header">
      <h3 class="table-title">{{ title }}</h3>
      <ITextField
        v-model="tableData.search.value"
        placeholder="搜尋..."
        class="table-search"
      />
    </div>

    <IDivider />

    <!-- 載入狀態 -->
    <div
      v-if="tableData.loading.value"
      class="table-loading"
    >
      載入中...
    </div>

    <!-- 表格內容 -->
    <div
      v-else
      class="table-wrapper"
    >
      <table class="data-table">
        <thead>
          <tr>
            <th
              v-for="col in headers"
              :key="col.key"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in tableData.items.value"
            :key="index"
            class="table-row"
          >
            <td
              v-for="col in columns"
              :key="col.field"
            >
              <!-- 標籤類型 -->
              <IChip
                v-if="col.type === 'tag'"
                size="small"
                :color="getTagColor(item[col.field])"
              >
                {{ item[col.field] }}
              </IChip>

              <!-- 預設文字 -->
              <span v-else>
                {{ item[col.field] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 空狀態 -->
      <div
        v-if="tableData.items.value.length === 0"
        class="table-empty"
      >
        無資料
      </div>
    </div>

    <!-- 分頁資訊 -->
    <div
      v-if="api && tableData.totalItems.value > 0"
      class="table-footer"
    >
      <div class="pagination-info">
        共 {{ tableData.totalItems.value }} 筆資料 (第 {{ tableData.page.value }} 頁，每頁
        {{ tableData.itemsPerPage.value }} 筆)
      </div>
    </div>
  </ICard>
</template>

<style scoped>
.smart-table {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
}

/* Header */
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
}

.table-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
  color: #424242;
}

.table-search {
  max-width: 300px;
}

/* Table */
.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: #f5f5f5;
}

.data-table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: #757575;
  font-size: 0.875rem;
  border-bottom: 2px solid #e0e0e0;
}

.data-table td {
  padding: 0.75rem 1rem;
  color: #424242;
  font-size: 0.875rem;
  border-bottom: 1px solid #f0f0f0;
}

.table-row:hover {
  background: #f9f9f9;
}

.table-row:last-child td {
  border-bottom: none;
}

/* States */
.table-loading,
.table-empty {
  padding: 3rem;
  text-align: center;
  color: #9e9e9e;
  font-size: 0.875rem;
}

/* Footer */
.table-footer {
  padding: 1rem 1.5rem;
  background: #fafafa;
  border-top: 1px solid #e0e0e0;
}

.pagination-info {
  font-size: 0.875rem;
  color: #757575;
}
</style>
