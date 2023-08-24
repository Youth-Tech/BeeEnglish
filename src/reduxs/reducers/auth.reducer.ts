import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  token?: string
  refreshToken?: string
}

const defaultAuthState: AuthState = {
  token: undefined,
  refreshToken: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: defaultAuthState,
  reducers: {
    authToken(_: AuthState, action: PayloadAction<AuthState>) {
      return {
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      }
    },
  },
})

export const { authToken } = authSlice.actions
export const AuthReducer = authSlice.reducer
