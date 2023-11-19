<template>
  <el-drawer
    append-to-body
    v-model="uploadVisible"
    size="50%"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :before-close="beforeClose"
  >
    <el-upload
      ref="uploadRef"
      action="#"
      :headers="{}"
      method="post"
      :multiple="true"
      :data="{}"
      name="file"
      :with-credentials="false"
      show-file-list
      :drag="true"
      accept="image/*"
      :limit="limit"
      :disabled="false"
      :auto-upload="true"
      list-type="text"
      v-model:file-list="fileList"
      :on-preview="handlerPreview"
      :on-remove="handlerRemove"
      :on-success="handlerSuccess"
      :on-error="handlerError"
      :on-progress="handlerProgress"
      :on-change="handleChange"
      :on-exceed="handlerExceed"
      :before-upload="handlerUploadBefore"
      :before-remove="handlerBeforeRemove"
      :http-request="handlerRequest"
    >
      <Icon icon="ep:upload-filled" :height="48" :width="48" />
      <div class="el-upload__text">拖拽文件或者 <em>点击上传文件</em></div>
      <template #tip>
        <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
      </template>
    </el-upload>
    <template #footer>
      <el-button @click="handlerCancel">取消</el-button>
      <el-button @click="handlerUpload">上传</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="FileUploadDrawer">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
// import md5 from '@/utils/md5'
import type { FileInfo } from '@/api/system/User.d.ts'
import type {
  ElUpload,
  UploadFile,
  UploadUserFile,
  UploadFiles,
  UploadRawFile,
  UploadProgressEvent,
  UploadRequestOptions
} from 'element-plus'

interface Props {
  title: string
  limit?: number
}

defineEmits<{
  (e: 'change', files: FileInfo[]): void
}>()

withDefaults(defineProps<Props>(), {
  title: '拖拽文件或者 <em>点击上传文件</em>',
  limit: 2
})

const uploadRef = ref<InstanceType<typeof ElUpload>>()
const uploadVisible = ref(false)
const fileList = ref<UploadUserFile[]>([])

/**
 * 自定义打开抽屉方法
 */
const openUploadDrawer = (files: UploadUserFile[]) => {
  uploadVisible.value = true
  if (files) {
    fileList.value = files
  }
}

/**
 * 向父组件暴露打开抽屉的方法
 */
defineExpose({ openUploadDrawer })

/**
 * 抽屉关闭之前的监听方法
 * @param done 是否取消关闭操作
 */
const beforeClose = (done: (cancel?: boolean) => void) => {
  done(true)
}
/**
 * 1、自定义方法顺序
 * 文件上传成功方法顺序：
 *    handlerChange-->beforeUpload-->handlerRequest-->handlerSuccess-->handlerChange
 * 文件上传失败方法顺序：
 *    handlerChange-->beforeUpload-->handlerRequest-->handlerError(handlerSuccess返回Promise.reject())-->handlerChange
 * 文件点击(预览)方法顺序: handlerPreview
 * 文件删除方法顺序: handlerBeforeRemove-->handlerRemove
 * 2、组件实例方法：
 *  abort:取消上传 = (file: UploadFile) => void
 *  submit:手动上传 = () => void
 *  clearFiles:清空已经上传的文件列表 = (status?: UploadStatus[]) => void [不支持在before-upload中调用]
 *  handleStart:手动选择文件 = (rawFile: UploadRawFile) => void
 *  handleRemove:手动移除文件 = (file: UploadFile | UploadRawFile) => void
 */

/**
 * 预览事件
 * @param uploadFile 预览的文件
 */
const handlerPreview = (uploadFile: UploadFile) => {
  console.log('handlerPreview', uploadFile)
}

/**
 * 文件上传成功事件
 * @param response http请求响应数据(handlerRequest返回的数据)
 * @param uploadFile 上传成功的文件
 * @param uploadFiles 所有文件列表
 */
const handlerSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log('handlerSuccess', response, uploadFile, uploadFiles)
  console.log('handlerSuccess', fileList.value)
}

/**
 * 文件上传失败事件
 * @param error 错误对象
 * @param uploadFile 上传失败的文件
 * @param uploadFiles 所有文件列表
 */
const handlerError = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log('handlerError', error, uploadFile, uploadFiles)
}

/**
 * 文件上传时的进度事件
 * @param evt 事件对象
 * @param uploadFile 当前正在上传的文件
 * @param uploadFiles 所有文件列表
 */
const handlerProgress = (
  evt: UploadProgressEvent,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  console.log('handlerProgress', evt, uploadFile, uploadFiles)
}

/**
 * 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
 * @param uploadFile 当前改变的文件
 * @param uploadFiles 所有文件列表
 */
const handleChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log('handlerChange', uploadFile, uploadFiles)
}

/**
 * 文件超出限制事件
 * @param files 超出的文件列表(多选时会超出多个文件)
 * @param uploadFiles 已经上传的文件列表
 */
const handlerExceed = (files: File[], uploadFiles: UploadUserFile[]) => {
  console.log('handlerExceed', files)
  console.log('handlerExceed: files.length', files.length)
  console.log('handlerExceed', uploadFiles)
  console.log('handlerExceed:uploadFiles.length', uploadFiles.length)
}

/**
 * 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传
 * @param rawFile 文件对象
 */
const handlerUploadBefore = (rawFile: UploadRawFile) => {
  console.log('before upload', rawFile)
}

/**
 * 删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 false 或者返回 Promise 且被 reject，则停止删除。
 * @param uploadFile 要删除的文件
 * @param uploadFiles 所有文件列表(包含被删除的文件)
 */
const handlerBeforeRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log('handlerBeforeRemove', uploadFile)
  console.log('handlerBeforeRemove', uploadFiles)
  console.log('handlerBeforeRemove', uploadFiles.length)
}

/**
 * 文件删除事件
 * @param uploadFile 要删除的文件
 * @param uploadFiles 所有文件列表(不包括已经删除的文件)
 */
const handlerRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log('handlerRemove', uploadFile)
  console.log('handlerRemove', uploadFiles)
  console.log('handlerRemove', uploadFiles.length)
}

// const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))
/**
 * 自定义文件上传方法
 * @param options 当前文件选项
 * UploadRequestOptions {
 *     action: string;
 *     method: string;
 *     data: Record<string, string | Blob | [string | Blob, string]>;
 *     filename: string;
 *     file: UploadRawFile;
 *     headers: Headers | Record<string, string | number | null | undefined>;
 *     onError: (evt: UploadAjaxError) => void;
 *     onProgress: (evt: UploadProgressEvent) => void;
 *     onSuccess: (response: any) => void;
 *     withCredentials: boolean;
 * }
 */

const handlerRequest = async (options: UploadRequestOptions) => {
  /*  const file: UploadRawFile = options.file
    const identifier = await md5(file)
    console.log(identifier)
    let currentPercent: number = 0
    const timeId = setInterval(() => {
      currentPercent = currentPercent + 5
      // @ts-ignore 设置进度
      options.onProgress({ percent: currentPercent }) // 会调用自定义的handlerProgress方法
      console.log(currentPercent)
    }, 500)
    await sleep(10000)
    clearInterval(timeId)
    // return 'success'
    return Promise.resolve('success')
    // return Promise.reject(new Error('error')) // 模拟失败*/
  console.log(options)
  return 'success'
}

/**
 * 抽屉提交按钮事件
 */
const handlerUpload = () => {
  console.log(fileList.value)
  // emits('changeFiles', fileList.value)
}

/**
 * 抽屉取消按钮事件
 */
const handlerCancel = () => {
  uploadVisible.value = false
}
</script>
<style scoped></style>
