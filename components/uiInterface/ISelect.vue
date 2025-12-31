<script setup lang="ts">
/**
 * UI 適配層 - Select 組件
 *
 * 用途：統一的 Select 介面，內部使用 Vuetify
 * 未來要換 UI 框架，只需要修改這個檔案
 *
 * 設計原則：
 * - 提供標準化的 props 介面
 * - 內部適配不同 UI 框架的差異
 * - 業務組件只需要知道這個統一介面
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
  color: #666;
}

.ui-select {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.ui-select:hover:not(:disabled) {
  border-color: #3498db;
}

.ui-select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.ui-select:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}

.ui-select[multiple] {
  min-height: 120px;
}
</style>
