import { RootState } from '@hooks'

export const getStreak = (state: RootState) => state.root.streakReducer
export const getStreakBallState = (state: RootState) =>
  state.root.streakReducer.isShowStreakBall