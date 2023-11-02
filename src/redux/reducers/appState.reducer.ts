import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login, signUp, verifyAccount } from '@redux/actions/auth.action'

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
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(verifyAccount.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifyAccount.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(verifyAccount.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { setLoadingStatusAction } = appStateSlice.actions

export const AppStateReducer = appStateSlice.reducer
