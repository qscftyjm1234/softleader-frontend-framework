<script setup lang="ts">
import { ref } from 'vue'

/**
 * 這是為了演示版本發布而建立的組件
 *
 * @see {@link ../CHANGELOG.md} - 查看此組件的新增紀錄
 * @see {@link ../CHANGELOG.md#011} - v0.1.1 中文化 (本次修改)
 */
const message = ref('你好，標準版本！')

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
