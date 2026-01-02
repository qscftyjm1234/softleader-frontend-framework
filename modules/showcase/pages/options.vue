<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useOptions } from '~/composables/useOptions'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const options = useOptions()
// keys including static, functional (API), and computed options
const keys = ['gender', 'status', 'countries', 'townships', 'vocabularies']

// Interactive Playground State
const selectedKey = ref('gender')
const demoValue = ref<any>('MALE')
const demoExcludes = ref<any[]>(['other'])
const demoOnly = ref<any[]>(['MALE', 'FEMALE'])
const demoCity = ref('TPE') // For townships example

// Computed Results based on selectedKey
const currentOptions = computed(() => {
  if (selectedKey.value === 'townships') {
    return options.townships(demoCity.value)
  }
  return options[selectedKey.value]
})

// 1. Array usage (v-for)
const resultArray = computed(() => currentOptions.value)

// 2. .isLoading
const resultIsLoading = computed(() => currentOptions.value.isLoading)

// 3. .isLoaded
const resultIsLoaded = computed(() => currentOptions.value.isLoaded)

// 4. .withAll
const resultWithAll = computed(() => currentOptions.value.withAll)

// 5. .other
const resultOther = computed(() => currentOptions.value.other)

// 6. .label(val)
const resultLabel = computed(() => currentOptions.value.label(demoValue.value))

// 7. .findByValue(val)
const resultFindByValue = computed(() => currentOptions.value.findByValue(demoValue.value))

// 8. .exclude(vals)
const resultExclude = computed(() => currentOptions.value.exclude(demoExcludes.value))

// 9. .only(vals)
const resultOnly = computed(() => currentOptions.value.only(demoOnly.value))

// Actions
const handleReload = async () => {
  await currentOptions.value.reload()
}

// --- Smart Defaults & Dynamic Snippets ---

// 自動更新測試數值：當選項切換且資料載入後，自動選取第一筆資料
watch(
  () => currentOptions.value,
  (newOpts) => {
    // 簡單判斷：若有資料且目前 demoValue 不在其中，則重設為第一筆
    if (newOpts && newOpts.length > 0) {
      const firstVal = newOpts[0].value
      const currentValExists = newOpts.some((o) => o.value === demoValue.value)
      if (!currentValExists) {
        demoValue.value = firstVal
        // 同步更新陣列類型的測試值
        demoExcludes.value = [firstVal]
        demoOnly.value = [firstVal]
      }
    }
  },
  { deep: true, immediate: true }
)

// 動態產生程式碼前綴，例如: options.status 或 options.townships('TPE')
const usageCodePrefix = computed(() => {
  if (selectedKey.value === 'townships') {
    return `options.townships('${demoCity.value}')`
  }
  return `options.${selectedKey.value}`
})

