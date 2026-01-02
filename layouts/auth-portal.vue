<script setup lang="ts">
import GlobalSnackbar from '~/components/uiBusiness/GlobalSnackbar.vue'
import IIcon from '@/components/uiInterface/IIcon.vue'

const config = useRuntimeConfig()
const appName = config.public.app.productConfig?.meta?.title || 'Frontend Kit'
</script>

<template>
  <div class="auth-layout">
    <!-- Left Panel: Brand & Marketing -->
    <div class="brand-panel">
      <div class="brand-content">
        <div class="logo-area">
          <IIcon
            size="48px"
            color="#38bdf8"
            icon="svg-softleader"
          />
          <h1 class="brand-name">
            {{ appName }}
          </h1>
        </div>
        <div class="brand-slogan">
          <h2 class="slogan-title">企業級架構首選</h2>
          <p class="slogan-desc">使用標準化架構構建可擴展、安全且高效能的前端應用程式。</p>
        </div>
      </div>

      <!-- Abstract Background Shape -->
      <div class="brand-bg-shape" />
    </div>

    <!-- Right Panel: Login Form -->
    <div class="form-panel">
      <div class="form-container">
        <slot />
      </div>

      <footer class="simple-footer">Copyright © 2026 SoftLeader. 版權所有。</footer>
    </div>

    <GlobalSnackbar />
  </div>
</template>

<style scoped>
.auth-layout {
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: #0f172a; /* Dark Theme Base */
  overflow: hidden;
}

/* Left Panel */
.brand-panel {
  flex: 1;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  position: relative;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.brand-bg-shape {
  position: absolute;
  top: -20%;
  right: -20%;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.brand-content {
  position: relative;
  z-index: 10;
  max-width: 480px;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.brand-name {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;
}

.slogan-title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(to right, #ffffff, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.slogan-desc {
  font-size: 1.125rem;
  color: #94a3b8;
  line-height: 1.6;
}

/* Right Panel */
.form-panel {
  flex: 0 0 45vw; /* Wider panel: 45% of viewport width */
  min-width: 600px; /* Ensure it doesn't get too narrow */
  background: #0f172a;
  display: flex;
  flex-direction: column;
  position: relative;
}

.form-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 100%;
}

.simple-footer {
  text-align: center;
  padding: 1.5rem;
  color: #475569;
  font-size: 0.75rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .brand-panel {
    display: none; /* Hide brand panel on mobile/tablet */
  }

  .form-panel {
    flex: 1;
  }
}
</style>
