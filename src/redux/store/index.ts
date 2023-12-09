import {
  FLUSH,
  PURGE,
  PAUSE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from 'redux-persist'
import { rootReducer } from '@redux/reducers'
import { configureStore } from '@reduxjs/toolkit'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import reduxStorage from './storage'

export type RootState = ReturnType<typeof rootReducer>

const persistConfig = {
  key: 'root',
  timeout: 30000,
  storage: reduxStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth', 'themeApp', 'config', 'user', 'historyReducer'],
}

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer)
const createDebugger = require('redux-flipper').default

export const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    __DEV__
      ? getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(createDebugger())
      : getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
})

export const persistor = persistStore(store)

export { storage as MMKVStore } from './storage'
