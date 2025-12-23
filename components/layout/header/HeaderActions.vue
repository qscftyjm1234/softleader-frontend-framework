<script setup lang="ts">
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()

const handleAction = (item: any) => {
  if (item.to) {
    navigateTo(item.to)
  } else if (item.action) {
    console.log('Triggered action:', item.action)
  }
}
</script>

<template>
  <template v-for="(action, i) in appStore.config.header.actions" :key="i">
    <v-btn
      icon
      class="mr-2"
      :color="action.color"
      @click="handleAction(action)"
    >
      <v-badge
        v-if="action.badge"
        :content="action.badge"
        color="error"
        dot
        floating
      >
        <v-icon :icon="action.icon" />
      </v-badge>
      <v-icon v-else :icon="action.icon" />
      <v-tooltip v-if="action.title" activator="parent" location="bottom">{{
        action.title
      }}</v-tooltip>
    </v-btn>
  </template>
</template>
