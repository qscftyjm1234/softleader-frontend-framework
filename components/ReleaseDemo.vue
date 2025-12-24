<script setup lang="ts">
import { ref } from 'vue'

/**
 * 這是為了演示版本發布而建立的組件
 *
 * @see {@link ../CHANGELOG.md} (請將滑鼠移到此處查看連結)
 * @see https://github.com/qscftyjm1234/frontier_project/blob/main/CHANGELOG.md (Web版)
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
