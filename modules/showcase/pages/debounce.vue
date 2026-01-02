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
    title="防抖/節流系統 (Debounce/Throttle System)"
    description="效能最佳化工具，提供防抖 (Debounce) 與節流 (Throttle) 機制，減少高頻事件觸發頻率。"
  >
    <ShowcaseSection
      title="Interactive Demo (互動演示)"
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
      title="Code Examples"
      icon="💻"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="Usage"
          description="如何在 setup 中使用"
          full-width
        >
          <ShowcaseCodeBlock
            code="const { debounce, throttle, useDebouncedRef, useThrottledRef } = useDebounce()

// Functions
const handleClick = debounce(() => {
  console.log('Clicked!')
}, 500)

// Refs
const { immediate, debounced } = useDebouncedRef('', 500)"
            label="Composition API"
          />
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
</style>
