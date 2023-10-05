import APIUtils from '@utils/AxiosInstance'

export interface OAuthRes {
  code?: number
  message?: string
  data?: {
    accessToken: string
    refreshToken: string
  }
}
export interface OAuthParams {
  provider: number
  accessToken: string
  deviceId: string
  deviceName: string
}
export const AuthService = {
  oAuthLogin({ accessToken, deviceId, deviceName, provider }: OAuthParams) {
    return APIUtils.post<OAuthRes>('auth/oauth/login', {
      provider,
      accessToken,
      deviceId,
      deviceName,
    })
  },
} as const
