export interface UploadInfoResponse {
  finished: boolean
  path: string
  chunkSize: number
  chunkCount: number
  identifier: string
  partNumbers?: number[]
}
