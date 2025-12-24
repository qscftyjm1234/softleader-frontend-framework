<script setup lang="ts">
import { ref } from 'vue'

const message = ref('你好，標準版本！')

/**
 * 顯示歡迎訊息
 *
 * @history
 * @param {string} name - 使用者名稱123
 * @returns {void}
 */
function greet(name: string): void {
  console.log(`小狗狗`)
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
