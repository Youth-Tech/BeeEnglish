import React from 'react'
import { ActivityIndicator, LogBox } from 'react-native'
import Toast from 'react-native-toast-message'
import notifee, { EventType } from '@notifee/react-native'
import { addEventListener } from '@react-native-community/netinfo'
import * as Types from '@react-native-community/netinfo/src/internal/types'

import {
  getFCMToken,
  createChannelId,
  requestUserPermission,
} from '@utils/notificationUtils'
import { useTheme } from '@themes'
import RootStack from './RootStack'
import { UserService } from '@services'
import { Portal } from 'react-native-portalize'
import { navigate } from '@navigation/NavigationServices'
import {Block, StreakBall, Text} from '@components'
import { updateProfile } from '@redux/actions'
import { getIsLoading } from '@redux/selectors'
import { useAppDispatch, useAppSelector } from '@hooks'

export const RootApp = () => {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const isLoading = useAppSelector(getIsLoading)
  const isLogin = useAppSelector((state) => state.root.auth.isSignedIn)

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

  const handleRequestPostNotification = async () => {
    const isGranted = await requestUserPermission()
    if (isGranted) {
      let fcmToken = await getFCMToken()
      console.log(fcmToken)

      if (isLogin) {
        updateFCMToken(fcmToken || '')
        dispatch(updateProfile())
      }
      await createChannelId()
    } else {
      console.log('User denied!')
    }
  }

  React.useEffect(() => {
    //sub - unSubscribeNetInfo
    return addEventListener(setNetInfo)
  }, [])

  React.useEffect(() => {
    handleRequestPostNotification()
    return notifee.onForegroundEvent(({ type, detail }) => {
      console.log('User press notifee notification in foreground!')

      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification)
          break
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification)
          navigate('DETAIL_WORD_SCREEN', {
            wordId: detail.notification?.data?.id,
          })
          break
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
        <StreakBall/>
      </Portal>
    </>
  )
}
