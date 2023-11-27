export interface FileInfoResponse {
  identifier: string
  name: string
  type: string
  key: string
  url: string
  uploadId: string
  chunkSize: number
  chunkCount: number
}

export interface InitMultipartRequest {
  identifier: string
  fileName: string
  type: string
  totalSize: number
  chunkSize: number
}

export interface InitMultipartResponse {
  id: number
  key: string
  uploadId: string
  chunkSize: number
  chunkCount: number
}

export interface ListMultipartRequest {
  uploadId: string
  key: string
}

export interface ListMultipartResponse {
  partNumber: number
  size: number
}

export interface MultipartUrlRequest {
  key: string
  uploadId: string
  partNumber: number
}

export interface MultipartUrlResponse {
  partNumber: number
  uploadId: string
}

export interface CompleteMultipartRequest {
  identifier: string
  key: string
  uploadId: string
  chunkCount: number
  remark?: string
}

export interface CompleteMultipartResponse {
  url: string
}

export interface AbortMultipartRequest {
  key: string
  uploadId: string
}
