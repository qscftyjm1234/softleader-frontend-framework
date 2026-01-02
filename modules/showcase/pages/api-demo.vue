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
    title="API 管理 (API Management)"
    description="整合 Repository 模式的 API 管理系統，提供統一的介面與型別安全。核心特色：Repository 模式、自動化請求、型別安全、輔助函式。"
  >
    <!-- 基礎用法 -->
    <ShowcaseSection title="基礎用法">
      <ShowcaseCard
        title="核心功能"
        description="Repository 模式與 API 管理"
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
            code="const { user, auth, dashboard } = useRepository()

// 1. 基本 API 呼叫
const { data } = await user.getProfile()

// 2. 帶參數與響應式更新
const page = ref(1)
const { data: users, pending } = await user.getUsers({ 
  page, // 自動監聽 page 變化重新請求
  limit: 10 
})

// 3. 錯誤處理
if (error.value) {
  console.error(error.value.message)
}"
            label="useRepository() 功能總覽"
          />

          <p
            class="method-desc"
            style="margin-top: 1.5rem; margin-bottom: 1rem"
          >
            <strong>核心特色：</strong>
          </p>
          <ul class="benefit-list">
            <li>
              <strong>Repository 模式:</strong>
              集中管理 API 接口，提升代碼可維護性與重用性
            </li>
            <li>
              <strong>自動化狀態:</strong>
              自動處理 Pending、Error、Data 狀態 (基於 useFetch)
            </li>
            <li>
              <strong>型別安全:</strong>
              完整的 TypeScript 支援，確保 API 參數與回傳型別正確
            </li>
            <li>
              <strong>輔助工具:</strong>
              提供 waitForData, waitForAll 等工具簡化 SSR 資料等待
            </li>
          </ul>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- API 參考 -->
    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="1. useRepository"
          description="API 模組存取入口"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>useRepository()</strong>
              <br />
              回傳包含所有 API 模組 (user, auth, etc.) 的物件。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { user } = useRepository()
await user.login(credentials)"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="2. Helper Methods"
          description="非同步資料輔助函式"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>waitForData(pendingRef)</strong>
              <br />
              等待單一 API 請求完成。
            </p>
            <p class="method-desc mt-2">
              <strong>waitForAll([pendingRefs])</strong>
              <br />
              等待多個 API 請求同時完成。
            </p>
            <p class="method-desc mt-2">
              <strong>fetchData(url, options)</strong>
              <br />
              直接發起一次性 API 請求。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { pending } = api.call()
await waitForData(pending)"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 互動測試 -->
    <ShowcaseSection
      title="互動測試 (Demo)"
      icon="🎮"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="User Management"
          description="分頁與搜尋展示"
          full-width
        >
          <div class="demo-area">
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
                      <td class="p-3 border-b border-slate-700/10 text-slate-200">
                        {{ item.name }}
                      </td>
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
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
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
