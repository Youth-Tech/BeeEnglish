import axios, {
  AxiosResponse,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios'
import { BASE_URL } from '@configs'
import { MMKVStore } from '@redux/store'
import { TokenService } from '@services'

export interface RefreshTokenRes {
  message: string
  data: {
    refreshToken: string
    accessToken: string
  }
}

const AxiosInstance = (contentType = 'application/json') => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
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
    async (error) => {
      const originalConfig = error.config

      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true

        try {
          //refresh token
          const refreshToken = TokenService.getRefreshToken()
          const res = await axiosInstance.post<RefreshTokenRes>(
            '/auth/refresh-token',
            {
              refreshToken,
            },
          )

          if (res.status === 200) {
            const { accessToken, refreshToken } = res.data.data

            TokenService.setAccessToken(accessToken)
            TokenService.setRefreshToken(refreshToken)
          }

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
  response

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
