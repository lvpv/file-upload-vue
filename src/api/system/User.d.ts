export interface FileInfo {
  id: number
  name: string
  path: string
}

export interface User {
  username: string
  age: number
  files: FileInfo[]
  attachments: FileInfo[]
}
