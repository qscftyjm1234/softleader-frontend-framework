<script setup lang="ts">
const stats = [
  { title: '總會員數', value: '1,285', icon: 'mdi-account-group', color: 'primary', trend: '+12%' },
  { title: '本月營收', value: '$45,200', icon: 'mdi-currency-usd', color: 'success', trend: '+8.5%' },
  { title: '待處理訂單', value: '24', icon: 'mdi-clipboard-alert', color: 'warning', trend: '-2%' },
  { title: '系統負載', value: '32%', icon: 'mdi-server-network', color: 'info', trend: '穩定' },
]

const recentActivities = [
  { user: 'Admin', action: '更新了系統設定', time: '10 分鐘前', icon: 'mdi-cog', color: 'grey' },
  { user: '王小明', action: '新增了一筆訂單 #2023001', time: '25 分鐘前', icon: 'mdi-cart-plus', color: 'success' },
  { user: '李大華', action: '申請了退款', time: '1 小時前', icon: 'mdi-cash-refund', color: 'error' },
  { user: 'System', action: '自動備份完成', time: '2 小時前', icon: 'mdi-database-check', color: 'info' },
]
</script>

<template>
  <v-container fluid>
    <!-- 歡迎標題 -->
    <div class="d-flex align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">Dashboard</h1>
        <p class="text-subtitle-1 text-medium-emphasis">歡迎回來，這裡是您的系統概況。</p>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="primary" prepend-icon="mdi-download">匯出報表</v-btn>
    </div>

    <!-- 統計卡片 -->
    <v-row>
      <v-col v-for="(stat, i) in stats" :key="i" cols="12" sm="6" md="3">
        <v-card elevation="2" class="rounded-lg">
          <v-card-text class="d-flex align-center">
            <v-avatar :color="stat.color" variant="tonal" size="48" class="me-4">
              <v-icon :icon="stat.icon" size="24"></v-icon>
            </v-avatar>
            <div>
              <div class="text-caption text-medium-emphasis">{{ stat.title }}</div>
              <div class="text-h5 font-weight-bold">{{ stat.value }}</div>
            </div>
            <v-spacer></v-spacer>
            <v-chip :color="stat.trend.includes('+') ? 'success' : stat.trend.includes('-') ? 'error' : 'default'" size="x-small" label>
              {{ stat.trend }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <!-- 系統公告 / 趨勢圖 (模擬) -->
      <v-col cols="12" md="8">
        <v-card class="h-100 rounded-lg" elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-chart-line" start color="primary"></v-icon>
            流量趨勢
            <v-spacer></v-spacer>
            <v-btn-toggle density="compact" color="primary" variant="outlined" mandatory>
              <v-btn size="small">週</v-btn>
              <v-btn size="small">月</v-btn>
              <v-btn size="small">年</v-btn>
            </v-btn-toggle>
          </v-card-title>
          <v-card-text class="d-flex align-center justify-center" style="height: 300px;">
            <div class="text-center text-medium-emphasis">
              <v-icon icon="mdi-chart-bar" size="64" class="mb-2 opacity-50"></v-icon>
              <p>圖表區塊 (建議整合 Chart.js 或 ECharts)</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 近期活動 -->
      <v-col cols="12" md="4">
        <v-card class="h-100 rounded-lg" elevation="2">
          <v-card-title>近期活動</v-card-title>
          <v-list lines="two">
            <v-list-item v-for="(activity, i) in recentActivities" :key="i" :subtitle="activity.time">
              <template v-slot:prepend>
                <v-avatar :color="activity.color" size="small" variant="flat" class="me-1">
                  <v-icon :icon="activity.icon" size="small" color="white"></v-icon>
                </v-avatar>
              </template>
              <v-list-item-title class="text-body-2">
                <span class="font-weight-bold">{{ activity.user }}</span> {{ activity.action }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn block variant="text" color="primary">查看更多</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
