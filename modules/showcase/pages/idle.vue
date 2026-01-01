<script setup lang="ts">
import { ref, computed } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const idleTimeout = ref(10000) // 10 seconds for demo
const { isIdle, lastActive, idleTime, reset, pause, resume } = useIdle({
  timeout: idleTimeout.value
})

const isPaused = ref(false)

// Computed
const idleStatus = computed(() => ({
  isIdle: isIdle.value,
  lastActive: lastActive.value.toLocaleTimeString(),
  idleTime: `${(idleTime.value / 1000).toFixed(1)} 秒`,
  timeout: `${(idleTimeout.value / 1000).toFixed(0)} 秒`
}))

const handlePause = () => {
  pause()
  isPaused.value = true
}

const handleResume = () => {
  resume()
  isPaused.value = false
}

const handleReset = () => {
  reset()
}

definePageMeta({
  title: '閒置偵測 (Idle)',
  icon: 'mdi-timer-sand',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="閒置偵測系統 (Idle Detection)"
    description="完整的閒置偵測模組，提供使用者活動監控和自動登出機制。核心特色：活動偵測、可設定時間、暫停/恢復、閒置警告。"
  >
    <!-- General Usage -->
    <ShowcaseSection
      title="General Usage"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="監控機制"
          description="自動偵測使用者是否離開"
          full-width
        >
          <div class="demo-area">
            <div class="warning-box mb-4">
              <strong>💡 提示：</strong>
              此頁面的閒置時間設定為 10 秒，方便測試。
            </div>
            <ShowcaseCodeBlock
              code="const { isIdle, lastActive } = useIdle({
  timeout: 5 * 60 * 1000 // 5 分鐘
})"
              label="Setup"
            />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- Interactive Playground -->
    <ShowcaseSection
      title="Interactive Playground"
      icon="🎮"
    >
      <div class="component-grid">
        <!-- 1. Status -->
        <ShowcaseCard
          title="1. 閒置狀態"
          description="即時顯示由 useIdle 提供之狀態"
        >
          <div class="demo-area">
            <div class="status-display">
              <div
                class="status-badge"
                :class="isIdle ? 'status-idle' : 'status-active'"
              >
                <span class="status-dot"></span>
                {{ isIdle ? '閒置中 (Idle)' : '活動中 (Active)' }}
              </div>
            </div>
            <div class="result-text mt-4">
              <div class="flex justify-between">
                <span class="text-gray-400">Idle Time:</span>
                <span class="text-sky-300 font-mono">{{ (idleTime / 1000).toFixed(1) }}s</span>
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <!-- 2. Last Active -->
        <ShowcaseCard
          title="2. 最後活動時間"
          description="記錄最後一次偵測到操作的時間"
        >
          <div class="demo-area">
            <div class="result-text">
              <div class="text-2xl text-center text-fuchsia-300 font-mono py-2">
                {{ lastActive.toLocaleTimeString() }}
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <!-- 3. Controls -->
        <ShowcaseCard
          title="3. 控制面板"
          description="手動重置與暫停偵測"
        >
          <div class="demo-area">
            <div class="flex gap-2 flex-wrap mb-4">
              <button
                class="glass-btn primary"
                @click="handleReset"
              >
                重置計時 (Reset)
              </button>
              <button
                class="glass-btn"
                :class="{ active: isPaused }"
                :disabled="isPaused"
                @click="handlePause"
              >
                暫停 (Pause)
              </button>
              <button
                class="glass-btn"
                :disabled="!isPaused"
                @click="handleResume"
              >
                恢復 (Resume)
              </button>
            </div>
            <div
              v-if="isPaused"
              class="text-amber-400 text-sm text-center"
            >
              ⚠️ 偵測已暫停
            </div>
          </div>
        </ShowcaseCard>

        <!-- 4. Full State -->
        <ShowcaseCard
          title="4. 完整狀態"
          description="所有 Reactive 狀態檢視"
          full-width
        >
          <div class="demo-area">
            <ShowcaseCodeBlock
              :code="JSON.stringify(idleStatus, null, 2)"
              language="json"
              label="State Object"
            />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.warning-box {
  background: rgba(234, 179, 8, 0.1);
  border: 1px solid rgba(234, 179, 8, 0.3);
  color: #fde047;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
}

.status-display {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 1rem;
  border-radius: 99px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.status-active {
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.3);
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
}

.status-idle {
  background: rgba(234, 179, 8, 0.15);
  color: #fde047;
  border: 1px solid rgba(234, 179, 8, 0.3);
  box-shadow: 0 0 10px rgba(234, 179, 8, 0.2);
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.85);
  }
}

.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  flex: 1;
}

.glass-btn:hover:not(:disabled) {
  background: rgba(51, 65, 85, 0.8);
  border-color: #94a3b8;
}

.glass-btn.primary {
  background: rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.5);
  color: #38bdf8;
}

.glass-btn.active {
  background: rgba(234, 179, 8, 0.2);
  border-color: rgba(234, 179, 8, 0.5);
  color: #fde047;
}

.glass-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.flex {
  display: flex;
}
.justify-between {
  justify-content: space-between;
}
.gap-2 {
  gap: 0.5rem;
}
.flex-wrap {
  flex-wrap: wrap;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mt-4 {
  margin-top: 1rem;
}
.text-center {
  text-align: center;
}
.text-2xl {
  font-size: 1.5rem;
  font-weight: 600;
}
.text-sm {
  font-size: 0.875rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.text-gray-400 {
  color: #94a3b8;
}
.text-sky-300 {
  color: #7dd3fc;
}
.text-fuchsia-300 {
  color: #f0abfc;
}
.text-amber-400 {
  color: #fbbf24;
}
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
</style>
