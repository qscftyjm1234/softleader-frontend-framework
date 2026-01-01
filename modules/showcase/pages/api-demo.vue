<script setup lang="ts">
/**
 * API Demo - API 管理與 Repository 模式展示
 *
 * 展示如何使用 useRepository 進行 API 呼叫
 * 包含分頁、搜尋、載入狀態等功能
 */
import { ref } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const { user } = useRepository()

const page = ref(1)
const search = ref('')

// 響應式 API 呼叫
// 當 page 或 search 改變時，會自動重新發送請求
const { data, pending, error } = await user.getUsers({
  page,
  q: search,
  itemsPerPage: 5
})

definePageMeta({
  title: 'API Demo',
  icon: 'mdi-api',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="API Management Demo"
    description="展示如何使用 Repository 模式進行 API 呼叫,包含分頁、搜尋、載入狀態等功能"
  >
    <ShowcaseSection
      title="Repository Pattern Demo"
      icon="🎮"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="User Management"
          description="分頁與搜尋展示"
          full-width
        >
          <div class="flex flex-col gap-6">
            <!-- Controls -->
            <div class="flex flex-wrap gap-4 items-end justify-between">
              <div class="flex flex-col gap-2 flex-grow max-w-sm">
                <label class="text-xs text-slate-400 uppercase tracking-wide">Search</label>
                <input
                  v-model="search"
                  placeholder="Search users..."
                  class="glass-input w-full"
                />
              </div>

              <div class="flex items-center gap-2">
                <button
                  :disabled="page <= 1"
                  class="glass-btn px-4 py-2"
                  @click="page--"
                >
                  Prev
                </button>
                <span class="text-slate-200 font-mono px-2">Page {{ page }}</span>
                <button
                  class="glass-btn px-4 py-2"
                  @click="page++"
                >
                  Next
                </button>
              </div>
            </div>

            <!-- Loading State -->
            <div
              v-if="pending"
              class="flex justify-center items-center p-12 bg-slate-900/30 rounded-lg border border-slate-700/30 text-sky-400 gap-3"
            >
              <span class="animate-spin text-xl">⏳</span>
              Loading...
            </div>

            <!-- Error State -->
            <div
              v-else-if="error"
              class="flex justify-center items-center p-12 bg-red-900/10 rounded-lg border border-red-500/30 text-red-400 gap-3"
            >
              ❌ Error: {{ error.message }}
            </div>

            <!-- Data Table -->
            <div
              v-else
              class="border border-slate-700/30 rounded-lg overflow-hidden"
            >
              <table class="w-full border-collapse">
                <thead>
                  <tr>
                    <th
                      class="bg-slate-800/60 p-3 text-left text-slate-400 font-semibold text-sm border-b border-slate-700/30"
                    >
                      ID
                    </th>
                    <th
                      class="bg-slate-800/60 p-3 text-left text-slate-400 font-semibold text-sm border-b border-slate-700/30"
                    >
                      Name
                    </th>
                    <th
                      class="bg-slate-800/60 p-3 text-left text-slate-400 font-semibold text-sm border-b border-slate-700/30"
                    >
                      Email
                    </th>
                    <th
                      class="bg-slate-800/60 p-3 text-left text-slate-400 font-semibold text-sm border-b border-slate-700/30"
                    >
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in (data as any)?.items"
                    :key="item.id"
                    class="hover:bg-slate-700/10 transition-colors"
                  >
                    <td class="p-3 border-b border-slate-700/10 text-slate-200">{{ item.id }}</td>
                    <td class="p-3 border-b border-slate-700/10 text-slate-200">{{ item.name }}</td>
                    <td class="p-3 border-b border-slate-700/10 text-slate-400">
                      {{ item.email }}
                    </td>
                    <td class="p-3 border-b border-slate-700/10">
                      <span
                        class="px-3 py-1 rounded-full text-xs font-semibold"
                        :class="{
                          'bg-blue-900/30 text-blue-300 border border-blue-500/30':
                            item.role === 'Admin',
                          'bg-green-900/30 text-green-300 border border-green-500/30':
                            item.role === 'Editor',
                          'bg-slate-700/30 text-slate-300 border border-slate-500/30':
                            item.role === 'Viewer'
                        }"
                      >
                        {{ item.role }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                class="p-4 bg-slate-800/40 text-right text-sm text-slate-400 border-t border-slate-700/30"
              >
                Total:
                <span class="text-slate-200 font-semibold">{{ (data as any)?.total }}</span>
                users
              </div>
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="使用方式 (Usage)"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="Code Example"
          description="Repository Pattern Usage"
          full-width
        >
          <ShowcaseCodeBlock
            code="// 基本用法
const { user } = useRepository()

const page = ref(1)
const search = ref('')

// 響應式 API 呼叫 - 當 page 或 search 改變時自動重新請求
const { data, pending, error } = await user.getUsers({
  page,
  q: search,
  itemsPerPage: 5
})

// ===== useRepositoryHelpers 用法 =====

// 1. waitForData - 等待單一 API 載入完成（SSR 環境）
const { data: stats, pending: statsPending } = useRepository().dashboard.getStats()
await waitForData(statsPending)
console.log('資料已載入:', stats.value)

// 2. waitForAll - 等待多個 API 同時載入完成
const stats = useRepository().dashboard.getStats()
const activities = useRepository().dashboard.getActivities({ limit: 10 })
await waitForAll([stats.pending, activities.pending])
console.log('所有資料都已載入')

// 3. fetchData - 直接取得資料（適合一次性請求）
const activities = await fetchData('/api/dashboard/activities', { limit: 10 })
console.log('資料:', activities)"
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
}

.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #94a3b8;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.glass-btn:hover:not(:disabled) {
  background: rgba(56, 189, 248, 0.1);
  border-color: #38bdf8;
  color: #38bdf8;
}

.glass-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
