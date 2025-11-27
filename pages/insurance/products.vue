<script setup lang="ts">
const products = [
  {
    code: 'PROD-LIFE-001',
    name: '尊榮終身壽險',
    category: '壽險',
    status: 'active',
    version: '2.0',
    launchDate: '2023-01-01',
    description: '提供終身保障與高額身故給付，適合家庭經濟支柱。'
  },
  {
    code: 'PROD-MED-005',
    name: '安心實支實付醫療險',
    category: '醫療險',
    status: 'active',
    version: '1.2',
    launchDate: '2023-03-15',
    description: '覆蓋健保不給付的自費項目，提供完整的醫療保障。'
  },
  {
    code: 'PROD-ACC-002',
    name: '快樂出遊平安險',
    category: '意外險',
    status: 'draft',
    version: '0.9',
    launchDate: '-',
    description: '針對國內外旅遊設計的短期意外險商品。'
  },
  {
    code: 'PROD-SAV-003',
    name: '富貴年年儲蓄險',
    category: '儲蓄險',
    status: 'closed',
    version: '1.0',
    launchDate: '2022-01-01',
    description: '已停售商品，提供穩定的年金給付。'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'success'
    case 'draft': return 'warning'
    case 'closed': return 'grey'
    default: return 'default'
  }
}
</script>

<template>
  <v-container fluid>
    <v-card class="rounded-lg" elevation="2">
      <v-card-title class="d-flex align-center py-4 px-6 border-b">
        <div>
          <div class="text-h6 font-weight-bold">商品工廠 (Product Factory)</div>
          <div class="text-caption text-medium-emphasis">保險商品設計、上架與版本管理</div>
        </div>
        <v-spacer></v-spacer>
        <v-btn color="primary" prepend-icon="mdi-plus">新增商品</v-btn>
      </v-card-title>

      <v-table hover>
        <thead>
          <tr>
            <th>商品代碼</th>
            <th>商品名稱</th>
            <th>類別</th>
            <th>版本</th>
            <th>上架日期</th>
            <th>狀態</th>
            <th class="text-right">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.code">
            <td class="font-weight-bold">{{ product.code }}</td>
            <td>
              <div class="font-weight-bold">{{ product.name }}</div>
              <div class="text-caption text-medium-emphasis text-truncate" style="max-width: 200px">{{ product.description }}</div>
            </td>
            <td><v-chip size="x-small" variant="outlined">{{ product.category }}</v-chip></td>
            <td>v{{ product.version }}</td>
            <td>{{ product.launchDate }}</td>
            <td>
              <v-chip :color="getStatusColor(product.status)" size="small" label>
                {{ product.status.toUpperCase() }}
              </v-chip>
            </td>
            <td class="text-right">
              <v-btn icon="mdi-pencil" size="small" variant="text" color="primary"></v-btn>
              <v-btn icon="mdi-content-copy" size="small" variant="text" color="info"></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>
