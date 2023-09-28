import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import { navigationRef } from './NavigationServices'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen, NavigateScreen, SplashScreen, TestScreen } from '@screens'

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
        initialRouteName="Navigate_Screen"
      >
        <Stack.Screen name="HOME_SCREEN" component={HomeScreen} />
        <Stack.Screen name="HOME_SCREEN_1" component={TestScreen} />
        <Stack.Screen name="Splash_Screen" component={SplashScreen} />
        <Stack.Screen name="Navigate_Screen" component={NavigateScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
