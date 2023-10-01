import { MMKVStore } from '@redux/store'
import axios, {
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

const AxiosInstance = (contentType = 'application/json') => {
  const axiosInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
  })

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = MMKVStore.getString('auth.accessToken')

      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': contentType,
      } as AxiosRequestHeaders

      return config
    },
    (err) => Promise.reject(err),
  )

  axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      const originalConfig = error.config

      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true

        try {
          //refresh token

          return axiosInstance(originalConfig)
        } catch (_error) {
          return Promise.reject(_error)
        }
      }

      return Promise.reject(error)
    },
  ) // callback
  return axiosInstance
}

const responseBody = <ResponseType>(response: AxiosResponse<ResponseType>) =>
  response.data

const ApiUtil = {
  get: <ResponseType>(url: string) =>
    AxiosInstance().get<ResponseType>(url).then(responseBody),

  post: <ResponseType>(url: string, body: {}) =>
    AxiosInstance().post<ResponseType>(url, body).then(responseBody),

  put: <ResponseType>(url: string, body: {}) =>
    AxiosInstance().put<ResponseType>(url, body).then(responseBody),

  delete: <ResponseType>(url: string) =>
    AxiosInstance().delete<ResponseType>(url).then(responseBody),

  postFile: <ResponseType>(url: string, body: {}) =>
    AxiosInstance('multipart/form-data')
      .post<ResponseType>(url, body)
      .then(responseBody),
} as const

export default ApiUtil
