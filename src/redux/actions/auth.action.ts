import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserData } from '@services/UserService'
import { AuthService, LoginParams, SignUpParams } from '@services/AuthService'

export interface LoginResponse {
  data: {
    user: UserData
    tokens: {
      accessToken: string
      refreshToken: string
    }
  }
}

export const signUp = createAsyncThunk<any, SignUpParams
>('auth/signIn', async (params) => {
  const response = await AuthService.signUp(params)
  return response.data
})

export const verifyAccount = createAsyncThunk(
  'auth/verifyAccount',
  async (code: string) => {
    const response = await AuthService.verifyAccount({ code })
    return response.status
  },
)

export const login = createAsyncThunk<LoginResponse, LoginParams, {rejectValue: {code: number}}>(
  'auth/login',
  async (params, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(params)
      return response.data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const resendVerifyEmail = createAsyncThunk<any, string>(
  'auth/resend-verified-code-email',
  async (email) => {
    const response = await AuthService.resendVerifyEmail({ email })
    return response.data
  },
)
