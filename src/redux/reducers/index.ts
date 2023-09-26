import { combineReducers } from '@reduxjs/toolkit'

import { AuthReducer } from './auth.reducer'
import { ThemeReducer } from './theme.reducer'
import { LoadingReducer } from './loading.reducer'
import { ConfigReducer } from './config.reducer'

export const rootReducer = combineReducers({
  auth: AuthReducer,
  themeApp: ThemeReducer,
  loading: LoadingReducer,
  config: ConfigReducer,

  // ...other reducers here
  //   user: UserReducer,
})

export * from './auth.reducer'
export * from './config.reducer'
export * from './loading.reducer'
export * from './theme.reducer'
