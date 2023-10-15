import { Provider } from '@configs'
import { TokenService } from '@services'
import { signIn, verifyForgotPassword } from '@redux/actions/auth.action'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AuthState = {
  accessToken?: string
  refreshToken?: string
  providerId?: Provider
  email?: string
  forgotPasswordToken?: string
}

const defaultAuthState: AuthState = {
  accessToken: undefined,
  refreshToken: undefined,
  providerId: undefined,
  email: undefined,
  forgotPasswordToken: undefined,
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (_, action) => {
      TokenService.setAccessToken(action.payload.tokens.data.tokens.accessToken)
      TokenService.setRefreshToken(
        action.payload.tokens.data.tokens.refreshToken,
      )
    })
    .addCase(verifyForgotPassword.fulfilled, (state, action) => {
      state.forgotPasswordToken = action.payload.data
    })
  },

})

export const { setAuthState, setEmailSignIn } = authSlice.actions
export const AuthReducer = authSlice.reducer
