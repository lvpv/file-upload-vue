import http from '@/http'
import type { UploadInfoResponse } from '@/api/system/types/File'

export const getDownloadPath = (path: string) => {
  return http.get<string>({
    url: `/file/download/url?path=${path}`
  })
}

export const getUploadInfo = (identifier: string): Promise<UploadInfoResponse> => {
  return http.get<UploadInfoResponse>({
    url: `/file/upload/task?identifier=${identifier}`
  })
}

export const createMultipart = (data: any) => {
  return http.post<any>({ url: '', data, headers: {} })
}
