import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  login,
  signUp,
  loginOAuthThunk,
  resendVerifyEmail,
  verifyForgotPassword,
} from '@redux/actions/auth.action'
import { Provider } from '@configs'
import { TokenService } from '@services'

export type AuthState = {
  accessToken?: string
  refreshToken?: string
  providerId?: Provider
  email?: string
  forgotPasswordToken?: string
  isResendVerifyEmail?: boolean
  isSignedIn?: boolean
  isSignedInOAuth?: boolean
}

export const defaultAuthState: AuthState = {
  accessToken: undefined,
  refreshToken: undefined,
  providerId: undefined,
  email: undefined,
  forgotPasswordToken: undefined,
  isResendVerifyEmail: false,
  isSignedIn: false,
  isSignedInOAuth: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState: defaultAuthState,
  reducers: {
    setAuthState(state: AuthState, action: PayloadAction<AuthState>) {
      return {
        ...state,
        ...action.payload,
      }
    },
    setEmailSignIn(state: AuthState, action: PayloadAction<string>) {
      return {
        ...state,
        email: action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyForgotPassword.fulfilled, (state, action) => {
        state.forgotPasswordToken = action.payload.data
      })

      .addCase(signUp.fulfilled, (state) => {
        state.isSignedIn = true
      })
      .addCase(login.fulfilled, (state, action) => {
        action.payload &&
          TokenService.setAccessToken(action.payload.data.tokens.accessToken)
        action.payload &&
          TokenService.setRefreshToken(action.payload.data.tokens.refreshToken)
        state.isSignedIn = true
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload)
        if (action.payload?.code == 403) {
          state.isResendVerifyEmail = true
        }
      })
      .addCase(resendVerifyEmail.fulfilled, () => {})
      .addCase(loginOAuthThunk.fulfilled, (state, action) => {
        action.payload &&
          TokenService.setAccessToken(action.payload.data.tokens.accessToken)
        action.payload &&
          TokenService.setRefreshToken(action.payload.data.tokens.refreshToken)
        state.isSignedIn = true
        state.isSignedInOAuth = true
      })
  },
})

export const { setAuthState, setEmailSignIn } = authSlice.actions
export const AuthReducer = authSlice.reducer
