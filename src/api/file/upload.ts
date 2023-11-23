import http from '@/http'
import type { UploadResponse } from '@/api/file/model/Upload'

export enum UploadApi {
  INFO_BY_ID = '/file/upload/task',
  INFO_BY_IDENTIFIER = '/file/upload/task/identifier'
}

export const getUploadTaskById = (id: string): Promise<UploadResponse> => {
  return http.get<UploadResponse>({ url: `${UploadApi.INFO_BY_ID}?id=${id}` })
}
export const getUploadTask = (identifier: string): Promise<UploadResponse> => {
  return http.get<UploadResponse>({
    url: `${UploadApi.INFO_BY_IDENTIFIER}?identifier=${identifier}`
  })
}
