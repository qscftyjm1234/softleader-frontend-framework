<script setup lang="ts">
import ApiLoadingButton from '@/components/uiBusiness/ApiLoadingButton.vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

definePageMeta({
  title: '載入狀態 (Loading State)',
  icon: 'mdi-progress-clock',
  layout: 'portal'
})

const loading = useLoading()

const handleStart = () => {
  loading.start()
  setTimeout(() => loading.finish(), 2000)
}

const handleFail = () => {
  loading.start()
  setTimeout(() => loading.fail(), 2000)
}
</script>

<template>
  <ShowcasePage
    title="全域 Loading 系統"
    description="展示 useLoading Composable 的計數器機制。支援多重請求堆疊 (Stack/Queue)，確保 Loading 遮罩在所有請求完成後才消失，避免畫面閃爍。"
  >
    <!-- 基礎用法 -->
    <ShowcaseSection title="基礎用法">
      <ShowcaseCard
        title="核心功能"
        description="Loading 系統的核心特色"
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
            code="const {
  start,      // 開始 Loading
  finish,     // 結束 Loading
  fail,       // Loading 失敗
  isLoading   // Loading 狀態
} = useLoading()"
            label="useLoading() 提供的方法"
          />

          <p
            class="method-desc"
            style="margin-top: 1.5rem; margin-bottom: 1rem"
          >
            <strong>核心特色：</strong>
          </p>
          <ul class="benefit-list">
            <li>
              <strong>計數器機制:</strong>
              支援多重請求堆疊，避免閃爍
            </li>
            <li>
              <strong>全域遮罩:</strong>
              整個畫面的 Loading 遮罩
            </li>
            <li>
              <strong>自動管理:</strong>
              自動追蹤請求數量
            </li>
            <li>
              <strong>失敗處理:</strong>
              支援 Loading 失敗狀態
            </li>
          </ul>
        </div>
        <template #footer>
          <ShowcaseCodeBlock
            code="const loading = useLoading()

// 開始 Loading
loading.start()

// 結束 Loading
loading.finish()"
            label="快速開始"
          />
        </template>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 互動測試 -->
    <ShowcaseSection
      title="互動測試"
      icon="🎮"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="Loading 控制"
          description="測試 Loading 的開始和結束"
        >
          <div class="flex flex-col gap-3">
            <button
              class="glass-btn primary"
              @click="handleStart"
            >
              開始 Loading (2秒後自動結束)
            </button>
            <button
              class="glass-btn danger"
              @click="handleFail"
            >
              Loading 失敗 (2秒後)
            </button>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          title="多重請求測試"
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

    <!-- API 參考 -->
    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="1. start()"
          description="開始 Loading"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              開始全域 Loading，計數器 +1。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const loading = useLoading()

loading.start()
// Loading 遮罩顯示"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="2. finish()"
          description="結束 Loading"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              結束 Loading，計數器 -1。當計數器歸零時，遮罩消失。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const loading = useLoading()

loading.start()
// ... 執行操作
loading.finish()
// 計數器 -1"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="3. fail()"
          description="Loading 失敗"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              標記 Loading 為失敗狀態。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const loading = useLoading()

loading.start()
try {
  await api.call()
  loading.finish()
} catch (error) {
  loading.fail()
}"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="使用情境"
          description="實際應用範例"
          full-width
        >
          <template #footer>
            <ShowcaseCodeBlock
              code="const loading = useLoading()

// 情境：同時發送 3 個 API 請求
async function loadData() {
  loading.start()  // 計數器: 1
  loading.start()  // 計數器: 2
  loading.start()  // 計數器: 3
  
  await Promise.all([
    api1().then(() => loading.finish()),  // 計數器: 2
    api2().then(() => loading.finish()),  // 計數器: 1
    api3().then(() => loading.finish())   // 計數器: 0 → 遮罩消失
  ])
}"
              label="多重請求範例"
            />
          </template>
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
  background: rgba(51, 65, 85, 0.8);
  border-color: #94a3b8;
}

.glass-btn.primary {
  background: rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.5);
  color: #38bdf8;
}

.glass-btn.primary:hover {
  background: rgba(56, 189, 248, 0.3);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
}

.glass-btn.danger {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
  color: #ef4444;
}

.glass-btn.danger:hover {
  background: rgba(239, 68, 68, 0.3);
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
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
