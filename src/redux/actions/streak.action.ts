import { UserService } from '@services'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { StreakReducerType } from '@redux/reducers'
import { formatDate, getDatesOfWeek } from '@utils/dateUtils'
import { StreakDayProps } from '@screens/StreakScreen/components'

const currentWeek = getDatesOfWeek(new Date())

const parseToStreakDay = (
  currentWeek: Date[],
  streakDays: string[],
): StreakDayProps[] => {
  return currentWeek.map((item) => {
    const isAttendance = streakDays.includes(item.toLocaleDateString())
    return {
      date: item.toString(),
      type: isAttendance
        ? 'isAttendance'
        : item.toLocaleDateString() === new Date().toLocaleDateString()
        ? 'current'
        : 'normal',
    }
  })
}

export const getStreakThunk = createAsyncThunk<StreakReducerType>(
  'user/getStreak',
  async () => {
    try {
      const resStreak = await UserService.getStreak({
        start: formatDate(currentWeek[0]),
        end: formatDate(currentWeek[6]),
      })
      const resStreakWithBeautyData = resStreak.data.data.streaks.map((item) =>
        new Date(item).toLocaleDateString(),
      )

      return {
        streaks: parseToStreakDay(currentWeek, resStreakWithBeautyData),
        streakCount: resStreak.data.data.streakCount,
      }
    } catch (e) {
      console.log(e)
    }

    return {
      streaks: [],
      streakCount: 0,
    }
  },
)

export const updateStreakThunk = createAsyncThunk<StreakReducerType>(
  'user/updateStreak',
  async () => {
    try {
      const resUpdateStreak = await UserService.updateStreak()
      const resStreakWithBeautyData = resUpdateStreak.data.data.streaks.map(
        (item) => new Date(item).toLocaleDateString(),
      )

      return {
        streaks: parseToStreakDay(currentWeek, resStreakWithBeautyData),
        streakCount: resUpdateStreak.data.data.streakCount,
      }
    } catch (e) {
      console.log(e.message)
    }

    return {
      streaks: [],
      streakCount: 0,
    }
  },
)
