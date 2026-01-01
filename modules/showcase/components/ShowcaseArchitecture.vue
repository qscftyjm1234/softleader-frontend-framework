<script setup lang="ts">
/**
 * ShowcaseArchitecture
 * 業務邏輯層元件 (Business Layer)
 * 使用 ICard 展示架構圖 - Dark Mode Style
 */
import ICard from '@/components/uiInterface/ICard.vue'
</script>

<template>
  <div class="architecture-diagram">
    <!-- Page Layer -->
    <div class="layer-wrapper">
      <div class="layer-number page-num">3</div>
      <ICard
        class="layer-card page-layer"
        variant="outlined"
      >
        <div class="card-content">
          <h3>頁面層 (Page Layer)</h3>
          <p>直接使用業務元件，程式碼最簡潔</p>
          <code>&lt;EmailInput v-model="email" /&gt;</code>
        </div>
      </ICard>
    </div>

    <div class="arrow">
      <v-icon
        icon="mdi-arrow-down"
        color="#38bdf8"
      />
      <span class="use-text">使用</span>
    </div>

    <!-- Business Layer -->
    <div class="layer-wrapper">
      <div class="layer-number business-num">2</div>
      <ICard
        class="layer-card business-layer"
        variant="outlined"
      >
        <div class="card-content">
          <h3>業務邏輯層 (Business Layer)</h3>
          <p>封裝業務邏輯（驗證、格式化、數據處理）</p>
          <code>components/uiBusiness/EmailInput.vue</code>
        </div>
      </ICard>
    </div>

    <div class="arrow">
      <v-icon
        icon="mdi-arrow-down"
        color="#38bdf8"
      />
      <span class="use-text">使用</span>
    </div>

    <!-- Interface Layer -->
    <div class="layer-wrapper">
      <div class="layer-number interface-num">1</div>
      <ICard
        class="layer-card interface-layer"
        variant="outlined"
      >
        <div class="card-content">
          <h3>介面適配層 (Interface Layer)</h3>
          <p>UI 框架適配層，可替換（原生 HTML / Vuetify / Element UI）</p>
          <code>components/uiInterface/IInput.vue</code>
        </div>
      </ICard>
    </div>
  </div>
</template>

<style scoped>
.architecture-diagram {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.layer-wrapper {
  display: flex;
  align-items: stretch;
  gap: 1.5rem;
}

.layer-number {
  flex-shrink: 0;
  width: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 800;
  border-radius: 12px;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.page-num {
  background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
}

.business-num {
  background: linear-gradient(135deg, #2196f3 0%, #1565c0 100%);
}

.interface-num {
  background: linear-gradient(135deg, #ff9800 0%, #e65100 100%);
}

.layer-card {
  flex: 1;
  border-width: 1px !important;
  backdrop-filter: blur(12px);
  background: rgba(30, 41, 59, 0.4) !important;
}

/* Specific Border Colors for Layers */
.page-layer {
  border-color: rgba(76, 175, 80, 0.5) !important;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.1);
}

.business-layer {
  border-color: rgba(33, 150, 243, 0.5) !important;
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.1);
}

.interface-layer {
  border-color: rgba(255, 152, 0, 0.5) !important;
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.1);
}

.card-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #f1f5f9;
}

.card-content p {
  margin: 0 0 0.75rem 0;
  color: #94a3b8;
  font-size: 1rem;
}

.card-content code {
  background: rgba(0, 0, 0, 0.3);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  color: #a5d6ff;
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Deep selector to ensure padding is right */
.layer-card :deep(.v-card-text),
.layer-card :deep(.card-body) {
  padding: 1.5rem !important;
}

.arrow {
  display: flex;
  align-items: center;
  margin-left: 28px; /* Center under the 56px number box */
  padding-left: 1.5rem; /* Space from aligned center */
  gap: 0.5rem;
  height: 2rem;
}

.use-text {
  color: #38bdf8;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.8;
}
</style>
