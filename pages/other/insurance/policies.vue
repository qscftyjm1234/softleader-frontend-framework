<script setup lang="ts">
const search = ref('')
const headers: any = [
  { title: '保單號碼', key: 'policyNo', align: 'start' },
  { title: '要保人', key: 'holder' },
  { title: '險種計畫', key: 'plan' },
  { title: '生效日', key: 'effectiveDate' },
  { title: '總保費', key: 'premium', align: 'end' },
  { title: '狀態', key: 'status', align: 'center' },
  { title: '操作', key: 'actions', sortable: false, align: 'end' }
]

const policies = [
  {
    policyNo: 'POL-2023-8801',
    holder: '陳大文',
    plan: '安心意外傷害險 (Plan A)',
    effectiveDate: '2023-01-01',
    premium: 3500,
    status: 'active'
  },
  {
    policyNo: 'POL-2023-8802',
    holder: '林小美',
    plan: '尊榮終身醫療險',
    effectiveDate: '2023-02-15',
    premium: 45000,
    status: 'active'
  },
  {
    policyNo: 'POL-2023-8803',
    holder: '張志明',
    plan: '富貴年年儲蓄險',
    effectiveDate: '2023-03-10',
    premium: 120000,
    status: 'lapsed'
  },
  {
    policyNo: 'POL-2023-8804',
    holder: '王春嬌',
    plan: '寵物綜合保險',
    effectiveDate: '2023-04-05',
    premium: 2800,
    status: 'pending'
  },
  {
    policyNo: 'POL-2023-8805',
    holder: '李建國',
    plan: '旅遊平安險 (5天)',
    effectiveDate: '2023-05-20',
    premium: 500,
    status: 'expired'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'success'
    case 'lapsed':
      return 'error'
    case 'pending':
      return 'warning'
    case 'expired':
      return 'grey'
    default:
      return 'default'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return '有效'
    case 'lapsed':
      return '停效'
    case 'pending':
      return '核保中'
    case 'expired':
      return '滿期'
    default:
      return status
  }
}
</script>

<template>
  <v-container fluid>
    <v-card
      class="rounded-lg"
      elevation="2"
    >
      <v-card-title class="d-flex align-center py-4 px-6 border-b">
        <div>
          <div class="text-h6 font-weight-bold">保單管理</div>
          <div class="text-caption text-medium-emphasis">查詢與維護所有保單資料</div>
        </div>
        <v-spacer />
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="搜尋保單號碼、姓名..."
          single-line
          hide-details
          variant="outlined"
          density="compact"
          class="me-4"
          style="max-width: 300px"
        />
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
        >
          新增投保
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="policies"
        :search="search"
        hover
      >
        <template #item.policyNo="{ item }">
          <span class="font-weight-bold text-primary cursor-pointer">{{ item.policyNo }}</span>
        </template>

        <template #item.premium="{ item }">
          <span class="font-weight-bold">${{ item.premium.toLocaleString() }}</span>
        </template>

        <template #item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            size="small"
            label
            variant="tonal"
            class="font-weight-bold"
          >
            {{ getStatusText(item.status) }}
          </v-chip>
        </template>

        <template #item.actions>
          <v-btn
            icon="mdi-file-eye"
            size="small"
            variant="text"
            color="grey-darken-1"
            title="檢視詳情"
          />
          <v-btn
            icon="mdi-file-edit"
            size="small"
            variant="text"
            color="primary"
            title="批改"
          />
          <v-btn
            icon="mdi-history"
            size="small"
            variant="text"
            color="info"
            title="歷程"
          />
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
