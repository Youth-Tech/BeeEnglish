import React from 'react'
import Toast from 'react-native-toast-message'
import { Portal } from 'react-native-portalize'
import { ActivityIndicator, Linking, LogBox } from 'react-native'
import notifee, { EventType } from '@notifee/react-native'
import { addEventListener } from '@react-native-community/netinfo'
import * as Types from '@react-native-community/netinfo/src/internal/types'

import {
  createChannelId,
  getFCMToken,
  notificationListener,
  requestUserPermission,
} from '@utils/notificationUtils'
import { useTheme } from '@themes'
import RootStack from './RootStack'
import { UserService } from '@services'
import { updateProfile } from '@redux/actions'
import { Block, StreakBall, Text } from '@components'
import { useAppDispatch, useAppSelector } from '@hooks'
import {
  getIsLoading,
  getIsLogin,
  getIsLoginWithGuest,
  getStreakBallState,
} from '@redux/selectors'

export const RootApp = () => {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const isLoading = useAppSelector(getIsLoading)
  const isLogin = useAppSelector(getIsLogin)
  const isShowStreakBall = useAppSelector(getStreakBallState)
  const isLoginWithGuest = useAppSelector(getIsLoginWithGuest)

  const [netInfo, setNetInfo] = React.useState<Types.NetInfoState>({
    details: null,
    isConnected: true,
    isInternetReachable: null,
    type: Types.NetInfoStateType.unknown,
  })

  const updateFCMToken = async (fcmToken: string) => {
    try {
      await UserService.updateFCMToken({
        fcmToken,
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleRequestPushNotification = async () => {
    const isGranted = await requestUserPermission()
    if (isGranted) {
      let fcmToken = await getFCMToken()
      console.log(fcmToken)

      if (isLogin || isLoginWithGuest) {
        updateFCMToken(fcmToken || '')
        dispatch(updateProfile())
      }
      await createChannelId()
    } else {
      console.log('User denied!')
    }
  }

  React.useEffect(() => {
    //sub notification listener
    const unSubNotification = notificationListener()
    const unSubNetInfo = addEventListener(setNetInfo)

    //sub - unSubscribeNetInfo
    return () => {
      unSubNetInfo()
      unSubNotification()
    }
  }, [])

  React.useEffect(() => {
    handleRequestPushNotification()
    return notifee.onForegroundEvent(({ type, detail }) => {
      console.log('Notifee notification in foreground!', detail.notification)

      if (type === EventType.PRESS) {
        detail?.notification?.data &&
          Linking.openURL(
            (detail.notification?.data?.action as string) ?? 'word-review/123',
          )
        console.log('User pressed notification', detail.notification)
      }
    })
  }, [])

  LogBox.ignoreLogs(['new NativeEventEmitter'])

  return (
    <>
      {/*<StatusBar />*/}
      {isLoading && (
        <Block
          absolute
          zIndex={10}
          left={0}
          right={0}
          top={0}
          bottom={0}
          alignCenter
          justifyCenter
          backgroundColor="black"
          opacity={0.5}
        >
          <ActivityIndicator color={colors.orangeDark} />
        </Block>
      )}
      {!netInfo.isConnected && (
        <Portal>
          <Block
            absolute
            left={0}
            right={0}
            top={0}
            bottom={0}
            alignCenter
            justifyCenter
            zIndex={10}
          >
            <Text color="red" size={'h1'} fontFamily="bold">
              Network error
            </Text>
          </Block>
        </Portal>
      )}
      <RootStack />
      <Portal>
        <Toast position={'bottom'} bottomOffset={20} />
        {isShowStreakBall && <StreakBall />}
      </Portal>
    </>
  )
}
