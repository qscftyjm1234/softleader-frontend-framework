<script setup lang="ts">
import { useAppStore } from '~/stores/app'
import HeaderBreadcrumbs from '~/components/layout/header/HeaderBreadcrumbs.vue'
import HeaderSearch from '~/components/layout/header/HeaderSearch.vue'
import HeaderNotifications from '~/components/layout/header/HeaderNotifications.vue'
import HeaderUserMenu from '~/components/layout/header/HeaderUserMenu.vue'
import HeaderActions from '~/components/layout/header/HeaderActions.vue'

const appStore = useAppStore()
</script>

<template>
  <v-app-bar
    v-if="appStore.config.header.visible"
    elevation="1"
    color="white"
    :height="appStore.config.header.height"
  >
    <v-app-bar-nav-icon
      color="grey-darken-2"
      @click="appStore.toggleDrawer"
    />

    <!-- Breadcrumbs -->
    <HeaderBreadcrumbs />

    <v-spacer />

    <!-- Global Search -->
    <HeaderSearch />

    <!-- Generic Header Actions -->
    <HeaderActions />

    <!-- Notifications -->
    <HeaderNotifications />

    <!-- User Menu -->
    <HeaderUserMenu />
  </v-app-bar>
</template>

<style scoped>
.v-app-bar {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
}
</style>
