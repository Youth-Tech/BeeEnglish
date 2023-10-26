import { combineReducers } from '@reduxjs/toolkit'

import { AuthReducer } from './auth.reducer'
import { ThemeReducer } from './theme.reducer'
import { AppStateReducer } from './appState.reducer'
import { ConfigReducer } from './config.reducer'
import {UserReducer} from "@redux/reducers/user.reducer";
import {DetailPostReducer} from "@redux/reducers/detailPost.reducer";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  themeApp: ThemeReducer,
  appState: AppStateReducer,
  config: ConfigReducer,
  detailPost: DetailPostReducer,

  // ...other reducers here
  //   user: UserReducer,
})

export * from './auth.reducer'
export * from './user.reducer'
export * from './config.reducer'
export * from './appState.reducer'
export * from './theme.reducer'
export * from './detailPost.reducer'
