<script setup lang="ts">
/**
 * App Header - Framework Agnostic
 * 框架無關的應用程式標頭
 */
import { useAppStore } from '~/stores/app'
import HeaderBreadcrumbs from '~/components/layout/header/HeaderBreadcrumbs.vue'
import HeaderSearch from '~/components/layout/header/HeaderSearch.vue'
import HeaderNotifications from '~/components/layout/header/HeaderNotifications.vue'
import HeaderUserMenu from '~/components/layout/header/HeaderUserMenu.vue'
import HeaderActions from '~/components/layout/header/HeaderActions.vue'

const appStore = useAppStore()
</script>

<template>
  <header
    v-if="appStore.config.header.visible"
    class="app-header"
  >
    <!-- Mobile Menu Toggle -->
    <button
      class="header-nav-toggle"
      aria-label="Toggle navigation"
      @click="appStore.toggleDrawer"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <line
          x1="3"
          y1="12"
          x2="21"
          y2="12"
        />
        <line
          x1="3"
          y1="6"
          x2="21"
          y2="6"
        />
        <line
          x1="3"
          y1="18"
          x2="21"
          y2="18"
        />
      </svg>
    </button>

    <div class="header-content">
      <!-- Breadcrumbs -->
      <HeaderBreadcrumbs />

      <div class="header-spacer" />

      <!-- Global Search -->
      <HeaderSearch />

      <!-- Generic Header Actions -->
      <HeaderActions />

      <!-- Notifications -->
      <HeaderNotifications />

      <!-- User Menu -->
      <HeaderUserMenu />
    </div>
  </header>
</template>
