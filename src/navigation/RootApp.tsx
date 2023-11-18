import React from 'react'
import { ActivityIndicator, LogBox } from 'react-native'
import notifee, { EventType } from '@notifee/react-native'
import { addEventListener } from '@react-native-community/netinfo'
import * as Types from '@react-native-community/netinfo/src/internal/types'

import {
  getFCMToken,
  createChannelId,
  notificationListener,
  requestUserPermission,
} from '@utils/notificationUtils'
import { useTheme } from '@themes'
import RootStack from './RootStack'
import { UserService } from '@services'
import { useAppSelector } from '@hooks'
import { Block, StatusBar, Text } from '@components'
import { getIsLoading } from '@redux/selectors'
import Toast from 'react-native-toast-message'
import { Portal } from 'react-native-portalize'

export const RootApp = () => {
  const [netInfo, setNetInfo] = React.useState<Types.NetInfoState>({
    type: Types.NetInfoStateType.unknown,
    isConnected: true,
    isInternetReachable: null,
    details: null,
  })

  React.useEffect((): (() => void) => {
    return addEventListener(setNetInfo)
  }, [])

  const { colors } = useTheme()
  const isLoading = useAppSelector(getIsLoading)
  const isLogin = useAppSelector((state) => state.root.auth.isSignedIn)

  const updateFCMToken = async (fcmToken: string) => {
    try {
      await UserService.updateFCMToken({
        fcmToken,
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleRequestPostNotification = async () => {
    const isGranted = await requestUserPermission()
    if (isGranted) {
      let fcmToken = await getFCMToken()
      console.log(fcmToken)

      if (isLogin) {
        updateFCMToken(fcmToken || '')
      }

      await createChannelId()
      notificationListener()
    } else {
      console.log('User denied!')
    }
  }

  React.useEffect(() => {
    handleRequestPostNotification()

    return () => {
      notifee.onForegroundEvent(({ type, detail }) => {
        switch (type) {
          case EventType.DISMISSED:
            console.log('User dismissed notification', detail.notification)
            break
          case EventType.PRESS:
            console.log('User pressed notification', detail.notification)
            break
        }
      })
    }
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
      )}
      <RootStack />
      <Portal>
        <Toast position={'bottom'} bottomOffset={20} />
      </Portal>
    </>
  )
}
