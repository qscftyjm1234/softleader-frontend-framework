<script setup lang="ts">
/**
 * IDataTable - UI 介面層資料表格
 *
 * 用途：統一的 DataTable 介面，內部可使用原生 HTML 或 UI 框架
 * 未來要換 UI 框架，只需要修改這個檔案
 */

interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface Props {
  columns: Column[]
  items: any[]
  loading?: boolean
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  hover: true
})

const sortKey = ref('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const sortedItems = computed(() => {
  if (!sortKey.value) return props.items

  return [...props.items].sort((a, b) => {
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]

    if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})

const handleSort = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}
</script>

<template>
  <!-- 目前使用原生 HTML -->
  <div class="ui-data-table">
    <div
      v-if="loading"
      class="table-loading"
    >
      載入中...
    </div>
    <table
      v-else
      class="data-table"
      :class="{ 'hover-enabled': hover }"
    >
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            :class="{ sortable: col.sortable }"
            @click="col.sortable && handleSort(col.key)"
          >
            {{ col.label }}
            <span
              v-if="col.sortable && sortKey === col.key"
              class="sort-icon"
            >
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in sortedItems"
          :key="index"
        >
          <td
            v-for="col in columns"
            :key="col.key"
          >
            <slot
              :name="`item.${col.key}`"
              :item="item"
            >
              {{ item[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="!loading && items.length === 0"
      class="table-empty"
    >
      無資料
    </div>
  </div>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VDataTable
    :headers="columns"
    :items="items"
    :loading="loading"
    :hover="hover"
  >
    <template
      v-for="col in columns"
      :key="col.key"
      #[`item.${col.key}`]="{ item }"
    >
      <slot
        :name="`item.${col.key}`"
        :item="item"
      >
        {{ item[col.key] }}
      </slot>
    </template>
  </VDataTable>
  -->
</template>

<style scoped>
.ui-data-table {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.data-table thead {
  background: #f5f5f5;
  border-bottom: 2px solid #e0e0e0;
}

.data-table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: #555;
  font-size: 0.875rem;
  user-select: none;
}

.data-table th.sortable {
  cursor: pointer;
  transition: background 0.2s;
}

.data-table th.sortable:hover {
  background: #ebebeb;
}

.sort-icon {
  margin-left: 0.25rem;
  font-size: 0.75rem;
}

.data-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.data-table.hover-enabled tbody tr:hover {
  background: #f9f9f9;
}

.table-loading,
.table-empty {
  padding: 2rem;
  text-align: center;
  color: #999;
}
</style>
