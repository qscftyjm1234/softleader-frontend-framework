<script setup lang="ts">
import GlobalSnackbar from '~/components/uiBusiness/GlobalSnackbar.vue'
</script>

<template>
  <div class="blank-layout">
    <slot />
    <GlobalSnackbar />
  </div>
</template>

<style scoped>
.blank-layout {
  width: 100%;
  min-height: 100vh;
}
</style>
