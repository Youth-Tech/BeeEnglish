import React from 'react'
import { Provider } from 'react-redux'
import { Host } from 'react-native-portalize'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import '@configs'
import './i18n/i18n'
import { RootApp } from '@navigation'
import { persistor, store } from '@redux/store'
import { soundInstance } from '@utils/soundUtils'
soundInstance('')
const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <PersistGate loading={null} persistor={persistor}>
            <Host>
              <RootApp />
            </Host>
          </PersistGate>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  )
}

export default App
