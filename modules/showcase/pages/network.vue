<script setup lang="ts">
import { computed } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const { isOnline, effectiveType, downlink, rtt, saveData } = useNetwork()

// Computed
const networkStatus = computed(() => ({
  isOnline: isOnline.value,
  effectiveType: effectiveType.value || '未知',
  downlink: downlink.value ? `${downlink.value} Mbps` : '未知',
  rtt: rtt.value ? `${rtt.value} ms` : '未知',
  saveData: saveData.value
}))

const networkQuality = computed(() => {
  if (!isOnline.value) return '離線'
  if (!effectiveType.value) return '未知'

  switch (effectiveType.value) {
    case '4g':
      return '優秀'
    case '3g':
      return '良好'
    case '2g':
      return '較差'
    case 'slow-2g':
      return '很差'
    default:
      return '未知'
  }
})
const qualityClass = computed(() => {
  if (!effectiveType.value) return 'text-slate-400'
  switch (effectiveType.value) {
    case '4g':
      return 'text-emerald-400'
    case '3g':
      return 'text-amber-400'
    case '2g':
    case 'slow-2g':
      return 'text-rose-400'
    default:
      return 'text-slate-400'
  }
})

definePageMeta({
  title: '網路狀態 (Network)',
  icon: 'mdi-wifi',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="網路狀態 (Network)"
    description="完整的網路狀態監控模組，提供線上/離線狀態、網路類型和速度偵測。核心特色：即時監控、網路類型、下載速度、省流量模式。"
  >
    <!-- 基礎用法 -->
    <ShowcaseSection title="基礎用法">
      <ShowcaseCard
        title="核心功能"
        description="網路狀態監控的核心能力"
        full-width
      >
        <div class="demo-area">
          <p
            class="method-desc"
            style="margin-bottom: 1.5rem"
          >
            <strong>可用屬性：</strong>
          </p>
          <ShowcaseCodeBlock
            code="const { isOnline, effectiveType, downlink, rtt, saveData } = useNetwork()

// 1. 監聽連線狀態
watch(isOnline, (online) => {
  if (online) {
    syncData() // 恢復連線時同步資料
  } else {
    pauseUpload() // 斷線時暫停上傳
  }
})

// 2. 根據網速調整體驗
if (effectiveType.value === '4g') {
  loadHighQualityVideo()
} else {
  loadLowQualityVideo()
}"
            label="useNetwork() 功能總覽"
          />

          <p
            class="method-desc"
            style="margin-top: 1.5rem; margin-bottom: 1rem"
          >
            <strong>核心特色：</strong>
          </p>
          <ul class="benefit-list">
            <li>
              <strong>即時狀態:</strong>
              Reactive 的線上/離線狀態偵測，支援 Watch 監聽
            </li>
            <li>
              <strong>連線品質:</strong>
              偵測網路類型 (4g/3g/2g)、下行速度 (Mbps) 與延遲 (RTT)
            </li>
            <li>
              <strong>流量感知:</strong>
              支援 Save-Data 模式偵測，協助實現適應性體驗
            </li>
            <li>
              <strong>跨瀏覽器:</strong>
              自動處理不同瀏覽器的 API 相容性問題
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
          title="1. Connection Status"
          description="連線狀態屬性"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>isOnline</strong>
              (Boolean)
              <br />
              當前是否連上網路。
            </p>
            <p class="method-desc mt-2">
              <strong>offlineAt</strong>
              (Timestamp)
              <br />
              最後一次離線的時間點。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const isConnected = computed(() => isOnline.value)"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="2. Network Quality"
          description="網路品質與速度"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>effectiveType</strong>
              ('slow-2g' | '2g' | '3g' | '4g')
              <br />
              有效網路連線類型。
            </p>
            <p class="method-desc mt-2">
              <strong>downlink</strong>
              (Number)
              <br />
              預估下行速度 (Mbps)。
            </p>
            <p class="method-desc mt-2">
              <strong>rtt</strong>
              (Number)
              <br />
              預估往返延遲 (ms)。
            </p>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          title="3. User Preference"
          description="使用者偏好"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>saveData</strong>
              (Boolean)
              <br />
              使用者是否開啟了「省流量模式」。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="if (saveData.value) {
  images.value = lowResImages
}"
              label="適應性載入"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- Interactive Playground -->
    <ShowcaseSection
      title="互動測試"
      icon="🎮"
    >
      <div class="component-grid">
        <!-- 1. Online Status -->
        <ShowcaseCard
          title="1. 線上/離線狀態"
          description="即時偵測網路連線"
        >
          <div class="flex flex-col items-center justify-center p-4">
            <div class="mb-4">
              <div
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-base transition-all duration-300"
                :class="
                  isOnline
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30 ring-1 ring-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30 ring-1 ring-red-500/20 shadow-[0_0_15px_rgba(248,113,113,0.2)]'
                "
              >
                <span class="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                {{ isOnline ? 'ONLINE (線上)' : 'OFFLINE (離線)' }}
              </div>
            </div>
            <div class="text-sm text-slate-400 text-center">
              💡 提示：嘗試關閉 Wi-Fi 或拔除網路線來測試
            </div>
          </div>
        </ShowcaseCard>

        <!-- 2. Connection Info -->
        <ShowcaseCard
          title="2. 連線資訊"
          description="網路類型與速度偵測"
        >
          <div class="grid grid-cols-2 gap-4">
            <div
              class="bg-slate-900/60 border border-slate-700/30 p-4 rounded-lg flex flex-col items-center text-center backdrop-blur-sm"
            >
              <label class="text-xs text-slate-400 mb-2 uppercase tracking-wide">
                Effective Type
              </label>
              <div class="text-xl font-semibold text-slate-100">{{ effectiveType || '未知' }}</div>
              <div
                class="text-xs px-2 py-0.5 rounded mt-1 bg-white/10"
                :class="qualityClass"
              >
                {{ networkQuality }}
              </div>
            </div>
            <div
              class="bg-slate-900/60 border border-slate-700/30 p-4 rounded-lg flex flex-col items-center text-center backdrop-blur-sm"
            >
              <label class="text-xs text-slate-400 mb-2 uppercase tracking-wide">
                Downlink Speed
              </label>
              <div class="text-xl font-semibold text-slate-100 font-mono">
                {{ downlink ? `${downlink} Mbps` : '未知' }}
              </div>
            </div>
            <div
              class="bg-slate-900/60 border border-slate-700/30 p-4 rounded-lg flex flex-col items-center text-center backdrop-blur-sm"
            >
              <label class="text-xs text-slate-400 mb-2 uppercase tracking-wide">
                RTT (Latency)
              </label>
              <div class="text-xl font-semibold text-slate-100 font-mono">
                {{ rtt ? `${rtt} ms` : '未知' }}
              </div>
            </div>
            <div
              class="bg-slate-900/60 border border-slate-700/30 p-4 rounded-lg flex flex-col items-center text-center backdrop-blur-sm"
            >
              <label class="text-xs text-slate-400 mb-2 uppercase tracking-wide">Save Data</label>
              <div
                class="text-xl font-semibold"
                :class="saveData ? 'text-amber-400' : 'text-slate-400'"
              >
                {{ saveData ? 'ON' : 'OFF' }}
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <!-- 3. Full State -->
        <ShowcaseCard
          title="3. 完整狀態"
          description="Reactive State Object"
          full-width
        >
          <div class="demo-area">
            <ShowcaseCodeBlock
              :code="JSON.stringify(networkStatus, null, 2)"
              language="json"
              label="Network Object"
            />
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
</style>
