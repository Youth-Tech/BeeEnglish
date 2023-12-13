import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios'

import {
  setAuthState,
  setUserState,
  defaultAuthState,
  defaultUserState,
} from '@redux/reducers'
import { BASE_URL } from '@configs'
import { store } from '@redux/store'
import { TokenService } from '@services'
import { navigateAndReset } from '@navigation'
import { handleErrorMessage } from '@utils/errorUtils'

export interface RefreshTokenRes {
  message: string
  data: {
    refreshToken: string
    accessToken: string
  }
  code: number
}

export type AxiosInstanceType = {
  contentType?: 'application/json' | 'multipart/form-data'
  headers?: AxiosRequestHeaders
}

let isRefreshToken = false

const AxiosInstance = ({
  contentType = 'application/json',
  headers,
}: AxiosInstanceType) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
  })

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = TokenService.getAccessToken()

      if (headers) {
        config.headers = headers
      } else {
        config.headers = {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': contentType,
        } as AxiosRequestHeaders
      }

      return config
    },
    (err) => Promise.reject(err),
  )

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalConfig = error.config

      if (
        error?.response?.status === 401 &&
        !originalConfig._retry &&
        !isRefreshToken
      ) {
        originalConfig._retry = true
        isRefreshToken = true

        //refresh token
        const currentRefreshToken = TokenService.getRefreshToken()
        const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: currentRefreshToken }),
        })

        try {
          const parseRes = (await res.json()) as RefreshTokenRes

          if (parseRes?.data?.refreshToken && parseRes?.data?.accessToken) {
            console.log(res)
            const { accessToken, refreshToken } = parseRes.data
            TokenService.setAccessToken(accessToken)
            TokenService.setRefreshToken(refreshToken)
            originalConfig.headers['Authorization'] = `Bearer ${accessToken}`
            return axiosInstance(originalConfig)
          }
        } catch (e) {
          console.log(e)
          TokenService.clearToken()
          store.dispatch(setUserState(defaultUserState))
          store.dispatch(setAuthState(defaultAuthState))
          navigateAndReset([{ name: 'NAVIGATE_SCREEN' }], 0)
        } finally {
          isRefreshToken = false
        }
      }
      handleErrorMessage(
        error?.response?.data.subMessage,
        error?.response?.data.message,
      )
      return Promise.reject(error)
    },
  ) // callback
  return axiosInstance
}

const responseBody = <ResponseType>(response: AxiosResponse<ResponseType>) =>
  response

const ApiUtil = {
  get: <ResponseType>(
    url: string,
    headers?: AxiosRequestHeaders,
    requestOption?: AxiosRequestConfig,
  ) =>
    AxiosInstance({ headers })
      .get<ResponseType>(url, requestOption)
      .then(responseBody),

  post: <ResponseType>(url: string, body: {}, headers?: AxiosRequestHeaders) =>
    AxiosInstance({ headers }).post<ResponseType>(url, body).then(responseBody),

  put: <ResponseType>(url: string, body: {}, headers?: AxiosRequestHeaders) =>
    AxiosInstance({ headers }).put<ResponseType>(url, body).then(responseBody),

  patch: <ResponseType>(url: string, body: {}, headers?: AxiosRequestHeaders) =>
    AxiosInstance({ headers })
      .patch<ResponseType>(url, body)
      .then(responseBody),

  delete: <ResponseType>(
    url: string,
    headers?: AxiosRequestHeaders,
    requestOption?: AxiosRequestConfig,
  ) =>
    AxiosInstance({ headers })
      .delete<ResponseType>(url, requestOption)
      .then(responseBody),

  postFile: <ResponseType>(
    url: string,
    body: {},
    headers?: AxiosRequestHeaders,
  ) =>
    AxiosInstance({ contentType: 'multipart/form-data', headers })
      .post<ResponseType>(url, body)
      .then(responseBody),
} as const

export default ApiUtil
