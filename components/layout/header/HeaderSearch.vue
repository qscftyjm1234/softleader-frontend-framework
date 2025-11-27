<script setup lang="ts">
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()
</script>

<template>
  <v-text-field
    v-if="appStore.config.header.search"
    density="compact"
    variant="solo-filled"
    :label="appStore.config.header.searchPlaceholder"
    prepend-inner-icon="mdi-magnify"
    single-line
    hide-details
    flat
    rounded="lg"
    bg-color="grey-lighten-3"
    style="max-width: 300px"
    class="mr-4 d-none d-sm-flex"
  ></v-text-field>
</template>
