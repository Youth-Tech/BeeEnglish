import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  LessonMap,
  TestScreen,
  DetailPost,
  VocabScreen,
  LoginScreen,
  SplashScreen,
  StreakScreen,
  GrammarScreen,
  SettingScreen,
  NavigateScreen,
  RegisterScreen,
  ExamTestScreen,
  SavedWordScreen,
  DetailWordScreen,
  DictionaryScreen,
  LearnedWordScreen,
  SendPasswordScreen,
  DetailLessonScreen,
  AboutTheTestScreen,
  PasswordResetScreen,
  ChangePasswordScreen,
  CongratulationScreen,
  VerificationCodeScreen,
  EmailRegistrationScreen,
} from '@screens'
import { useAppSelector } from '@hooks'
import { RootStackParamList } from './routes'
import { RootBottomTab } from './RootBottomTab'
import { navigationRef } from './NavigationServices'
import { NavigationContainer } from '@react-navigation/native'
import { getIsLoginWithGuest } from '@redux/selectors'

const Stack = createNativeStackNavigator<RootStackParamList>()

const screenOptions = {
  header: () => null,
  cardOverlayEnabled: true,
  headerShown: false,
}
const RootStack = () => {
  const isSignedWithGuestRole = useAppSelector(getIsLoginWithGuest)
  const isSignedIn = useAppSelector((state) => state.root.auth.isSignedIn)

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName={
          isSignedIn || isSignedWithGuestRole ? 'BOTTOM_TAB' : 'NAVIGATE_SCREEN'
        }
      >
        <Stack.Screen name="BOTTOM_TAB" component={RootBottomTab} />
        <Stack.Group>
          <Stack.Screen
            name="RESET_PASSWORD_SCREEN"
            component={PasswordResetScreen}
          />
          <Stack.Screen
            name="CONGRATULATION_SCREEN"
            component={CongratulationScreen}
          />
          <Stack.Screen
            name="SEND_PASSWORD_SCREEN"
            component={SendPasswordScreen}
          />
          <Stack.Screen name="LOGIN_SCREEN" component={LoginScreen} />
          <Stack.Screen name="SPLASH_SCREEN" component={SplashScreen} />
          <Stack.Screen name="REGISTER_SCREEN" component={RegisterScreen} />
          <Stack.Screen name={'NAVIGATE_SCREEN'} component={NavigateScreen} />
          <Stack.Screen name="DICTIONARY_SCREEN" component={DictionaryScreen} />
          <Stack.Screen
            name="ABOUT_THE_TEST_SCREEN"
            component={AboutTheTestScreen}
          />
          <Stack.Screen name="DETAIL_POST_SCREEN" component={DetailPost} />
          <Stack.Screen name="EXAM_TEST_SCREEN" component={ExamTestScreen} />
          <Stack.Screen
            name="EMAIL_REGISTRATION_SCREEN"
            component={EmailRegistrationScreen}
          />
          <Stack.Screen
            name="VERIFICATION_CODE_SCREEN"
            component={VerificationCodeScreen}
          />
          <Stack.Screen
            name="CHANGE_PASSWORD_SCREEN"
            component={ChangePasswordScreen}
          />
          <Stack.Screen name="VOCAB_SCREEN" component={VocabScreen} />
          <Stack.Screen
            name="DETAIL_WORD_SCREEN"
            component={DetailWordScreen}
          />
          <Stack.Screen name="TEST_SCREEN" component={TestScreen} />
          <Stack.Screen name="STREAK_SCREEN" component={StreakScreen} />
          <Stack.Screen name="SAVED_WORD_SCREEN" component={SavedWordScreen} />
          <Stack.Screen
            name="LEARNED_WORD_SCREEN"
            component={LearnedWordScreen}
          />
          <Stack.Screen
            name="DETAIL_LESSON_SCREEN"
            component={DetailLessonScreen}
          />
          <Stack.Screen name="LESSON_MAP_SCREEN" component={LessonMap} />
          <Stack.Screen name="VIDEO_SCREEN" component={VideoScreen} />
          <Stack.Screen name="SETTING_SCREEN" component={SettingScreen} />
          <Stack.Screen name="GRAMMAR_SCREEN" component={GrammarScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
