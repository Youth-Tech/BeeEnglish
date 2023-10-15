import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signIn, verifyAccount, verifyForgotPassword } from '@redux/actions/auth.action'

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
      .addCase(signIn.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signIn.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(signIn.rejected, (state) => {
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
      .addCase(verifyForgotPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifyForgotPassword.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(verifyForgotPassword.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { setLoadingStatusAction } = appStateSlice.actions

export const AppStateReducer = appStateSlice.reducer
