import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserData, UserService } from '@services/UserService'
import { defaultUserState } from '@redux/reducers/user.reducer'
import { AuthService, LoginParams, SignUpParams } from '@services/AuthService'

export interface SignUpResponse {
  data: {
    tokens: {
      accessToken: string
      refreshToken: string
    }
  }
}

export interface LoginResponse {
    data: {
    user: UserData
    tokens: {
        accessToken: string
        refreshToken: string
    }
}
}

export const signIn = createAsyncThunk<
  {
    tokens: SignUpResponse
    data: UserData
  },
  SignUpParams
>('auth/signIn', async (params) => {
  const response = await AuthService.signUp(params)
  let dataUser = {
    data: defaultUserState,
  }
  if (response.status === 200) {
    dataUser = await UserService.getUserData(
      response.data.data.tokens.accessToken,
    ).then()
    // console.log(dataUser)
  }
  return {
    tokens: response.data,
    data: dataUser.data,
  }
})

export const verifyAccount = createAsyncThunk(
  'auth/verifyAccount',
  async (code: string) => {
    const response = await AuthService.verifyAccount({ code })
    return response.status
  },
)

export const login = createAsyncThunk<LoginResponse, LoginParams>(
  'auth/login',
  async (params) => {
    const response = await AuthService.login(params)
    return response.data
  },
)

export const resendVerifyEmail = createAsyncThunk<any, string>(
  'auth/resend-verified-code-email',
  async (email) => {
    const response = await AuthService.resendVerifyEmail({ email })
    return response.data
  },
)
