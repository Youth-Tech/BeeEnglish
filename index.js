/**
 * @format
 */

import { AppRegistry, Linking } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import notifee, { EventType } from '@notifee/react-native'

import App from './src/App'
import { initRun } from '@utils/authUtils'
import { name as appName } from './app.json'

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification } = detail
  console.log('Notifee notification in background!', detail.notification)

  if (type === EventType.PRESS) {
    console.log('User pressed notification', detail.notification)
    detail?.notification?.data &&
      Linking.openURL(detail.notification?.data?.action ?? '')
  }
  await notifee.cancelNotification(notification.id)
})

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('notification on background state', remoteMessage.notification)
})
initRun()

AppRegistry.registerComponent(appName, () => App)
