import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  AboutTheTestScreen,
  ChangePasswordScreen,
  ChooseVideoScreen,
  CongratulationScreen,
  DetailLessonScreen,
  DetailPost,
  DetailWordScreen,
  DictionaryScreen,
  EmailRegistrationScreen,
  ExamTestScreen,
  GrammarScreen,
  InvoiceScreen,
  LearnedWordScreen,
  LoginScreen,
  MorePostScreen,
  NavigateScreen,
  PasswordResetScreen,
  PreTestScreen,
  RankingScreen,
  RegisterScreen,
  SavedWordScreen,
  SendPasswordScreen,
  SettingScreen,
  SplashScreen,
  StreakScreen,
  SubcriptionPlanScreen,
  TestScreen,
  VerificationCodeScreen,
  VideoScreen,
  VocabScreen,
} from '@screens'
import { useAppSelector } from '@hooks'
import { RootStackParamList } from './routes'
import { RootBottomTab } from './RootBottomTab'
import { navigationRef } from './NavigationServices'
import { NavigationContainer } from '@react-navigation/native'
import { getIsLogin, getIsLoginWithGuest } from '@redux/selectors'
import { LinkingOptions } from '@react-navigation/native/lib/typescript/src/types'

const Stack = createNativeStackNavigator<RootStackParamList>()

const screenOptions = {
  header: () => null,
  cardOverlayEnabled: true,
  headerShown: false,
}

const linking: LinkingOptions<RootStackParamList> | undefined = {
  prefixes: ['beeenglish://app'],
  config: {
    screens: {
      SAVED_WORD_SCREEN: {
        path: 'word-review/:id',
        parse: {
          id: (id) => id,
        },
      },
    },
  },
}

const RootStack = () => {
  const isSignedWithGuestRole = useAppSelector(getIsLoginWithGuest)
  const isSignedIn = useAppSelector(getIsLogin)

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
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
          {/*<Stack.Screen name="LESSON_MAP_SCREEN" component={LessonMap} />*/}
          <Stack.Screen name="VIDEO_SCREEN" component={VideoScreen} />
          <Stack.Screen name="SETTING_SCREEN" component={SettingScreen} />
          <Stack.Screen name="GRAMMAR_SCREEN" component={GrammarScreen} />
          <Stack.Screen
            name="CHOOSE_VIDEO_SCREEN"
            component={ChooseVideoScreen}
          />
          <Stack.Screen name="RANKING_SCREEN" component={RankingScreen} />
          <Stack.Screen name="PRE_TEST_SCREEN" component={PreTestScreen} />
          <Stack.Screen name="MORE_POST_SCREEN" component={MorePostScreen} />
          <Stack.Screen
            name="SUBSCRIPTION_SCREEN"
            component={SubcriptionPlanScreen}
          />
          <Stack.Screen name="INVOICE_SCREEN" component={InvoiceScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
