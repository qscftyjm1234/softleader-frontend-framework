<script setup>
const { count, addCount } = useCounter()
</script>

<template>
  <div>
    <p>目前計數：{{ count }}</p>
    <v-btn @click="addCount">+1</v-btn>
  </div>
</template>
