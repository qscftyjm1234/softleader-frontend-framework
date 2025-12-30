<script setup lang="ts">
/**
 * SmartComplexWidget - 複雜智能組件
 *
 * 業務層：使用 uiInterface 層組件
 * 遵循三層架構：
 * - UI: 使用 ICard, ISheet, IButton 等介面層組件
 */
import ICard from '~/components/uiInterface/ICard.vue'
import ISheet from '~/components/uiInterface/ISheet.vue'
import IButton from '~/components/uiInterface/IButton.vue'
import IAvatar from '~/components/uiInterface/IAvatar.vue'
import IIcon from '~/components/uiInterface/IIcon.vue'
import IChip from '~/components/uiInterface/IChip.vue'

// 狀態管理
const count = ref(0)
const history = ref<string[]>([])

const increment = () => {
  count.value++
  history.value.unshift(`Count increased to ${count.value} at ${new Date().toLocaleTimeString()}`)
}

const reset = () => {
  count.value = 0
  history.value = []
}
</script>

<template>
  <ICard
    elevation="0"
    class="complex-widget"
  >
    <!-- Header -->
    <div class="widget-header">
      <div class="widget-header__info">
        <div class="widget-overline">SMART WIDGET</div>
        <h2 class="widget-title">複雜組件範例</h2>
        <p class="widget-subtitle">展示內部狀態管理與互動邏輯</p>
      </div>
      <IAvatar
        :size="48"
        color="#E3F2FD"
        rounded="8px"
      >
        <IIcon
          icon="📊"
          :size="24"
        />
      </IAvatar>
    </div>

    <!-- Main Content -->
    <ISheet
      color="#F5F5F5"
      rounded="12px"
      padding="1.5rem"
      class="widget-content"
    >
      <div class="content-display">
        <div>
          <div class="content-label">CURRENT VALUE</div>
          <div class="content-value">{{ count }}</div>
        </div>

        <div class="content-actions">
          <IButton
            variant="primary"
            size="large"
            @click="increment"
          >
            ➕ 增加數值
          </IButton>
          <IButton
            variant="text"
            size="small"
            @click="reset"
          >
            重置狀態
          </IButton>
        </div>
      </div>
    </ISheet>

    <!-- History Section -->
    <div class="widget-history">
      <div class="history-header">
        <span class="history-title">操作紀錄</span>
        <IChip
          size="small"
          color="#90A4AE"
        >
          {{ history.length }}
        </IChip>
      </div>

      <div class="history-list">
        <TransitionGroup name="slide-fade">
          <div
            v-for="log in history"
            :key="log"
            class="history-item"
          >
            <IIcon
              icon="🟢"
              :size="12"
            />
            <span class="history-text">{{ log }}</span>
          </div>
        </TransitionGroup>

        <div
          v-if="history.length === 0"
          class="history-empty"
        >
          <div class="history-empty__text">尚無任何操作紀錄</div>
        </div>
      </div>
    </div>
  </ICard>
</template>

<style scoped>
.complex-widget {
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
}

/* Header */
.widget-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 0;
}

.widget-header__info {
  flex: 1;
}

.widget-overline {
  font-size: 0.75rem;
  font-weight: bold;
  color: #9e9e9e;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.widget-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #424242;
  margin: 0;
}

.widget-subtitle {
  font-size: 0.875rem;
  color: #757575;
  margin: 0.25rem 0 0;
}

/* Content */
.widget-content {
  margin: 1.5rem;
}

.content-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.content-label {
  font-size: 0.75rem;
  font-weight: bold;
  color: #757575;
  margin-bottom: 0.25rem;
}

.content-value {
  font-size: 3rem;
  font-weight: 900;
  color: #1565c0;
}

.content-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* History */
.widget-history {
  padding: 0 1.5rem 1.5rem;
}

.history-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.history-title {
  font-size: 0.875rem;
  font-weight: bold;
  color: #424242;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.history-text {
  font-size: 0.875rem;
  color: #424242;
}

.history-empty {
  text-align: center;
  padding: 2rem;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
}

.history-empty__text {
  font-size: 0.875rem;
  color: #bdbdbd;
}

/* Transitions */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
