<script setup lang="ts">
import { ref } from 'vue'
import DataPreview from '../components/DataPreview.vue'

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
  icon: 'mdi-timer'
})
</script>

<template>
  <div class="inspector-container">
    <div class="page-header">
      <div class="header-main">
        <router-link
          to="/showcase"
          class="back-link"
        >
          返回
        </router-link>
        <h1 class="page-title">防抖/節流系統 (Debounce/Throttle System)</h1>
      </div>
      <p class="page-desc">效能優化工具，減少函數執行頻率。</p>
    </div>

    <section class="module-section">
      <h2 class="section-title">
        <span class="icon">🎮</span>
        Interactive Demo
      </h2>
      <div class="card-content">
        <!-- Button Demo -->
        <div class="demo-section">
          <h3>按鈕點擊測試</h3>
          <p class="hint">快速點擊按鈕，觀察計數器差異</p>
          <div class="button-group">
            <div class="demo-item">
              <button
                class="action-btn"
                @click="handleNormalClick"
              >
                Normal Click
              </button>
              <div class="counter">Count: {{ normalCount }}</div>
            </div>
            <div class="demo-item">
              <button
                class="action-btn"
                @click="handleDebounceClick"
              >
                Debounced (500ms)
              </button>
              <div class="counter">Count: {{ debounceCount }}</div>
              <p class="note">只在停止點擊 500ms 後執行</p>
            </div>
            <div class="demo-item">
              <button
                class="action-btn"
                @click="handleThrottleClick"
              >
                Throttled (500ms)
              </button>
              <div class="counter">Count: {{ throttleCount }}</div>
              <p class="note">每 500ms 最多執行一次</p>
            </div>
          </div>
        </div>

        <!-- Input Demo -->
        <div class="demo-section">
          <h3>輸入框防抖測試</h3>
          <input
            v-model="immediateInput"
            placeholder="Type something..."
            class="input-field"
          />
          <DataPreview
            title="Values"
            :data="{
              immediate: immediateInput,
              debounced: debouncedInput,
              note: '防抖值會在停止輸入 500ms 後更新'
            }"
          />
        </div>

        <!-- Scroll Demo -->
        <div class="demo-section">
          <h3>滾動節流測試</h3>
          <div
            class="scroll-box"
            @scroll="handleScroll"
          >
            <div class="scroll-content">
              <p
                v-for="i in 50"
                :key="i"
              >
                Scroll me! Line {{ i }}
              </p>
            </div>
          </div>
          <DataPreview
            title="Scroll Position"
            :data="{
              immediate: immediateScroll,
              throttled: throttledScroll,
              note: '節流值每 300ms 最多更新一次'
            }"
          />
        </div>
      </div>
    </section>
  </div>
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
}

.page-title {
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
}

.page-desc {
  color: #666;
  margin-left: 0.5rem;
}

.module-section {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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

.demo-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
}

.demo-section:last-child {
  border-bottom: none;
}

.demo-section h3 {
  margin: 0 0 0.5rem 0;
}

.hint {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.button-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.demo-item {
  text-align: center;
}

.action-btn {
  background: #0d6efd;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 0.5rem;
}

.counter {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0.5rem 0;
}

.note {
  font-size: 0.8rem;
  color: #666;
  margin: 0;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.scroll-box {
  height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.scroll-content {
  padding: 1rem;
}
</style>
