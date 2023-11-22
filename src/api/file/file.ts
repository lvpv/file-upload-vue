import http from '@/http'
import type {
  InitPartRequest,
  InitPartResponse,
  ListPartRequest,
  PartResponse,
  UploadPartUrlRequest,
  UploadPartUrlResponse
} from '@/api/file/model/File'

export enum FileApi {
  LIST_PART = '/file/multipart/list',
  INIT_PART = '/file/multipart/init',
  UPLOAD_PART_URL = '/file/multipart/init',
  INFO_BY_IDENTIFIER = '/file/upload/task/identifier'
}

export const getUploadParts = (data: ListPartRequest): Promise<PartResponse[]> => {
  return http.post<PartResponse[]>({ url: FileApi.LIST_PART, data })
}

export const initMultipartUpload = (data: InitPartRequest): Promise<InitPartResponse> => {
  return http.post<InitPartResponse>({ url: FileApi.INIT_PART, data })
}

export const generatePartUploadUrl = (
  data: UploadPartUrlRequest
): Promise<UploadPartUrlResponse[]> => {
  return http.post<UploadPartUrlResponse[]>({
    url: FileApi.UPLOAD_PART_URL,
    data
  })
}
