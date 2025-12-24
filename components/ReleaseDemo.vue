<script setup lang="ts">
import { ref } from 'vue'

/**
 * 這是為了演示版本發布而建立的組件
 *
 * @see {@link ../CHANGELOG.md} - 查看此組件的新增紀錄
 */
const message = ref('Hello Standard Version!')

/**
 * 顯示歡迎訊息
 *
 * @param {string} name - 使用者名稱
 * @returns {void}
 */
function greet(name: string): void {
  console.log(`${message.value} ${name}`)
}
</script>

<template>
  <div class="release-demo">
    <h1>{{ message }}</h1>
    <button @click="greet('Developer')">Greet</button>
  </div>
</template>

<style scoped>
.release-demo {
  padding: 2rem;
  border: 1px dashed #ccc;
}
</style>
