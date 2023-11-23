import http from '@/http'
import type {
  InitPartRequest,
  InitPartResponse,
  ListPartRequest,
  PartResponse,
  UploadPartUrlRequest,
  UploadPartUrlResponse,
  SinglePartUrlRequest,
  CompletePartResuest,
  CompletePartResponse
} from '@/api/file/model/File'

export enum FileApi {
  LIST_PART = '/file/multipart/list',
  INIT_PART = '/file/multipart/init',
  UPLOAD_PART_URL = '/file/multipart/url',
  SINGLE_PART_URL = '/file/multipart/part/url',
  COMPLATE_PART = '/file/multipart/complete'
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
export const generateSinglePartUrl = (
  data: SinglePartUrlRequest
): Promise<UploadPartUrlResponse> => {
  return http.post<UploadPartUrlResponse>({
    url: FileApi.SINGLE_PART_URL,
    data
  })
}
export const completeMultipart = (data: CompletePartResuest): Promise<CompletePartResponse> => {
  return http.post<CompletePartResponse>({
    url: FileApi.COMPLATE_PART,
    data
  })
}
