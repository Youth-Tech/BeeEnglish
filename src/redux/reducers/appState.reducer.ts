import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AppState = {
  isLoading: boolean
}

const initAppState: AppState = {
  isLoading: false,
}

const appStateSlice = createSlice({
  name: 'appState',
  initialState: initAppState,
  reducers: {
    setLoadingStatusAction: (
      state: AppState,
      action: PayloadAction<boolean>,
    ) => {
      state.isLoading = action.payload
    },
  },
})

export const { setLoadingStatusAction } = appStateSlice.actions

export const AppStateReducer = appStateSlice.reducer
