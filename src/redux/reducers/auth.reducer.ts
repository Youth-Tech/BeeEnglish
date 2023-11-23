import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  login,
  signUp,
  loginForGuest,
  verifyAccount,
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
  deviceId?: string
  email?: string
  forgotPasswordToken?: string
  isResendVerifyEmail?: boolean
  isSignedIn?: boolean
  isSignedInOAuth?: boolean
  isLoginWithGuest?: boolean
  isSignUp?: boolean
}

export const defaultAuthState: AuthState = {
  accessToken: undefined,
  refreshToken: undefined,
  providerId: undefined,
  email: undefined,
  forgotPasswordToken: undefined,
  isResendVerifyEmail: false,
  isSignedIn: false,
  isSignedInOAuth: false,
  deviceId: '',
  isLoginWithGuest: false,
  isSignUp: false,
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
    setForgotPasswordToken(state: AuthState, action: PayloadAction<string>) {
      return {
        ...state,
        forgotPasswordToken: action.payload,
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
        state.isSignUp = true
      })
      .addCase(login.fulfilled, (state, action) => {
        action.payload &&
          TokenService.setAccessToken(action.payload.data.tokens.accessToken)
        action.payload &&
          TokenService.setRefreshToken(action.payload.data.tokens.refreshToken)
        state.isSignUp = false
        state.isSignedIn = true
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload)
        if (action.payload?.subMessage == 'PLEASE_VERIFY_EMAIL_403') {
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
      .addCase(loginForGuest.fulfilled, (state, action) => {
        state.isLoginWithGuest = true

        action.payload && (state.deviceId = action.payload.data.user.deviceId)

        action.payload &&
          TokenService.setAccessToken(action.payload.data.tokens.accessToken)

        action.payload &&
          TokenService.setRefreshToken(action.payload.data.tokens.refreshToken)
      })
      .addCase(verifyAccount.fulfilled, (state) => {
        state.isSignUp = false
      })
      .addCase(verifyAccount.rejected, (state) => {
        state.isSignUp = false
      })
  },
})

export const { setAuthState, setEmailSignIn, setForgotPasswordToken } =
  authSlice.actions
export const AuthReducer = authSlice.reducer
