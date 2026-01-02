<script setup lang="ts">
import { ref, computed } from 'vue'

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

const formatData = (data: any) => {
  try {
    return JSON.stringify(data, null, 2)
  } catch {
    return String(data)
  }
}

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
    <!-- 基礎用法 -->
    <ShowcaseSection title="基礎用法">
      <ShowcaseCard
        title="核心功能"
        description="錯誤處理系統的核心特色"
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
            code="const { captureError, showError, retry, errors, clearErrors } = useErrorHandler()

// 1. 捕捉錯誤
try {
  await apiCall()
} catch (e) {
  captureError(e, { source: 'UserAction' })
}

// 2. 顯示錯誤通知
showError('發生未知錯誤', 'error')

// 3. 自動重試
await retry(() => api.fetchData(), { maxRetries: 3, delay: 1000 })

// 4. 管理歷史
const allErrors = errors.value
clearErrors()"
            label="useErrorHandler() 功能總覽"
          />

          <p
            class="method-desc"
            style="margin-top: 1.5rem; margin-bottom: 1rem"
          >
            <strong>核心特色：</strong>
          </p>
          <ul class="benefit-list">
            <li>
              <strong>自動捕捉:</strong>
              整合 Vue 全局錯誤處理，自動捕捉未處理的例外
            </li>
            <li>
              <strong>智能重試:</strong>
              內建 Exponential Backoff 重試機制，提高 API 穩定性
            </li>
            <li>
              <strong>統一通知:</strong>
              整合 Notification 系統，提供一致的錯誤提示 UI
            </li>
            <li>
              <strong>完整記錄:</strong>
              詳細記錄錯誤堆疊、發生時間與來源，便於除錯
            </li>
          </ul>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- API 參考 -->
    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="1. Error Capture"
          description="錯誤捕捉方法"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>captureError(error, context)</strong>
              <br />
              手動捕捉錯誤並記錄。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="captureError(new Error('Validation Failed'), {
  component: 'LoginForm',
  timestamp: new Date()
})"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="2. Retry Mechanism"
          description="自動重試機制"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>retry(fn, options)</strong>
              <br />
              執行函式並在失敗時自動重試。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="await retry(
  async () => await fetchUser(), 
  { 
    maxRetries: 3, 
    delay: 500,
    backoff: true 
  }
)"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="3. UI Feedback"
          description="錯誤提示"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>showError(message, type)</strong>
              <br />
              顯示錯誤通知 Toast。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="showError('連線失敗，請稍後再試')
// 或指定類型
showError('警告：資料未儲存', 'warning')"
              label="使用範例"
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

            <ShowcaseCodeBlock
              :code="formatData(recentErrors)"
              language="json"
              label="最近 5 筆錯誤"
            />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
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
