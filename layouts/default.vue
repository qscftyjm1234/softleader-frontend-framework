<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import AppSidebar from '~/components/layout/AppSidebar.vue'
import GlobalSnackbar from '~/components/common/GlobalSnackbar.vue'
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()

// Initialize app (load config)
onMounted(() => {
  appStore.initApp()
})
</script>

<template>
  <v-app
    :theme="appStore.config.theme.defaultTheme"
    class="bg-grey-lighten-4"
  >
    <!-- Header -->
    <AppHeader />

    <!-- Sidebar -->
    <AppSidebar v-model="appStore.drawer" />

    <!-- Main Content -->
    <v-main>
      <v-container
        fluid
        class="pa-6"
      >
        <slot />
      </v-container>
    </v-main>

    <!-- Footer -->
    <AppFooter />

    <!-- Global Snackbar -->
    <GlobalSnackbar />
  </v-app>
</template>
