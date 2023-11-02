import { Provider } from '@configs'
import { TokenService } from '@services'
import { login, resendVerifyEmail, signUp } from '@redux/actions/auth.action'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AuthState = {
  accessToken?: string
  refreshToken?: string
  providerId?: Provider
  email?: string
  isResendVerifyEmail?: boolean
  isSignedIn?: boolean
}

const defaultAuthState: AuthState = {
  accessToken: undefined,
  refreshToken: undefined,
  providerId: undefined,
  email: undefined,
  isResendVerifyEmail: false,
  isSignedIn: false,
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
      .addCase(signUp.fulfilled, (state) => {
        state.isSignedIn = true
      })
      .addCase(login.fulfilled, (_, action) => {
        action.payload &&
          TokenService.setAccessToken(action.payload.data.tokens.accessToken)
        action.payload &&
          TokenService.setRefreshToken(action.payload.data.tokens.refreshToken)
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload)
        if (action.payload?.code == 403) {
          state.isResendVerifyEmail = true
        }
      })
    .addCase(resendVerifyEmail.fulfilled, () => {})
  },
})

export const { setAuthState, setEmailSignIn } = authSlice.actions
export const AuthReducer = authSlice.reducer
