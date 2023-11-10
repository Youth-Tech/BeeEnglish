import APIUtils from '@utils/AxiosInstance'
import { DefaultResponse } from '@services'
import { LoginResponse, SignUpResponse } from '@redux/actions/auth.action'

export interface OAuthRes extends LoginResponse, DefaultResponse{

}

export interface OAuthParams {
  provider: string
  accessToken: string
  deviceId: string
  deviceName: string
}

export interface SignUpParams {
  email: string
  password: string
  confirmPassword: string
  fullName: string
}
export interface ResetPasswordParams {
  forgotPasswordToken: string
  newPassword: string
  confirmPassword: string
}

export interface LoginParams {
  email: string
  password: string
}

export interface ChangePasswordParams {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
export interface ChangePasswordRes extends DefaultResponse {
  code?: number
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
      confirmPassword,
    })
  },
  verifyAccount({ code }: { code: string }) {
    return APIUtils.post('auth/verify-user', {
      code,
    })
  },
  login({ email, password }: LoginParams) {
    return APIUtils.post<LoginResponse>('auth/login', {
      email,
      password,
    })
  },

  resendVerifyEmail({ email }: { email: string }) {
    return APIUtils.post('auth/resend-verified-code-email', {
      email,
    })
  },

  forgotPassword({ email }: { email: string }) {
    return APIUtils.post('auth/forgot-password', {
      email,
    })
  },
  verifyForgotPassword({ code }: { code: string }) {
    return APIUtils.post<{ data: string }>('auth/verify-forgot-password', {
      code,
    })
  },
  resetPassword({
    forgotPasswordToken,
    newPassword,
    confirmPassword,
  }: ResetPasswordParams) {
    return APIUtils.post('auth/reset-password', {
      forgotPasswordToken,
      newPassword,
      confirmPassword,
    })
  },
  changePassword(body: ChangePasswordParams) {
    return APIUtils.post<ChangePasswordRes>('/auth/change-password', body)
  },
} as const
