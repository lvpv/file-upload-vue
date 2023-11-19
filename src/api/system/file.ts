import http from '@/http'
import type { UploadInfoResponse } from '@/api/system/types/File'

export const uploadFile = async () => {
  return await http.get<string>({})
}

export const getUserInfo = async (id: number) => {
  return await http.get<any>({
    url: `/user/info?id=${id}`
  })
}

export const getDownloadPath = async (path: string) => {
  return await http.get<string>({
    url: `/file/download/url?path=${path}`
  })
}

export const getUploadInfo = (identifier: string) => {
  return http.get<UploadInfoResponse>({
    url: `/file/upload/info?identifier=${identifier}`
  })
}
