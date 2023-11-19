import axios from 'axios'
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig
} from 'axios'

const http: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8088',
  timeout: 60000
})

/*InternalAxiosRequestConfig<any>:泛型是请求数据data的类型*/
http.interceptors.request.use((request: InternalAxiosRequestConfig<any>) => {
  return request
})

/*AxiosResponse<any, any>:第一个泛型是返回数据data的类型,第二个泛型是config的类型*/
http.interceptors.response.use(
  async (response: AxiosResponse<any, any>) => {
    const { request, data } = response
    if (request.responseType === 'blob' || request.responseType === 'arraybuffer') {
      return response.data // 返回流数据
    }
    return data.data
  },
  /*AxiosError<any, any>:第一个泛型是返回数据data的类型,第二个泛型是config的类型*/
  (err: AxiosError<any, any>) => {
    console.log(err)
  }
)

type IResponse<T> = {
  code: number
  msg: string
  data: T
}

export default {
  get: <T = any>(option: AxiosRequestConfig) => {
    return http({ method: 'GET', ...option }) as Promise<IResponse<T>>
  }
}
