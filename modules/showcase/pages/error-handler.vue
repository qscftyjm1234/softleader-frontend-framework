<script setup lang="ts">
import { ref, computed } from 'vue'
import DataPreview from '../components/DataPreview.vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'
import IButton from '@/components/uiInterface/IButton.vue'
import IInput from '@/components/uiInterface/IInput.vue'

const { captureError, showError, retry, errors, clearErrors } = useErrorHandler()

// Demo state
const errorMessage = ref('測試錯誤訊息')
const retryCount = ref(3)
const retryDelay = ref(1000)
const isRetrying = ref(false)
const retryResult = ref('')

// Computed
const recentErrors = computed(() => errors.value.slice(-5))

const handleCaptureError = () => {
  const error = new Error(errorMessage.value)
  captureError(error, { source: 'showcase-demo', timestamp: new Date() })
}

const handleShowError = () => {
  showError(errorMessage.value)
}

const handleRetrySuccess = async () => {
  isRetrying.value = true
  retryResult.value = ''

  try {
    let attemptCount = 0
    const result = await retry(
      async () => {
        attemptCount++
        if (attemptCount < 2) {
          throw new Error('模擬失敗')
        }
        return '成功！'
      },
      {
        maxRetries: retryCount.value,
        delay: retryDelay.value
      }
    )
    retryResult.value = `重試成功：${result}`
  } catch (error) {
    retryResult.value = `重試失敗：${(error as Error).message}`
  } finally {
    isRetrying.value = false
  }
}

const handleRetryFail = async () => {
  isRetrying.value = true
  retryResult.value = ''

  try {
    await retry(
      async () => {
        throw new Error('永遠失敗')
      },
      {
        maxRetries: retryCount.value,
        delay: retryDelay.value
      }
    )
  } catch (error) {
    retryResult.value = `所有重試都失敗：${(error as Error).message}`
  } finally {
    isRetrying.value = false
  }
}

definePageMeta({
  title: '錯誤處理 (Error Handler)',
  icon: 'mdi-alert-circle',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="錯誤處理系統 (Error Handler System)"
    description="完整的錯誤處理模組，提供錯誤捕捉、分類、記錄和重試機制。"
  >
    <!-- General Usage -->
    <ShowcaseSection
      title="General Usage"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="核心功能"
          description="系統錯誤處理的三大支柱"
          full-width
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div class="text-sky-400 font-bold mb-2">1. 錯誤捕捉</div>
              <div class="text-slate-400 text-sm">自動捕捉與分類，記錄錯誤來源與時間戳。</div>
            </div>
            <div class="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div class="text-sky-400 font-bold mb-2">2. API 整合</div>
              <div class="text-slate-400 text-sm">統一處理 API 回傳錯誤，避免 try-catch 地獄。</div>
            </div>
            <div class="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div class="text-sky-400 font-bold mb-2">3. 自動重試</div>
              <div class="text-slate-400 text-sm">
                提供指數退避 (Exponential Backoff) 重試機制。
              </div>
            </div>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { captureError, retry } = useErrorHandler()"
              label="Composable Usage"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- Interactive Playground -->
    <ShowcaseSection
      title="Interactive Playground"
      icon="🎮"
    >
      <div class="component-grid">
        <!-- 1. Capture -->
        <ShowcaseCard
          title="1. 錯誤捕捉"
          description="模擬並記錄錯誤。"
        >
          <div class="demo-area">
            <IInput
              v-model="errorMessage"
              label="錯誤訊息"
              class="mb-4"
            />
            <div class="flex gap-2">
              <IButton @click="handleCaptureError">捕捉錯誤</IButton>
              <IButton
                variant="secondary"
                @click="handleShowError"
              >
                顯示通知
              </IButton>
            </div>
          </div>
        </ShowcaseCard>

        <!-- 2. Retry -->
        <ShowcaseCard
          title="2. 重試機制"
          description="自動重試失敗的操作。"
        >
          <div class="demo-area">
            <div class="flex gap-4 mb-4">
              <IInput
                v-model.number="retryCount"
                type="number"
                label="重試次數"
                style="width: 100px"
              />
              <IInput
                v-model.number="retryDelay"
                type="number"
                label="延遲 (ms)"
                style="width: 120px"
              />
            </div>

            <div class="flex gap-2 mb-4">
              <IButton
                :disabled="isRetrying"
                @click="handleRetrySuccess"
              >
                {{ isRetrying ? '重試中...' : '測試重試 (成功)' }}
              </IButton>
              <IButton
                variant="danger"
                :disabled="isRetrying"
                @click="handleRetryFail"
              >
                {{ isRetrying ? '重試中...' : '測試重試 (失敗)' }}
              </IButton>
            </div>

            <div
              v-if="retryResult"
              class="result-text"
            >
              <span class="value">{{ retryResult }}</span>
            </div>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="await retry(() => api.call(), { maxRetries: 3 })"
              label="Retry Code"
            />
          </template>
        </ShowcaseCard>

        <!-- 3. History -->
        <ShowcaseCard
          title="3. 錯誤歷史"
          description="查看與管理最近的錯誤。"
          full-width
        >
          <div class="demo-area">
            <div class="flex justify-between items-center mb-4">
              <span class="text-slate-400 text-sm">
                Total Errors:
                <strong class="text-sky-400">{{ errors.length }}</strong>
              </span>
              <IButton
                variant="danger"
                size="small"
                @click="clearErrors"
              >
                清除歷史
              </IButton>
            </div>

            <DataPreview
              title="最近 5 筆錯誤"
              :data="recentErrors"
            />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
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

.result-box {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 1rem;
  margin-top: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-8 {
  margin-top: 2rem;
}
</style>
