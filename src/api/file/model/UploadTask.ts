export interface UploadTask {
  id: number
  uploadId: string
  identifier: string
  name: string
  bucketName: string
  fileKey: string
  totalSize: number
  chunkSize: number
  chunkCount: number
  finished: boolean
  createTime: Date
}
