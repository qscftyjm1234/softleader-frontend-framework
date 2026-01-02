<script setup lang="ts">
import { ref, computed } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

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
  title: '日誌記錄 (Logger)',
  icon: 'mdi-console',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="日誌系統 (Logger System)"
    description="完整的日誌管理模組，提供分級日誌記錄、效能追蹤和環境區分功能。核心特色：分級日誌、效能追蹤、環境區分、日誌過濾。"
  >
    <!-- 基礎用法 -->
    <ShowcaseSection
      title="基礎用法"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="核心功能"
          description="日誌記錄與效能監控"
          full-width
        >
          <div class="demo-area">
            <p
              class="method-desc"
              style="margin-bottom: 1.5rem"
            >
              <strong>可用方法：</strong>
            </p>
            <ShowcaseCodeBlock
              code="const logger = useLogger('ComponentName')

// 1. 分級日誌
logger.debug('Debug message', data)
logger.info('Info message', data)
logger.warn('Warning message', data)
logger.error('Error message', error)

// 2. 效能追蹤
logger.startTimer('api-fetch')
await api.fetchData()
logger.endTimer('api-fetch') // 自動計算耗時

// 3. 全局管理
// 可以在 Console 中使用 logger.setLevel('debug') 動態調整"
              label="useLogger() 功能總覽"
            />

            <p
              class="method-desc"
              style="margin-top: 1.5rem; margin-bottom: 1rem"
            >
              <strong>核心特色：</strong>
            </p>
            <ul class="benefit-list">
              <li>
                <strong>分級管理:</strong>
                支援 Debug, Info, Warn, Error 四種等級，可動態調整顯示層級
              </li>
              <li>
                <strong>效能追蹤:</strong>
                內建 Timer 計時器，精確測量程式執行耗時
              </li>
              <li>
                <strong>環境感知:</strong>
                開發環境顯示詳細資訊，正式環境自動過濾敏感日誌
              </li>
              <li>
                <strong>結構化數據:</strong>
                支援 Object/Array 自動格式化，方便閱讀與除錯
              </li>
            </ul>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const logger = useLogger('AuthService')

