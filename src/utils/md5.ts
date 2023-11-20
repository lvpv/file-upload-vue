import SparkMD5 from 'spark-md5'

const DEFAULT_SIZE: number = 10 * 1024 * 1024 // 10MB

/**
 * 计算文件的md5值
 * @param file 文件对象
 * @param chunkSize 分片大小,默认10MB
 */
const md5 = (file: File, chunkSize: number = DEFAULT_SIZE): Promise<string> => {
  return new Promise((resolve, reject): void => {
    const startMs: number = new Date().getTime()
    const blobSlice =
      // @ts-ignore
      File.prototype.slice || File.prototype?.mozSlice || File.prototype?.webkitSlice
    // 分片数量
    const chunks: number = Math.ceil(file.size / chunkSize)
    // 当前分片数量
    let currentChunk: number = 0
    //追加数组缓冲区。
    const spark: SparkMD5.ArrayBuffer = new SparkMD5.ArrayBuffer()
    //读取文件
    const fileReader: FileReader = new FileReader()
    fileReader.onload = function (e: ProgressEvent<FileReader>): void {
      spark.append(e.target.result as ArrayBuffer)
      currentChunk++
      if (currentChunk < chunks) {
        // 将分片的数据加入缓冲区
        loadNext()
      } else {
        //完成md5的计算，返回十六进制结果。
        const md5: string = spark.end()
        console.log('文件md5计算结束，总耗时：', (new Date().getTime() - startMs) / 1000, 's')
        resolve(md5)
      }
    }
    fileReader.onerror = function (e: ProgressEvent<FileReader>): void {
      reject(e.target.error)
    }

    function loadNext(): void {
      console.log('当前part number：', currentChunk, '总块数：', chunks)
      const start: number = currentChunk * chunkSize
      let end: number = start + chunkSize
      if (end > file.size && (end = file.size)) {
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
      }
    }

    loadNext()
  })
}

export default md5
