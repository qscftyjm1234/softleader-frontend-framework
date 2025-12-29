<script setup lang="ts">
import { ref, computed } from 'vue'
import { useOptions } from '~/composables/useOptions'
import DataPreview from '../components/DataPreview.vue'

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
  icon: 'mdi-format-list-bulleted'
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
        <h1 class="page-title">選項系統 (Options System)</h1>
      </div>
      <p class="page-desc">
        集中管理的選項資料庫，提供一致的選項定義與輔助方法。
        <br />
        核心特色：Proxy 代理、自動快取、統一擴充方法。
      </p>
    </div>

    <!-- API Examples Section -->
    <section class="module-section">
      <h2 class="section-title">
        <span class="icon">🌐</span>
        API Examples (非同步載入範例)
      </h2>
      <div class="card-content">
        <p class="demo-desc">
          以下選項來自模擬 API，展示非同步載入與
          <code>isLoading</code>
          狀態。
        </p>

        <div class="method-demos">
          <!-- 1. Countries API -->
          <div class="demo-card">
            <h3 class="demo-title">Countries (國家列表)</h3>
            <p class="demo-desc">無參數的 async API 範例</p>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 從 API 取得國家列表
const countries = options.countries

// 檢查載入狀態
const isLoading = countries.isLoading</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <div class="loading-indicator">
                  Loading:
                  <strong>{{ options.countries.isLoading }}</strong>
                </div>
                <DataPreview
                  title="Output Result"
                  :data="options.countries"
                />
              </div>
            </div>
          </div>

          <!-- 2. Currencies API -->
          <div class="demo-card">
            <h3 class="demo-title">Currencies (幣別列表)</h3>
            <p class="demo-desc">無參數的 async API 範例</p>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 從 API 取得幣別列表
const currencies = options.currencies

// 檢查載入狀態
const isLoading = currencies.isLoading</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <div class="loading-indicator">
                  Loading:
                  <strong>{{ options.currencies.isLoading }}</strong>
                </div>
                <DataPreview
                  title="Output Result"
                  :data="options.currencies"
                />
              </div>
            </div>
          </div>

          <!-- 3. Townships API (with parameter) -->
          <div class="demo-card">
            <h3 class="demo-title">Townships (鄉鎮區列表)</h3>
            <p class="demo-desc">
              帶參數的 async API -
              <code>townships(cityId)</code>
            </p>

            <div class="control-row mb-4">
              <label class="font-bold mr-2">City:</label>
              <select
                v-model="demoCity"
                class="select-input"
                style="min-width: 150px"
              >
                <option value="TPE">TPE (台北)</option>
                <option value="KHH">KHH (高雄)</option>
              </select>
            </div>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 帶參數呼叫 API
const townships = options.townships('{{ demoCity }}')

// 檢查載入狀態
const isLoading = townships.isLoading</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <div class="loading-indicator">
                  Loading:
                  <strong>{{ options.townships(demoCity).isLoading }}</strong>
                </div>
                <DataPreview
                  title="Output Result"
                  :data="options.townships(demoCity)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 1. 一般使用範例 (General Usage) -->
    <section class="module-section">
      <h2 class="section-title">
        <span class="icon">📝</span>
        General Usage (一般使用範例)
      </h2>
      <div class="card-content">
        <p class="demo-desc">
          最常見的情境：將選項綁定到 Select 選單。
          <br />
          由於
          <code>options.xxx</code>
          本身就是陣列，可以直接使用
          <code>v-for</code>
          。
        </p>

        <div class="demo-grid">
          <div class="usage-block">
            <div class="block-header">Example Code</div>
            <div class="code-content">
              <pre><code>&lt;script setup&gt;
// 1. 引入 composable
const options = useOptions()
const form = reactive({ status: 'ACTIVE' })
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- 2. 直接在 v-for 使用 --&gt;
  &lt;select v-model="form.status"&gt;
    &lt;option
      v-for="item in options.status"
      :key="item.value"
      :value="item.value"
    &gt;
      <span v-pre>{{ item.label }}</span>
    &lt;/option&gt;
  &lt;/select&gt;
