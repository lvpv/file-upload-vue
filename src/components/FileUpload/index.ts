import { ElNotification } from 'element-plus'
import md5 from '@/utils/md5'
import { getUploadInfo } from '@/api/system/file'

/**
 * 分片上传文件
 * @param file 要上传的文件
 *
 * 1、获取要上传的文件唯一标识
 * 2、根据唯一标识获取上传记录
 * 3.1、如果记录不为空，判断是否已经上传完成，如果上传完成返回地址，并设置进度为100%（结束）
 * 3.2、如果未上传完成，获取已经上传完成的分片编号，获取每个未上传分片的上传地址
 * 3.3、如果上传记录为空，则初始化一个上传记录，并根据分片信息获取每个分片的上传地址
 * 4、根据拿到的上传地址完成分片数据的上传并更新进度
 * 5、完成文件的合并并返回文件地址（结束）
 */
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
  }
}*/
