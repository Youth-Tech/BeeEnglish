import { RootState } from '@hooks'

export const getAccessToken = (state: RootState) => state.root.auth.accessToken

export const getRefreshToken = (state: RootState) =>
  state.root.auth.refreshToken

export const getIsLoginWithGuest = (state: RootState) =>
  state.root.auth.isLoginWithGuest
export const getIsLoginOAuth = (state: RootState) => state.root.auth.isSignedInOAuth
export const getAuthProvider = (state: RootState) => state.root.auth.providerId
export const getIsLogin = (state: RootState) => state.root.auth.isSignedIn
