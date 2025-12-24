<script setup lang="ts">
import { ref, computed } from 'vue'
// 測試 4: 缺少 JSDoc - ESLint 應該標記這個
/**
 * 大標題需要寫
 * @param {number} price - 價格
 * @param {number} quantity - 數量
 * @returns {number} - 總額
 */
export function calculateTotal(price: number, quantity: number) {
  return price * quantity
}

// 測試 5: TypeScript 類型錯誤
const title = ref<string>('整合測試頁面')
const message = ref<string>('測試 Vue + TypeScript + Prettier + ESLint 整合')
const rawHtml = ref<string>('<strong>這是 HTML</strong>')

// 測試 6: 未使用的變數 - ESLint 應該標記這個
const unusedVariable = 'This is not used  '

// 測試 7: 格式化問題 - 應該被 Prettier 修正
const numbers = [1, 2, 3, 4, 5]
const obj = { name: 'test', age: 25 }

// 測試 8: 正確的 JSDoc 範例
/**
 * 處理按鈕點擊事件
 *
 * @returns {void}
 */
function handleClick(): void {
  console.log('按鈕被點擊了')
}

// 測試 9: 計算屬性
const displayMessage = computed(() => {
  return `${title.value}: ${message.value}`
})

// 測試 10: TypeScript 介面
interface User {
  id: number
  name: string
  email: string
}

// 測試 11: 缺少 JSDoc 的函式
/**
 *
 * @param user
 */
function processUser(user: User) {
  return {
    ...user,
    processed: true
  }
}
</script>
<template>
  <div class="integration-test">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>

    <!-- 測試 1: 格式化問題 - Prettier 應該標記這些 -->
    <button @click="handleClick">點擊我</button>

    <!-- 測試 2: Vue 規則 -->
    <div v-html="rawHtml"></div>

    <!-- 測試 3: 屬性過多 -->
    <input
      id="test-input"
      type="text"
      placeholder="測試"
      class="input"
      name="test"
      value="test"
    />
  </div>
</template>

<style scoped>
.integration-test {
  padding: 20px;
}

h1 {
  color: #42b983;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #35a372;
}

.input {
  max-width: 200px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
