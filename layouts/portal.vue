<script setup lang="ts">
import PortalHeader from '~/components/layout/PortalHeader.vue'
import GlobalSnackbar from '~/components/uiBusiness/GlobalSnackbar.vue'
import GlobalModal from '~/components/uiBusiness/GlobalModal.vue'
import IApp from '~/components/uiInterface/IApp.vue'
</script>

<template>
  <IApp class="portal-layout relative overflow-hidden font-sans text-slate-800">
    <!-- Ambient Decor -->
    <div
      class="fixed top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none z-0"
    ></div>
    <div
      class="fixed bottom-0 left-0 w-[500px] h-[500px] bg-white/40 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none z-0"
    ></div>

    <div class="relative z-10 flex flex-col min-h-screen">
      <PortalHeader
        class="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50"
      />

      <main class="portal-main">
        <slot />
      </main>

      <footer class="portal-footer">
        <div class="max-w-7xl mx-auto px-6 text-center">
          <p class="text-[13px] text-slate-400 font-medium">
            Copyright © 2026 Softleader. All rights reserved.
          </p>
        </div>
      </footer>
    </div>

    <GlobalSnackbar />
    <GlobalModal />
  </IApp>
</template>

<style scoped>
.portal-layout {
  min-height: 100vh;
  background: #ffffff;
}

.portal-main {
  flex: 1;
}

.portal-footer {
  padding: 2rem 1.5rem;
  background: white;
  border-top: 1px solid rgba(226, 232, 240, 0.6);
}
</style>
