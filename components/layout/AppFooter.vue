<script setup lang="ts">
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()
</script>

<template>
  <v-footer
    v-if="appStore.config.footer.visible"
    :app="appStore.config.footer.fixed"
    class="bg-grey-lighten-4 text-center d-flex flex-column py-4"
  >
    <div class="text-caption text-medium-emphasis">
      {{ appStore.config.footer.content }}
    </div>
  </v-footer>
</template>
