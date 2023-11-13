<template>
  <el-drawer v-model="uploadVisible">
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      :auto-upload="false"
      :multiple="true"
      :on-change="handleChange"
      :http-request="handlerRequest"
      :before-upload="handlerUploadBefore"
    >
      <el-button type="primary">{{ title }}</el-button>
      <template #tip>
        <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
      </template>
    </el-upload>
    <template #footer>
      <el-button>取消</el-button>
      <el-button @click="handlerUpload">上传</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="FileUpload">
import { ref } from 'vue'
import type { ElUpload } from 'element-plus'
import type {
  UploadFile,
  UploadUserFile,
  UploadFiles,
  UploadRawFile,
  UploadRequestOptions
} from 'element-plus'

interface Props {
  title: string
  limit?: number
  files: File[]
}

const uploadRef = ref<InstanceType<typeof ElUpload>>()
const uploadVisible = ref(false)
withDefaults(defineProps<Props>(), {
  title: '上传文件',
  limit: 5,
  files: () => []
})

const fileList = ref<UploadUserFile[]>([])

const openUploadDrawer = () => {
  uploadVisible.value = true
}

defineExpose({ openUploadDrawer })
const handlerUploadBefore = (rawFile: UploadRawFile) => {
  console.log('before upload', rawFile)
}
const handleChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log('handlerChange', uploadFile, uploadFiles)
}

const handlerRequest = (options: UploadRequestOptions) => {
  console.log('handlerRequest', options)
}

const handlerUpload = () => {}
</script>
<style scoped></style>
