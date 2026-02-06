<script setup lang="ts">
/**
 * IDataTable - UI 介面層資料表格 (Ant Design Adapter)
 *
 * 用途：統一的 DataTable 介面，底層使用 Ant Design Vue
 */

interface Props {
  columns: any[]
  dataSource: any[]
  pagination?: any
  loading?: boolean
  rowKey?: string
  scroll?: { x?: number; y?: number }
}

const props = withDefaults(defineProps<Props>(), {
  pagination: false,
  loading: false,
  rowKey: 'id'
})

// 透傳事件 (emit)
const emit = defineEmits(['change', 'resizeExpandedRows'])

const handleChange = (...args: any[]) => {
  emit('change', ...args)
}
</script>

<template>
  <div class="ui-data-table">
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :loading="loading"
      :row-key="rowKey"
      :scroll="scroll"
      size="middle"
      @change="handleChange"
    >
      <!-- 透傳所有插槽 (Scoped Slots) -->
      <template
        v-for="(_, slotName) in $slots"
        #[slotName]="slotProps"
      >
        <slot
          :name="slotName"
          v-bind="slotProps"
        />
      </template>
    </a-table>
  </div>
</template>

<style scoped>
.ui-data-table {
  width: 100%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

/* 可以在這裡覆寫 Ant Design 的樣式，讓全站表格統一 */
:deep(.ant-table-thead > tr > th) {
  background: #f8fafc; /* Slate-50 */
  font-weight: 600;
  color: #475569; /* Slate-600 */
}
</style>
