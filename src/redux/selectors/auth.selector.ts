import { RootState } from '@hooks'

export const getAccessToken = (state: RootState) => state.root.auth.accessToken

export const getRefreshToken = (state: RootState) =>
  state.root.auth.refreshToken

export const getAuthProvider = (state: RootState) => state.root.auth.providerId
