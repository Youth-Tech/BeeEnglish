import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ThemeState = {
  theme: 'dark' | 'light'
}

const defaultThemeState: ThemeState = {
  theme: 'light',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: defaultThemeState,
  reducers: {
    changeTheme(state: ThemeState, action: PayloadAction<ThemeState>) {
      state.theme = action.payload.theme
    },
  },
})

export const { changeTheme } = themeSlice.actions

export const ThemeReducer = themeSlice.reducer
