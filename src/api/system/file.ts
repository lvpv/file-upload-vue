import http from '@/http'
import type {
  FileInfoResponse,
  InitMultipartRequest,
  InitMultipartResponse,
  ListMultipartRequest,
  ListMultipartResponse,
  MultipartUrlRequest,
  MultipartUrlResponse,
  CompleteMultipartRequest,
  CompleteMultipartResponse,
  AbortMultipartRequest
} from '@/api/system/model/File'

const FILE_BASE_PATH: string = '/system/file'

enum FILE_API {
  UPLOAD = `${FILE_BASE_PATH}/upload`,
  INFO = `${FILE_BASE_PATH}/info`,
  INIT = `${FILE_BASE_PATH}/init/multipart`,
  LIST = `${FILE_BASE_PATH}/list/multipart`,
  URL = `${FILE_BASE_PATH}/generate/multipart/url`,
  COMPLETE = `${FILE_BASE_PATH}/complete/multipart`,
  ABORT = `${FILE_BASE_PATH}/abort/multipart`,
  DELETE = `${FILE_BASE_PATH}/delete`
}

export const uploadFile = (data: { file: File }): Promise<string> => {
  return http.post<string>({ url: FILE_API.UPLOAD, data })
}

export const getFileInfo = (identifier: string): Promise<FileInfoResponse> => {
  return http.get<FileInfoResponse>({ url: `${FILE_API.INFO}/${identifier}` })
}

export const initMultipart = (data: InitMultipartRequest): Promise<InitMultipartResponse> => {
  return http.post<InitMultipartResponse>({ url: FILE_API.INIT, data })
}

export const listMultipart = (data: ListMultipartRequest): Promise<ListMultipartResponse> => {
  return http.post<ListMultipartResponse>({ url: FILE_API.LIST, data })
}

export const generateMultipartUrl = (data: MultipartUrlRequest): Promise<MultipartUrlResponse> => {
  return http.post<MultipartUrlResponse>({ url: FILE_API.URL, data })
}

export const completeMultipart = (
  data: CompleteMultipartRequest
): Promise<CompleteMultipartResponse> => {
  return http.post<CompleteMultipartResponse>({ url: FILE_API.COMPLETE, data })
}

export const abortMultipart = (data: AbortMultipartRequest): Promise<Boolean> => {
  return http.post<Boolean>({ url: FILE_API.ABORT, data })
}

export const deleteFile = (identifier: string): Promise<Boolean> => {
  return http.delete<Boolean>({ url: `${FILE_API.DELETE}?identifier=${identifier}` })
}
