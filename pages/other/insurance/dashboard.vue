<script setup lang="ts">
const stats = [
  { title: '總簽單保費 (GWP)', value: '$12.5M', trend: '+8.2%', color: 'primary', icon: 'mdi-cash-multiple' },
  { title: '本月理賠金額', value: '$3.2M', trend: '-1.5%', color: 'error', icon: 'mdi-hand-coin' },
  { title: '綜合率 (Combined Ratio)', value: '94.5%', trend: '優良', color: 'success', icon: 'mdi-chart-pie' },
  { title: '有效保單數', value: '15,420', trend: '+124', color: 'info', icon: 'mdi-file-document-multiple' }
]

const recentPolicies = [
  { id: 'POL-2023-001', holder: '張三', product: '安心意外險', premium: '$3,500', status: 'active' },
  { id: 'POL-2023-002', holder: '李四', product: '尊榮醫療險', premium: '$12,000', status: 'pending' },
  { id: 'POL-2023-003', holder: '王五', product: '車體損失險', premium: '$8,500', status: 'active' },
]
</script>

<template>
  <v-container fluid>
    <div class="d-flex align-center mb-6">
      <div>
        <h1 class="text-h5 font-weight-bold">保險營運總覽</h1>
        <p class="text-subtitle-2 text-medium-emphasis">即時監控核心業務指標與風險狀況</p>
      </div>
      <v-spacer></v-spacer>
      <v-btn-toggle density="compact" color="primary" variant="outlined" mandatory>
        <v-btn>今日</v-btn>
        <v-btn>本週</v-btn>
        <v-btn>本月</v-btn>
      </v-btn-toggle>
    </div>

    <!-- 核心指標 -->
    <v-row>
      <v-col v-for="(stat, i) in stats" :key="i" cols="12" sm="6" md="3">
        <v-card class="rounded-lg" elevation="2">
          <v-card-text>
            <div class="d-flex justify-space-between align-start mb-2">
              <v-avatar :color="stat.color" variant="tonal" rounded="lg">
                <v-icon :icon="stat.icon"></v-icon>
              </v-avatar>
              <v-chip size="x-small" :color="stat.trend.includes('-') ? 'success' : 'default'" label>
                {{ stat.trend }}
              </v-chip>
            </div>
            <div class="text-h4 font-weight-bold mb-1">{{ stat.value }}</div>
            <div class="text-caption text-medium-emphasis">{{ stat.title }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <!-- 銷售熱力圖 (模擬) -->
      <v-col cols="12" md="8">
        <v-card class="h-100 rounded-lg" elevation="2">
          <v-card-title>各險種銷售佔比</v-card-title>
          <v-card-text class="d-flex align-center justify-center" style="height: 300px">
            <div class="text-center text-medium-emphasis">
              <v-icon icon="mdi-chart-donut" size="64" class="mb-2 opacity-50"></v-icon>
              <p>Chart.js / ECharts 整合區塊</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 最新核保案件 -->
      <v-col cols="12" md="4">
        <v-card class="h-100 rounded-lg" elevation="2">
          <v-card-title class="d-flex align-center">
            最新進件
            <v-spacer></v-spacer>
            <v-btn variant="text" size="small" color="primary">查看全部</v-btn>
          </v-card-title>
          <v-list>
            <v-list-item v-for="policy in recentPolicies" :key="policy.id" lines="two">
              <template v-slot:prepend>
                <v-avatar color="primary" variant="tonal" size="36" class="mr-3">
                  <span class="text-caption font-weight-bold">{{ policy.holder.charAt(0) }}</span>
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-bold">{{ policy.product }}</v-list-item-title>
              <v-list-item-subtitle>{{ policy.id }} - {{ policy.holder }}</v-list-item-subtitle>
              <template v-slot:append>
                <div class="text-right">
                  <div class="text-subtitle-2 font-weight-bold">{{ policy.premium }}</div>
                  <v-chip size="x-small" :color="policy.status === 'active' ? 'success' : 'warning'" label>
                    {{ policy.status.toUpperCase() }}
                  </v-chip>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
