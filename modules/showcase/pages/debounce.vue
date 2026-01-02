<script setup lang="ts">
import { ref } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const { debounce, throttle, useDebouncedRef, useThrottledRef } = useDebounce()

// Demo counters
const debounceCount = ref(0)
const throttleCount = ref(0)
const normalCount = ref(0)

// Debounced/Throttled refs
const { immediate: immediateInput, debounced: debouncedInput } = useDebouncedRef('', 500)
const { immediate: immediateScroll, throttled: throttledScroll } = useThrottledRef(0, 300)

// Debounced function
const debouncedFn = debounce(() => {
  debounceCount.value++
}, 500)

// Throttled function
const throttledFn = throttle(() => {
  throttleCount.value++
}, 500)

const handleNormalClick = () => {
  normalCount.value++
}

const handleDebounceClick = () => {
  debouncedFn()
}

const handleThrottleClick = () => {
  throttledFn()
}

const handleScroll = (e: Event) => {
  immediateScroll.value = (e.target as HTMLElement).scrollTop
}

definePageMeta({
  title: '防抖/節流 (Debounce)',
  icon: 'mdi-timer',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="防抖/節流系統"
    description="效能最佳化工具，提供防抖 (Debounce) 與節流 (Throttle) 機制，減少高頻事件觸發頻率。"
  >
    <!-- 基礎用法 -->
    <ShowcaseSection title="基礎用法">
      <ShowcaseCard
        title="核心功能"
        description="效能優化核心特色"
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
  debounce,         // 防抖函數
  throttle,         // 節流函數
  useDebouncedRef,  // 防抖響應式變數
  useThrottledRef   // 節流響應式變數
} = useDebounce()"
            label="useDebounce() 提供的方法"
          />

          <p
            class="method-desc"
            style="margin-top: 1.5rem; margin-bottom: 1rem"
          >
            <strong>核心特色：</strong>
          </p>
          <ul class="benefit-list">
            <li>
              <strong>Debounce (防抖):</strong>
              等待停止操作後才執行 (如：搜尋輸入)
            </li>
            <li>
              <strong>Throttle (節流):</strong>
              固定頻率執行，限制最大次數 (如：滾動事件)
            </li>
            <li>
              <strong>Reactive Ref:</strong>
              直接提供 Vue Ref 封裝，使用更直覺
            </li>
            <li>
              <strong>TypeScript:</strong>
              完整型別支援，開發體驗佳
            </li>
          </ul>
        </div>
        <template #footer>
          <ShowcaseCodeBlock
            code="const { debounce } = useDebounce()

const handleInput = debounce((val) => {
  api.search(val)
}, 500)"
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
        <!-- Button Demo -->
        <ShowcaseCard
          title="Click Handlers"
          description="快速點擊按鈕，觀察計數器差異"
          full-width
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-4 bg-slate-800 rounded-lg text-center">
              <button
                class="glass-btn w-full mb-3"
                @click="handleNormalClick"
              >
                Normal Click
              </button>
              <div class="text-2xl font-bold text-white mb-1">
                {{ normalCount }}
              </div>
              <p class="text-xs text-slate-400">立即執行</p>
            </div>

            <div class="p-4 bg-slate-800 rounded-lg text-center">
              <button
                class="glass-btn primary w-full mb-3"
                @click="handleDebounceClick"
              >
                Debounced (500ms)
              </button>
              <div class="text-2xl font-bold text-blue-400 mb-1">
                {{ debounceCount }}
              </div>
              <p class="text-xs text-slate-400">停止點擊 500ms 後執行</p>
            </div>

            <div class="p-4 bg-slate-800 rounded-lg text-center">
              <button
                class="glass-btn primary w-full mb-3"
                @click="handleThrottleClick"
              >
                Throttled (500ms)
              </button>
              <div class="text-2xl font-bold text-pink-400 mb-1">
                {{ throttleCount }}
              </div>
              <p class="text-xs text-slate-400">每 500ms 最多執行一次</p>
            </div>
          </div>
        </ShowcaseCard>

        <!-- Input Demo -->
        <ShowcaseCard
          title="Debounced Ref"
          description="輸入框防抖測試 (Delay: 500ms)"
        >
          <div class="mb-4">
            <input
              v-model="immediateInput"
              placeholder="Type something..."
              class="glass-input w-full"
            />
          </div>
          <ShowcaseCodeBlock
            :code="
              JSON.stringify(
                {
                  immediate: immediateInput,
                  debounced: debouncedInput,
                  status: immediateInput === debouncedInput ? 'Synced' : 'Waiting...'
                },
                null,
                2
              )
            "
            language="json"
            label="Reactive Values"
          />
        </ShowcaseCard>

        <!-- Scroll Demo -->
        <ShowcaseCard
          title="Throttled Ref"
          description="滾動節流測試 (Delay: 300ms)"
        >
          <div
            class="h-[200px] overflow-y-auto rounded-md bg-slate-900/40 border border-slate-700/10 mb-4"
            @scroll="handleScroll"
          >
            <div class="p-4">
              <p
                v-for="i in 20"
                :key="i"
                class="py-1 text-slate-400 text-sm border-b border-slate-700/50"
              >
                Scroll Item {{ i }} - Move faster!
              </p>
            </div>
          </div>
          <ShowcaseCodeBlock
            :code="
              JSON.stringify(
                {
                  immediate: immediateScroll,
                  throttled: throttledScroll
                },
                null,
                2
              )
            "
            language="json"
            label="Scroll Position"
          />
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="1. debounce()"
          description="防抖函數"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              延遲函數執行，直到停止呼叫一段時間後才執行。
            </p>
            <p class="method-desc mt-2">
              <strong>適用：</strong>
              搜尋建議、視窗調整大小、表單驗證。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="// 延遲 500ms 執行
const fn = debounce(() => {
  console.log('Executed!')
}, 500)

fn() // 等待...
fn() // 重置計時...
// 500ms 後執行一次"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="2. throttle()"
          description="節流函數"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              限制函數在一定時間內只能執行一次。
            </p>
            <p class="method-desc mt-2">
              <strong>適用：</strong>
              滾動監聽、滑鼠移動、按鈕連點防止。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="// 每 1000ms 最多執行一次
const fn = throttle(() => {
  console.log('Executed!')
}, 1000)

fn() // 執行
fn() // 忽略
fn() // 忽略
// 1000ms 後可再次執行"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="3. useDebouncedRef()"
          description="防抖變數"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              建立一個會自動防抖的 Ref。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { 
  immediate,  // 立即變更的值 (綁定 input)
  debounced   // 防抖後的值 (用於 watcher/api)
} = useDebouncedRef('initial', 500)

// template: v-model=&quot;immediate&quot;
// watch: debounced"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="4. useThrottledRef()"
          description="節流變數"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              建立一個會自動節流的 Ref。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { 
  immediate,  // 立即變更的值
  throttled   // 節流後的值
} = useThrottledRef(0, 300)"
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
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #f1f5f9;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  outline: none;
  font-size: 0.95rem;
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
  font-weight: 600;
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