try {
  logger.info('User attempting login', { username })
  await login(username, password)
} catch (e) {
  logger.error('Login failed', e)
}"
              label="快速開始"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- Interactive Playground -->
    <ShowcaseSection
      title="互動測試"
      icon="🎮"
    >
      <div class="component-grid">
        <!-- 1. Log Levels -->
        <ShowcaseCard
          title="1. 分級日誌"
          description="記錄不同等級的日誌訊息"
        >
          <div class="flex flex-col gap-4">
            <div>
              <label class="block text-sm text-slate-400 mb-2">Message</label>
              <input
                v-model="logMessage"
                type="text"
                class="glass-input w-full"
              />
            </div>
            <div>
              <label class="block text-sm text-slate-400 mb-2">Data (JSON)</label>
              <input
                v-model="logData"
                type="text"
                class="glass-input w-full"
                placeholder='{ "key": "value" }'
              />
            </div>
            <div class="flex gap-2 flex-wrap">
              <button
                class="glass-btn"
                @click="handleDebug"
              >
                Debug
              </button>
              <button
                class="glass-btn"
                @click="handleInfo"
              >
                Info
              </button>
              <button
                class="glass-btn warn"
                @click="handleWarn"
              >
                Warn
              </button>
              <button
                class="glass-btn danger"
                @click="handleError"
              >
                Error
              </button>
            </div>
          </div>
        </ShowcaseCard>

        <!-- 2. Performance Tracking -->
        <ShowcaseCard
          title="2. 效能追蹤"
          description="使用計時器追蹤操作耗時"
        >
          <div class="flex flex-col gap-4">
            <div>
              <label class="block text-sm text-slate-400 mb-2">Timer Label</label>
              <input
                v-model="timerLabel"
                type="text"
                class="glass-input w-full"
              />
            </div>
            <div class="flex gap-2">
              <button
                class="glass-btn primary"
                @click="handleStartTimer"
              >
                Start Timer
              </button>
              <button
                class="glass-btn secondary"
                @click="handleEndTimer"
              >
                End Timer
              </button>
            </div>
          </div>
        </ShowcaseCard>

        <!-- 3. Log Level Control -->
        <ShowcaseCard
          title="3. 日誌等級控制"
          description="設定最低日誌等級"
        >
          <div class="flex flex-col gap-4">
            <div class="flex gap-2">
              <button
                class="glass-btn"
                :class="{ active: currentLevel === 'debug' }"
                @click="setLevel('debug')"
              >
                Debug
              </button>
              <button
                class="glass-btn"
                :class="{ active: currentLevel === 'info' }"
                @click="setLevel('info')"
              >
                Info
              </button>
              <button
                class="glass-btn"
                :class="{ active: currentLevel === 'warn' }"
                @click="setLevel('warn')"
              >
                Warn
              </button>
              <button
                class="glass-btn"
                :class="{ active: currentLevel === 'error' }"
                @click="setLevel('error')"
              >
                Error
              </button>
            </div>
            <div class="flex items-center">
              <span class="text-slate-400">Current Level:</span>
              <span class="text-sky-300 font-bold ml-2 uppercase">{{ currentLevel }}</span>
            </div>
          </div>
        </ShowcaseCard>

        <!-- 4. Log History -->
        <ShowcaseCard
          title="4. 日誌歷史"
          description="查看與清除日誌"
          full-width
        >
          <div class="flex flex-col gap-4">
            <div>
              <button
                class="glass-btn danger"
                @click="clearLogs"
              >
                Clear All Logs
              </button>
            </div>
            <ShowcaseCodeBlock
              :code="JSON.stringify(recentLogs, null, 2)"
              language="json"
              label="Recent Logs (Last 10)"
              :max-height="300"
            />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- API 參考 -->
    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="1. Log Levels"
          description="日誌等級方法"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>方法：</strong>
              debug, info, warn, error
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="logger.debug('詳細除錯資訊')
logger.info('一般操作記錄')
logger.warn('潛在問題警告')
logger.error('發生錯誤', errorObj)"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="2. Timer"
          description="效能計時器"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>方法：</strong>
              startTimer, endTimer
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="logger.startTimer('upload')
// ... upload operation ...
logger.endTimer('upload')
// Output: [Timer] upload: 1234ms"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="3. Configuration"
          description="設定與管理"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>方法：</strong>
              setLevel, clearLogs
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="// 只顯示 Warning 以上
logger.setLevel('warn')

// 清除所有日誌
logger.clearLogs()"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.glass-input {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #f1f5f9;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.glass-input:focus {
  border-color: #38bdf8;
  background: rgba(15, 23, 42, 0.8);
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
}

.glass-btn:hover {
  background: rgba(51, 65, 85, 0.8);
  border-color: #94a3b8;
}

.glass-btn.active {
  background: rgba(56, 189, 248, 0.2);
  border-color: #38bdf8;
  color: #38bdf8;
}

.glass-btn.primary {
  background: rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.5);
  color: #38bdf8;
}

.glass-btn.secondary {
  background: rgba(148, 163, 184, 0.2);
  border-color: rgba(148, 163, 184, 0.5);
  color: #e2e8f0;
}

.glass-btn.warn:hover {
  background: rgba(251, 191, 36, 0.2);
  border-color: #fbbf24;
  color: #fbbf24;
}

.glass-btn.danger {
  border-color: rgba(248, 113, 113, 0.5);
}

.glass-btn.danger:hover {
  background: rgba(248, 113, 113, 0.2);
  color: #f87171;
}

/* Benefit List */
.benefit-list {
  padding-left: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin: 0;
}

.benefit-list li {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(56, 189, 248, 0.15);
  color: #e2e8f0;
  font-size: 0.95rem;
  line-height: 1.7;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.benefit-list li::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, #38bdf8 0%, #6366f1 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.benefit-list li:hover {
  border-color: rgba(56, 189, 248, 0.3);
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.15);
}

.benefit-list li:hover::before {
  opacity: 1;
}

.benefit-list li strong {
  color: #38bdf8;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.05em;
  font-weight: 600;
  letter-spacing: 0.3px;
}

/* Method Description */
.method-desc {
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0;
}
</style>
