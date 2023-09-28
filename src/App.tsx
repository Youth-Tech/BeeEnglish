import { persistor, store } from '@redux/store'
import React from 'react'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/lib/integration/react'
import RootApp from '@navigation/RootApp'

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
