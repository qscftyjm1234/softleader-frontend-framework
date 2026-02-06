<script setup lang="ts">
import PortalHeader from '~/components/layout/PortalHeader.vue'
import GlobalSnackbar from '~/components/uiBusiness/GlobalSnackbar.vue'
import GlobalModal from '~/components/uiBusiness/GlobalModal.vue'
import IApp from '~/components/uiInterface/IApp.vue'
</script>

<template>
  <IApp class="portal-layout">
    <PortalHeader />

    <main class="portal-main">
      <slot />
    </main>

    <footer class="portal-footer">Copyright © 2026 Demo App. All rights reserved.</footer>

    <GlobalSnackbar />
    <GlobalModal />
  </IApp>
</template>

<style scoped>
.portal-layout {
  min-height: 100vh;
  background: #0f172a; /* Match portal background default */
  display: flex;
  flex-direction: column;
}

.portal-main {
  /* padding-top: 64px; */
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
