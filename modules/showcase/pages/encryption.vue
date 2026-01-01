```vue
<script setup lang="ts">
import { ref } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'
import ShowcaseAlert from '../components/ShowcaseAlert.vue'
import IButton from '@/components/uiInterface/IButton.vue'
import IInput from '@/components/uiInterface/IInput.vue'
import IStack from '@/components/uiInterface/IStack.vue'
import { useEncryption } from '@/composables/useEncryption'

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
  icon: 'mdi-lock',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="加密工具系統 (Encryption System)"
    description="完整的加密工具模組，提供 Base64 編碼/解碼、AES 加密/解密和 MD5/SHA256 雜湊功能。"
  >
    <!-- General Usage -->
    <ShowcaseSection
      title="General Usage"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="加密核心概覽"
          description="常用加密情境展示"
          full-width
        >
          <div class="demo-area">
            <ul class="benefit-list">
              <li>
                <strong>Base64:</strong>
                資料傳輸編碼
              </li>
              <li>
                <strong>SHA256:</strong>
                密碼雜湊儲存
              </li>
              <li>
                <strong>AES:</strong>
                對稱式敏感資料加密
              </li>
            </ul>
            <ShowcaseAlert
              type="warning"
              title="重要提示"
              class="mt-4"
            >
              本模組的 AES 加密使用 XOR 運算模擬，僅供示範使用。實際專案請使用 crypto-js。
            </ShowcaseAlert>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { base64Encode, sha256Hash, aesEncrypt } = useEncryption()"
              label="Composable Usage"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- Interactive Playground -->
    <ShowcaseSection
      title="Interactive Playground"
      icon="🎮"
    >
      <div class="component-grid">
        <!-- 1. Base64 -->
        <ShowcaseCard
          title="1. Base64 編碼/解碼"
          description="支援 UTF-8 字元轉換。"
        >
          <div class="demo-area">
            <IInput
              v-model="plainText"
              label="輸入文字"
              placeholder="輸入要編碼的文字"
              class="mb-4"
            />

            <div style="display: flex; gap: 8px; margin-bottom: 16px">
              <IButton @click="handleBase64Encode">編碼</IButton>
              <IButton
                variant="secondary"
                @click="handleBase64Decode"
              >
                解碼
              </IButton>
            </div>

            <div
              v-if="base64Result"
              class="result-text"
            >
              <span class="label">Encoded:</span>
              <span class="value">{{ base64Result }}</span>
            </div>
            <div
              v-if="decodedResult"
              class="result-text"
            >
              <span class="label">Decoded:</span>
              <span class="value">{{ decodedResult }}</span>
            </div>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="base64Encode('Hello')"
              label="Function"
            />
          </template>
        </ShowcaseCard>

        <!-- 2. AES -->
        <ShowcaseCard
          title="2. AES 加密/解密"
          description="對稱式加密演示。"
        >
          <div class="demo-area">
            <IStack
              direction="column"
              gap="1"
              class="mb-4"
            >
              <IInput
                v-model="aesKey"
                label="加密金鑰"
              />
              <IInput
                v-model="plainText"
                label="原始文字"
              />
            </IStack>

            <div style="display: flex; gap: 8px; margin-bottom: 16px">
              <IButton @click="handleAesEncrypt">加密</IButton>
              <IButton
                variant="secondary"
                @click="handleAesDecrypt"
              >
                解密
              </IButton>
            </div>

            <div
              v-if="aesEncrypted"
              class="result-text"
            >
              <span class="label">Encrypted:</span>
              <span
                class="value"
                style="word-break: break-all"
              >
                {{ aesEncrypted }}
              </span>
            </div>
            <div
              v-if="aesDecrypted"
              class="result-text"
            >
              <span class="label">Decrypted:</span>
              <span class="value">{{ aesDecrypted }}</span>
            </div>
          </div>
        </ShowcaseCard>

        <!-- 3. Hashing -->
        <ShowcaseCard
          title="3. 雜湊運算 (Hash)"
          description="不可逆的雜湊生成。"
          full-width
        >
          <div class="demo-area">
            <IInput
              v-model="hashText"
              label="輸入文字"
              class="mb-4"
            />

            <div style="display: flex; gap: 8px; margin-bottom: 16px">
              <IButton @click="handleMd5Hash">生成 MD5</IButton>
              <IButton @click="handleSha256Hash">生成 SHA256</IButton>
              <IButton
                variant="outlined"
                @click="handleHashBoth"
              >
                生成兩者
              </IButton>
            </div>

            <div
              v-if="md5Result"
              class="result-text"
            >
              <span class="label">MD5:</span>
              <span class="value">{{ md5Result }}</span>
            </div>
            <div
              v-if="sha256Result"
              class="result-text"
            >
              <span class="label">SHA256:</span>
              <span class="value">{{ sha256Result }}</span>
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
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
