<script setup lang="ts">
import ApiLoadingButton from '@/components/uiBusiness/ApiLoadingButton.vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'

definePageMeta({
  title: '載入狀態 (Loading State)',
  icon: 'mdi-progress-clock',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="全域 Loading 展示 (Queue 模式)"
    description="展示 useLoading Composable 的計數器機制。支援多重請求堆疊 (Stack/Queue)，確保 Loading 遮罩在所有請求完成後才消失，避免畫面閃爍。"
  >
    <!-- Description Section -->
    <ShowcaseSection
      title="How it Works (運作機制)"
      icon="ℹ️"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="測試說明"
          description="請嘗試快速點擊下方的按鈕多次。"
        >
          <ul class="list-disc pl-5 text-slate-400 space-y-2 text-sm mt-2">
            <li>每個按鈕會觸發一個延遲 2 秒的 Mock API。</li>
            <li>
              如果你在 1 秒內點了 3 次，Loading 不會閃爍，而是會持續顯示約 2~3 秒，直到
              <b>最後一個</b>
              請求結束。
            </li>
            <li>這確保了使用者體驗的流暢性，避免 Loading 遮罩頻繁開關。</li>
          </ul>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- Demo Section -->
    <ShowcaseSection
      title="Interactive Demo (互動式演示)"
      icon="🎮"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="Concurrent Requests"
          description="同時發送多個請求以測試 Queue 機制"
          full-width
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              class="flex flex-col items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
            >
              <h3 class="text-sm font-semibold text-slate-300 mb-3">API 請求 1</h3>
              <ApiLoadingButton label="發送請求 A (2s)" />
            </div>

            <div
              class="flex flex-col items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
            >
              <h3 class="text-sm font-semibold text-slate-300 mb-3">API 請求 2</h3>
              <ApiLoadingButton label="發送請求 B (2s)" />
            </div>

            <div
              class="flex flex-col items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
            >
              <h3 class="text-sm font-semibold text-slate-300 mb-3">API 請求 3</h3>
              <ApiLoadingButton label="發送請求 C (2s)" />
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
/* Scoped styles can be minimal as we use Showcase components and Tailwind */
</style>
