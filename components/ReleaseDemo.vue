<script setup lang="ts">
import { ref } from 'vue'

const message = ref('你好，標準版本！')

/**
 * 顯示歡迎訊息
 *
 * @history
 * @historyId 23a44bcf
 * @param {string} name - 使用者名稱123
 * @author gino.huang
 * @version 1 - Do thing
 * @version 2 - Do thing to change
 * @returns {void}
 */
function greet(name: string): void {
  console.log(`小狗狗`)
  console.log(`${message.value} ${name}`)
  console.log(`喵`)
  console.log(`喵`)
}

/**
 * 顯示年紀
 *
 * @history
 * @historyId 61f05b7f
 * @param {number} ago - 顯示年紀
 * @author amy
 * @version 1 - Do thing
 * @version 2 - Do thing to change
 * @returns {void}
 */
function ago(ago: number): void {
  console.log(`小狗狗`)
  console.log(`${message.value} ${ago}`)
}

/**
 * 顯示性向
 *
 * @history
 * @historyId 735f1e92
 * @param {number} sex - 顯示性向
 * @author sam
 * @returns {void}
 */
function sex(sex: number): void {
  console.log(`測試性向`)
  console.log(`${message.value} ${sex}`)
}
</script>

<template>
  <div class="release-demo">
    <h1>{{ message }}</h1>
    <button @click="greet('Developer')">Greet</button>
    <button @click="ago(15)">Greet</button>
    <button @click="sex(15)">sex</button>
  </div>
</template>

<style scoped>
.release-demo {
  padding: 2rem;
  border: 1px dashed #ccc;
}
</style>
