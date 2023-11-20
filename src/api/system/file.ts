import http from '@/http'
import type { UploadInfoResponse } from '@/api/system/types/File'

export const uploadFile = async () => {
  return await http.get<string>({})
}

export const getUserInfo = (id: number) => {
  return http.get<any>({
    url: `/user/info?id=${id}`
  })
}

export const getDownloadPath = (path: string) => {
  return http.get<string>({
    url: `/file/download/url?path=${path}`
  })
}

export const getUploadInfo = (identifier: string): Promise<UploadInfoResponse> => {
  return http.get<UploadInfoResponse>({
    url: `/file/upload/info?identifier=${identifier}`
  })
}

export const createMultipart = (data: any) => {
  return http.post<any>({ url: '', data, headers: {} })
}
