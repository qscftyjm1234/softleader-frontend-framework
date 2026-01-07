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
      title="核心概念 (Core Concepts)"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="加密機制比較"
          description="三種常見技術的差異與用途"
          full-width
        >
          <div class="demo-area">
            <ul class="benefit-list">
              <li>
                <strong>Base64 (透明夾鏈袋)</strong>
                這不是加密！只是把資料裝進袋子方便攜帶。
                <strong>外面的人看得一清二楚</strong>
                ，完全沒防護力。
              </li>
              <li>
                <strong>AES (上鎖保險箱)</strong>
                這才是真的加密。必須有
                <strong>鑰匙 (Key)</strong>
                才能鎖上，也只有同一把鑰匙才打得開。
              </li>
              <li>
                <strong>SHA-256 (碎紙機)</strong>
                資料進去就碎了，
                <strong>拼不回來</strong>
                。只能用來比對「這堆碎紙」是不是來自原本的文件 (驗證密碼)。
              </li>
            </ul>
            <ShowcaseAlert
              type="warning"
              title="Implementation Note"
              class="mt-4"
            >
              本演示模組使用 XOR 模擬 AES 運算邏輯，僅供教學用途。生產環境請務必採用 Web Crypto API
              標準實作。
            </ShowcaseAlert>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { base64Encode, sha256Hash, aesEncrypt } = useEncryption()"
              label="Initialization"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- Interactive Playground -->
    <ShowcaseSection
      title="互動測試實作"
      icon="🎮"
    >
      <div class="component-grid">
        <!-- 1. Base64 -->
        <ShowcaseCard
          title="1. Base64 編碼 (Encoding)"
          description="【用途】傳輸圖片/檔案。【特性】公開透明，隨時可還原。"
        >
          <div class="demo-area">
            <IInput
              v-model="plainText"
              label="輸入文字"
              placeholder="輸入要編碼的文字"
              class="mb-4"
            />

            <div style="display: flex; gap: 8px; margin-bottom: 16px">
              <IButton @click="handleBase64Encode">編碼 (Encode)</IButton>
              <IButton
                variant="secondary"
                @click="handleBase64Decode"
              >
                解碼 (Decode)
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
          title="2. AES 加密 (Encryption)"
          description="【用途】機密資料保護。【特性】需保管好金鑰 (Key)。"
        >
          <div class="demo-area">
            <IStack
              direction="column"
              gap="1"
              class="mb-4"
            >
              <IInput
                v-model="aesKey"
                label="加密金鑰 (Secret Key)"
              />
              <div class="text-xs text-red-400 font-bold mt-1 mb-2 flex items-center">
                <i class="mdi mdi-alert-circle mr-1"></i>
                警告：金鑰一旦遺失，資料將永遠無法救回！
              </div>
              <IInput
                v-model="plainText"
                label="原始文字"
              />
            </IStack>

            <div style="display: flex; gap: 8px; margin-bottom: 16px">
              <IButton @click="handleAesEncrypt">加密 (Lock)</IButton>
              <IButton
                variant="secondary"
                @click="handleAesDecrypt"
              >
                解密 (Unlock)
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
          title="3. 雜湊 (Hashing)"
          description="【用途】密碼儲存、檔案驗證。【特性】單向不可逆。"
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
/* Clean, Functional Overrides */
:deep(.glass-input) {
  background: rgba(15, 23, 42, 0.3) !important;
  border: 1px solid rgba(148, 163, 184, 0.1) !important;
  border-radius: 4px;
  color: #e2e8f0;
  transition: border-color 0.2s;
}

:deep(.glass-input:focus) {
  border-color: #38bdf8 !important;
  background: rgba(15, 23, 42, 0.5) !important;
}

/* Minimal Result Block */
.result-text {
  margin-top: 1rem;
  padding: 1rem;
  background: #0f172a;
  border-left: 2px solid #334155;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: #94a3b8;
}

.result-text .label {
  display: block;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.result-text .value {
  display: block;
  color: #e2e8f0;
  word-break: break-all;
}
</style>
```
