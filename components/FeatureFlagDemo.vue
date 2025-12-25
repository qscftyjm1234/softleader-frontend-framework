<script setup lang="ts">
/**
 * 功能開關示範組件
 *
 * 展示如何在 Vue 組件中使用功能開關系統
 */

const { isEnabled, getAllFeatures, getCategoryFeatures } = useFeatureFlag()

// 檢查特定功能是否啟用
const historyEnabled = isEnabled('devTools.historyGeneration')
const apiLogEnabled = isEnabled('logging.apiLog')
const performanceEnabled = isEnabled('monitoring.performance')

// 獲取所有開發工具功能狀態
const devToolsFeatures = getCategoryFeatures('devTools')

// 獲取所有功能狀態
const allFeatures = getAllFeatures()

/**
 * 測試功能開關
 *
 * @history
 * @historyId featuretest
 * @author gino.huang
 */
function testFeatureFlags() {
  if (isEnabled('logging.consoleLog')) {
    console.log('✅ Console 日誌功能已啟用')
    console.log('歷史文件生成:', historyEnabled ? '✅ 啟用' : '❌ 停用')
    console.log('API 日誌:', apiLogEnabled ? '✅ 啟用' : '❌ 停用')
    console.log('性能監控:', performanceEnabled ? '✅ 啟用' : '❌ 停用')
  }
}
</script>

<template>
  <div class="feature-demo">
    <h2>🎛️ 功能開關系統示範</h2>

    <div class="section">
      <h3>核心功能狀態</h3>
      <ul>
        <li>
          <span class="label">歷史文件生成:</span>
          <span :class="historyEnabled ? 'enabled' : 'disabled'">
            {{ historyEnabled ? '✅ 啟用' : '❌ 停用' }}
          </span>
        </li>
        <li>
          <span class="label">API 日誌:</span>
          <span :class="apiLogEnabled ? 'enabled' : 'disabled'">
            {{ apiLogEnabled ? '✅ 啟用' : '❌ 停用' }}
          </span>
        </li>
        <li>
          <span class="label">性能監控:</span>
          <span :class="performanceEnabled ? 'enabled' : 'disabled'">
            {{ performanceEnabled ? '✅ 啟用' : '❌ 停用' }}
          </span>
        </li>
      </ul>
    </div>

    <div class="section">
      <h3>開發工具功能</h3>
      <ul>
        <li
          v-for="(enabled, feature) in devToolsFeatures"
          :key="feature"
        >
          <span class="label">{{ feature }}:</span>
          <span :class="enabled ? 'enabled' : 'disabled'">
            {{ enabled ? '✅ 啟用' : '❌ 停用' }}
          </span>
        </li>
      </ul>
    </div>

    <div class="section">
      <h3>所有功能狀態</h3>
      <details>
        <summary>點擊展開查看所有功能</summary>
        <ul>
          <li
            v-for="(enabled, feature) in allFeatures"
            :key="feature"
          >
            <span class="label">{{ feature }}:</span>
            <span :class="enabled ? 'enabled' : 'disabled'">
              {{ enabled ? '✅' : '❌' }}
            </span>
          </li>
        </ul>
      </details>
    </div>

    <div class="actions">
      <button @click="testFeatureFlags">測試功能開關</button>
    </div>

    <div class="info">
      <p>
        💡
        <strong>提示:</strong>
        可以透過
        <code>.env</code>
        文件修改功能開關狀態
      </p>
      <p>
        例如:
        <code>NUXT_PUBLIC_FEATURE_HISTORY_GENERATION=false</code>
      </p>
    </div>
  </div>
</template>

<style scoped>
.feature-demo {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

h3 {
  color: #34495e;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
}

li:last-child {
  border-bottom: none;
}

.label {
  font-weight: 500;
  color: #495057;
}

.enabled {
  color: #28a745;
  font-weight: 600;
}

.disabled {
  color: #dc3545;
  font-weight: 600;
}

details {
  cursor: pointer;
}

summary {
  font-weight: 600;
  color: #007bff;
  padding: 0.5rem;
  background: #e7f3ff;
  border-radius: 4px;
  user-select: none;
}

summary:hover {
  background: #cfe2ff;
}

.actions {
  margin: 2rem 0;
  text-align: center;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
}

button:active {
  transform: translateY(0);
}

.info {
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 6px;
  padding: 1rem;
  margin-top: 2rem;
}

.info p {
  margin: 0.5rem 0;
  color: #856404;
}

code {
  background: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  color: #e83e8c;
}
</style>
