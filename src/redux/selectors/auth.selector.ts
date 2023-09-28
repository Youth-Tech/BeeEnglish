import { RootState } from '@hooks'

export const getToken = (state: RootState) => state.root.auth.token
export const getRefreshToken = (state: RootState) =>
  state.root.auth.refreshToken
