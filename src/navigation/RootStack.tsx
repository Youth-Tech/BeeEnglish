import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import { navigationRef } from './NavigationServices'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './routes'
import { RootBottomTab } from './RootBottomTab'
import {
  PhoneRegistrationScreen,
  TestScreen,
  VerificationCodeScreen,
} from '@screens'

const Stack = createNativeStackNavigator<RootStackParamList>()

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
        initialRouteName="PHONE_REGISTRATION_SCREEN"
      >
        <Stack.Screen name="BOTTOM_TAB" component={RootBottomTab} />
        <Stack.Group>
          <Stack.Screen
            name="PHONE_REGISTRATION_SCREEN"
            component={PhoneRegistrationScreen}
          />
          <Stack.Screen
            name="VERIFICATION_CODE_SCREEN"
            component={VerificationCodeScreen}
          />
          <Stack.Screen name="SPLASH_SCREEN" component={TestScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
