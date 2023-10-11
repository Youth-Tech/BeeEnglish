import React from 'react'
import { ActivityIndicator } from 'react-native'
import notifee, { EventType } from '@notifee/react-native'
import { useNetInfo } from '@react-native-community/netinfo'

import {
  getFCMToken,
  createChannelId,
  notificationListener,
  requestUserPermission,
} from '@utils/notificationUtils'
import { useTheme } from '@themes'
import RootStack from './RootStack'
import { useAppSelector } from '@hooks'
import { getIsLoading } from '@redux/selectors'
import { Block, Text } from '@components'

export const RootApp = () => {
  const netInfo = useNetInfo()
  const { colors } = useTheme()
  const isLoading = useAppSelector(getIsLoading)

  const handleRequestPostNotification = async () => {
    const isGranted = await requestUserPermission()
    if (isGranted) {
      let fcmToken = await getFCMToken()
      console.log(fcmToken)

      notificationListener()
      createChannelId()
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

  return (
    <>
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
    </>
  )
}
