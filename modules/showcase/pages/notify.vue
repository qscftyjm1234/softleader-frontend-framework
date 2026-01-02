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
    title="全域通知系統"
    description="提供全域的輕量級通知訊息 (Toast/Snackbar)，透過 Composable 呼叫，無須手動引入元件。支援四種通知類型：成功、錯誤、警告、提示。"
  >
    <!-- 基礎用法 -->
    <ShowcaseSection title="基礎用法">
      <ShowcaseCard
        title="核心功能"
        description="通知系統的核心特色"
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
  success,   // 成功通知
  error,     // 錯誤通知
  warning,   // 警告通知
  info       // 資訊通知
} = useNotify()"
            label="useNotify() 提供的方法"
          />

          <p
            class="method-desc"
            style="margin-top: 1.5rem; margin-bottom: 1rem"
          >
            <strong>核心特色：</strong>
          </p>
          <ul class="benefit-list">
            <li>
              <strong>Fire and Forget:</strong>
              呼叫即顯示，無需管理狀態
            </li>
            <li>
              <strong>全域可用:</strong>
              任何地方都可以呼叫，無需引入元件
            </li>
            <li>
              <strong>自動消失:</strong>
              通知會自動在 3 秒後消失
            </li>
            <li>
              <strong>四種類型:</strong>
              成功、錯誤、警告、資訊
            </li>
          </ul>
        </div>
        <template #footer>
          <ShowcaseCodeBlock
            code="const { success } = useNotify()

// 快速使用
success('操作成功！')"
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
          title="通知類型"
          description="點擊按鈕觸發不同類型的通知"
          full-width
        >
          <div class="flex flex-wrap gap-4">
            <div class="flex flex-col gap-2 min-w-[150px]">
              <span class="text-xs text-slate-400 uppercase font-bold tracking-wider">成功</span>
              <button
                class="glass-btn success"
                @click="handleSuccess"
              >
                觸發成功通知
              </button>
            </div>

            <div class="flex flex-col gap-2 min-w-[150px]">
              <span class="text-xs text-slate-400 uppercase font-bold tracking-wider">錯誤</span>
              <button
                class="glass-btn error"
                @click="handleError"
              >
                觸發錯誤通知
              </button>
            </div>

            <div class="flex flex-col gap-2 min-w-[150px]">
              <span class="text-xs text-slate-400 uppercase font-bold tracking-wider">警告</span>
              <button
                class="glass-btn warning"
                @click="handleWarning"
              >
                觸發警告通知
              </button>
            </div>

            <div class="flex flex-col gap-2 min-w-[150px]">
              <span class="text-xs text-slate-400 uppercase font-bold tracking-wider">資訊</span>
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

    <!-- API 參考 -->
    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <div class="component-grid">
        <!-- success() -->
        <ShowcaseCard
          title="1. success()"
          description="成功通知"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              顯示綠色的成功通知訊息。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { success } = useNotify()

success('資料儲存成功！')
success('檔案上傳完成')"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- error() -->
        <ShowcaseCard
          title="2. error()"
          description="錯誤通知"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              顯示紅色的錯誤通知訊息。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { error } = useNotify()

error('無法連線至伺服器')
error('檔案格式不正確')"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- warning() -->
        <ShowcaseCard
          title="3. warning()"
          description="警告通知"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              顯示黃色的警告通知訊息。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { warning } = useNotify()

warning('您的連線不穩定')
warning('檔案大小超過建議值')"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- info() -->
        <ShowcaseCard
          title="4. info()"
          description="資訊通知"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              顯示藍色的資訊通知訊息。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { info } = useNotify()

info('您有一則新訊息')
info('系統將於 5 分鐘後維護')"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- 相依模組 -->
        <ShowcaseCard
          title="相依模組"
          description="通知系統的依賴關係"
          full-width
        >
          <div class="demo-area">
            <ul class="benefit-list">
              <li>
                <strong>GlobalSnackbar:</strong>
                全域 Snackbar 元件負責顯示通知
              </li>
              <li>
                <strong>Pinia Store:</strong>
                使用 store 管理通知佇列
              </li>
            </ul>
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
