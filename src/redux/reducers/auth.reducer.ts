import { Provider } from '@configs'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AuthState = {
  token?: string
  refreshToken?: string
  providerId?: Provider
}

const defaultAuthState: AuthState = {
  token: undefined,
  refreshToken: undefined,
  providerId: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: defaultAuthState,
  reducers: {
    setAuthState(state: AuthState, action: PayloadAction<AuthState>) {
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        providerId: action.payload.providerId,
      }
    },
  },
})

export const { setAuthState } = authSlice.actions
export const AuthReducer = authSlice.reducer