&lt;/template&gt;</code></pre>
            </div>
          </div>

          <div class="output-block">
            <DataPreview
              title="Output Result"
              :data="options.status"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 2. 全功能演示 -->
    <section class="module-section mt-8">
      <h2 class="section-title">
        <span class="icon">🎮</span>
        Interactive Playground (全功能演示)
      </h2>
      <div class="card-content">
        <!-- A. 選擇操作對象 -->
        <div class="control-panel">
          <div class="form-row">
            <label>Select Option Set:</label>
            <select
              v-model="selectedKey"
              class="select-input"
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
            class="form-row"
          >
            <label>City Argument (e.g. TPE, KHH):</label>
            <select
              v-model="demoCity"
              class="select-input"
            >
              <option value="TPE">TPE (台北)</option>
              <option value="KHH">KHH (高雄)</option>
            </select>
          </div>
        </div>

        <div class="method-demos">
          <!-- 1. Array Property -->
          <div class="demo-card">
            <h3 class="demo-title">1. Array Usage</h3>
            <p class="demo-desc">直接存取陣列內容。</p>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 像普通陣列一樣使用
const list = {{ usageCodePrefix }}

// v-for usage
&lt;li v-for="item in list" :key="item.value"&gt;
  <span v-pre>{{ item.label }}</span>
&lt;/li&gt;</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <DataPreview
                  title="Output Result"
                  :data="resultArray"
                />
              </div>
            </div>
          </div>
          <!-- 2. isLoading -->
          <div class="demo-card">
            <h3 class="demo-title">2. .isLoading (Boolean)</h3>
            <p class="demo-desc">檢查資料是否正在載入中。</p>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// API 載入狀態（以 townships 為例）
const townships = options.townships('TPE')
const loading = townships.isLoading</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <DataPreview
                  title="Output Result"
                  :data="resultIsLoading"
                />
              </div>
            </div>
          </div>

          <!-- 3. isLoaded -->
          <div class="demo-card">
            <h3 class="demo-title">3. .isLoaded (Boolean)</h3>
            <p class="demo-desc">檢查資料是否已經載入完成。</p>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// API 載入完成狀態（以 townships 為例）
const townships = options.townships('TPE')
const loaded = townships.isLoaded</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <DataPreview
                  title="Output Result"
                  :data="resultIsLoaded"
                />
              </div>
            </div>
          </div>

          <!-- 4. withAll -->
          <div class="demo-card">
            <h3 class="demo-title">4. .withAll (Array)</h3>
            <p class="demo-desc">取得包含「全部」選項的新陣列。</p>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 自動加上 'All' 選項
const allList = {{ usageCodePrefix }}.withAll</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <DataPreview
                  title="Output Result"
                  :data="resultWithAll"
                />
              </div>
            </div>
          </div>

          <!-- 5. other -->
          <div class="demo-card">
            <h3 class="demo-title">5. .other (Array)</h3>
            <p class="demo-desc">取得包含「其他」選項的新陣列。</p>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 自動加上 'Other' 選項
const otherList = {{ usageCodePrefix }}.other</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <DataPreview
                  title="Output Result"
                  :data="resultOther"
                />
              </div>
            </div>
          </div>

          <!-- 6. label(val) -->
          <div class="demo-card">
            <h3 class="demo-title">6. .label(value) -> String</h3>
            <p class="demo-desc">輸入 value 取得對應的 label。</p>

            <div class="control-row mb-4">
              <label class="font-bold mr-2">Test Value:</label>
              <input
                v-model="demoValue"
                class="text-input"
                placeholder="Testing Value..."
              />
            </div>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 轉換顯示文字
const label = {{ usageCodePrefix }}.label('{{ demoValue }}')</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <DataPreview
                  title="Output Result"
                  :data="resultLabel"
                />
              </div>
            </div>
          </div>

          <!-- 7. findByValue(val) -->
          <div class="demo-card">
            <h3 class="demo-title">7. .findByValue(value) -> Item</h3>
            <p class="demo-desc">輸入 value 取得完整的選項物件。</p>

            <div class="control-row mb-4">
              <label class="font-bold mr-2">Test Value:</label>
              <input
                v-model="demoValue"
                class="text-input"
                placeholder="Testing Value..."
              />
            </div>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 查找完整物件
