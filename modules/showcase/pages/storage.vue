<script setup lang="ts">
import { ref } from 'vue'
import DataPreview from '../components/DataPreview.vue'

const { setItem, getItem, removeItem, clear, keys, hasItem, useStorageRef } = useStorage('local')

// Demo data
const demoKey = ref('demo_key')
const demoValue = ref('Hello Storage!')
const storedValue = ref<any>(null)
const allKeys = ref<string[]>([])

// Reactive storage demo
const reactiveData = useStorageRef('reactive_demo', { count: 0, name: 'Demo' })

const handleSet = () => {
  setItem(demoKey.value, demoValue.value, { expires: 60000 }) // 1 分鐘
  refreshKeys()
}

const handleGet = () => {
  storedValue.value = getItem(demoKey.value)
}

const handleRemove = () => {
  removeItem(demoKey.value)
  refreshKeys()
}

const handleClear = () => {
  clear()
  refreshKeys()
}

const refreshKeys = () => {
  allKeys.value = keys()
}

onMounted(() => {
  refreshKeys()
})

definePageMeta({
  title: '本地儲存 (Storage)',
  icon: 'mdi-database'
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
        <h1 class="page-title">本地儲存系統 (Storage System)</h1>
      </div>
      <p class="page-desc">LocalStorage 和 SessionStorage 的封裝，支援自動序列化與過期時間。</p>
    </div>

    <section class="module-section">
      <h2 class="section-title">
        <span class="icon">🎮</span>
        Storage Operations
      </h2>
      <div class="card-content">
        <div class="demo-section">
          <h3>基本操作</h3>
          <div class="form-row">
            <input
              v-model="demoKey"
              placeholder="Key"
              class="input-field"
            />
            <input
              v-model="demoValue"
              placeholder="Value"
              class="input-field"
            />
          </div>
          <div class="button-group">
            <button
              class="action-btn"
              @click="handleSet"
            >
              Set Item
            </button>
            <button
              class="action-btn secondary"
              @click="handleGet"
            >
              Get Item
            </button>
            <button
              class="action-btn danger"
              @click="handleRemove"
            >
              Remove Item
            </button>
            <button
              class="action-btn danger"
              @click="handleClear"
            >
              Clear All
            </button>
          </div>
          <DataPreview
            v-if="storedValue !== null"
            title="Retrieved Value"
            :data="storedValue"
          />
        </div>

        <div class="demo-section">
          <h3>響應式儲存</h3>
          <p>修改下方資料會自動儲存到 LocalStorage</p>
          <div class="form-row">
            <label>Count:</label>
            <input
              v-model.number="reactiveData.count"
              type="number"
              class="input-field"
            />
          </div>
          <div class="form-row">
            <label>Name:</label>
            <input
              v-model="reactiveData.name"
              class="input-field"
            />
          </div>
          <DataPreview
            title="Current Data"
            :data="reactiveData"
          />
        </div>

        <div class="demo-section">
          <h3>所有儲存的 Keys</h3>
          <button
            class="action-btn"
            @click="refreshKeys"
          >
            Refresh
          </button>
          <DataPreview
            title="Keys"
            :data="allKeys"
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
  transition: all 0.2s;
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
  margin: 0 0 1rem 0;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.input-field {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.action-btn {
  background: #0d6efd;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.action-btn.secondary {
  background: #6c757d;
}

.action-btn.danger {
  background: #dc3545;
}
</style>
