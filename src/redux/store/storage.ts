import { Storage } from 'redux-persist'
import { MMKV } from 'react-native-mmkv'
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin'

export const storage = new MMKV({ id: 'mmkv.beeEnglish' })

if (__DEV__) {
  initializeMMKVFlipper({ default: storage })
}

const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value)
    return Promise.resolve(true)
  },
  getItem: (key) => {
    const value = storage.getString(key)
    return Promise.resolve(value)
  },
  removeItem: (key) => {
    storage.delete(key)
    return Promise.resolve()
  },
}

export default reduxStorage
