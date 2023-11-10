import notifee, {
  AndroidImportance,
  AndroidBadgeIconType,
} from '@notifee/react-native'
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'

import { ChannelId } from '@configs'
import { Platform } from 'react-native'
import { PermissionsAndroid } from 'react-native'

export async function requestUserPermission(): Promise<boolean> {
  let enabled = false
  let authStatus = undefined

  try {
    if (Platform.OS === 'android' && Platform.constants.Version >= 33) {
      authStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      )

      enabled = authStatus === 'granted'
    } else {
      authStatus = await messaging().requestPermission()

      enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
    }

    console.log('Authorization status:', authStatus)
  } catch (error) {
    console.log('Error when request user permission', error)
  } finally {
    return enabled
  }
}

export async function getFCMToken() {
  try {
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages()
    }
    return await messaging().getToken()
  } catch (error) {
    console.log('Error in FCM token', error)
    return undefined
  }
}

export async function notificationListener() {
  try {
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      )
      displayDefaultNotify(remoteMessage.notification)
    })

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          )
          displayDefaultNotify(remoteMessage.notification)
        }
      })

    messaging().onMessage(async (remoteMessage) => {
      console.log(
        'notification on foreground state',
        remoteMessage.notification,
      )
      displayDefaultNotify(remoteMessage.notification)
    })
  } catch (error) {
    console.log('Error listener notification', error)
  }
}

export const displayDefaultNotify = async (
  notification?: FirebaseMessagingTypes.NotificationPayload,
) => {
  // Display a notification
  await notifee.displayNotification({
    title: notification?.title || 'Title notification',
    body: notification?.body || 'Body notification',
    android: {
      channelId: ChannelId.Default,
      // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
      badgeIconType: AndroidBadgeIconType.SMALL,
      importance: AndroidImportance.HIGH,
    },
  })
}

export const createChannelId = async () => {
  // Request permissions (required for iOS)
  await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: ChannelId.Default,
    name: ChannelId.Default,
    badge: true,
    importance: AndroidImportance.HIGH,
  })
  console.log('Channel id', channelId)
}
