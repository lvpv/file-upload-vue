import axios from 'axios'
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig
} from 'axios'

type IResponse<T> = {
  code: number
  msg: string
  data: T
}

const http: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8888',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})

/*InternalAxiosRequestConfig<any>:泛型是请求数据data的类型*/
http.interceptors.request.use((request: InternalAxiosRequestConfig<any>) => {
  return request
})

/*AxiosResponse<any, any>:第一个泛型是返回数据data的类型,第二个泛型是config的类型*/
http.interceptors.response.use(
  (response: AxiosResponse<IResponse<any>, any>) => {
    const { request, data } = response
    if (request.responseType === 'blob' || request.responseType === 'arraybuffer') {
      return response.data // 返回流数据
    }
    return data?.data
  },
  /*AxiosError<any, any>:第一个泛型是返回数据data的类型,第二个泛型是config的类型*/
  (err: AxiosError<any, any>) => {
    console.log(err)
  }
)

export default {
  get: <T = any>(option: AxiosRequestConfig): Promise<T> => {
    return http({ method: 'GET', ...option }) as Promise<T>
  },
  post: <T = any>(option: AxiosRequestConfig): Promise<T> => {
    return http({ method: 'POST', ...option }) as Promise<T>
  },
  delete: <T = any>(option: AxiosRequestConfig): Promise<T> => {
    return http({ method: 'DELETE', ...option }) as Promise<T>
  }
}
