<script setup lang="ts">
import { ref, computed } from 'vue'
import DataPreview from '../components/DataPreview.vue'

const {
  formatDate,
  formatTime,
  formatDateTime,
  formatRelative,
  add,
  subtract,
  diff,
  isBefore,
  isAfter,
  isSameDay,
  isToday,
  isWeekend,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  today,
  yesterday,
  tomorrow,
  isValid,
  getDateRange,
  getTimezone,
  toISO,
  toTimestamp,
  DEFAULT_FORMATS
} = useDateTime()

// Demo state
const demoDate = ref(new Date())
const demoDate2 = ref(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) // 7 days ago
const demoFormat = ref('YYYY-MM-DD HH:mm:ss')
const demoAmount = ref(7)
const demoUnit = ref<'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'>('day')
const demoDateString = ref('2024-12-25')

// Computed examples
const formattedDate = computed(() => formatDate(demoDate.value, demoFormat.value))
const formattedTime = computed(() => formatTime(demoDate.value))
const formattedDateTime = computed(() => formatDateTime(demoDate.value))
const relativeTime = computed(() => formatRelative(demoDate2.value))

const addedDate = computed(() => add(demoDate.value, demoAmount.value, demoUnit.value))
const subtractedDate = computed(() => subtract(demoDate.value, demoAmount.value, demoUnit.value))
const dateDiff = computed(() => diff(demoDate.value, demoDate2.value, demoUnit.value))

const comparisonResults = computed(() => ({
  isBefore: isBefore(demoDate2.value, demoDate.value),
  isAfter: isAfter(demoDate.value, demoDate2.value),
  isSameDay: isSameDay(demoDate.value, demoDate2.value)
}))

const boundaryTimes = computed(() => ({
  startOfDay: formatDateTime(startOfDay(demoDate.value)),
  endOfDay: formatDateTime(endOfDay(demoDate.value)),
  startOfWeek: formatDateTime(startOfWeek(demoDate.value)),
  endOfWeek: formatDateTime(endOfWeek(demoDate.value)),
  startOfMonth: formatDateTime(startOfMonth(demoDate.value)),
  endOfMonth: formatDateTime(endOfMonth(demoDate.value))
}))

const shortcuts = computed(() => ({
  today: formatDate(today()),
  yesterday: formatDate(yesterday()),
  tomorrow: formatDate(tomorrow())
}))

const validationResult = computed(() => ({
  isValid: isValid(demoDateString.value),
  isToday: isToday(demoDate.value),
  isWeekend: isWeekend(demoDate.value)
}))