definePageMeta({
  title: '選項系統 (Options)',
  icon: 'mdi-format-list-bulleted',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="選項系統 (Options System)"
    description="集中管理的選項資料庫，提供一致的選項定義與輔助方法。核心特色包含 Proxy 代理、自動快取、統一擴充方法。"
  >
    <!-- API Examples Section -->
    <ShowcaseSection
      title="API Examples (非同步載入範例)"
      icon="🌐"
    >
      <div class="text-slate-400 mb-4 leading-relaxed">
        以下選項來自模擬 API，展示非同步載入與
        <code class="bg-slate-800/50 px-1.5 py-0.5 rounded text-sky-300 font-mono text-sm">
          isLoading
        </code>
        狀態。
      </div>

      <div class="component-grid">
        <!-- 1. Countries API -->
        <ShowcaseCard
          title="Countries (國家列表)"
          description="無參數的 async API 範例"
        >
          <div
            class="bg-slate-900/50 border border-slate-700/30 rounded p-2 mb-3 inline-flex items-center text-sm"
          >
            <span class="text-slate-400 mr-2">Loading:</span>
            <strong :class="options.countries.isLoading ? 'text-amber-400' : 'text-emerald-400'">
              {{ options.countries.isLoading }}
            </strong>
          </div>
          <ShowcaseCodeBlock
            :code="JSON.stringify(options.countries, null, 2)"
            language="json"
            label="Output Result"
          />
          <template #footer>
            <ShowcaseCodeBlock
              code="// 從 API 取得國家列表
const countries = options.countries

// 檢查載入狀態
const isLoading = countries.isLoading"
              label="Usage Code"
            />
          </template>
        </ShowcaseCard>

        <!-- 2. Currencies API -->
        <ShowcaseCard
          title="Currencies (幣別列表)"
          description="無參數的 async API 範例"
        >
          <div
            class="bg-slate-900/50 border border-slate-700/30 rounded p-2 mb-3 inline-flex items-center text-sm"
          >
            <span class="text-slate-400 mr-2">Loading:</span>
            <strong :class="options.currencies.isLoading ? 'text-amber-400' : 'text-emerald-400'">
              {{ options.currencies.isLoading }}
            </strong>
          </div>
          <ShowcaseCodeBlock
            :code="JSON.stringify(options.currencies, null, 2)"
            language="json"
            label="Output Result"
          />
          <template #footer>
            <ShowcaseCodeBlock
              code="// 從 API 取得幣別列表
const currencies = options.currencies

// 檢查載入狀態
const isLoading = currencies.isLoading"
              label="Usage Code"
            />
          </template>
        </ShowcaseCard>

        <!-- 3. Townships API (with parameter) -->
        <ShowcaseCard
          title="Townships (鄉鎮區列表)"
          description="帶參數的 async API - townships(cityId)"
        >
          <div class="flex items-center gap-2 mb-4">
            <label class="font-bold text-slate-300">City:</label>
            <select
              v-model="demoCity"
              class="glass-input"
            >
              <option value="TPE">TPE (台北)</option>
              <option value="KHH">KHH (高雄)</option>
            </select>
          </div>
          <div
            class="bg-slate-900/50 border border-slate-700/30 rounded p-2 mb-3 inline-flex items-center text-sm"
          >
            <span class="text-slate-400 mr-2">Loading:</span>
            <strong
              :class="options.townships(demoCity).isLoading ? 'text-amber-400' : 'text-emerald-400'"
            >
              {{ options.townships(demoCity).isLoading }}
            </strong>
          </div>
          <ShowcaseCodeBlock
            :code="JSON.stringify(options.townships(demoCity), null, 2)"
            language="json"
            label="Output Result"
          />
          <template #footer>
            <ShowcaseCodeBlock
              :code="`// 帶參數呼叫 API
const townships = options.townships('${demoCity}')

// 檢查載入狀態
const isLoading = townships.isLoading`"
              label="Usage Code"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 1. 一般使用範例 (General Usage) -->
    <ShowcaseSection
      title="General Usage (一般使用範例)"
      icon="📝"
    >
      <div class="text-slate-400 mb-4 leading-relaxed">
        最常見的情境：將選項綁定到 Select 選單。 由於
        <code class="bg-slate-800/50 px-1.5 py-0.5 rounded text-sky-300 font-mono text-sm">
          options.xxx
        </code>
        本身就是陣列，可以直接使用
        <code class="bg-slate-800/50 px-1.5 py-0.5 rounded text-sky-300 font-mono text-sm">
          v-for
        </code>
        。
      </div>

      <div class="component-grid">
        <ShowcaseCard
          title="Basic Select Integration"
          description="選項綁定範例"
          full-width
        >
          <div class="flex gap-4 flex-col lg:flex-row">
            <div class="flex-1">
              <ShowcaseCodeBlock
                code='&lt;script setup&gt;
// 1. 引入 composable
const options = useOptions()
const form = reactive({ status: &apos;ACTIVE&apos; })
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- 2. 直接在 v-for 使用 --&gt;
  &lt;select v-model="form.status"&gt;
    &lt;option
      v-for="item in options.status"
      :key="item.value"
      :value="item.value"
    &gt;
      {{ item.label }}
    &lt;/option&gt;
  &lt;/select&gt;
&lt;/template&gt;'
                label="Implementation"
              />
            </div>
            <div class="flex-1">
              <ShowcaseCodeBlock
                :code="JSON.stringify(options.status, null, 2)"
                language="json"
                label="Output Result (options.status)"
              />
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 2. 全功能演示 -->
    <ShowcaseSection
      title="Interactive Playground (全功能演示)"
      icon="🎮"
    >
      <ShowcaseCard
        title="功能測試區"
        description="測試 Options 系統的各項特性"
        full-width
      >
        <!-- A. 選擇操作對象 -->
        <div class="bg-slate-800/40 p-6 rounded-xl border border-slate-700/10 mb-6">
          <div class="flex flex-col gap-2">
            <label class="text-slate-300 font-medium">Select Option Set:</label>
            <select
              v-model="selectedKey"
              class="glass-input w-full"
            >
              <option
                v-for="k in keys"
                :key="k"
                :value="k"
              >
                {{ k }}
              </option>
            </select>
          </div>

          <!-- Special input for townships -->
          <div
            v-if="selectedKey === 'townships'"
            class="flex flex-col gap-2 mt-4"
          >
            <label class="text-slate-300 font-medium">City Argument (e.g. TPE, KHH):</label>
            <select
              v-model="demoCity"
              class="glass-input w-full"
            >
              <option value="TPE">TPE (台北)</option>
              <option value="KHH">KHH (高雄)</option>
            </select>
          </div>
        </div>

        <div class="component-grid">
          <!-- 1. Array Property -->
          <ShowcaseCard
            title="1. Array Usage"
            description="直接存取陣列內容"
          >
            <ShowcaseCodeBlock
              :code="JSON.stringify(resultArray, null, 2)"
              language="json"
              label="Output Result"
            />
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// 像普通陣列一樣使用
const list = ${usageCodePrefix}

// v-for usage
<li v-for=&quot;item in list&quot; :key=&quot;item.value&quot;>
  {{ item.label }}
</li>`"
                label="Usage Code"
              />
            </template>
          </ShowcaseCard>

          <!-- 2. isLoading -->
          <ShowcaseCard
            title="2. .isLoading (Boolean)"
            description="檢查資料是否正在載入中"
          >
            <div class="font-mono text-lg p-2 bg-slate-900/50 rounded inline-block text-sky-400">
              {{ resultIsLoading }}
            </div>
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// API 載入狀態
const loading = ${usageCodePrefix}.isLoading`"
                label="Usage Code"
              />
            </template>
          </ShowcaseCard>

          <!-- 3. isLoaded -->
          <ShowcaseCard
            title="3. .isLoaded (Boolean)"
            description="檢查資料是否已經載入完成"
          >
            <div class="font-mono text-lg p-2 bg-slate-900/50 rounded inline-block text-sky-400">
              {{ resultIsLoaded }}
            </div>
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// API 載入完成狀態
const loaded = ${usageCodePrefix}.isLoaded`"
                label="Usage Code"
              />
            </template>
          </ShowcaseCard>

          <!-- 4. withAll -->
          <ShowcaseCard
            title="4. .withAll (Array)"
            description="取得包含「全部」選項的新陣列"
          >
            <ShowcaseCodeBlock
              :code="JSON.stringify(resultWithAll, null, 2)"
              language="json"
              label="Output Result"
            />
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// 自動加上 'All' 選項
const allList = ${usageCodePrefix}.withAll`"
                label="Usage Code"
              />
            </template>
          </ShowcaseCard>

          <!-- 5. other -->
          <ShowcaseCard
            title="5. .other (Array)"
            description="取得包含「其他」選項的新陣列"
          >
            <ShowcaseCodeBlock
              :code="JSON.stringify(resultOther, null, 2)"
              language="json"
              label="Output Result"
            />
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// 自動加上 'Other' 選項
const otherList = ${usageCodePrefix}.other`"
                label="Usage Code"
              />
            </template>
          </ShowcaseCard>

          <!-- 6. label(val) -->
          <ShowcaseCard
            title="6. .label(value) -> String"
            description="輸入 value 取得對應的 label"
          >
            <div class="mb-4">
              <label class="text-slate-300 mr-2">Test Value:</label>
              <input
                v-model="demoValue"
                class="glass-input"
                placeholder="Testing Value..."
              />
            </div>
            <div class="font-mono text-lg p-2 bg-slate-900/50 rounded inline-block text-sky-400">
              "{{ resultLabel }}"
            </div>
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// 轉換顯示文字
const label = ${usageCodePrefix}.label('${demoValue}')`"
                label="Usage Code"
              />
            </template>
          </ShowcaseCard>

          <!-- 7. findByValue(val) -->
          <ShowcaseCard
            title="7. .findByValue(value) -> Item"
            description="輸入 value 取得完整的選項物件"
          >
            <div class="mb-4">
              <label class="text-slate-300 mr-2">Test Value:</label>
              <input
                v-model="demoValue"
                class="glass-input"
                placeholder="Testing Value..."
              />
            </div>
            <ShowcaseCodeBlock
              :code="JSON.stringify(resultFindByValue, null, 2)"
              language="json"
              label="Output Result"
            />
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// 尋找完整物件
const item = ${usageCodePrefix}.findByValue('${demoValue}')`"
                label="Usage Code"
              />
            </template>
          </ShowcaseCard>

          <!-- 8. exclude(vals) -->
          <ShowcaseCard
            title="8. .exclude([values]) -> Array"
            description="排除指定的 values"
          >
            <ShowcaseCodeBlock
              :code="JSON.stringify(resultExclude, null, 2)"
              language="json"
              label="Output Result"
            />
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// 排除特定選項
const filtered = ${usageCodePrefix}.exclude(${JSON.stringify(demoExcludes)})`"
                label="Usage Code"
              />
            </template>
          </ShowcaseCard>

          <!-- 9. only(vals) -->
          <ShowcaseCard
            title="9. .only([values]) -> Array"
            description="只保留指定的 values"
          >
            <ShowcaseCodeBlock
              :code="JSON.stringify(resultOnly, null, 2)"
              language="json"
              label="Output Result"
            />
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// 只保留特定選項
const filtered = ${usageCodePrefix}.only(${JSON.stringify(demoOnly)})`"
                label="Usage Code"
              />
            </template>
          </ShowcaseCard>

          <!-- 10. reload() -->
          <ShowcaseCard
            title="10. .reload() -> Promise"
            description="強制重新載入 API 資料 (Bypass Cache)"
          >
            <div class="mb-4">
              <button
                class="glass-btn primary"
                @click="handleReload"
              >
                Run .reload()
              </button>
            </div>
            <div class="p-4 bg-slate-800 rounded font-mono text-sm text-slate-200">
              Is Loading: {{ resultIsLoading }}
              <br />
              Last Loaded: {{ new Date().toLocaleTimeString() }}
            </div>
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// 強制刷新資料
await ${usageCodePrefix}.reload()`"
                label="Usage Code"
              />
            </template>
          </ShowcaseCard>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.glass-input {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #f1f5f9;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  outline: none;
  font-size: 0.9rem;
  min-width: 200px;
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
