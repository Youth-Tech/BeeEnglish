import { AuthReducer, LoadingReducer, ThemeReducer } from '@reduxs/reducers'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
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
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import reduxStorage from './storage'
import { apiService } from '@reduxs/apis/apiService'

const rootReducer = combineReducers({
  auth: AuthReducer,
  themeApp: ThemeReducer,
  loading: LoadingReducer,
  // ...other reducers here
  //   user: UserReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  timeout: 30000,
  whitelist: ['auth', 'themApp'],
  stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer)
const createDebugger = require('redux-flipper').default

export const store = configureStore({
  reducer: {
    root: persistedReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    __DEV__
      ? getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        })
          .concat(apiService.middleware)
          .concat(createDebugger())
      : getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(apiService.middleware),
})

export const persistor = persistStore(store)
