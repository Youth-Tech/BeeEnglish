import APIUtils from '@utils/AxiosInstance'
import { DefaultResponse, TokenService } from '@services'
import { LoginResponse } from '@redux/actions/auth.action'

const AuthEndPoint = {
  login: 'auth/login',
  signUp: 'auth/signup',
  logOut: 'auth/logout',
  oAuthLogin: 'auth/oauth/login',
  loginForGuest: 'auth/login/guest',
  verifyAccount: 'auth/verify-user',
  resetPassword: 'auth/reset-password',
  changePassword: 'auth/change-password',
  forgotPassword: 'auth/forgot-password',
  verifyForgotPassword: 'auth/verify-forgot-password',
  resendVerifyEmail: 'auth/resend-verified-code-email',
} as const

export interface SignUpResponse extends DefaultResponse {
  data: {
    message: string
  }
}

export interface OAuthRes extends LoginResponse, DefaultResponse {}

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
  deviceId: string
  deviceName: string
}

export interface ChangePasswordParams {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ChangePasswordRes extends DefaultResponse {
  code?: number
}

export interface LoginForGuestRequest {
  deviceId: string
  deviceName?: string
}

export const AuthService = {
  oAuthLogin({ accessToken, deviceId, deviceName, provider }: OAuthParams) {
    return APIUtils.post<OAuthRes>(AuthEndPoint.oAuthLogin, {
      provider,
      accessToken,
      deviceId,
      deviceName,
    })
  },

  signUp({ email, fullName, password, confirmPassword }: SignUpParams) {
    return APIUtils.post<SignUpResponse>(AuthEndPoint.signUp, {
      email,
      fullName,
      password,
      confirmPassword,
    })
  },

  verifyAccount({ code }: { code: string }) {
    return APIUtils.post(AuthEndPoint.verifyAccount, {
      code,
    })
  },

  login({ email, password, deviceName, deviceId }: LoginParams) {
    return APIUtils.post<LoginResponse>(AuthEndPoint.login, {
      email,
      password,
      deviceId,
      deviceName,
    })
  },

  loginForGuest(body: LoginForGuestRequest) {
    return APIUtils.post<LoginResponse>(AuthEndPoint.loginForGuest, body)
  },

  resendVerifyEmail({ email }: { email: string }) {
    return APIUtils.post(AuthEndPoint.resendVerifyEmail, {
      email,
    })
  },

  forgotPassword({ email }: { email: string }) {
    return APIUtils.post(AuthEndPoint.forgotPassword, {
      email,
    })
  },

  verifyForgotPassword({ code }: { code: string }) {
    return APIUtils.post<{ data: string }>(AuthEndPoint.verifyForgotPassword, {
      code,
    })
  },

  resetPassword({
    forgotPasswordToken,
    newPassword,
    confirmPassword,
  }: ResetPasswordParams) {
    return APIUtils.post(AuthEndPoint.resetPassword, {
      forgotPasswordToken,
      newPassword,
      confirmPassword,
    })
  },

  changePassword(body: ChangePasswordParams) {
    return APIUtils.post<ChangePasswordRes>(AuthEndPoint.changePassword, body)
  },

  logOut() {
    return APIUtils.post<DefaultResponse>(AuthEndPoint.logOut, {
      refreshToken: TokenService.getRefreshToken(),
    })
  },
} as const
