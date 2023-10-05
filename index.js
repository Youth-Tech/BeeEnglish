/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

import messaging from '@react-native-firebase/messaging'
import notifee, { EventType } from '@notifee/react-native'
import DeviceInfo from 'react-native-device-info'
import { DeviceInfoConfig } from '@configs'

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

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('notification on background state', remoteMessage.notification)
})

//get init device info
const initRun = (async function () {
  DeviceInfoConfig.deviceName = DeviceInfo.getDeviceNameSync()
  DeviceInfoConfig.deviceId = await DeviceInfo.getUniqueId()
})()

AppRegistry.registerComponent(appName, () => App)
