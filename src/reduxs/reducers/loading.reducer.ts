import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type LoadingState = {
  isLoading: boolean
}

const initLoadingState: LoadingState = {
  isLoading: false,
}

const loadingSlices = createSlice({
  name: 'loading',
  initialState: initLoadingState,
  reducers: {
    setLoadingStatus: (
      state: LoadingState,
      action: PayloadAction<LoadingState>,
    ) => {
      state.isLoading = action.payload.isLoading
    },
  },
})

export const { setLoadingStatus } = loadingSlices.actions

export const LoadingReducer = loadingSlices.reducer
