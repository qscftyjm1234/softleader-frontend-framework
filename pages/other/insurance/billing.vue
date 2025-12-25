<script setup lang="ts">
const billings = [
  {
    id: 'BILL-2023-1001',
    policy: 'POL-2023-8801',
    holder: '陳大文',
    amount: 3500,
    dueDate: '2023-11-01',
    status: 'unpaid',
    method: 'Credit Card'
  },
  {
    id: 'BILL-2023-1002',
    policy: 'POL-2023-8802',
    holder: '林小美',
    amount: 45000,
    dueDate: '2023-10-15',
    status: 'paid',
    method: 'Bank Transfer'
  },
  {
    id: 'BILL-2023-1003',
    policy: 'POL-2023-8803',
    holder: '張志明',
    amount: 120000,
    dueDate: '2023-10-01',
    status: 'overdue',
    method: 'Check'
  },
  {
    id: 'BILL-2023-1004',
    policy: 'POL-2023-8804',
    holder: '王春嬌',
    amount: 2800,
    dueDate: '2023-11-05',
    status: 'unpaid',
    method: 'Credit Card'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'success'
    case 'unpaid':
      return 'warning'
    case 'overdue':
      return 'error'
    default:
      return 'grey'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'paid':
      return '已繳款'
    case 'unpaid':
      return '未繳款'
    case 'overdue':
      return '逾期'
    default:
      return status
  }
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        md="3"
      >
        <v-card
          class="rounded-lg bg-primary text-white mb-4"
          elevation="2"
        >
          <v-card-text>
            <div class="text-subtitle-2 opacity-80">本月應收保費</div>
            <div class="text-h4 font-weight-bold">$1.2M</div>
          </v-card-text>
        </v-card>
        <v-card
          class="rounded-lg bg-error text-white mb-4"
          elevation="2"
        >
          <v-card-text>
            <div class="text-subtitle-2 opacity-80">逾期未繳金額</div>
            <div class="text-h4 font-weight-bold">$45k</div>
          </v-card-text>
        </v-card>
        <v-card
          class="rounded-lg bg-success text-white"
          elevation="2"
        >
          <v-card-text>
            <div class="text-subtitle-2 opacity-80">收費達成率</div>
            <div class="text-h4 font-weight-bold">96.5%</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="9"
      >
        <v-card
          class="rounded-lg h-100"
          elevation="2"
        >
          <v-card-title class="d-flex align-center py-4 px-6 border-b">
            <div>
              <div class="text-h6 font-weight-bold">收費作業 (Billing)</div>
              <div class="text-caption text-medium-emphasis">保費帳單管理與催收</div>
            </div>
            <v-spacer />
            <v-btn
              variant="outlined"
              color="primary"
              prepend-icon="mdi-email-alert"
            >
              批次寄送催繳單
            </v-btn>
          </v-card-title>

          <v-table hover>
            <thead>
              <tr>
                <th>帳單號碼</th>
                <th>保單號碼</th>
                <th>要保人</th>
                <th>繳費期限</th>
                <th>繳費方式</th>
                <th class="text-right">金額</th>
                <th class="text-center">狀態</th>
                <th class="text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="bill in billings"
                :key="bill.id"
              >
                <td class="font-weight-bold">{{ bill.id }}</td>
                <td class="text-medium-emphasis">{{ bill.policy }}</td>
                <td>{{ bill.holder }}</td>
                <td
                  :class="{
                    'text-error font-weight-bold': bill.status === 'overdue'
                  }"
                >
                  {{ bill.dueDate }}
                </td>
                <td>
                  <v-icon
                    icon="mdi-credit-card-outline"
                    size="small"
                    class="mr-1"
                  />
                  {{ bill.method }}
                </td>
                <td class="text-right font-weight-bold">${{ bill.amount.toLocaleString() }}</td>
                <td class="text-center">
                  <v-chip
                    :color="getStatusColor(bill.status)"
                    size="small"
                    label
                    variant="flat"
                  >
                    {{ getStatusText(bill.status) }}
                  </v-chip>
                </td>
                <td class="text-right">
                  <v-btn
                    icon="mdi-email-send"
                    size="small"
                    variant="text"
                    color="primary"
                    title="寄送通知"
                  />
                  <v-btn
                    icon="mdi-cash-check"
                    size="small"
                    variant="text"
                    color="success"
                    title="入帳"
                  />
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
