import React from 'react'
import { Pressable } from 'react-native'

import { Icon } from '@assets'
import { useTheme } from '@themes'
import { navigate } from '@navigation'
import { getStreakThunk } from '@redux/actions'
import { BlockAnimated, Text } from '@components'
import { useAppDispatch, useAppSelector } from '@hooks'
import { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import {getIsLogin, getIsLoginWithGuest} from '@redux/selectors'

export const StreakBall = () => {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()

  const streakCount = useAppSelector(
    (state) => state.root.streakReducer.streakCount,
  )
  const isLogin = useAppSelector(getIsLogin)
  const isLoginWithGuest = useAppSelector(getIsLoginWithGuest)

  React.useEffect(() => {
    if (isLogin || isLoginWithGuest) {
      dispatch(getStreakThunk())
    }
  }, [isLogin, isLoginWithGuest])

  if (!isLogin && !isLoginWithGuest) {
    return <></>
  }

  return (
    <BlockAnimated
      absolute
      width={50}
      right={15}
      radius={40}
      height={50}
      alignCenter
      bottom={100}
      justifyCenter
      borderWidth={4}
      exiting={SlideOutRight}
      backgroundColor={'#fff'}
      borderColor={streakCount ?? 0 > 0 ? colors.orangeThick : '#efefef'}
      entering={SlideInRight.delay(1000).springify().damping(100)}
    >
      <Pressable onPress={() => navigate('STREAK_SCREEN')}>
        <Icon state={streakCount ?? 0 > 0 ? 'StreakOn' : 'StreakOff'} />
        <Text
          size={'h5'}
          alignSelf={'center'}
          fontFamily={'bold'}
          color={streakCount ?? 0 > 0 ? colors.orangeThick : '#C7C5C3'}
        >
          {streakCount ?? 0}
        </Text>
      </Pressable>
    </BlockAnimated>
  )
}
