import { MMKVStore } from '@redux/store'

export const TokenService = {
  getAccessToken() {
    return MMKVStore.getString('auth.accessToken')
  },

  setAccessToken(accessToken: string) {
    MMKVStore.set('auth.accessToken', accessToken)
  },

  getRefreshToken() {
    return MMKVStore.getString('auth.refreshToken')
  },

  setRefreshToken(refreshToken: string) {
    MMKVStore.set('auth.refreshToken', refreshToken)
  },

  clearToken() {
    MMKVStore.delete('auth.refreshToken')
    MMKVStore.delete('auth.accessToken')
  },
} as const
