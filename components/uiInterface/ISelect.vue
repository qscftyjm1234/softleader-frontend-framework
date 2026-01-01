<script setup lang="ts">
/**
 * UI 適配層 - Select 元件
 *
 * 用途：統一的 Select 介面，內部使用 Vuetify
 * 未來要換 UI 框架，只需要修改這個檔案
 *
 * 設計原則：
 * - 提供標準化的 props 介面
 * - 內部適配不同 UI 框架的差異
 * - 業務元件只需要知道這個統一介面
 */

interface SelectOption {
  value: any
  label: string
  disabled?: boolean
}

interface Props {
  modelValue: any
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  multiple?: boolean
  searchable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '請選擇',
  disabled: false,
  clearable: false,
  multiple: false,
  searchable: false
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  change: [value: any]
  search: [query: string]
}>()

// 內部值管理
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('change', val)
  }
})

// 搜尋處理
const handleSearch = (query: string) => {
  emit('search', query)
}
</script>

<template>
  <!-- 目前使用原生 HTML Select -->
  <!-- 未來可以換成 Vuetify/Element UI/Ant Design -->
  <div class="select-wrapper">
    <!-- 1. 前置 Slot (例如放 Icon) -->
    <div
      v-if="$slots.prepend"
      class="select-prepend"
    >
      <slot name="prepend" />
    </div>

    <select
      v-model="internalValue"
      :disabled="disabled"
      :multiple="multiple"
      class="ui-select"
    >
      <option
        v-if="placeholder && !multiple"
        value=""
        disabled
        selected
      >
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>

    <!-- 2. 後置 Slot (例如放單位或說明) -->
    <div
      v-if="$slots.append"
      class="select-append"
    >
      <slot name="append" />
    </div>
  </div>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VSelect
    v-model="internalValue"
    :items="options"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    :multiple="multiple"
    item-title="label"
    item-value="value"
    @update:search="handleSearch"
  >
    Slot 透傳與轉接
    1. 透傳所有 Slot
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>

    2. (選用) Slot 正規化：例如將 Vuetify 的 'item' 轉接為標準的 'option'
    
    <template #item="scope">
      <slot name="option" v-bind="scope" />
    </template>
    
  </VSelect>
  -->

  <!-- 未來換成 Element UI 的範例 -->
  <!--
  <ElSelect
    v-model="internalValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    :multiple="multiple"
    filterable
    @input="handleSearch"
  >
    <ElOption
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
      :disabled="option.disabled"
    />
  </ElSelect>
  -->
</template>

<style scoped>
.select-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.select-prepend,
.select-append {
  display: flex;
  align-items: center;
  color: #94a3b8;
}

.ui-select {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 0.95rem;
  background: rgba(15, 23, 42, 0.4);
  color: #e2e8f0;
  cursor: pointer;
  transition: all 0.2s;
  appearance: none; /* Remove default arrow to style if needed, detailed arrow needs wrapper or svg */
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 0.8rem;
}

.ui-select:hover:not(:disabled) {
  border-color: rgba(56, 189, 248, 0.5);
  background-color: rgba(15, 23, 42, 0.6);
}

.ui-select:focus {
  outline: none;
  border-color: #38bdf8;
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
  background-color: rgba(15, 23, 42, 0.8);
}

.ui-select:disabled {
  background: rgba(255, 255, 255, 0.05);
  color: #64748b;
  cursor: not-allowed;
  opacity: 0.6;
}

.ui-select option {
  background: #1e293b;
  color: #e2e8f0;
}

.ui-select[multiple] {
  min-height: 120px;
  background-image: none;
  padding: 0.5rem;
}
</style>
