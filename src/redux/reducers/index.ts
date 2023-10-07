import { combineReducers } from '@reduxjs/toolkit'

import { AuthReducer } from './auth.reducer'
import { ThemeReducer } from './theme.reducer'
import { AppStateReducer } from './appState.reducer'
import { ConfigReducer } from './config.reducer'

export const rootReducer = combineReducers({
  auth: AuthReducer,
  themeApp: ThemeReducer,
  appState: AppStateReducer,
  config: ConfigReducer,

  // ...other reducers here
  //   user: UserReducer,
})

export * from './auth.reducer'
export * from './config.reducer'
export * from './appState.reducer'
export * from './theme.reducer'
