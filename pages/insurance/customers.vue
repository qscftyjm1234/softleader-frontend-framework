<script setup lang="ts">
const customers = [
  {
    id: 'CUST-001',
    name: '陳大文',
    email: 'david.chen@example.com',
    phone: '0912-345-678',
    avatar: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    policyCount: 3,
    totalPremium: 48500,
    tags: ['VIP', '高資產'],
    lastContact: '2023-10-20'
  },
  {
    id: 'CUST-002',
    name: '林小美',
    email: 'may.lin@example.com',
    phone: '0922-123-456',
    avatar: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    policyCount: 1,
    totalPremium: 12000,
    tags: ['新客戶'],
    lastContact: '2023-10-25'
  },
  {
    id: 'CUST-003',
    name: '張志明',
    email: 'jimmy.chang@example.com',
    phone: '0933-987-654',
    avatar: '',
    policyCount: 5,
    totalPremium: 156000,
    tags: ['VIP', '理賠頻繁'],
    lastContact: '2023-10-15'
  },
  {
    id: 'CUST-004',
    name: '王春嬌',
    email: 'cindy.wang@example.com',
    phone: '0955-555-666',
    avatar: '',
    policyCount: 2,
    totalPremium: 8500,
    tags: [],
    lastContact: '2023-10-01'
  }
]
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="customer in customers" :key="customer.id" cols="12" md="6" lg="3">
        <v-card class="rounded-lg h-100" elevation="2">
          <v-card-text class="text-center pt-6">
            <v-avatar size="80" class="mb-4 elevation-2">
              <v-img v-if="customer.avatar" :src="customer.avatar"></v-img>
              <span v-else class="text-h4 font-weight-bold text-primary bg-primary-lighten-5 w-100 h-100 d-flex align-center justify-center">
                {{ customer.name.charAt(0) }}
              </span>
            </v-avatar>
            
            <div class="text-h6 font-weight-bold mb-1">{{ customer.name }}</div>
            <div class="text-caption text-medium-emphasis mb-4">{{ customer.id }}</div>

            <div class="d-flex justify-center flex-wrap gap-1 mb-4">
              <v-chip v-for="tag in customer.tags" :key="tag" size="x-small" color="primary" variant="tonal" class="mr-1 mb-1">
                {{ tag }}
              </v-chip>
            </div>

            <v-divider class="mb-4"></v-divider>

            <v-row no-gutters class="text-center">
              <v-col cols="6" class="border-e">
                <div class="text-caption text-medium-emphasis">有效保單</div>
                <div class="text-h6 font-weight-bold">{{ customer.policyCount }}</div>
              </v-col>
              <v-col cols="6">
                <div class="text-caption text-medium-emphasis">總保費</div>
                <div class="text-h6 font-weight-bold">${{ (customer.totalPremium / 1000).toFixed(1) }}k</div>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="border-t">
            <v-btn block color="primary" variant="text">查看全貌 (Customer 360)</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
