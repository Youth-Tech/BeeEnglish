/**
 * @format
 */

import { AppRegistry } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import messaging from '@react-native-firebase/messaging'
import notifee, { EventType } from '@notifee/react-native'

import App from './src/App'
import { initRun } from '@utils/authUtils'
import { DeviceInfoConfig } from '@configs'
import { name as appName } from './app.json'
import { notificationListener } from '@utils/notificationUtils'


notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail
  console.log('User press notifee notification in background!')
  switch (type) {
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail.notification)
      break
    case EventType.PRESS:
      console.log('User pressed notification', detail.notification)
      break
  }
  await notifee.cancelNotification(notification.id)
})

notificationListener()
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('notification on background state', remoteMessage.notification)
})
initRun()

AppRegistry.registerComponent(appName, () => App)
