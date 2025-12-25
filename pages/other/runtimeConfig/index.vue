<script setup lang="ts">
const config = useRuntimeConfig()

console.log('測試是否在非開發端，不顯示console.log()等資訊')
console.info('測試是否在非開發端，不顯示console.info()等資訊')
console.warn('測試是否在非開發端，不顯示console.warn()等資訊')
console.error('測試是否在非開發端，不顯示console.error()等資訊')
console.debug('測試是否在非開發端，不顯示console.debug()等資訊')
</script>
<template>
  是否為開發環境：
  {{ config.public.isDev }}
  <br />
</template>
