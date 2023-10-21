import React from 'react'
import { RootStackParamList } from './routes'
import { RootBottomTab } from './RootBottomTab'
import { navigationRef } from './NavigationServices'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  TestScreen,
  LoginScreen,
  ExamTestScreen,
  RegisterScreen,
  SendPasswordScreen,
  AboutTheTestScreen,
  PasswordResetScreen,
  VerificationCodeScreen,
  EmailRegistrationScreen,
  DictionaryScreen,
  SplashScreen,
  DetailLessonScreen,
} from '@screens'
import StreakScreen from '@screens/StreakScreen'

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
        initialRouteName="DICTIONARY_SCREEN"
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
          <Stack.Screen name="SPLASH_SCREEN" component={SplashScreen} />
          <Stack.Screen name="DICTIONARY_SCREEN" component={DictionaryScreen} />
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
          <Stack.Screen name="STREAK_SCREEN" component={StreakScreen} />
          <Stack.Screen name="TEST_SCREEN" component={TestScreen} />
          <Stack.Screen name="DETAIL_LESSON_SCREEN" component={DetailLessonScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
