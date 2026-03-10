<script setup lang="ts">
interface PropItem {
  name: string
  description: string
  type: string
  default?: string | number | boolean
}

defineProps<{
  propsData: PropItem[]
}>()

import IDataTable from '~/components/uiInterface/IDataTable.vue'

const columns = [
  { title: '屬性 (Prop)', dataIndex: 'name', key: 'name', width: '20%' },
  { title: '說明 (Description)', dataIndex: 'description', key: 'description', width: '40%' },
  { title: '類型 (Type)', dataIndex: 'type', key: 'type', width: '25%' },
  { title: '預設代 (Default)', dataIndex: 'default', key: 'default', width: '15%' }
]
</script>

<template>
  <div class="showcase-props-table mt-8 space-y-4">
    <div class="flex items-center gap-3 px-2">
      <div class="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
      <h3 class="text-lg font-black text-slate-900 tracking-tight">API 參考 (API Reference)</h3>
    </div>

    <div
      class="border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-sm transition-all hover:shadow-md"
    >
      <IDataTable
        :columns="columns"
        :data-source="propsData"
        size="small"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <code
              class="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold border border-indigo-100/50"
            >
              {{ record.name }}
            </code>
          </template>
          <template v-else-if="column.key === 'type'">
            <span
              class="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100/50"
            >
              {{ record.type }}
            </span>
          </template>
          <template v-else-if="column.key === 'default'">
            <span class="text-xs font-mono text-slate-400">
              {{ record.default ?? '-' }}
            </span>
          </template>
          <template v-else-if="column.key === 'description'">
            <span class="text-sm text-slate-600 font-medium">
              {{ record.description }}
            </span>
          </template>
        </template>
      </IDataTable>
    </div>
  </div>
</template>

<style scoped lang="scss">
.showcase-props-table {
  :deep(.ant-table-thead > tr > th) {
    background-color: #f8fafc !important;
    font-weight: 800 !important;
    font-size: 11px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.1em !important;
    color: #94a3b8 !important;
    border-bottom: 1px solid #f1f5f9 !important;
  }
}
</style>
