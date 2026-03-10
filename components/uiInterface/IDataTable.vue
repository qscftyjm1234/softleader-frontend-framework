<script setup lang="ts">
import { Table as ATable } from 'ant-design-vue'

/**
 * IDataTable - UI 介面層資料表格 (Ant Design Adapter)
 * 基底更換為 Ant Design Vue (a-table)
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
  <div class="i-data-table-container">
    <ATable
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :loading="loading"
      :row-key="rowKey"
      :scroll="scroll"
      size="middle"
      class="i-data-table-wrapper"
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
    </ATable>
  </div>
</template>

<style scoped lang="scss">
.i-data-table-container {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #f1f5f9;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.02),
    0 2px 4px -2px rgba(0, 0, 0, 0.02);
}

:deep(.i-data-table-wrapper) {
  .ant-table {
    background: transparent;
  }

  .ant-table-thead > tr > th {
    background: #f8fafc;
    color: #475569;
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    border-bottom: 2px solid #f1f5f9;
    padding: 16px 20px;

    &::before {
      display: none !important;
    }
  }

  .ant-table-tbody > tr > td {
    padding: 16px 20px;
    border-bottom: 1px solid #f8fafc;
    color: #1e293b;
    font-weight: 500;
  }

  .ant-table-tbody > tr:hover > td {
    background: #f8fafc !important;
  }

  .ant-pagination {
    margin: 16px 24px 24px !important;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .ant-pagination-total-text {
      margin-right: auto;
      color: var(--color-gray-600, #475569);
      font-size: 0.8125rem;
      font-weight: 500;
      letter-spacing: 0.02em;
    }

    .ant-pagination-item,
    .ant-pagination-prev,
    .ant-pagination-next,
    .ant-pagination-jump-prev,
    .ant-pagination-jump-next {
      min-width: 32px;
      height: 32px;
      line-height: 30px;
      border-radius: var(--radius-md, 6px);
      background: var(--color-white, #ffffff);
      border: 1px solid var(--color-gray-300, #cbd5e1);
      margin: 0 4px;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* Block shadow */
      transition: all var(--transition-fast, 150ms ease-in-out);

      a,
      .ant-pagination-item-link {
        color: var(--color-gray-700, #334155);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        border: none;
        background: transparent;
        font-weight: 500;
        font-size: 0.8125rem;
      }

      &:hover:not(.ant-pagination-item-active):not(.ant-pagination-disabled) {
        border-color: var(--color-primary, #1976d2);
        background: var(--color-gray-50, #f8fafc);
        a,
        .ant-pagination-item-link {
          color: var(--color-primary, #1976d2);
        }
      }
    }

    .ant-pagination-item-active {
      background: var(--color-primary, #1976d2);
      border-color: var(--color-primary, #1976d2);
      box-shadow:
        0 1px 3px 0 rgba(25, 118, 210, 0.3),
        0 1px 2px -1px rgba(25, 118, 210, 0.3);

      a {
        color: var(--color-white, #ffffff) !important;
        font-weight: 600;
      }

      &:hover {
        background: var(--color-primary-dark, #1565c0);
        border-color: var(--color-primary-dark, #1565c0);
      }
    }

    .ant-pagination-disabled {
      background: var(--color-gray-100, #f1f5f9);
      border-color: var(--color-gray-200, #e2e8f0);
      box-shadow: none;
      .ant-pagination-item-link {
        color: var(--color-gray-400, #cbd5e1) !important;
        opacity: 0.7;
      }
      &:hover {
        border-color: var(--color-gray-200, #e2e8f0) !important;
      }
    }

    .ant-pagination-options {
      margin-left: 12px;

      .ant-select-selector {
        border-radius: var(--radius-md, 6px) !important;
        border-color: var(--color-gray-300, #cbd5e1) !important;
        background: var(--color-white, #ffffff) !important;
        color: var(--color-gray-700, #334155) !important;
        padding: 0 8px;
        height: 32px;
        align-items: center;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
        font-weight: 500;
        font-size: 0.8125rem;
        transition: all var(--transition-fast, 150ms);

        &:hover {
          border-color: var(--color-primary, #1976d2) !important;
        }
      }

      .ant-select-arrow {
        color: var(--color-gray-500, #64748b);
        right: 8px;
      }
    }
  }
}
</style>
