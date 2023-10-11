import { Provider } from '@configs'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {signIn} from "@redux/actions/auth.action";

export type AuthState = {
  accessToken?: string
  refreshToken?: string
  providerId?: Provider,
  email?: string,
}

const defaultAuthState: AuthState = {
  accessToken: undefined,
  refreshToken: undefined,
  providerId: undefined,
  email: undefined,
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
    builder
        .addCase(signIn.fulfilled, (state, action) => {
          state.accessToken = action.payload.data.tokens.accessToken;
          state.refreshToken = action.payload.data.tokens.refreshToken;
        })
  },
})

export const { setAuthState, setEmailSignIn } = authSlice.actions
export const AuthReducer = authSlice.reducer
