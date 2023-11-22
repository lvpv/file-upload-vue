export interface UploadResponse {
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
