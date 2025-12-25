<script setup lang="ts">
import { useAppStore } from '~/stores/app'
import { useRoute } from 'vue-router'

const appStore = useAppStore()
const route = useRoute()

const breadcrumbs = computed(() => {
  const path = route.path
  const parts = path.split('/').filter((p) => p)
  return parts.map((part, index) => ({
    title: part.charAt(0).toUpperCase() + part.slice(1),
    disabled: index === parts.length - 1,
    href: '/' + parts.slice(0, index + 1).join('/')
  }))
})
</script>

<template>
  <v-breadcrumbs
    v-if="appStore.config.header.breadcrumbs"
    :items="breadcrumbs"
    class="d-none d-md-flex ml-2"
  >
    <template #divider>
      <v-icon icon="mdi-chevron-right" />
    </template>
    <template #prepend>
      <v-icon
        icon="mdi-home"
        size="small"
        class="mr-1"
      />
    </template>
  </v-breadcrumbs>
</template>
