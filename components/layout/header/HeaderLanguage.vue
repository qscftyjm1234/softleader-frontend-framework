<script setup lang="ts">
const { locale, locales } = useLanguage()
</script>

<template>
  <v-select
    v-model="locale"
    :items="locales"
    item-title="name"
    item-value="code"
    density="compact"
    variant="outlined"
    hide-details
    prepend-inner-icon="mdi-web"
    class="me-2"
  />
</template>
