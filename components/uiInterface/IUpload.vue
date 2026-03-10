<script setup lang="ts">
import type { UploadFile, UploadChangeParam } from 'ant-design-vue'

/**
 * Component: IUpload (上傳元件)
 *
 * 介面層 (Interface Layer) 標準元件。
 * 封裝 Ant Design Vue 的 a-upload，提供企業級 SaaS 視覺風格。
 */

interface Props {
  fileList?: UploadFile[]
  action?: string
  accept?: string
  multiple?: boolean
  disabled?: boolean
  beforeUpload?: (file: any, fileList: any[]) => boolean | Promise<any>
}

const props = withDefaults(defineProps<Props>(), {
  fileList: () => [],
  action: '/api/upload',
  accept: undefined,
  multiple: false,
  disabled: false,
  beforeUpload: undefined
})

const emit = defineEmits<{
  'update:fileList': [fileList: UploadFile[]]
  change: [info: UploadChangeParam]
}>()

const handleUpdateFileList = (fileList: UploadFile[]) => {
  emit('update:fileList', fileList)
}

const handleChange = (info: UploadChangeParam) => {
  emit('change', info)
}
</script>

<template>
  <div class="i-upload-wrapper">
    <a-upload
      v-model:file-list="props.fileList"
      :action="action"
      @change="handleChange"
    >
      <slot>
        <div class="default-upload-trigger">
          <IIcon
            icon="mdi-upload"
            size="24"
          />
          <span>點擊開始上傳</span>
        </div>
      </slot>
    </a-upload>
  </div>
</template>

<style scoped lang="scss">
.i-upload-wrapper {
  :deep(.ant-upload) {
    width: 100%;
  }

  .default-upload-trigger {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    border: 2px dashed #e2e8f0;
    border-radius: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #f8fafc;

    &:hover {
      border-color: #3b82f6;
      background: #eff6ff;
    }

    span {
      margin-top: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #64748b;
    }
  }
}
</style>
