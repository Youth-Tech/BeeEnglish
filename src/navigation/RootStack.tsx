import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import { navigationRef } from './NavigationServices'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen, TestScreen } from '@screens'

const Stack = createNativeStackNavigator()
const screenOptions = {
  header: () => null,
  cardOverlayEnabled: true,
  headerShown: false,
}

const RootStack = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName="HOME_SCREEN"
      >
        <Stack.Screen name="HOME_SCREEN" component={HomeScreen} />
        <Stack.Screen name="HOME_SCREEN_1" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
