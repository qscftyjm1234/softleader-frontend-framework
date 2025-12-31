<script setup lang="ts">
import SchemaRenderer from '~/components/renderer/SchemaRenderer.vue'
import type { PageSchema } from '~/core/schema/types'

const pageSchema: PageSchema = {
  type: 'Page',
  blocks: [
    {
      type: 'v-row',
      children: [
        {
          type: 'v-col',
          props: {
            cols: '12'
          },
          children: [
            {
              type: 'SmartTable',
              props: {
                title: 'Table 元件 (API 串接)',
                api: '/api/users',
                columns: [
                  {
                    label: 'ID',
                    field: 'id'
                  },
                  {
                    label: '名稱',
                    field: 'name'
                  },
                  {
                    label: 'Email',
                    field: 'email'
                  },
                  {
                    label: '角色',
                    field: 'role'
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      type: 'v-row',
      children: [
        {
          type: 'v-col',
          props: {
            cols: '12',
            md: '4'
          },
          children: [
            {
              type: 'SmartCard',
              props: {
                title: '總銷售額',
                subtitle: '本月累計',
                text: '$1,234,567',
                icon: 'mdi-currency-usd',
                color: 'primary'
              }
            }
          ]
        },
        {
          type: 'v-col',
          props: {
            cols: '12',
            md: '4'
          },
          children: [
            {
              type: 'SmartCard',
              props: {
                title: '活躍用戶',
                subtitle: '即時在線',
                text: '8,901 人',
                icon: 'mdi-account-group',
                color: 'success'
              }
            }
          ]
        },
        {
          type: 'v-col',
          props: {
            cols: '12',
            md: '4'
          },
          children: [
            {
              type: 'SmartCard',
              props: {
                title: '系統負載',
                subtitle: 'CPU 使用率',
                text: '34%',
                icon: 'mdi-cpu-64-bit',
                color: 'warning'
              }
            }
          ]
        }
      ]
    },
    {
      type: 'v-row',
      children: [
        {
          type: 'v-col',
          props: {
            cols: '12'
          },
          children: [
            {
              type: 'SmartComplexWidget'
            }
          ]
        }
      ]
    }
  ]
}
</script>

<template>
  <div>
    <SchemaRenderer
      v-for="(block, i) in pageSchema.blocks"
      :key="i"
      :schema="block"
    />
  </div>
</template>
