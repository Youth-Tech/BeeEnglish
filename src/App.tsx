import {persistor, store} from '@redux/store'
import React from 'react'
import {Provider} from 'react-redux'

import {PersistGate} from 'redux-persist/lib/integration/react'

import './i18n/i18n'
import {PokemonService} from 'services'
import {BackGame, IconSystem, LeftArrow} from "@assets/icons/IconSystem";
// import RootApp from '@navigation/RootApp'

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
        {/*<RootApp />*/}
        <LeftArrow/>
        <BackGame/>
        <IconSystem state={"LeftArrow"} size={24} />
      </PersistGate>
    </Provider>
  )
}

export default App
