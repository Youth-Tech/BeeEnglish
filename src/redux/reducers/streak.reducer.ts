import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootStackParamList } from '@navigation'
import { StreakDayProps } from '@screens/StreakScreen/components'
import { getStreakThunk, updateStreakThunk } from '@redux/actions'

export interface StreakReducerType {
  streaks?: StreakDayProps[]
  streakCount?: number
  isShowStreakBall?: boolean
}

export const streakBallBlackListRoute: Array<keyof RootStackParamList> = [
  //knowledge route
  'VOCAB_SCREEN',
  'VIDEO_SCREEN',
  'GRAMMAR_SCREEN',
  'PRE_TEST_SCREEN',
  'DETAIL_LESSON_SCREEN',
  'ABOUT_THE_TEST_SCREEN',

  //auth route
  'LOGIN_SCREEN',
  'STREAK_SCREEN',
  'REGISTER_SCREEN',
  'EXAM_TEST_SCREEN',
  'SEND_PASSWORD_SCREEN',
  'RESET_PASSWORD_SCREEN',
  'VERIFICATION_CODE_SCREEN',
  'EMAIL_REGISTRATION_SCREEN',

  //other route
  'SETTING_SCREEN',
  'INVOICE_SCREEN',
  'NAVIGATE_SCREEN',
  'SUBSCRIPTION_SCREEN',
]

const initialState: StreakReducerType = {
  streaks: undefined,
  streakCount: -1,
  isShowStreakBall: true,
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
    updateStateStreakBall(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isShowStreakBall: action.payload,
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

export const { updateStreakData, updateStateStreakBall } = streakReducer.actions
const StreakReducer = streakReducer.reducer
export default StreakReducer
