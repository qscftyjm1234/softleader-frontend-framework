<script setup lang="ts">
import DeveloperPortal from '~/modules/showcase/components/DeveloperPortal.vue'

definePageMeta({
  title: '前端開發套件',
  layout: 'portal'
})

const Dick = ref('1441')
</script>

<template>
  {{ Dick }}
  <DeveloperPortal />
</template>
