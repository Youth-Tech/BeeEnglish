// import { Block } from '@components/Block/index';
import { persistor, store } from 'reduxs/store'
import React from 'react'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/lib/integration/react'
import RootApp from '@navigation/RootApp'
import { SplashScreen } from '@screens'
import { Container } from '@components'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootApp />
        
      </PersistGate>
    </Provider>
  )
}

export default App
