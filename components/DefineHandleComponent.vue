<script setup lang="ts">
// 1. defineProps - 定義接收的 props
const props = defineProps<{ msg: string }>()

// 2. defineEmits - 定義事件
const emit = defineEmits(['emitMsg'])

// 3. defineModel - Vue 3.3+ 新增的 v-model 綁定，定義 modelValue prop 和 update:modelValue 事件
const nameModelValue = defineModel('nameModelValue', {
  type: String,
  required: true
})

const model = defineModel({
  type: String,
  required: true
})

// 4. defineExpose - 暴露內部方法給外層
/**
 *
 */
function sayHello() {
  alert(`Hello, 全球人壽!`)
}
const exportTest = 'exportTest'
defineExpose({
  sayHello,
  exportTest
})

// 6. defineOptions - 設定元件選項，這裡設定組件名稱
defineOptions({
  name: 'DefineXXXDemo'
})
</script>

<template>
  <div
    style="
      border: 1px solid #ccc;
      padding: 1em;
      border-radius: 8px;
      max-width: 600px;
      margin: 1em auto;
    "
  >
    <h2>defineProps 範例</h2>
    <p>
      傳入的 prop msg：
      <strong>{{ props.msg }}</strong>
    </p>

    <h2>defineEmits 範例</h2>
    <v-btn @click="emit('emitMsg', '這是新訊息')">點我觸發 update 事件</v-btn>

    <h2>具名 defineModel 範例</h2>
    <input
      v-model="nameModelValue"
      class="border"
    />

    <h2>不具名 defineModel 範例</h2>
    <input
      v-model="model"
      class="border"
    />

    <slot>預設 default slot 內容</slot>

    <h2>defineOptions 範例</h2>
    <p>
      這個組件名稱為：
      <code>DefineHandleComponent</code>
    </p>
  </div>
</template>
