import React from 'react'
import { Provider } from 'react-redux'

import RootApp from '@navigation/RootApp'
import { persistor, store } from '@redux/store'
import { PersistGate } from 'redux-persist/lib/integration/react'

import './i18n/i18n'
import { PokemonService } from 'services'

const App = () => {
  React.useEffect(() => {
    const callApi = async () => {
      const res = await PokemonService.getPokemonByName('ditto')

      console.log(res)
    }

    callApi()
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
