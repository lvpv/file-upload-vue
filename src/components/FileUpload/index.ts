import axios from 'axios'
import { getFileInfo, initMultipart, generateMultipartUrl } from '@/api/system/file'
import type {
  FileInfoResponse,
  InitMultipartRequest,
  InitMultipartResponse,
  MultipartUrlRequest,
  MultipartUrlResponse
} from '@/api/system/model/File'

export const handlerFileInfo = async (
  identifier: string,
  file: File
): Promise<FileInfoResponse> => {
  const task = await getFileInfo(identifier)
  if (task && task?.url) {
    console.log('task', task)
    return Promise.resolve(task)
  }
  const DEFAULT_SIZE: number = 20 * 1024 * 1024
  const request: InitMultipartRequest = {
    identifier,
    type: file.type,
    name: file.name,
    totalSize: file.size,
    chunkSize: DEFAULT_SIZE
  }
  const initResponse: InitMultipartResponse = await initMultipart(request)
  const { key, uploadId, chunkSize, chunkCount, finished, url } = initResponse
  console.log(chunkCount)
  const initTask: FileInfoResponse = {
    key,
    uploadId,
    chunkSize,
    chunkCount,
    finished,
    url
  }
  return Promise.resolve(initTask)
}

export const handlerUploadPart = async (
  partNumber: number,
  uploadId: string,
  key: string,
  chunkSize: number,
  file: File
) => {
  const contentType = file.type || 'application/octet-stream'

  const request: MultipartUrlRequest = {
    key,
    partNumber,
    uploadId
  }
  const response: MultipartUrlResponse = await generateMultipartUrl(request)
  const start = chunkSize * (partNumber - 1)
  const end = start + chunkSize
  const filePart = file.slice(start, end)
  const { uploadUrl } = response
  await axios.request({
    url: uploadUrl,
    method: 'PUT',
    data: filePart,
    headers: { 'Content-Type': contentType }
  })
  return Promise.resolve({
    partNumber,
    size: filePart.size
  })
}
