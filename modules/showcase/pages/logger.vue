<script setup lang="ts">
import { ref, computed } from 'vue'
import DataPreview from '../components/DataPreview.vue'

const { debug, info, warn, error, startTimer, endTimer, setLevel, clearLogs, logs, currentLevel } =
  useLogger('ShowcaseDemo')

// Demo state
const logMessage = ref('這是一條測試日誌')
const logData = ref('{ userId: 123, action: "login" }')
const timerLabel = ref('data-fetch')

// Computed
const recentLogs = computed(() => logs.value.slice(-10))

const handleDebug = () => {
  debug(logMessage.value, tryParseJSON(logData.value))
}

const handleInfo = () => {
  info(logMessage.value, tryParseJSON(logData.value))
}

const handleWarn = () => {
  warn(logMessage.value, tryParseJSON(logData.value))
}

const handleError = () => {
  error(logMessage.value, tryParseJSON(logData.value))
}

const handleStartTimer = () => {
  startTimer(timerLabel.value)
}

const handleEndTimer = () => {
  endTimer(timerLabel.value)
}

const tryParseJSON = (str: string) => {
  try {
    return JSON.parse(str)
  } catch {
    return str
  }
}

definePageMeta({
  title: '日誌系統 (Logger)',
  icon: 'mdi-file-document-outline'
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
        <h1 class="page-title">日誌系統 (Logger System)</h1>
      </div>
      <p class="page-desc">
        完整的日誌管理模組，提供分級日誌記錄、效能追蹤和環境區分功能。
        <br />
        核心特色：分級日誌、效能追蹤、環境區分、日誌過濾。
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
          最常見的情境：記錄應用程式的運行狀態和錯誤資訊。
          <br />
          使用
          <code>info</code>
          、
          <code>error</code>
          方法快速記錄日誌。
        </p>

        <div class="demo-grid">
          <div class="usage-block">
            <div class="block-header">Example Code</div>
            <div class="code-content">
              <pre><code>&lt;script setup&gt;
// 1. 引入 composable
const logger = useLogger('ComponentName')

// 2. 記錄資訊
logger.info('User logged in', { userId: 123 })

// 3. 記錄錯誤
logger.error('API failed', { error, context })

// 4. 效能追蹤
logger.startTimer('data-fetch')
await fetchData()
logger.endTimer('data-fetch')
&lt;/script&gt;</code></pre>
            </div>
          </div>

          <div class="output-block">
            <DataPreview
              title="當前狀態"
              :data="{
                currentLevel: currentLevel,
                totalLogs: logs.length,
                recentLogs: recentLogs.length
              }"
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
          <!-- 1. Log Levels -->
          <div class="demo-card">
            <h3 class="demo-title">1. 分級日誌</h3>
            <p class="demo-desc">記錄不同等級的日誌訊息。</p>

            <div class="control-row mb-4">
              <label>訊息:</label>
              <input
                v-model="logMessage"
                type="text"
                class="input-field"
                style="flex: 1"
              />
            </div>
            <div class="control-row mb-4">
              <label>資料:</label>
              <input
                v-model="logData"
                type="text"
                class="input-field"
                placeholder='{ "key": "value" }'
                style="flex: 1"
              />
            </div>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>const logger = useLogger('Demo')

logger.debug('{{ logMessage }}', {{ logData }})
logger.info('{{ logMessage }}', {{ logData }})
logger.warn('{{ logMessage }}', {{ logData }})
logger.error('{{ logMessage }}', {{ logData }})</code></pre>
                </div>
              </div>
              <div class="output-block">
                <div class="button-group">
                  <button
                    class="action-btn"
                    style="background: #909399"
                    @click="handleDebug"
                  >
                    Debug
                  </button>
                  <button
                    class="action-btn"
                    @click="handleInfo"
                  >
                    Info
                  </button>
                  <button
                    class="action-btn"
                    style="background: #e6a23c"
                    @click="handleWarn"
                  >
                    Warn
                  </button>
                  <button
                    class="action-btn danger"
                    @click="handleError"
                  >
                    Error
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Performance Tracking -->
          <div class="demo-card">
            <h3 class="demo-title">2. 效能追蹤</h3>
            <p class="demo-desc">使用計時器追蹤操作耗時。</p>

            <div class="control-row mb-4">
              <label>計時器標籤:</label>
              <input
                v-model="timerLabel"
                type="text"
                class="input-field"
                style="width: 200px"
              />
            </div>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>logger.startTimer('{{ timerLabel }}')
// 執行操作...
logger.endTimer('{{ timerLabel }}')</code></pre>
                </div>
              </div>
              <div class="output-block">
                <div class="button-group">
                  <button
                    class="action-btn"
                    @click="handleStartTimer"
                  >
                    開始計時
                  </button>
                  <button
                    class="action-btn secondary"
                    @click="handleEndTimer"
                  >
                    結束計時
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Log Level Control -->
          <div class="demo-card">
            <h3 class="demo-title">3. 日誌等級控制</h3>
            <p class="demo-desc">設定最低日誌等級，過濾不需要的日誌。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 設定日誌等級
logger.setLevel('warn')

// 只會記錄 warn 和 error
logger.debug('不會顯示')
logger.info('不會顯示')
logger.warn('會顯示')
logger.error('會顯示')</code></pre>
                </div>
              </div>
              <div class="output-block">
                <div class="button-group">
                  <button
                    class="action-btn"
                    @click="setLevel('debug')"
                  >
                    Debug
                  </button>
                  <button
                    class="action-btn"
                    @click="setLevel('info')"
                  >
                    Info
                  </button>
                  <button
                    class="action-btn"
                    @click="setLevel('warn')"
                  >
                    Warn
                  </button>
                  <button
                    class="action-btn"
                    @click="setLevel('error')"
                  >
                    Error
                  </button>
                </div>
                <DataPreview
                  title="當前等級"
                  :data="{ currentLevel: currentLevel }"
                />
              </div>
            </div>
          </div>

          <!-- 4. Log History -->
          <div class="demo-card">
            <h3 class="demo-title">4. 日誌歷史</h3>
            <p class="demo-desc">查看最近的日誌記錄。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 取得所有日誌
const { logs } = useLogger()

// 清除日誌
logger.clearLogs()</code></pre>
                </div>
              </div>
              <div class="output-block">
                <button
                  class="action-btn danger"
                  style="margin-bottom: 1rem"
                  @click="clearLogs"
                >
                  清除日誌
                </button>
                <DataPreview
                  title="最近 10 筆日誌"
                  :data="recentLogs"
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

.control-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.control-row label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
}

.input-field {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  flex: 1;
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

.action-btn:hover {
  opacity: 0.9;
}

.action-btn.secondary {
  background: #6c757d;
}

.action-btn.danger {
  background: #dc3545;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-8 {
  margin-top: 2rem;
}
</style>
