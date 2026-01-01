<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const { setItem, getItem, removeItem, clear, keys, useStorageRef } = useStorage('local')

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
  icon: 'mdi-database',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="本地儲存 (Storage)"
    description="LocalStorage 和 SessionStorage 的封裝，支援自動序列化、過期時間管理與響應式資料綁定。"
  >
    <ShowcaseSection
      title="Storage Operations"
      icon="🎮"
    >
      <div class="component-grid">
        <!-- Basic Operations -->
        <ShowcaseCard
          title="基本操作"
          description="CRUD 與過期時間設定"
        >
          <div class="flex flex-col gap-4">
            <div class="flex gap-4">
              <div class="flex-1">
                <label class="block text-xs text-slate-400 mb-1 uppercase tracking-wide">Key</label>
                <input
                  v-model="demoKey"
                  class="glass-input w-full"
                  placeholder="Key"
                />
              </div>
              <div class="flex-1">
                <label class="block text-xs text-slate-400 mb-1 uppercase tracking-wide">
                  Value
                </label>
                <input
                  v-model="demoValue"
                  class="glass-input w-full"
                  placeholder="Value"
                />
              </div>
            </div>

            <div class="flex gap-2 flex-wrap">
              <button
                class="glass-btn primary"
                @click="handleSet"
              >
                Set Item (1 min exp)
              </button>
              <button
                class="glass-btn"
                @click="handleGet"
              >
                Get Item
              </button>
              <button
                class="glass-btn danger"
                @click="handleRemove"
              >
                Remove Item
              </button>
              <button
                class="glass-btn danger"
                @click="handleClear"
              >
                Clear All
              </button>
            </div>

            <div
              v-if="storedValue !== null"
              class="result-box"
            >
              <div class="text-xs text-slate-400 mb-1 uppercase">RETRIEVED VALUE</div>
              <div class="text-sky-400 font-mono break-all">{{ storedValue }}</div>
            </div>
          </div>
        </ShowcaseCard>

        <!-- Reactive Storage -->
        <ShowcaseCard
          title="響應式儲存"
          description="useStorageRef 自動同步"
        >
          <div class="flex flex-col gap-4">
            <p class="text-sm text-slate-400">
              修改下方資料會自動同步至 LocalStorage (Key:
              <code class="text-sky-300">reactive_demo</code>
              )
            </p>
            <div class="flex gap-4">
              <div>
                <label class="block text-xs text-slate-400 mb-1 uppercase tracking-wide">
                  Count
                </label>
                <input
                  v-model.number="reactiveData.count"
                  type="number"
                  class="glass-input w-24"
                />
              </div>
              <div class="flex-1">
                <label class="block text-xs text-slate-400 mb-1 uppercase tracking-wide">
                  Name
                </label>
                <input
                  v-model="reactiveData.name"
                  class="glass-input w-full"
                />
              </div>
            </div>
            <ShowcaseCodeBlock
              :code="JSON.stringify(reactiveData, null, 2)"
              language="json"
              label="Current Data Object"
            />
          </div>
        </ShowcaseCard>

        <!-- Storage Inspector -->
        <ShowcaseCard
          title="儲存空間檢視"
          description="Keys Inspector"
          full-width
        >
          <div class="flex flex-col gap-4">
            <div class="flex justify-between items-center">
              <span class="text-slate-300 font-semibold">All Stored Keys</span>
              <button
                class="glass-btn text-xs py-1 px-3"
                @click="refreshKeys"
              >
                Refresh List
              </button>
            </div>
            <div class="p-4 bg-slate-900/40 rounded-lg border border-slate-700/30 min-h-[100px]">
              <div
                v-if="allKeys.length === 0"
                class="text-slate-500 italic text-center py-4"
              >
                Storage is empty
              </div>
              <div
                v-else
                class="flex flex-wrap gap-2"
              >
                <span
                  v-for="key in allKeys"
                  :key="key"
                  class="px-3 py-1 rounded-full text-xs bg-slate-800 text-slate-300 border border-slate-700"
                >
                  {{ key }}
                </span>
              </div>
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.glass-input {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #f1f5f9;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.glass-input:focus {
  border-color: #38bdf8;
  background: rgba(15, 23, 42, 0.8);
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
}

.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #94a3b8;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  font-weight: 500;
}

.glass-btn:hover {
  background: rgba(56, 189, 248, 0.1);
  border-color: #38bdf8;
  color: #38bdf8;
}

.glass-btn.primary {
  background: rgba(56, 189, 248, 0.2);
  border-color: #38bdf8;
  color: #38bdf8;
}

.glass-btn.primary:hover {
  background: rgba(56, 189, 248, 0.3);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
}

.glass-btn.danger {
  color: #ef4444;
}

.glass-btn.danger:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: #ef4444;
  color: #ef4444;
}

.result-box {
  background: rgba(15, 23, 42, 0.4);
  border: 1px dashed rgba(148, 163, 184, 0.3);
  padding: 1rem;
  border-radius: 6px;
}
</style>
