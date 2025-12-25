<script setup lang="ts">
import SchemaRenderer from '~/components/renderer/SchemaRenderer.vue'
import type { PageSchema } from '~/core/schema/types'

const pageSchema: PageSchema = {
  type: 'Page',
  blocks: [
    {
      type: 'SmartCard',
      props: {
        title: '承保項目管理',
        subtitle: '設定保險商品的承保範圍',
        icon: 'mdi-shield-check',
        class: 'mb-4'
      }
    },
    {
      type: 'SmartTable',
      props: {
        title: '承保項目列表',
        columns: [
          {
            label: '功能',
            field: 'actions',
            sortable: false
          },
          {
            label: '險別群組',
            field: 'productGroupType'
          },
          {
            label: '承保項目代碼',
            field: 'code'
          },
          {
            label: '版本',
            field: 'version'
          },
          {
            label: '承保項目頁面名稱',
            field: 'displayName'
          },
          {
            label: '作業狀態',
            field: 'opStatus'
          },
          {
            label: '上市日期',
            field: 'effDate'
          },
          {
            label: '下市日期',
            field: 'expDate'
          },
          {
            label: '建立人員',
            field: 'createdBy'
          },
          {
            label: '建立日期',
            field: 'createdDate'
          },
          {
            label: '修改人員',
            field: 'lastModifiedBy'
          },
          {
            label: '修改日期',
            field: 'lastModifiedDate'
          }
        ],
        data: []
      }
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
