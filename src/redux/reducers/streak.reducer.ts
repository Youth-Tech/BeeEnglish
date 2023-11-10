import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { StreakDayProps } from '@screens/StreakScreen/components'
import { getStreakThunk, updateStreakThunk } from '@redux/actions'

export interface StreakReducerType {
  streaks: StreakDayProps[]
  streakCount: number
}

const initialState: StreakReducerType = {
  streaks: [],
  streakCount: 0,
}

const streakReducer = createSlice({
  name: 'streak',
  initialState,
  reducers: {
    updateStreakData(_, action: PayloadAction<StreakReducerType>) {
      return {
        ...action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStreakThunk.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
        }
      })
      .addCase(updateStreakThunk.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
        }
      })
  },
})

export const { updateStreakData } = streakReducer.actions
const StreakReducer = streakReducer.reducer
export default StreakReducer
