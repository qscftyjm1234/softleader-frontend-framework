<script setup lang="ts">
const childRef = ref(null)
const modelA = ref('不具名v-model')
const modelB = ref('具名v-model')
</script>

<template>
  不具名v-model：{{ modelA }} 具名v-model：{{ modelB }}
  <DefineHandleComponent
    ref="childRef"
    v-model="modelA"
    v-model:nameModelValue="modelB"
    msg="傳入的msg"
    @emitMsg="
      (e) => {
        console.log(e)
      }
    "
  >
    <h2>defineExpose 範例</h2>
    <v-btn @click="childRef.sayHello()">呼叫子組件暴露的方法</v-btn>
    暴露文字：{{ childRef?.exportTest }}
  </DefineHandleComponent>
</template>
