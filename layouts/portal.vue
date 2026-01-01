<script setup lang="ts">
import PortalHeader from '~/components/layout/PortalHeader.vue'
import GlobalSnackbar from '~/components/uiBusiness/GlobalSnackbar.vue'
</script>

<template>
  <div class="portal-layout">
    <PortalHeader />

    <main class="portal-main">
      <slot />
    </main>

    <footer class="portal-footer">Copyright © 2026 SoftLeader. All rights reserved.</footer>

    <GlobalSnackbar />
  </div>
</template>

<style scoped>
.portal-layout {
  min-height: 100vh;
  background: #0f172a; /* Match portal background default */
  display: flex;
  flex-direction: column;
}

.portal-main {
  padding-top: 64px; /* Offset for fixed header */
  flex: 1;
}

.portal-footer {
  text-align: center;
  padding: 1.5rem;
  color: #64748b;
  font-size: 0.875rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(15, 23, 42, 0.95);
}
</style>
