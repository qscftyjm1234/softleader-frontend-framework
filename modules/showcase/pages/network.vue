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
    <!-- General Usage -->
    <ShowcaseSection
      title="General Usage"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="監控機制"
          description="即時反應網路變化"
        >
          <div class="demo-area">
            <ShowcaseCodeBlock
              code="const { isOnline, effectiveType, saveData } = useNetwork()

// 監控網路狀態
watch(isOnline, (online) => {
  if (!online) {
    showError('網路連線中斷')
  } else {
    showSuccess('網路已恢復')
  })"
              label="Basic Usage"
            />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- Interactive Playground -->
    <ShowcaseSection
      title="Interactive Playground"
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
/* Scoped styles replaced by Tailwind utilities */
</style>
