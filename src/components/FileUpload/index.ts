import { getUploadTask } from '@/api/file/upload'
import { initMultipartUpload, generateSinglePartUrl } from '@/api/file/file'
import type { InitPartRequest } from '@/api/file/model/File'
import type { UploadResponse } from '@/api/file/model/Upload'
import type { SinglePartUrlRequest } from '@/api/file/model/File'
import axios from 'axios'

export const handlerUploadTask = async (
  identifier: string,
  file: File
): Promise<UploadResponse> => {
  const task = await getUploadTask(identifier)
  if (task && task?.url) {
    return Promise.resolve(task)
  }
  const DEFAULT_SIZE: number = 20 * 1024 * 1024
  const request: InitPartRequest = {
    identifier,
    fileName: file.name,
    totalSize: file.size,
    chunkSize: DEFAULT_SIZE
  }
  const initTask = await initMultipartUpload(request)
  return Promise.resolve(initTask)
}

export const handlerUploadPart = async (
  partNumber: number,
  uploadId: string,
  contentType: string,
  key: string,
  chunkSize: number,
  file: File
) => {
  const request: SinglePartUrlRequest = {
    key,
    partNumber,
    uploadId,
    contentType: file.type
  }
  const response = await generateSinglePartUrl(request)
  const start = chunkSize * (partNumber - 1)
  const end = start + chunkSize
  const filePart = file.slice(start, end)
  await axios.request({
    url: response.uploadUrl,
    method: 'PUT',
    data: filePart,
    headers: { 'Content-Type': contentType }
  })
  return Promise.resolve({
    partNumber,
    size: filePart.size
  })
}
