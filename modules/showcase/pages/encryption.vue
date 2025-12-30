<script setup lang="ts">
import { ref, computed } from 'vue'
import DataPreview from '../components/DataPreview.vue'

const { base64Encode, base64Decode, aesEncrypt, aesDecrypt, md5Hash, sha256Hash } = useEncryption()

// Demo state
const plainText = ref('Hello, World! 你好世界！')
const base64Result = ref('')
const decodedResult = ref('')
const aesKey = ref('my-secret-key-123')
const aesEncrypted = ref('')
const aesDecrypted = ref('')
const hashText = ref('password123')
const md5Result = ref('')
const sha256Result = ref('')

// Computed examples
const base64Example = computed(() => {
  if (!plainText.value) return ''
  return base64Encode(plainText.value)
})

const handleBase64Encode = () => {
  base64Result.value = base64Encode(plainText.value)
  decodedResult.value = '' // 清空解碼結果
}

const handleBase64Decode = () => {
  if (base64Result.value) {
    decodedResult.value = base64Decode(base64Result.value)
  }
}

const handleAesEncrypt = () => {
  aesEncrypted.value = aesEncrypt(plainText.value, aesKey.value)
  aesDecrypted.value = ''
}

const handleAesDecrypt = () => {
  if (aesEncrypted.value) {
    aesDecrypted.value = aesDecrypt(aesEncrypted.value, aesKey.value)
  }
}

const handleMd5Hash = async () => {
  md5Result.value = await md5Hash(hashText.value)
}

const handleSha256Hash = async () => {
  sha256Result.value = await sha256Hash(hashText.value)
}

const handleHashBoth = async () => {
  await Promise.all([handleMd5Hash(), handleSha256Hash()])
}

