<template>
  <el-upload
    class="file-upload"
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
      <div class="el-upload__tip" v-if="tip">jpg/png files with a size less than 500kb</div>
    </template>
  </el-upload>
</template>

<script setup lang="ts" name="FileUpload">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
// @ts-ignore
import Queue from 'promise-queue-plus'
import md5 from '@/utils/md5'
import type {
  ElUpload,
  UploadFile,
  UploadUserFile,
  UploadFiles,
  UploadRawFile,
  UploadProgressEvent,
  UploadRequestOptions
} from 'element-plus'
import { getUploadTask } from '@/api/file/upload'
import { generatePartUploadUrl, getUploadParts, initMultipartUpload } from '@/api/file/file'
import type { UploadResponse } from '@/api/file/model/Upload'
import type { PartResponse, UploadPartUrlRequest, InitPartResponse } from '@/api/file/model/File'
import axios from 'axios'

interface Props {
  title: string
  limit?: number
  tip?: string
}

interface UploadQueue {
  id: number
  queue: Queue
}

withDefaults(defineProps<Props>(), {
  title: '拖拽文件或者 <em>点击上传文件</em>',
  limit: null
})

const uploadRef = ref<InstanceType<typeof ElUpload>>()
const fileList = ref<UploadUserFile[]>([])
const uploadQueues = ref<UploadQueue>({} as UploadQueue)
/**
 * 1、自定义方法顺序
 * 文件上传成功方法顺序：
 *    handlerChange-->beforeUpload-->handlerRequest-->handlerSuccess(handlerRequest有返回)-->handlerChange(handlerSuccess返回Promise.resolve())
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
 * 文件删除事件
 * @param uploadFile 要删除的文件
 * @param uploadFiles 所有文件列表
 */
const handlerRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log('handlerRemove', uploadFile, uploadFiles)
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
 * @param files 所有文件列表
 * @param uploadFiles 已经上传的文件列表
 */
const handlerExceed = (files: File[], uploadFiles: UploadUserFile[]) => {
  console.log('handlerExceed', files, uploadFiles)
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
 * @param uploadFiles 所有文件列表
 */
const handlerBeforeRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log('handlerBeforeRemove', uploadFile, uploadFiles)
}

// const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

// 获取从开始上传到现在的平均速度（byte/s）
const getSpeed = (startTime: number, uploadedSize: number, lastUploadedSize: number) => {
  // 已上传的总大小 - 上次上传的总大小（断点续传）= 本次上传的总大小（byte）
  const intervalSize = uploadedSize - lastUploadedSize
  const nowMs = new Date().getTime()
  // 时间间隔（s）
  const intervalTime = (nowMs - startTime) / 1000
  return intervalSize / intervalTime
}

/**
 * 更新上传进度
 * @param increment 为已上传的进度增加的字节量
 * @param uploadedSize 已经上传的大小
 * @param options
 */
const updateProcess = (
  increment: number,
  uploadedSize: number,
  options: UploadRequestOptions
): number => {
  const totalSize = options.file.size | 0
  // increment = Number(increment)
  const { onProgress } = options
  let factor = 1000 // 每次增加1000 byte
  let from = 0
  // 通过循环一点一点的增加进度
  while (from <= increment) {
    from += factor
    uploadedSize += factor
    const percent = Number(Math.round((uploadedSize / totalSize) * 100).toFixed(2))
    onProgress({ percent: percent } as UploadProgressEvent)
  }
  return uploadedSize
  // const speed = getSpeed()
  // const remainingTime = speed !== 0 ? Math.ceil((totalSize - uploadedSize) / speed) + 's' : '未知'
  // console.log('剩余大小：', (totalSize - uploadedSize) / 1024 / 1024, 'mb')
  // console.log('当前速度：', (speed / 1024 / 1024).toFixed(2), 'mbps')
  // console.log('预计完成：', remainingTime)
}

