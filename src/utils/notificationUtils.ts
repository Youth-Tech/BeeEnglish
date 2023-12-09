import notifee, {
  AndroidImportance,
  AndroidBadgeIconType,
} from '@notifee/react-native'
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import { Linking, PermissionsAndroid, Platform } from 'react-native'

import { images } from '@assets'
import { colors } from '@themes'
import { ChannelId } from '@configs'
import { MMKVStore } from '@redux/store'

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

export function notificationListener() {
  try {
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        )
        remoteMessage?.data?.action &&
          Linking.openURL(
            `beeenglish://app/${remoteMessage?.data?.action as string}` ?? '',
          )
        console.log(remoteMessage?.data)
      }
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
          if (
            MMKVStore.getString('NOTIFICATION_QUIT_STATE_ID') !==
            remoteMessage.messageId
          ) {
            MMKVStore.set(
              'NOTIFICATION_QUIT_STATE_ID',
              remoteMessage?.messageId ?? '',
            )
            remoteMessage?.data?.action &&
              Linking.openURL(
                `beeenglish://app/${remoteMessage?.data?.action as string}` ??
                  '',
              )
            console.log(remoteMessage?.data)
          }
        }
      })

    const subOnMessage = messaging().onMessage(async (remoteMessage) => {
      console.log(
        'notification on foreground state',
        remoteMessage.notification,
      )
      displayDefaultNotify(remoteMessage.notification, remoteMessage.data)
    })

    return () => {
      subOnMessage()
    }
  } catch (error) {
    console.log('Error listener notification', error)
  }

  return () => {}
}

export const displayDefaultNotify = async (
  notification?: FirebaseMessagingTypes.NotificationPayload,
  data?: { [key: string]: string | object },
) => {
  // Display a notification

  await notifee.displayNotification({
    title: notification?.title || 'Title notification',
    body: notification?.body || 'Body notification',
    data: {
      ...data,
      action: 'beeenglish://app/'.concat((data?.action as string) ?? ''),
    },
    android: {
      channelId: ChannelId.Default,
      smallIcon: 'ic_noti', // optional, defaults to 'ic_launcher'.
      color: colors['light'].orangePrimary,
      largeIcon: images.BeeWithHoney,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
        launchActivity: 'BeeEnglish',
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
