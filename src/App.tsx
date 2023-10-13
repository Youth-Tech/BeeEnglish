import '@configs'
import './i18n/i18n'
import React from 'react'
import { RootApp } from '@navigation'
import { Provider } from 'react-redux'
import { Host } from 'react-native-portalize'
import { persistor, store } from '@redux/store'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Host>
            <RootApp />
          </Host>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
