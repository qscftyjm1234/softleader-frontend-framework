<script setup lang="ts">
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

definePageMeta({
  title: '通知系統 (Notify)',
  icon: 'mdi-bell-ring',
  layout: 'portal'
})

const { success, error, warning, info } = useNotify()

const handleSuccess = () => success('操作成功！資料已儲存。')
const handleError = () => error('發生錯誤：無法連線至伺服器 (500)')
const handleWarning = () => warning('注意：您的連線似乎不穩定。')
const handleInfo = () => info('提示：您有一則新訊息。')
</script>

<template>
  <ShowcasePage
    title="全域通知系統 (Notify System)"
    description="提供全域的輕量級通知訊息 (Toast/Snackbar)，透過 Composable 呼叫，無須手動引入元件。支援四種通知類型：成功、錯誤、警告、提示。"
  >
    <!-- Basic Usage -->
    <ShowcaseSection
      title="Basic Usage (基本用法)"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="Overview"
          description="Notify 系統設計為 'Fire and Forget'，只需要呼叫 helper function 即可。"
          full-width
        >
          <ShowcaseCodeBlock
            code="// 1. 取得 helper (Nuxt Auto Import)
const { success, error, warning, info } = useNotify()

// 2. 觸發通知
success('操作成功') 
error('發生錯誤')
warning('警告訊息')
info('一般提示')"
            label="Composition API"
          />
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- Interactive Demo -->
    <ShowcaseSection
      title="Interactive Demo (互動式演示)"
      icon="🎮"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="Notification Types"
          description="點擊按鈕觸發不同類型的通知"
          full-width
        >
          <div class="flex flex-wrap gap-4">
            <div class="flex flex-col gap-2 min-w-[150px]">
              <span class="text-xs text-slate-400 uppercase font-bold tracking-wider">Success</span>
              <button
                class="glass-btn success"
                @click="handleSuccess"
              >
                觸發成功通知
              </button>
            </div>

            <div class="flex flex-col gap-2 min-w-[150px]">
              <span class="text-xs text-slate-400 uppercase font-bold tracking-wider">Error</span>
              <button
                class="glass-btn error"
                @click="handleError"
              >
                觸發錯誤通知
              </button>
            </div>

            <div class="flex flex-col gap-2 min-w-[150px]">
              <span class="text-xs text-slate-400 uppercase font-bold tracking-wider">Warning</span>
              <button
                class="glass-btn warning"
                @click="handleWarning"
              >
                觸發警告通知
              </button>
            </div>

            <div class="flex flex-col gap-2 min-w-[150px]">
              <span class="text-xs text-slate-400 uppercase font-bold tracking-wider">Info</span>
              <button
                class="glass-btn info"
                @click="handleInfo"
              >
                觸發提示通知
              </button>
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #e2e8f0;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
}

.glass-btn:hover {
  filter: brightness(1.2);
}

.glass-btn.success {
  background: rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.5);
  color: #34d399;
}

.glass-btn.error {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
  color: #f87171;
}

.glass-btn.warning {
  background: rgba(245, 158, 11, 0.2);
  border-color: rgba(245, 158, 11, 0.5);
  color: #fbbf24;
}

.glass-btn.info {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
  color: #60a5fa;
}
</style>
