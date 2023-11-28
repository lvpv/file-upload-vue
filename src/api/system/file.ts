import http from '@/http'
import type {
  AbortMultipartRequest,
  CompleteMultipartRequest,
  CompleteMultipartResponse,
  FileInfoResponse,
  InitMultipartRequest,
  InitMultipartResponse,
  ListMultipartRequest,
  ListMultipartResponse,
  MultipartUrlRequest,
  MultipartUrlResponse
} from '@/api/system/model/File'

enum FILE_API {
  UPLOAD = `/system/file/upload`,
  INFO = `/system/file/info`,
  INIT = `/system/file/init/multipart`,
  LIST = `/system/file/list/multipart`,
  URL = `/system/file/generate/multipart/url`,
  COMPLETE = `/system/file/complete/multipart`,
  ABORT = `/system/file/abort/multipart`,
  DELETE = `/system/file/delete`
}

export const uploadFile = (data: { file: File }) => {
  return http.post<string>({ url: FILE_API.UPLOAD, data })
}

export const getFileInfo = (identifier: string) => {
  return http.get<FileInfoResponse>({ url: `${FILE_API.INFO}/${identifier}` })
}

export const initMultipart = (data: InitMultipartRequest) => {
  return http.post<InitMultipartResponse>({ url: FILE_API.INIT, data })
}

export const listMultipart = (data: ListMultipartRequest) => {
  return http.post<ListMultipartResponse[]>({ url: FILE_API.LIST, data })
}

export const generateMultipartUrl = (data: MultipartUrlRequest) => {
  return http.post<MultipartUrlResponse>({ url: FILE_API.URL, data })
}

export const completeMultipart = (data: CompleteMultipartRequest) => {
  return http.post<CompleteMultipartResponse>({
    url: FILE_API.COMPLETE,
    data
  })
}

export const abortMultipart = (data: AbortMultipartRequest) => {
  return http.post<Boolean>({ url: FILE_API.ABORT, data })
}

export const deleteFile = (identifier: string): Promise<Boolean> => {
  return http.delete<Boolean>({ url: `${FILE_API.DELETE}?identifier=${identifier}` })
}