definePageMeta({
  title: '日期時間 (DateTime)',
  icon: 'mdi-calendar-clock'
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
        <h1 class="page-title">日期時間系統 (DateTime System)</h1>
      </div>
      <p class="page-desc">
        完整的日期時間處理模組，提供格式化、解析、計算與驗證功能。
        <br />
        核心特色：多種格式支援、相對時間、時區處理、豐富的計算方法。
      </p>
    </div>

    <!-- General Usage Section -->
    <section class="module-section">
      <h2 class="section-title">
        <span class="icon">📝</span>
        General Usage (一般使用範例)
      </h2>
      <div class="card-content">
        <p class="demo-desc">
          最常見的情境：格式化日期時間顯示。
          <br />
          使用
          <code>formatDate</code>
          、
          <code>formatTime</code>
          、
          <code>formatDateTime</code>
          方法快速格式化。
        </p>

        <div class="demo-grid">
          <div class="usage-block">
            <div class="block-header">Example Code</div>
            <div class="code-content">
              <pre><code>&lt;script setup&gt;
// 1. 引入 composable
const { formatDate, formatDateTime, formatRelative } = useDateTime()

// 2. 格式化日期
const date = new Date()
const formatted = formatDate(date, 'YYYY-MM-DD')
// => "2024-12-29"

// 3. 格式化日期時間
const dateTime = formatDateTime(date, 'YYYY/MM/DD HH:mm')
// => "2024/12/29 23:30"

// 4. 相對時間
const relative = formatRelative(date)
// => "剛剛" or "3 分鐘前"
&lt;/script&gt;</code></pre>
            </div>
          </div>

          <div class="output-block">
            <DataPreview
              title="預設格式"
              :data="DEFAULT_FORMATS"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Playground -->
    <section class="module-section mt-8">
      <h2 class="section-title">
        <span class="icon">🎮</span>
        Interactive Playground (互動式演示)
      </h2>
      <div class="card-content">
        <!-- Date Inputs -->
        <div class="control-panel">
          <div class="form-row">
            <label>測試日期 1:</label>
            <input
              v-model="demoDate"
              type="datetime-local"
              class="input-field"
            />
          </div>
          <div class="form-row">
            <label>測試日期 2:</label>
            <input
              v-model="demoDate2"
              type="datetime-local"
              class="input-field"
            />
          </div>
          <div class="form-row">
            <label>格式字串:</label>
            <input
              v-model="demoFormat"
              type="text"
              class="input-field"
              placeholder="YYYY-MM-DD HH:mm:ss"
            />
          </div>
        </div>

        <div class="method-demos">
          <!-- 1. Format Methods -->
          <div class="demo-card">
            <h3 class="demo-title">1. 格式化方法</h3>
            <p class="demo-desc">將日期轉換為指定格式的字串。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 格式化日期
formatDate(date, '{{ demoFormat }}')

// 格式化時間
formatTime(date, 'HH:mm:ss')

// 格式化日期時間
formatDateTime(date, '{{ demoFormat }}')

// 相對時間
formatRelative(date)</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Output Results"
                  :data="{
                    formatDate: formattedDate,
                    formatTime: formattedTime,
                    formatDateTime: formattedDateTime,
                    formatRelative: relativeTime
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 2. Calculation Methods -->
          <div class="demo-card">
            <h3 class="demo-title">2. 計算方法</h3>
            <p class="demo-desc">新增、減少時間或計算時間差。</p>

            <div class="control-row mb-4">
              <label>數量:</label>
              <input
                v-model.number="demoAmount"
                type="number"
                class="input-field"
                style="width: 100px"
              />
              <label>單位:</label>
              <select
                v-model="demoUnit"
                class="input-field"
                style="width: 120px"
              >
                <option value="year">年</option>
                <option value="month">月</option>
                <option value="week">週</option>
                <option value="day">天</option>
                <option value="hour">小時</option>
                <option value="minute">分鐘</option>
                <option value="second">秒</option>
              </select>
            </div>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 新增時間
add(date, {{ demoAmount }}, '{{ demoUnit }}')

// 減少時間
subtract(date, {{ demoAmount }}, '{{ demoUnit }}')

// 計算時間差
diff(date1, date2, '{{ demoUnit }}')</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Output Results"
                  :data="{
                    original: formatDateTime(demoDate),
                    added: formatDateTime(addedDate),
                    subtracted: formatDateTime(subtractedDate),
                    diff: `${dateDiff} ${demoUnit}`
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 3. Comparison Methods -->
          <div class="demo-card">
            <h3 class="demo-title">3. 比較方法</h3>
            <p class="demo-desc">比較兩個日期的先後關係。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 判斷是否在之前
isBefore(date1, date2)

// 判斷是否在之後
isAfter(date1, date2)

// 判斷是否同一天
isSameDay(date1, date2)</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Comparison Results"
                  :data="comparisonResults"
                />
              </div>
            </div>
          </div>

          <!-- 4. Boundary Times -->
          <div class="demo-card">
            <h3 class="demo-title">4. 邊界時間</h3>
            <p class="demo-desc">取得一天、一週、一月的開始或結束時間。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 一天的開始/結束
startOfDay(date)  // 00:00:00
endOfDay(date)    // 23:59:59

// 一週的開始/結束（週一到週日）
startOfWeek(date)
endOfWeek(date)

// 一月的開始/結束
startOfMonth(date)
endOfMonth(date)</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Boundary Times"
                  :data="boundaryTimes"
                />
              </div>
            </div>
          </div>

          <!-- 5. Shortcuts -->
          <div class="demo-card">
            <h3 class="demo-title">5. 快捷方法</h3>
            <p class="demo-desc">快速取得常用的日期。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 取得今天（00:00:00）
today()

// 取得昨天
yesterday()

// 取得明天
tomorrow()</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Shortcuts"
                  :data="shortcuts"
                />
              </div>
            </div>
          </div>

          <!-- 6. Validation -->
          <div class="demo-card">
            <h3 class="demo-title">6. 驗證方法</h3>
            <p class="demo-desc">驗證日期字串或判斷日期特性。</p>

            <div class="control-row mb-4">
              <label>測試字串:</label>
              <input
                v-model="demoDateString"
                type="text"
                class="input-field"
                placeholder="2024-12-25"
              />
            </div>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 驗證日期字串
isValid('{{ demoDateString }}')

// 判斷是否為今天
isToday(date)

// 判斷是否為週末
isWeekend(date)</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Validation Results"
                  :data="validationResult"
                />
              </div>
            </div>
          </div>

          <!-- 7. Utility Methods -->
          <div class="demo-card">
            <h3 class="demo-title">7. 工具方法</h3>
            <p class="demo-desc">其他實用的日期處理方法。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 取得日期範圍
getDateRange(startDate, endDate)
// => [Date, Date, Date, ...]

// 取得當前時區
getTimezone()
// => "Asia/Taipei"

// 轉換為 ISO 字串
toISO(date)
// => "2024-12-29T15:30:00.000Z"

// 轉換為時間戳
toTimestamp(date)
// => 1735488600000</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Utility Results"
                  :data="{
                    timezone: getTimezone(),
                    iso: toISO(demoDate),
                    timestamp: toTimestamp(demoDate),
                    dateRange: getDateRange(yesterday(), tomorrow()).map((d) => formatDate(d))
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Format Tokens Section -->
    <section class="module-section mt-8">
      <h2 class="section-title">
        <span class="icon">📋</span>
        Format Tokens (格式符號)
      </h2>
      <div class="card-content">
        <p class="demo-desc">
          可用的格式符號列表，用於
          <code>formatDate</code>
          、
          <code>formatTime</code>
          、
          <code>formatDateTime</code>
          方法。
        </p>

        <div class="tokens-grid">
          <div class="token-card">
            <h4>年份</h4>
            <ul>
              <li>
                <code>YYYY</code>
                - 四位數年份 (2024)
              </li>
              <li>
                <code>YY</code>
                - 兩位數年份 (24)
              </li>
            </ul>
          </div>

          <div class="token-card">
            <h4>月份</h4>
            <ul>
              <li>
                <code>MM</code>
                - 兩位數月份 (01-12)
              </li>
              <li>
                <code>M</code>
                - 月份 (1-12)
              </li>
            </ul>
          </div>

          <div class="token-card">
            <h4>日期</h4>
            <ul>
              <li>
                <code>DD</code>
                - 兩位數日期 (01-31)
              </li>
              <li>
                <code>D</code>
                - 日期 (1-31)
              </li>
            </ul>
          </div>

          <div class="token-card">
            <h4>小時</h4>
            <ul>
              <li>
                <code>HH</code>
                - 24 小時制 (00-23)
              </li>
              <li>
                <code>H</code>
                - 24 小時制 (0-23)
              </li>
              <li>
                <code>hh</code>
                - 12 小時制 (01-12)
              </li>
              <li>
                <code>h</code>
                - 12 小時制 (1-12)
              </li>
            </ul>
          </div>

          <div class="token-card">
            <h4>分鐘</h4>
            <ul>
              <li>
                <code>mm</code>
                - 兩位數分鐘 (00-59)
              </li>
              <li>
                <code>m</code>
                - 分鐘 (0-59)
              </li>
            </ul>
          </div>

          <div class="token-card">
            <h4>秒數</h4>
            <ul>
              <li>
                <code>ss</code>
                - 兩位數秒數 (00-59)
              </li>
              <li>
                <code>s</code>
                - 秒數 (0-59)
              </li>
              <li>
                <code>SSS</code>
                - 毫秒 (000-999)
              </li>
            </ul>
          </div>

          <div class="token-card">
            <h4>上下午</h4>
            <ul>
              <li>
                <code>A</code>
                - 大寫 (AM/PM)
              </li>
              <li>
                <code>a</code>
                - 小寫 (am/pm)
              </li>
            </ul>
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

.demo-desc {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.control-panel {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-row label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
  min-width: 100px;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.control-row label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
}

.input-field {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  flex: 1;
}

.method-demos {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.demo-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.75rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.demo-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.15rem 0;
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

.demo-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  margin-bottom: 0.15rem;
  font-weight: 600;
}

.code-content {
  background: #282c34;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  color: #e06c75;
  line-height: 1.25;
  max-height: 360px;
}

.code-content pre {
  margin: 0;
}

.code-content code {
  color: #abb2bf;
}

/* Tokens Grid */
.tokens-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.token-card {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 1rem;
  background: #fafafa;
}

.token-card h4 {
  margin: 0 0 0.75rem 0;
  color: #2c3e50;
  font-size: 0.95rem;
  font-weight: 600;
}

.token-card ul {
  margin: 0;
  padding-left: 1.25rem;
  list-style: none;
}

.token-card li {
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: #555;
}

.token-card code {
  background: #282c34;
  color: #61afef;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-8 {
  margin-top: 2rem;
}
</style>
