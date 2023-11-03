import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { rootReducer } from '@redux/reducers'
import { configureStore } from '@reduxjs/toolkit'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import reduxStorage from './storage'

export type RootState = ReturnType<typeof rootReducer>

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  timeout: 30000,
  whitelist: ['auth', 'themeApp', 'config', 'user'],
  stateReconciler: autoMergeLevel2,
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
