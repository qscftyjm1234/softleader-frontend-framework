<script setup lang="ts">
/**
 * ShowcaseArchitecture
 * 業務邏輯層元件 (Business Layer)
 * 使用 ICard 展示架構圖
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

    <div class="arrow">↓ 使用</div>

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

    <div class="arrow">↓ 使用</div>

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
  margin-bottom: 1.5rem;
}

.layer-wrapper {
  display: flex;
  align-items: stretch;
  gap: 1rem;
}

.layer-number {
  flex-shrink: 0;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 8px;
  color: #fff;
}

.page-num {
  background: #4caf50;
}

.business-num {
  background: #2196f3;
}

.interface-num {
  background: #ff9800;
}

.layer-card {
  flex: 1;
}

.page-layer {
  background: #e8f5e9;
  border-color: #4caf50;
}

.business-layer {
  background: #e3f2fd;
  border-color: #2196f3;
}

.interface-layer {
  background: #fff3e0;
  border-color: #ff9800;
}

.card-content h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.card-content p {
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.card-content code {
  background: rgba(0, 0, 0, 0.05);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  display: inline-block;
}

/* Override ICard padding for tighter fit if needed */
.layer-card :deep(.card-content) {
  padding: 1rem 1.5rem;
}

.arrow {
  text-align: center;
  padding: 0.25rem;
  color: #3498db;
  font-weight: bold;
  font-size: 1.2rem;
  margin-left: 48px; /* Align with content, skipping number width */
}
</style>
