import APIUtils from '@utils/AxiosInstance'
import { SignUpResponse } from "@redux/actions/auth.action";

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

export interface SignUpParams {
  email: string
  password: string
  confirmPassword: string,
  fullName: string,
}
export interface ResetPasswordParams {
  code: string,
  newPassword: string,
  confirmPassword: string
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

  signUp({ email, fullName, password, confirmPassword }: SignUpParams) {
    return APIUtils.post<SignUpResponse>('auth/signup', {
      email,
      fullName,
      password,
      confirmPassword
    },)
  },
  verifyAccount({ code }: { code: string }) {
    return APIUtils.post('auth/verify-user', {
      code
    })
  },

  sendVerifyCode({ email }: { email: string }) {
    return APIUtils.post('auth/forgot-password', {
      email
    })
  },
  resendVerifyCode({ email }: { email: string }) {
    return APIUtils.post('auth/resend-verified-code-email', {
      email
    })
  },
  resetPassword({ code, newPassword, confirmPassword }: ResetPasswordParams) {
    return APIUtils.post('auth/reset-password', {
      code,
      newPassword,
      confirmPassword
    })
  }

} as const