const item = {{ usageCodePrefix }}.findByValue('{{ demoValue }}')</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <DataPreview
                  title="Output Result"
                  :data="resultFindByValue"
                />
              </div>
            </div>
          </div>

          <!-- 8. exclude(vals) -->
          <div class="demo-card">
            <h3 class="demo-title">8. .exclude([values]) -> Array</h3>
            <p class="demo-desc">排除指定的 values。</p>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 排除特定選項
const filtered = {{ usageCodePrefix }}.exclude({{ JSON.stringify(demoExcludes) }})</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <DataPreview
                  title="Output Result"
                  :data="resultExclude"
                />
              </div>
            </div>
          </div>

          <!-- 9. only(vals) -->
          <div class="demo-card">
            <h3 class="demo-title">9. .only([values]) -> Array</h3>
            <p class="demo-desc">只保留指定的 values。</p>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 只保留特定選項
const filtered = {{ usageCodePrefix }}.only({{ JSON.stringify(demoOnly) }})</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <DataPreview
                  title="Output Result"
                  :data="resultOnly"
                />
              </div>
            </div>
          </div>

          <!-- 10. reload() -->
          <div class="demo-card">
            <h3 class="demo-title">10. .reload() -> Promise</h3>
            <p class="demo-desc">強制重新載入 API 資料 (Bypass Cache)。</p>

            <div class="control-row mb-4">
              <button
                class="action-btn"
                @click="handleReload"
              >
                Run .reload()
              </button>
            </div>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 強制刷新資料
await {{ usageCodePrefix }}.reload()</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <div class="result-box">
                  Is Loading: {{ resultIsLoading }}
                  <br />
                  Last Loaded: {{ new Date().toLocaleTimeString() }}
                </div>
              </div>
            </div>
          </div>
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

.back-link:hover {
  background: #e0e0e0;
}

.page-title {
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
}

.page-desc {
  color: #666;
  margin-left: 0.5rem;
  line-height: 1.5;
}

.module-section {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
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

.control-panel {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.select-input,
.text-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-width: 200px;
}

.method-demos {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.demo-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.75rem; /* Ultra compact padding */
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.demo-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.15rem 0; /* Minimal margin */
  color: #2c3e50;
  display: flex;
  align-items: center;
}

.demo-title::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 1.1em;
  background: #3498db;
  margin-right: 0.5rem;
  border-radius: 2px;
}

.demo-desc {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0; /* Reduced margin */
}

.demo-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Minimal gap */
}

.usage-block,
.output-block {
  display: flex;
  flex-direction: column;
}

.block-header {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #888;
  margin-bottom: 0.15rem; /* Minimal margin */
  font-weight: 600;
}

.code-content {
  background: #282c34;
  border-radius: 4px;
  padding: 0.25rem 0.5rem; /* Ultra ultra compact padding */
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  color: #e06c75;
  line-height: 1.25;
  max-height: 360px; /* Tighter line height */
}

.code-content pre {
  margin: 0;
}

.code-content code {
  color: #abb2bf;
}

.control-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.mr-2 {
  margin-right: 0.5rem;
}
.mb-4 {
  margin-bottom: 0.5rem;
}
.font-bold {
  font-weight: 600;
}

.result-box {
  background: #282c34;
  color: #abb2bf;
  padding: 0.75rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
  min-height: 2.5rem;
  white-space: pre-wrap;
  word-break: break-all;
}

.action-btn {
  background: #0d6efd;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.action-btn:hover {
  background: #0b5ed7;
}

.action-btn:active {
  transform: translateY(1px);
}

/* Loading Indicator for API Examples */
.loading-indicator {
  padding: 0.5rem;
  background: #f0f9ff;
  border-left: 3px solid #3b82f6;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: #1e40af;
}

.loading-indicator strong {
  color: #1e3a8a;
  font-weight: 600;
}
</style>
