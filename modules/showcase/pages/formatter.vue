<script setup lang="ts">
import { ref } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const {
  formatNumber,
  formatCurrency,
  formatPercent,
  formatPhone,
  capitalize,
  capitalizeWords,
  uppercase,
  lowercase,
  truncate,
  mask,
  maskEmail,
  maskPhone,
  formatJson,
  formatFileSize
} = useFormatter()

// Demo data
const demoNumber = ref(1234567.89)
const demoPhone = ref('0912345678')
const demoEmail = ref('user@example.com')
const demoText = ref('hello world')
const demoLongText = ref('This is a very long text that needs to be truncated')
const demoJson = ref({ name: '測試', value: 123, nested: { key: 'value' } })

definePageMeta({
  title: '資料格式化 (Formatter)',
  icon: 'mdi-format-text',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="資料格式化系統"
    description="完整的資料格式化模組，支援數字、字串、電話號碼等格式化功能。"
  >
    <!-- 基礎用法 -->
    <ShowcaseSection title="基礎用法">
      <ShowcaseCard
        title="核心功能"
        description="格式化系統的核心特色"
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
  // 數字處理
  formatNumber,    // 數字格式化 (千分位)
  formatCurrency,  // 貨幣格式化
  formatPercent,   // 百分比格式化
  formatFileSize,  // 檔案大小格式化
  
  // 字串處理
  capitalize,      // 首字大寫
  uppercase,       // 全部大寫
  truncate,        // 文字截斷
  mask,            // 隱私遮罩
  formatPhone,     // 電話格式化
  formatJson       // JSON 格式化
} = useFormatter()"
            label="useFormatter() 提供的方法"
          />

          <p
            class="method-desc"
            style="margin-top: 1.5rem; margin-bottom: 1rem"
          >
            <strong>核心特色：</strong>
          </p>
          <ul class="benefit-list">
            <li>
              <strong>多樣化格式:</strong>
              支援數字、貨幣、百分比、電話等多種格式
            </li>
            <li>
              <strong>隱私保護:</strong>
              提供遮罩功能，保護敏感資料
            </li>
            <li>
              <strong>字串處理:</strong>
              包含大小寫轉換、截斷等實用工具
            </li>
            <li>
              <strong>檔案大小:</strong>
              自動轉換 Bytes 為可讀單位 (KB, MB)
            </li>
          </ul>
        </div>
        <template #footer>
          <ShowcaseCodeBlock
            code="const { formatCurrency } = useFormatter()

// 快速使用
formatCurrency(1234567) // 'NT$1,234,567'"
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
        <!-- Number Formatting -->
        <ShowcaseCard
          title="數字格式化"
          description="數值、貨幣與百分比處理"
        >
          <div class="demo-area">
            <div class="input-group mb-4">
              <label>Input Number</label>
              <input
                v-model.number="demoNumber"
                type="number"
                class="glass-input w-full"
              />
            </div>
            <ShowcaseCodeBlock
              :code="`formatNumber: ${formatNumber(demoNumber, 2)}
formatCurrency: ${formatCurrency(demoNumber, 'NT$', 0)}
formatPercent: ${formatPercent(demoNumber / 100, 2)}
formatFileSize: ${formatFileSize(demoNumber)}`"
              label="Results"
              :max-height="200"
            />
          </div>
        </ShowcaseCard>

        <!-- Phone Formatting -->
        <ShowcaseCard
          title="電話號碼格式化"
          description="自動格式化與遮罩"
        >
          <div class="demo-area">
            <div class="input-group mb-4">
              <label>Phone Number</label>
              <input
                v-model="demoPhone"
                type="text"
                class="glass-input w-full"
              />
            </div>
            <div class="result-text">
              <div class="flex justify-between mb-2">
                <span class="text-gray-400">Formatted:</span>
                <span class="text-sky-300 font-mono">{{ formatPhone(demoPhone) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Masked:</span>
                <span class="text-sky-300 font-mono">{{ maskPhone(demoPhone) }}</span>
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <!-- String Formatting -->
        <ShowcaseCard
          title="字串格式化"
          description="大小寫轉換與截斷"
        >
          <div class="demo-area">
            <div class="input-group mb-4">
              <label>Input Text</label>
              <input
                v-model="demoText"
                type="text"
                class="glass-input w-full"
              />
            </div>
            <ShowcaseCodeBlock
              :code="`Capitalize: ${capitalize(demoText)}
Words: ${capitalizeWords(demoText)}
UPPER: ${uppercase(demoText)}
lower: ${lowercase(demoText)}
Truncate: ${truncate(demoLongText, 20)}`"
              label="Transformed"
              :max-height="200"
            />
          </div>
        </ShowcaseCard>

        <!-- Masking -->
        <ShowcaseCard
          title="隱私遮罩"
          description="Email 與自訂遮罩"
        >
          <div class="demo-area">
            <div class="input-group mb-4">
              <label>Email Address</label>
              <input
                v-model="demoEmail"
                type="email"
                class="glass-input w-full"
              />
            </div>
            <div class="result-text">
              <div class="flex justify-between mb-2">
                <span class="text-gray-400">Original:</span>
                <span>{{ demoEmail }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-gray-400">Masked Email:</span>
                <span class="text-emerald-400 font-mono">{{ maskEmail(demoEmail) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Custom Mask:</span>
                <span class="text-emerald-400 font-mono">{{ mask(demoEmail, 2, 8, '*') }}</span>
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <!-- JSON Formatting -->
        <ShowcaseCard
          title="JSON 格式化"
          description="物件資料視覺化"
          full-width
        >
          <div class="demo-area">
            <ShowcaseCodeBlock
              :code="formatJson(demoJson)"
              language="json"
              label="Formatted Output"
            />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- API 參考 -->
    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="1. 數字格式化"
          description="數值呈現處理"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>方法：</strong>
              formatNumber, formatCurrency, formatPercent
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="// 千分位
formatNumber(1234567.89) // '1,234,567.89'

// 貨幣
formatCurrency(1234567, 'USD') // 'USD 1,234,567'

// 百分比
formatPercent(0.856) // '85.6%'"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="2. 字串處理"
          description="文字轉換工具"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>方法：</strong>
              capitalize, uppercase, lowercase, truncate
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="// 首字大寫
capitalize('hello') // 'Hello'

// 截斷文字
truncate('這是一段很長的文字', 5) // '這是一段...'"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="3. 隱私遮罩"
          description="敏感資料保護"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>方法：</strong>
              mask, maskEmail, maskPhone
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="// Email 遮罩
maskEmail('user@example.com') // 'u***@example.com'

// 電話遮罩
maskPhone('0912345678') // '0912***678'

// 自訂遮罩 (字串, start, end, 符號)
mask('12345678', 2, 6, '*') // '12****78'"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="4. 檔案大小"
          description="Bytes 轉換"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>方法：</strong>
              formatFileSize
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="formatFileSize(1024) // '1 KB'
formatFileSize(1024 * 1024 * 5) // '5 MB'"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.input-group label {
  display: block;
  color: #94a3b8;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.glass-input {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #f1f5f9;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  outline: none;
  font-size: 0.95rem;
  transition: border-color 0.2s;
}

.glass-input:focus {
  border-color: #38bdf8;
  background: rgba(15, 23, 42, 0.8);
}

.w-full {
  width: 100%;
}

.mb-2 {
  margin-bottom: 0.5rem;
}
.mb-4 {
  margin-bottom: 1rem;
}

.flex {
  display: flex;
}
.justify-between {
  justify-content: space-between;
}

.text-gray-400 {
  color: #94a3b8;
}
.text-sky-300 {
  color: #7dd3fc;
}
.text-emerald-400 {
  color: #34d399;
}
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
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
