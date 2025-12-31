<script setup lang="ts">
/**
 * ITabs - UI 介面層分頁導航
 *
 * 用途：統一的分頁導航介面
 */
interface TabOption {
  label: string
  value: string | number
}

interface Props {
  modelValue: string | number
  options: TabOption[]
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const updateValue = (value: string | number) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="ui-tabs">
    <button
      v-for="option in options"
      :key="option.value"
      class="tab-item"
      :class="{ active: modelValue === option.value }"
      @click="updateValue(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.ui-tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid #e0e0e0;
  padding: 0 1rem;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
}

.ui-tabs::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Webkit */
}

.tab-item {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #666;
  white-space: nowrap;
  transition: all 0.3s ease;
  position: relative;
  bottom: -2px;
}

.tab-item:hover {
  color: #3498db;
  background: #f5f5f5;
}

.tab-item.active {
  color: #3498db;
  border-bottom-color: #3498db;
}
</style>
