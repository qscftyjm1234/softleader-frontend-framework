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
    <!-- General Usage -->
    <ShowcaseSection
      title="General Usage"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="核心功能"
          description="日誌記錄與效能監控"
          full-width
        >
          <div class="flex flex-col gap-4">
            <div class="flex gap-4 flex-wrap">
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold border bg-slate-400/20 text-slate-400 border-slate-400/30"
              >
                Debug
              </span>
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold border bg-sky-400/20 text-sky-400 border-sky-400/30"
              >
                Info
              </span>
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold border bg-amber-400/20 text-amber-400 border-amber-400/30"
              >
                Warn
              </span>
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold border bg-red-400/20 text-red-400 border-red-400/30"
              >
                Error
              </span>
            </div>
            <ShowcaseCodeBlock
              code="const logger = useLogger('ComponentName')

// 記錄資訊
logger.info('User logged in', { userId: 123 })

// 記錄錯誤
logger.error('API failed', { error, context })

// 效能追蹤
logger.startTimer('data-fetch')
await fetchData()
logger.endTimer('data-fetch')"
              label="Usage Example"
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
</style>
