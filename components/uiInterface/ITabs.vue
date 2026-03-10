<script setup lang="ts">
import { computed } from 'vue'
import { Tabs as ATabs, TabPane as ATabPane } from 'ant-design-vue'

/**
 * ITabs - UI 介面層分頁導航
 * 基底更換為 Ant Design Vue (a-tabs)
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
const emit = defineEmits(['update:modelValue', 'change'])

const activeKey = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('change', val)
  }
})
</script>

<template>
  <div class="i-tabs-container">
    <ATabs
      v-model:active-key="activeKey"
      class="i-tabs-wrapper"
      animated
    >
      <ATabPane
        v-for="option in options"
        :key="option.value"
        :tab="option.label"
      />
    </ATabs>
  </div>
</template>

<style scoped lang="scss">
.i-tabs-container {
  width: 100%;
}

:deep(.i-tabs-wrapper) {
  .ant-tabs-nav {
    margin-bottom: 0;

    &::before {
      border-bottom: 1px solid #f1f5f9;
    }
  }

  .ant-tabs-tab {
    padding: 12px 4px;
    margin: 0 16px;
    font-weight: 600;
    color: #64748b;
    transition: all 0.3s;

    &:first-child {
      margin-left: 0;
    }

    &-btn {
      font-size: 0.95rem;
      letter-spacing: -0.01em;
    }

    &:hover {
      color: #1e293b;
    }

    &.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: #6366f1;
    }
  }

  .ant-tabs-ink-bar {
    background: #6366f1;
    height: 3px;
    border-radius: 3px 3px 0 0;
  }
}
</style>
