import axios from 'axios'
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders
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

/*InternalAxiosRequestConfig<any>  extends AxiosRequestConfig : 多了headers属性泛型是请求数据data的类型*/
http.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const requestConfig = config
  requestConfig.headers = config.headers || ({} as AxiosRequestHeaders)
  requestConfig.headers['x-token'] = 'file-upload'
  return requestConfig
})

/*AxiosResponse<any, any>:第一个泛型是返回数据data的类型,第二个泛型是config的类型其实也是请求参数data的类型*/
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
  get: <T = any>(option: AxiosRequestConfig<any>): Promise<T> => {
    return http({ method: 'GET', ...option }) as Promise<T>
  },
  post: <T = any>(option: AxiosRequestConfig): Promise<T> => {
    return http({ method: 'POST', ...option }) as Promise<T>
  },
  put: <T = any>(option: AxiosRequestConfig): Promise<T> => {
    return http({ method: 'PUT', ...option }) as Promise<T>
  },
  delete: <T = any>(option: AxiosRequestConfig): Promise<T> => {
    return http({ method: 'DELETE', ...option }) as Promise<T>
  }
}
