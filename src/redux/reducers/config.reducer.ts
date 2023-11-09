import i18next from 'i18next'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LangType, getDeviceLanguage } from '@utils/helpers'

export type ConfigType = {
  lang: LangType
}

const initialState: ConfigType = {
  lang: getDeviceLanguage(),
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
