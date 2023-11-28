export interface FileInfoResponse {
  key: string
  uploadId: string
  chunkSize: number
  chunkCount: number
  finished: boolean
  url: string
}

export interface InitMultipartRequest {
  identifier: string
  fileName: string
  type: string
  totalSize: number
  chunkSize: number
}

export interface InitMultipartResponse {
  key: string
  uploadId: string
  chunkSize: number
  chunkCount: number
  finished: boolean
  url: string
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
  uploadUrl: string
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
