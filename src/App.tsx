import { persistor, store } from '@redux/store'
import React from 'react'
import {
  createChannelId,
  getFCMToken,
  notificationListener,
  requestUserPermission,
} from '@utils/notificationUtils'
import { Provider } from 'react-redux'
import notifee, { EventType } from '@notifee/react-native'

import { PersistGate } from 'redux-persist/lib/integration/react'

import './i18n/i18n'
import '@configs'
import RootApp from '@navigation/RootApp'

const App = () => {
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

    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification)
          break
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification)
          break
      }
    })
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootApp />
      </PersistGate>
    </Provider>
  )
}

export default App
