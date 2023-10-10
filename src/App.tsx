import { persistor, store } from '@redux/store'
import React from 'react'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/lib/integration/react'

import '@configs'
import './i18n/i18n'
import { RootApp } from '@navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {Host} from 'react-native-portalize'
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Host>
          <RootApp />
          </Host>
        </PersistGate>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
