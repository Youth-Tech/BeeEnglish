import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import i18next from 'i18next'

export const supportedLanguages = ['en', 'vi'] as const

export type LangType = (typeof supportedLanguages)[number]

export type ConfigType = {
  lang: LangType
}

const initialState: ConfigType = {
  lang: 'vi',
}

const configSlice = createSlice({
  initialState,
  name: 'ConfigSlice',
  reducers: {
    updateConfig: (_: ConfigType, action: PayloadAction<ConfigType>) => {
      i18next.changeLanguage(action.payload.lang)
      return { ...action.payload }
    },
  },
})
export const { updateConfig: updateConfigAction } = configSlice.actions
export const ConfigReducer = configSlice.reducer
