<script setup lang="ts">
const claims = [
  {
    id: 'CLM-2023-001',
    policy: 'POL-2023-8801',
    claimant: '陳大文',
    type: '意外醫療',
    amount: 1500,
    status: 'approved',
    date: '2023-10-20'
  },
  {
    id: 'CLM-2023-002',
    policy: 'POL-2023-8802',
    claimant: '林小美',
    type: '住院日額',
    amount: 5000,
    status: 'investigating',
    date: '2023-10-25'
  },
  {
    id: 'CLM-2023-003',
    policy: 'POL-2023-8804',
    claimant: '王春嬌',
    type: '寵物門診',
    amount: 800,
    status: 'pending',
    date: '2023-10-27'
  },
  {
    id: 'CLM-2023-004',
    policy: 'POL-2023-8805',
    claimant: '李建國',
    type: '班機延誤',
    amount: 2000,
    status: 'rejected',
    date: '2023-10-15'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'success'
    case 'investigating':
      return 'warning'
    case 'pending':
      return 'info'
    case 'rejected':
      return 'error'
    default:
      return 'grey'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'approved':
      return '已核准'
    case 'investigating':
      return '調查中'
    case 'pending':
      return '待審核'
    case 'rejected':
      return '已拒賠'
    default:
      return status
  }
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <!-- 左側：理賠列表 -->
      <v-col cols="12" md="8">
        <v-card class="rounded-lg" elevation="2">
          <v-card-title class="d-flex align-center py-4 px-6 border-b">
            <div>
              <div class="text-h6 font-weight-bold">理賠案件處理</div>
              <div class="text-caption text-medium-emphasis">
                待處理案件佇列
              </div>
            </div>
            <v-spacer />
            <v-btn variant="text" icon="mdi-filter-variant" />
            <v-btn variant="text" icon="mdi-refresh" />
          </v-card-title>

          <v-list lines="two" class="py-0">
            <template v-for="(claim, index) in claims" :key="claim.id">
              <v-list-item class="py-4 px-6">
                <template #prepend>
                  <v-avatar
                    :color="getStatusColor(claim.status)"
                    variant="tonal"
                    size="48"
                    class="mr-4"
                  >
                    <v-icon icon="mdi-file-document-alert" size="24" />
                  </v-avatar>
                </template>

                <v-list-item-title class="d-flex align-center mb-1">
                  <span class="font-weight-bold text-h6 mr-3">{{
                    claim.id
                  }}</span>
                  <v-chip size="x-small" variant="outlined" class="mr-2">{{
                    claim.type
                  }}</v-chip>
                  <span class="text-caption text-medium-emphasis">{{
                    claim.date
                  }}</span>
                </v-list-item-title>

                <v-list-item-subtitle class="d-flex align-center mt-1">
                  <span class="font-weight-bold mr-2">{{
                    claim.claimant
                  }}</span>
                  <span class="text-medium-emphasis mr-2">|</span>
                  <span>保單: {{ claim.policy }}</span>
                </v-list-item-subtitle>

                <template #append>
                  <div class="text-right">
                    <div class="text-h6 font-weight-bold text-primary mb-1">
                      ${{ claim.amount.toLocaleString() }}
                    </div>
                    <v-chip
                      :color="getStatusColor(claim.status)"
                      size="small"
                      label
                    >
                      {{ getStatusText(claim.status) }}
                    </v-chip>
                  </div>
                </template>
              </v-list-item>
              <v-divider v-if="index < claims.length - 1" />
            </template>
          </v-list>
        </v-card>
      </v-col>

      <!-- 右側：理賠統計與快捷功能 -->
      <v-col cols="12" md="4">
        <v-card class="rounded-lg mb-4 bg-primary text-white" elevation="2">
          <v-card-text class="d-flex align-center">
            <div>
              <div class="text-subtitle-2 mb-1 opacity-80">平均結案天數</div>
              <div class="text-h4 font-weight-bold">3.5 天</div>
            </div>
            <v-spacer />
            <v-icon
              icon="mdi-timer-check-outline"
              size="48"
              class="opacity-50"
            />
          </v-card-text>
        </v-card>

        <v-card class="rounded-lg mb-4" elevation="2">
          <v-card-title>理賠類型分佈</v-card-title>
          <v-card-text>
            <div class="d-flex align-center mb-3">
              <div class="flex-grow-1">
                <div class="d-flex justify-space-between mb-1">
                  <span class="text-caption font-weight-bold">醫療險</span>
                  <span class="text-caption">45%</span>
                </div>
                <v-progress-linear
                  model-value="45"
                  color="primary"
                  height="6"
                  rounded
                />
              </div>
            </div>
            <div class="d-flex align-center mb-3">
              <div class="flex-grow-1">
                <div class="d-flex justify-space-between mb-1">
                  <span class="text-caption font-weight-bold">意外險</span>
                  <span class="text-caption">30%</span>
                </div>
                <v-progress-linear
                  model-value="30"
                  color="info"
                  height="6"
                  rounded
                />
              </div>
            </div>
            <div class="d-flex align-center">
              <div class="flex-grow-1">
                <div class="d-flex justify-space-between mb-1">
                  <span class="text-caption font-weight-bold">車險</span>
                  <span class="text-caption">25%</span>
                </div>
                <v-progress-linear
                  model-value="25"
                  color="warning"
                  height="6"
                  rounded
                />
              </div>
            </div>
          </v-card-text>
        </v-card>

        <v-card class="rounded-lg" elevation="2">
          <v-list nav>
            <v-list-item
              prepend-icon="mdi-plus-circle"
              title="新增理賠案件"
              link
            />
            <v-list-item
              prepend-icon="mdi-file-search"
              title="理賠進度查詢"
              link
            />
            <v-list-item prepend-icon="mdi-calculator" title="理賠試算" link />
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
