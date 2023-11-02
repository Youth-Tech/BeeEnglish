import '@configs'
import './i18n/i18n'
import React from 'react'
import { RootApp } from '@navigation'
import { Provider } from 'react-redux'
import { Host } from 'react-native-portalize'
import { persistor, store } from '@redux/store'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

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
