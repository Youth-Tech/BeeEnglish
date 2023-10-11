import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import { navigationRef } from './NavigationServices'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './routes'
import { RootBottomTab } from './RootBottomTab'
import {
  TestScreen,
  VerificationCodeScreen,
  LoginScreen,
  RegisterScreen,
  PasswordResetScreen,
  SendPasswordScreen,
  EmailRegistrationScreen,
  AboutTheTestScreen,
  ExamTestScreen,
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
        initialRouteName="TEST_SCREEN"
      >
        <Stack.Screen name="BOTTOM_TAB" component={RootBottomTab} />
        <Stack.Group>
          <Stack.Screen
            name="RESET_PASSWORD_SCREEN"
            component={PasswordResetScreen}
          />
          <Stack.Screen
            name="SEND_PASSWORD_SCREEN"
            component={SendPasswordScreen}
          />
          <Stack.Screen name="LOGIN_SCREEN" component={LoginScreen} />
          <Stack.Screen name="REGISTER_SCREEN" component={RegisterScreen} />
          <Stack.Screen name="SPLASH_SCREEN" component={TestScreen} />
          <Stack.Screen
            name="ABOUT_THE_TEST_SCREEN"
            component={AboutTheTestScreen}
          />
          <Stack.Screen name="EXAM_TEST_SCREEN" component={ExamTestScreen} />
          <Stack.Screen
            name="EMAIL_REGISTRATION_SCREEN"
            component={EmailRegistrationScreen}
          />
          <Stack.Screen
            name="VERIFICATION_CODE_SCREEN"
            component={VerificationCodeScreen}
          />
          <Stack.Screen name="TEST_SCREEN" component={TestScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
