import http from '@/http'
import type { UploadTask } from '@/api/file/model/UploadTask'

export enum UploadTaskApi {
  GET_INFO_BY_ID = '/file/upload/task',
  GET_INFO_BY_IDENTIFIER = '/file/upload/task/identifier'
}

export const getUploadTaskById = (id: string): Promise<UploadTask> => {
  return http.get<UploadTask>({ url: `${UploadTaskApi.GET_INFO_BY_ID}/${id}` })
}
export const getUploadTaskByIdentifier = (identifier: string): Promise<UploadTask> => {
  return http.get<UploadTask>({ url: `${UploadTaskApi.GET_INFO_BY_IDENTIFIER}/${identifier}` })
}
