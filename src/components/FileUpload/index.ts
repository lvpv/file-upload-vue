import { ElNotification } from 'element-plus'
import md5 from '@/utils/md5'
import { getUploadInfo } from '@/api/system/file'

export const getTaskInfo = async (file: File) => {
  const identifier = await md5(file)
  const info = await getUploadInfo(identifier)
  return info
}

/*export const handleHttpRequest = async (options): Promise<string> => {
  const file = options.file
  const task = await getTaskInfo(file)
  if (task) {
    const { finished, path, taskRecord } = task //
    const { fileIdentifier: identifier } = taskRecord
    if (finished) {
      return path
    } else {
      const errorList = await handleUpload(file, taskRecord, options)
      if (errorList.length > 0) {
        ElNotification.error({
          title: '文件上传错误',
          message: '部分分片上次失败，请尝试重新上传文件'
        })
        return
      }
    }
  } else {
    ElNotification.error({
      title: '文件上传错误',
      message: '获取上传任务失败'
    })
  }*/
}
