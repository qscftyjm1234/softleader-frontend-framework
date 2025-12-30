<script setup lang="ts">
/**
 * ITextarea - 多行文字輸入介面層
 *
 * 用途：統一的 Textarea 介面，內部可替換 UI 框架
 *
 * 設計原則：
 * - 只定義 props 和 events
 * - 支援自動高度調整
 */

interface Props {
  modelValue: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  rows?: number
  maxlength?: number
  autoResize?: boolean // 自動調整高度
  // 驗證相關
  error?: boolean
  errorMessage?: string
  // 字數統計
  showCount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  disabled: false,
  readonly: false,
  rows: 3,
  autoResize: false,
  error: false,
  showCount: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const textareaRef = ref<HTMLTextAreaElement>()

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('change', val)
  }
})

// 字數統計
const charCount = computed(() => props.modelValue?.length || 0)

// 自動調整高度
const adjustHeight = () => {
  if (props.autoResize && textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
  }
}

watch(
  () => props.modelValue,
  () => {
    nextTick(adjustHeight)
  }
)

onMounted(() => {
  adjustHeight()
})
</script>

<template>
  <div class="i-textarea">
    <div
      class="textarea-wrapper"
      :class="{ 'has-error': error, 'is-disabled': disabled }"
    >
      <textarea
        ref="textareaRef"
        v-model="internalValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :maxlength="maxlength"
        class="textarea-field"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
      />
    </div>

    <!-- 底部資訊列 -->
    <div
      v-if="error || showCount"
      class="textarea-footer"
    >
      <!-- 錯誤訊息 -->
      <div
        v-if="error && errorMessage"
        class="error-message"
      >
        {{ errorMessage }}
      </div>

      <!-- 字數統計 -->
      <div
        v-if="showCount"
        class="char-count"
      >
        {{ charCount }}{{ maxlength ? ` / ${maxlength}` : '' }}
      </div>
    </div>
  </div>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VTextarea
    v-model="internalValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :rows="rows"
    :maxlength="maxlength"
    :error="error"
    :error-messages="errorMessage"
    :auto-grow="autoResize"
    :counter="showCount"
    @blur="emit('blur', $event)"
    @focus="emit('focus', $event)"
  />
  -->
</template>

<style scoped>
.i-textarea {
  width: 100%;
}

.textarea-wrapper {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  transition: all 0.2s;
}

.textarea-wrapper:hover:not(.is-disabled) {
  border-color: #3498db;
}

.textarea-wrapper:focus-within {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.textarea-wrapper.has-error {
  border-color: #e74c3c;
}

.textarea-wrapper.has-error:focus-within {
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.textarea-wrapper.is-disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.textarea-field {
  width: 100%;
  padding: 0.5rem;
  border: none;
  outline: none;
  font-size: 1rem;
  font-family: inherit;
  background: transparent;
  resize: vertical;
}

.textarea-field:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.textarea-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.25rem;
  font-size: 0.875rem;
}

.error-message {
  color: #e74c3c;
}

.char-count {
  color: #999;
  margin-left: auto;
}
</style>
