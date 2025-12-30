<script setup lang="ts">
import { ref, computed } from 'vue'
import DataPreview from '../components/DataPreview.vue'

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
  icon: 'mdi-timer-sand'
})
</script>

<template>
  <div class="inspector-container">
    <div class="page-header">
      <div class="header-main">
        <router-link
          to="/showcase"
          class="back-link"
        >
          返回
        </router-link>
        <h1 class="page-title">閒置偵測系統 (Idle Detection)</h1>
      </div>
      <p class="page-desc">
        完整的閒置偵測模組，提供使用者活動監控和自動登出機制。
        <br />
        核心特色：活動偵測、可設定時間、暫停/恢復、閒置警告。
      </p>
    </div>

    <!-- General Usage Section -->
    <section class="module-section">
      <h2 class="section-title">
        <span class="icon">📝</span>
        General Usage (一般使用範例)
      </h2>
      <div class="card-content">
        <p class="demo-desc">
          最常見的情境：偵測使用者閒置狀態，在長時間無操作時自動登出。
          <br />
          使用
          <code>isIdle</code>
          、
          <code>lastActive</code>
          屬性監控使用者活動。
        </p>

        <div class="demo-grid">
          <div class="usage-block">
            <div class="block-header">Example Code</div>
            <div class="code-content">
              <pre><code>&lt;script setup&gt;
const { isIdle, lastActive } = useIdle({
  timeout: 5 * 60 * 1000 // 5 分鐘
})

// 監控閒置狀態
watch(isIdle, (idle) => {
  if (idle) {
    // 顯示警告或自動登出
    showWarning('您已閒置 5 分鐘，即將自動登出')
    setTimeout(() => {
      logout()
    }, 30000) // 30 秒後登出
  }
})
&lt;/script&gt;</code></pre>
            </div>
          </div>

          <div class="output-block">
            <DataPreview
              title="當前狀態"
              :data="idleStatus"
            />
          </div>
        </div>

        <div class="warning-box">
          <strong>💡 提示：</strong>
          <p>
            此頁面的閒置時間設定為 10 秒，方便測試。停止移動滑鼠或鍵盤 10 秒後，狀態會變為「閒置」。
          </p>
        </div>
      </div>
    </section>

    <!-- Interactive Playground -->
    <section class="module-section mt-8">
      <h2 class="section-title">
        <span class="icon">🎮</span>
        Interactive Playground (互動式演示)
      </h2>
      <div class="card-content">
        <div class="method-demos">
          <!-- 1. Idle Status -->
          <div class="demo-card">
            <h3 class="demo-title">1. 閒置狀態</h3>
            <p class="demo-desc">即時顯示使用者是否閒置。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>const { isIdle } = useIdle()

// 即時監控
watch(isIdle, (idle) => {
  console.log('閒置狀態:', idle)
})</code></pre>
                </div>
              </div>
              <div class="output-block">
                <div
                  class="status-badge"
                  :class="isIdle ? 'idle' : 'active'"
                >
                  <span class="status-dot" />
                  {{ isIdle ? '閒置中' : '活動中' }}
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Last Active Time -->
          <div class="demo-card">
            <h3 class="demo-title">2. 最後活動時間</h3>
            <p class="demo-desc">顯示使用者最後一次活動的時間。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>const { lastActive } = useIdle()

// 最後活動時間
console.log('最後活動:', lastActive.value)</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="活動資訊"
                  :data="{
                    lastActive: lastActive.toLocaleString(),
                    idleTime: `${(idleTime / 1000).toFixed(1)} 秒`
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 3. Reset Idle -->
          <div class="demo-card">
            <h3 class="demo-title">3. 重置閒置狀態</h3>
            <p class="demo-desc">手動重置閒置計時器。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>const { reset } = useIdle()

// 手動重置
reset()</code></pre>
                </div>
              </div>
              <div class="output-block">
                <button
                  class="action-btn"
                  style="margin-top: 1rem"
                  @click="handleReset"
                >
                  重置閒置狀態
                </button>
              </div>
            </div>
          </div>

          <!-- 4. Pause/Resume -->
          <div class="demo-card">
            <h3 class="demo-title">4. 暫停/恢復偵測</h3>
            <p class="demo-desc">暫停或恢復閒置偵測功能。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>const { pause, resume } = useIdle()

// 暫停偵測
pause()

// 恢復偵測
resume()</code></pre>
                </div>
              </div>
              <div class="output-block">
                <div class="button-group">
                  <button
                    class="action-btn secondary"
                    :disabled="isPaused"
                    @click="handlePause"
                  >
                    暫停偵測
                  </button>
                  <button
                    class="action-btn"
                    :disabled="!isPaused"
                    @click="handleResume"
                  >
                    恢復偵測
                  </button>
                </div>
                <div
                  v-if="isPaused"
                  class="hint"
                >
                  ⏸️ 偵測已暫停
                </div>
              </div>
            </div>
          </div>

          <!-- 5. Complete Status -->
          <div class="demo-card">
            <h3 class="demo-title">5. 完整狀態</h3>
            <p class="demo-desc">查看所有閒置偵測資訊。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>const idle = useIdle()

// 完整的閒置狀態
const status = {
  isIdle: idle.isIdle.value,
  lastActive: idle.lastActive.value,
  idleTime: idle.idleTime.value
}</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="完整閒置狀態"
                  :data="idleStatus"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.inspector-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  color: #333;
}

.page-header {
  margin-bottom: 2rem;
}

.header-main {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.back-link {
  text-decoration: none;
  color: #666;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border-radius: 4px;
  transition: all 0.2s;
}

.back-link:hover {
  background: #e0e0e0;
}

.page-title {
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
}

.page-desc {
  color: #666;
  margin-left: 0.5rem;
  line-height: 1.5;
}

.module-section {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.section-title {
  padding: 1rem 1.5rem;
  background: #fafafa;
  border-bottom: 1px solid #eee;
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 0.5rem;
}

.card-content {
  padding: 1.5rem;
}

.demo-desc {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.warning-box {
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 6px;
  padding: 1rem;
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.warning-box strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #856404;
}

.warning-box p {
  margin: 0;
  color: #856404;
}

.method-demos {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.demo-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.75rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.demo-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.15rem 0;
  color: #2c3e50;
  display: flex;
  align-items: center;
}

.demo-title::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 1.1em;
  background: #3498db;
  margin-right: 0.5rem;
  border-radius: 2px;
}

.demo-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.usage-block,
.output-block {
  display: flex;
  flex-direction: column;
}

.block-header {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #888;
  margin-bottom: 0.15rem;
  font-weight: 600;
}

.code-content {
  background: #282c34;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  color: #e06c75;
  line-height: 1.25;
  max-height: 360px;
}

.code-content pre {
  margin: 0;
}

.code-content code {
  color: #abb2bf;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  margin-top: 1rem;
}

.status-badge.active {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-badge.idle {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.action-btn {
  background: #0d6efd;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.action-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn.secondary {
  background: #6c757d;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.hint {
  color: #666;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  font-style: italic;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-8 {
  margin-top: 2rem;
}
</style>