definePageMeta({
  title: '加密工具 (Encryption)',
  icon: 'mdi-lock'
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
        <h1 class="page-title">加密工具系統 (Encryption System)</h1>
      </div>
      <p class="page-desc">
        完整的加密工具模組，提供 Base64 編碼/解碼、AES 加密/解密和 MD5/SHA256 雜湊功能。
        <br />
        核心特色：多種加密方式、UTF-8 支援、非同步雜湊、簡單易用。
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
          最常見的情境：Base64 編碼資料傳輸、密碼雜湊儲存。
          <br />
          使用
          <code>base64Encode</code>
          、
          <code>sha256Hash</code>
          方法快速處理。
        </p>

        <div class="demo-grid">
          <div class="usage-block">
            <div class="block-header">Example Code</div>
            <div class="code-content">
              <pre><code>&lt;script setup&gt;
// 1. 引入 composable
const { base64Encode, sha256Hash, aesEncrypt } = useEncryption()

// 2. Base64 編碼
const encoded = base64Encode('Hello, World!')
// => "SGVsbG8sIFdvcmxkIQ=="

// 3. SHA256 雜湊（密碼儲存）
const hashed = await sha256Hash('password123')
// => "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"

// 4. AES 加密（敏感資料）
const encrypted = aesEncrypt('secret data', 'my-key')
// => "base64-encoded-encrypted-string"
&lt;/script&gt;</code></pre>
            </div>
          </div>

          <div class="output-block">
            <DataPreview
              title="範例輸出"
              :data="{
                plainText: plainText,
                base64Encoded: base64Example
              }"
            />
          </div>
        </div>

        <div class="warning-box">
          <strong>⚠️ 重要提示：</strong>
          <ul>
            <li>本模組的 AES 加密使用 XOR 運算模擬，僅供示範使用</li>
            <li>MD5 使用 SHA-1 模擬（瀏覽器限制）</li>
            <li>
              實際專案請使用
              <code>crypto-js</code>
              等專業加密庫
            </li>
          </ul>
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
        <div class="method-demos">
          <!-- 1. Base64 Encoding -->
          <div class="demo-card">
            <h3 class="demo-title">1. Base64 編碼/解碼</h3>
            <p class="demo-desc">將文字轉換為 Base64 格式，支援 UTF-8 字元。</p>

            <div class="control-row mb-4">
              <label>文字內容:</label>
              <input
                v-model="plainText"
                type="text"
                class="input-field"
                placeholder="輸入要編碼的文字"
                style="flex: 1"
              />
            </div>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// Base64 編碼
const encoded = base64Encode('{{ plainText }}')

// Base64 解碼
const decoded = base64Decode(encoded)</code></pre>
                </div>
              </div>
              <div class="output-block">
                <div class="button-group">
                  <button
                    class="action-btn"
                    @click="handleBase64Encode"
                  >
                    編碼
                  </button>
                  <button
                    class="action-btn secondary"
                    @click="handleBase64Decode"
                  >
                    解碼
                  </button>
                </div>
                <DataPreview
                  v-if="base64Result || decodedResult"
                  title="編碼/解碼結果"
                  :data="{
                    encoded: base64Result,
                    decoded: decodedResult
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 2. AES Encryption -->
          <div class="demo-card">
            <h3 class="demo-title">2. AES 加密/解密</h3>
            <p class="demo-desc">使用金鑰加密資料（簡化版示範）。</p>

            <div class="control-row mb-4">
              <label>加密金鑰:</label>
              <input
                v-model="aesKey"
                type="text"
                class="input-field"
                placeholder="輸入加密金鑰"
                style="width: 200px"
              />
              <label>文字內容:</label>
              <input
                v-model="plainText"
                type="text"
                class="input-field"
                placeholder="輸入要加密的文字"
                style="flex: 1"
              />
            </div>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// AES 加密
const encrypted = aesEncrypt(
  '{{ plainText }}',
  '{{ aesKey }}'
)

// AES 解密
const decrypted = aesDecrypt(
  encrypted,
  '{{ aesKey }}'
)</code></pre>
                </div>
              </div>
              <div class="output-block">
                <div class="button-group">
                  <button
                    class="action-btn"
                    @click="handleAesEncrypt"
                  >
                    加密
                  </button>
                  <button
                    class="action-btn secondary"
                    @click="handleAesDecrypt"
                  >
                    解密
                  </button>
                </div>
                <DataPreview
                  v-if="aesEncrypted || aesDecrypted"
                  title="加密/解密結果"
                  :data="{
                    encrypted: aesEncrypted,
                    decrypted: aesDecrypted
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 3. MD5 Hash -->
          <div class="demo-card">
            <h3 class="demo-title">3. MD5 雜湊</h3>
            <p class="demo-desc">生成 MD5 雜湊值（使用 SHA-1 模擬）。</p>

            <div class="control-row mb-4">
              <label>文字內容:</label>
              <input
                v-model="hashText"
                type="text"
                class="input-field"
                placeholder="輸入要雜湊的文字"
                style="flex: 1"
              />
            </div>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// MD5 雜湊（使用 SHA-1 模擬）
const hash = await md5Hash('{{ hashText }}')

// 返回 40 字元的十六進位字串</code></pre>
                </div>
              </div>
              <div class="output-block">
                <button
                  class="action-btn"
                  style="margin-top: 1rem"
                  @click="handleMd5Hash"
                >
                  生成 MD5 雜湊
                </button>
                <div
                  v-if="md5Result"
                  class="result-box"
                >
                  <strong>MD5 (SHA-1):</strong>
                  <pre>{{ md5Result }}</pre>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. SHA256 Hash -->
          <div class="demo-card">
            <h3 class="demo-title">4. SHA256 雜湊</h3>
            <p class="demo-desc">生成 SHA256 雜湊值，常用於密碼儲存。</p>

            <div class="control-row mb-4">
              <label>文字內容:</label>
              <input
                v-model="hashText"
                type="text"
                class="input-field"
                placeholder="輸入要雜湊的文字"
                style="flex: 1"
              />
            </div>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// SHA256 雜湊
const hash = await sha256Hash('{{ hashText }}')

// 返回 64 字元的十六進位字串</code></pre>
                </div>
              </div>
              <div class="output-block">
                <button
                  class="action-btn"
                  style="margin-top: 1rem"
                  @click="handleSha256Hash"
                >
                  生成 SHA256 雜湊
                </button>
                <div
                  v-if="sha256Result"
                  class="result-box"
                >
                  <strong>SHA256:</strong>
                  <pre>{{ sha256Result }}</pre>
                </div>
              </div>
            </div>
          </div>

          <!-- 5. Hash Comparison -->
          <div class="demo-card">
            <h3 class="demo-title">5. 雜湊比較</h3>
            <p class="demo-desc">同時生成 MD5 和 SHA256 雜湊值進行比較。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 同時生成兩種雜湊
const [md5, sha256] = await Promise.all([
  md5Hash('{{ hashText }}'),
  sha256Hash('{{ hashText }}')
])

console.log('MD5:', md5)
console.log('SHA256:', sha256)</code></pre>
                </div>
              </div>
              <div class="output-block">
                <button
                  class="action-btn"
                  style="margin-top: 1rem"
                  @click="handleHashBoth"
                >
                  生成兩種雜湊
                </button>
                <DataPreview
                  v-if="md5Result && sha256Result"
                  title="雜湊比較"
                  :data="{
                    input: hashText,
                    md5: md5Result,
                    sha256: sha256Result,
                    md5Length: md5Result.length,
                    sha256Length: sha256Result.length
                  }"
                />
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

.demo-desc {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.warning-box {
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 6px;
  padding: 1rem;
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.warning-box strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #856404;
}

.warning-box ul {
  margin: 0;
  padding-left: 1.5rem;
  color: #856404;
}

.warning-box code {
  background: #fff;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.85rem;
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

.action-btn {
  background: #0d6efd;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.action-btn:hover {
  opacity: 0.9;
}

.action-btn.secondary {
  background: #6c757d;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.result-box {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 1rem;
  margin-top: 1rem;
}

.result-box strong {
  display: block;
  margin-bottom: 0.5rem;
}

.result-box pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
  font-size: 0.85rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-8 {
  margin-top: 2rem;
}
</style>
