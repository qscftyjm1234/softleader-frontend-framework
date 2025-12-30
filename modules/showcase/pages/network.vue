<script setup lang="ts">
import { ref, computed } from 'vue'
import DataPreview from '../components/DataPreview.vue'

const { isOnline, effectiveType, downlink, rtt, saveData } = useNetwork()

// Computed
const networkStatus = computed(() => ({
  isOnline: isOnline.value,
  effectiveType: effectiveType.value || '未知',
  downlink: downlink.value ? `${downlink.value} Mbps` : '未知',
  rtt: rtt.value ? `${rtt.value} ms` : '未知',
  saveData: saveData.value
}))

const networkQuality = computed(() => {
  if (!isOnline.value) return '離線'
  if (!effectiveType.value) return '未知'

  switch (effectiveType.value) {
    case '4g':
      return '優秀'
    case '3g':
      return '良好'
    case '2g':
      return '較差'
    case 'slow-2g':
      return '很差'
    default:
      return '未知'
  }
})

definePageMeta({
  title: '網路狀態 (Network)',
  icon: 'mdi-wifi'
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
        <h1 class="page-title">網路狀態監控 (Network Status)</h1>
      </div>
      <p class="page-desc">
        完整的網路狀態監控模組，提供線上/離線狀態、網路類型和速度偵測。
        <br />
        核心特色：即時監控、網路類型、下載速度、省流量模式。
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
          最常見的情境：監控網路連線狀態，在斷線時提示使用者。
          <br />
          使用
          <code>isOnline</code>
          、
          <code>effectiveType</code>
          屬性即時監控網路狀態。
        </p>

        <div class="demo-grid">
          <div class="usage-block">
            <div class="block-header">Example Code</div>
            <div class="code-content">
              <pre><code>&lt;script setup&gt;
const { isOnline, effectiveType, saveData } = useNetwork()

// 監控網路狀態
watch(isOnline, (online) => {
  if (!online) {
    showError('網路連線中斷')
  } else {
    showSuccess('網路已恢復')
  }
})

// 根據網路狀態調整行為
if (saveData.value || effectiveType.value === '2g') {
  // 使用低品質圖片
}
&lt;/script&gt;</code></pre>
            </div>
          </div>

          <div class="output-block">
            <DataPreview
              title="當前網路狀態"
              :data="networkStatus"
            />
          </div>
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
          <!-- 1. Online Status -->
          <div class="demo-card">
            <h3 class="demo-title">1. 線上/離線狀態</h3>
            <p class="demo-desc">即時監控網路連線狀態。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>const { isOnline } = useNetwork()

// 即時監控
watch(isOnline, (online) => {
  console.log('網路狀態:', online ? '線上' : '離線')
})</code></pre>
                </div>
              </div>
              <div class="output-block">
                <div
                  class="status-badge"
                  :class="isOnline ? 'online' : 'offline'"
                >
                  <span class="status-dot" />
                  {{ isOnline ? '線上' : '離線' }}
                </div>
                <p class="hint">💡 提示：嘗試關閉網路連線來測試離線狀態</p>
              </div>
            </div>
          </div>

          <!-- 2. Network Type -->
          <div class="demo-card">
            <h3 class="demo-title">2. 網路類型偵測</h3>
            <p class="demo-desc">偵測當前網路類型（4G, 3G, 2G 等）。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>const { effectiveType } = useNetwork()

// 根據網路類型調整
if (effectiveType.value === '2g') {
  // 使用低品質資源
} else if (effectiveType.value === '4g') {
  // 使用高品質資源
}</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="網路類型資訊"
                  :data="{
                    effectiveType: effectiveType || '未知',
                    quality: networkQuality
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 3. Network Speed -->
          <div class="demo-card">
            <h3 class="demo-title">3. 網路速度</h3>
            <p class="demo-desc">顯示下載速度和往返時間。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>const { downlink, rtt } = useNetwork()

// 下載速度 (Mbps)
console.log('下載速度:', downlink.value)

// 往返時間 (ms)
console.log('延遲:', rtt.value)</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="網路速度資訊"
                  :data="{
                    downlink: downlink ? `${downlink} Mbps` : '未知',
                    rtt: rtt ? `${rtt} ms` : '未知'
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 4. Save Data Mode -->
          <div class="demo-card">
            <h3 class="demo-title">4. 省流量模式</h3>
            <p class="demo-desc">偵測使用者是否開啟省流量模式。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>const { saveData } = useNetwork()

// 省流量模式下的處理
if (saveData.value) {
  // 減少資料傳輸
  // 使用壓縮圖片
  // 停用自動播放
}</code></pre>
                </div>
              </div>
              <div class="output-block">
                <div
                  class="status-badge"
                  :class="saveData ? 'warning' : 'success'"
                >
                  {{ saveData ? '省流量模式：開啟' : '省流量模式：關閉' }}
                </div>
              </div>
            </div>
          </div>

          <!-- 5. Complete Status -->
          <div class="demo-card">
            <h3 class="demo-title">5. 完整狀態</h3>
            <p class="demo-desc">查看所有網路狀態資訊。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>const network = useNetwork()

// 完整的網路狀態
const status = {
  isOnline: network.isOnline.value,
  type: network.effectiveType.value,
  speed: network.downlink.value,
  latency: network.rtt.value,
  saveData: network.saveData.value
}</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="完整網路狀態"
                  :data="networkStatus"
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

.status-badge.online {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-badge.offline {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.status-badge.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-badge.warning {
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
