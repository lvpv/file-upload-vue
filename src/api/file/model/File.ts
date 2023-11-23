export interface ListPartRequest {
  key: string
  uploadId: string
}

export interface PartResponse {
  partNumber: number
  size: number
}

export interface InitPartRequest {
  identifier: string
  fileName: string
  totalSize: number
  chunkSize: number
}

export interface InitPartResponse {
  uploadId: string
  identifier: string
  name: string
  bucketName: string
  key: string
  totalSize: number
  chunkSize: number
  chunkCount: number
  url: string
  finished: boolean
}

export interface UploadPartUrlRequest {
  key: string
  contentType: string
  uploadId: string
  partNumbers: number[]
}

export interface SinglePartUrlRequest {
  key: string
  contentType: string
  uploadId: string
  partNumber: number
}

export interface UploadPartUrlResponse {
  partNumber: number
  uploadUrl: string
}

export interface CompletePartResuest {
  key: string
  identifier: string
  uploadId: string
  chunkCount: number
}

export interface CompletePartResponse {
  url: string
}
