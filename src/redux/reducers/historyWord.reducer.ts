import { Word } from '@services'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface HistoryWord {
  history: Word[]
}
const initialState: HistoryWord = {
  history: [],
}
const historyReducer = createSlice({
  name: 'history',
  initialState,
  reducers: {
    updateHistory(state, action: PayloadAction<Word>) {
      const idSet = new Set(state.history.map((o) => o._id))

      if (idSet.has(action.payload._id)) {
      } else {
        if (state.history.length === 5) {
          state.history.pop()
        }
        state.history.unshift(action.payload)
      }
    },
  },
})
export const { updateHistory } = historyReducer.actions
export const HistoryReducer = historyReducer.reducer
