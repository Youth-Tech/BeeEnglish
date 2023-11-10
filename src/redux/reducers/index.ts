import { combineReducers } from '@reduxjs/toolkit'

import { AuthReducer } from './auth.reducer'
import { ThemeReducer } from './theme.reducer'
import { ConfigReducer } from './config.reducer'
import { AppStateReducer } from './appState.reducer'
import { UserReducer } from '@redux/reducers/user.reducer'
import StreakReducer from "@redux/reducers/streak.reducer";
import { DetailPostReducer } from '@redux/reducers/detailPost.reducer'

export const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  themeApp: ThemeReducer,
  appState: AppStateReducer,
  config: ConfigReducer,
  detailPost: DetailPostReducer,
  streakReducer: StreakReducer

  // ...other reducers here
  //   user: UserReducer,
})

export * from './auth.reducer'
export * from './user.reducer'
export * from './theme.reducer'
export * from './config.reducer'
export * from './streak.reducer'
export * from './appState.reducer'
export * from './detailPost.reducer'