/**
 * 自定义文件上传方法
 * 1、获取要上传的文件唯一标识
 * 2、根据唯一标识获取上传记录
 * 3.1、如果记录不为空，判断是否已经上传完成，如果上传完成返回地址，并设置进度为100%（结束）
 * 3.2、如果未上传完成，获取已经上传完成的分片编号，获取每个未上传分片的上传地址
 * 3.3、如果上传记录为空，则初始化一个上传记录，并根据分片信息获取每个分片的上传地址
 * 4、根据拿到的上传地址完成分片数据的上传并更新进度
 * 5、完成文件的合并并返回文件地址（结束）
 * @param options  文件选项
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
  const file = options.file
  // 初始化参数
  let lastUploadedSize = 0 // 上次断点续传时上传的总大小
  let uploadedSize = 0 // 已上传的大小
  const totalSize = file.size || 0 // 文件总大小
  let startTime = new Date().getTime() // 开始上传的时间
  let customChunkSize: number = 5 * 1024 * 1024
  const uploadRequest: UploadPartUrlRequest = {
    key: '',
    uploadId: '',
    contentType: file.type,
    partNumbers: []
  }
  // 获取文件MD5
  const identifier: string = await md5(file)
  const task: UploadResponse = await getUploadTask(identifier)
  if (task) {
    const { key, uploadId, finished, url, chunkCount, chunkSize } = task
    customChunkSize = chunkSize
    if (finished && url) {
      // 已经上传完成
      options.onProgress({ percent: 100 } as UploadProgressEvent)
      return url
    } else {
      // 获取已经上传的分片列表
      const notUploadPartNumbers = [] // 未上传的分片编号
      const parts: PartResponse[] = (await getUploadParts({ key, uploadId })) || []
      for (let i = 1; i <= chunkCount; i++) {
        const uploadPart: PartResponse = parts.find((part: PartResponse) => part.partNumber === i)
        if (uploadPart) {
          lastUploadedSize += uploadPart.size
          uploadedSize = updateProcess(uploadPart.size, uploadedSize, options)
          const speed = getSpeed(startTime, uploadedSize, lastUploadedSize)
          const remainingTime =
            speed != 0 ? Math.ceil((totalSize - uploadedSize) / speed) + 's' : '未知'
          console.log('预计完成：', remainingTime)
        } else {
          notUploadPartNumbers.push(i)
          uploadRequest.partNumbers = notUploadPartNumbers
        }
      }
    }
  } else {
    // 未上传过文件
    const fileName = file.name
    const initTask: InitPartResponse = await initMultipartUpload({
      identifier,
      fileName,
      totalSize,
      chunkSize: customChunkSize
    })
    const chunkCount: number = initTask.chunkCount
    const { key, uploadId } = initTask
    uploadRequest.key = key
    uploadRequest.uploadId = uploadId
    const partNumbers = [] // 未上传的分片编号
    for (let i = 1; i <= chunkCount; i++) {
      partNumbers.push(i)
    }
    uploadRequest.partNumbers = partNumbers
  }
  const failArr: any[] = []
  const queue: Queue = Queue(5, {
    retry: 3, //Number of retries
    retryIsJump: false, //retry now?
    workReject: function (reason: any) {
      failArr.push(reason)
    },
    queueEnd: function () {
      return failArr
    }
  })
  // @ts-ignore
  uploadQueues.value[file.uid] = queue
  const urls = await generatePartUploadUrl(uploadRequest)
  urls.forEach((item) => {
    const start = customChunkSize * (item.partNumber - 1)
    const end = start + customChunkSize
    const blob: Blob = file.slice(start, end)
    queue.put(() => {
      axios
        .put(item.uploadUrl, blob, {
          headers: { 'Content-Type': 'application/octet-stream' }
        })
        .then(() => {
          uploadedSize = updateProcess(blob.size, uploadedSize, options)
        })
    })
    queue.start()
  })
}
</script>
<style scoped>
.file-upload {
  width: 100%;
}
</style>
