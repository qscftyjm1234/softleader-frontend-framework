<script setup lang="ts">
import { computed } from 'vue'
import {
  DatePicker as ADatePicker,
  TimePicker as ATimePicker,
  MonthPicker as AMonthPicker,
  WeekPicker as AWeekPicker
} from 'ant-design-vue'
import dayjs, { Dayjs } from 'dayjs'

/**
 * IDatePicker - 日期選擇器介面層
 * 基底更換為 Ant Design Vue (a-date-picker)
 */

interface Props {
  modelValue?: string | Date | Dayjs | null
  type?: 'date' | 'datetime' | 'time' | 'month' | 'year' | 'week'
  label?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  format?: string // 顯示格式
  minDate?: string | Date | Dayjs
  maxDate?: string | Date | Dayjs
  // 驗證相關
  error?: boolean
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  type: 'date',
  placeholder: '請選擇日期',
  disabled: false,
  clearable: true,
  error: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | Date | Dayjs | null]
  change: [value: string | Date | Dayjs | null]
  clear: []
}>()

// 內部值管理
const internalValue = computed({
  get: () => (props.modelValue ? dayjs(props.modelValue) : null),
  set: (val) => {
    emit('update:modelValue', val)
    emit('change', val)
  }
})

const status = computed(() => {
  if (props.error || props.errorMessage) return 'error'
  return ''
})

const showTime = computed(() => props.type === 'datetime')
const pickerMode = computed(() => {
  if (props.type === 'month') return 'month'
  if (props.type === 'year') return 'year'
  if (props.type === 'week') return 'week'
  return 'date'
})
</script>

<template>
  <div class="i-datepicker-container">
    <label
      v-if="label"
      class="text-[0.875rem] font-bold text-slate-700 tracking-tight ml-1 mb-1.5 block"
    >
      {{ label }}
    </label>
    <ADatePicker
      v-if="type !== 'time'"
      v-model:value="internalValue"
      :picker="pickerMode"
      :show-time="showTime"
      :placeholder="placeholder"
      :disabled="disabled"
      :allow-clear="clearable"
      :status="status"
      :format="format"
      class="i-datepicker-wrapper"
    />
    <ATimePicker
      v-else
      v-model:value="internalValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :allow-clear="clearable"
      :status="status"
      :format="format"
      class="i-datepicker-wrapper"
    />

    <!-- 錯誤訊息 -->
    <div
      v-if="errorMessage"
      class="mt-1.5 ml-1 flex items-center gap-1.5 text-[0.85rem] font-semibold text-red-500"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.i-datepicker-container {
  width: 100%;
}

:deep(.i-datepicker-wrapper) {
  width: 100%;
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background-color: white;
  transition: all 0.3s ease;

  &:hover {
    border-color: #cbd5e1;
  }

  &.ant-picker-focused {
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  }

  &.ant-picker-status-error {
    border-color: #f87171;
    &:focus-within {
      box-shadow: 0 0 0 4px rgba(248, 113, 113, 0.1);
    }
  }

  .ant-picker-input > input {
    font-weight: 500;
    font-size: 0.95rem;
  }
}
</style>
