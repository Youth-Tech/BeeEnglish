import { NativeStackScreenProps } from '@react-navigation/native-stack'

export const AUTH_ROUTE = {
  //BOTTOM_TAB
  BOTTOM_TAB: 'BOTTOM_TAB',
  HOME_SCREEN: 'HOME_SCREEN',
  LEARNING_SCREEN: 'LEARNING_SCREEN',
  GAME_SCREEN: 'GAME_SCREEN',
  PROFILE_SCREEN: 'PROFILE_SCREEN',

  VERIFICATION_CODE_SCREEN: 'VERIFICATION_CODE_SCREEN',
  EMAIL_REGISTRATION_SCREEN: 'EMAIL_REGISTRATION_SCREEN',
  SEND_PASSWORD_SCREEN: 'SEND_PASSWORD_SCREEN',
  RESET_PASSWORD_SCREEN: 'RESET_PASSWORD_SCREEN',
  LOGIN_SCREEN: 'LOGIN_SCREEN',
  REGISTER_SCREEN: 'REGISTER_SCREEN',
  SAVED_WORD_SCREEN: 'SAVED_WORD_SCREEN',
  DETAIL_WORD_SCREEN: 'DETAIL_WORD_SCREEN',
} as const

export const PUBLIC_ROUTE = {
  SPLASH_SCREEN: 'SPLASH_SCREEN',
  ABOUT_THE_TEST_SCREEN: 'ABOUT_THE_TEST_SCREEN',
  EXAM_TEST_SCREEN: 'EXAM_TEST_SCREEN',

  TEST_SCREEN: 'TEST_SCREEN',
} as const

export type RootStackParamList = {
  [AUTH_ROUTE.BOTTOM_TAB]: undefined
  [AUTH_ROUTE.GAME_SCREEN]: undefined
  [AUTH_ROUTE.HOME_SCREEN]: undefined
  [AUTH_ROUTE.LEARNING_SCREEN]: undefined
  [AUTH_ROUTE.PROFILE_SCREEN]: undefined
  [AUTH_ROUTE.VERIFICATION_CODE_SCREEN]: undefined
  [AUTH_ROUTE.EMAIL_REGISTRATION_SCREEN]: undefined
  [AUTH_ROUTE.SEND_PASSWORD_SCREEN]: undefined
  [AUTH_ROUTE.RESET_PASSWORD_SCREEN]: undefined
  [AUTH_ROUTE.LOGIN_SCREEN]: undefined
  [AUTH_ROUTE.REGISTER_SCREEN]: undefined
  [PUBLIC_ROUTE.SPLASH_SCREEN]: undefined

  [PUBLIC_ROUTE.ABOUT_THE_TEST_SCREEN]: undefined
  [PUBLIC_ROUTE.EXAM_TEST_SCREEN]: undefined
  [PUBLIC_ROUTE.TEST_SCREEN]: undefined
  [AUTH_ROUTE.SAVED_WORD_SCREEN]: undefined
  [AUTH_ROUTE.DETAIL_WORD_SCREEN]: undefined
}

export type RouteKeys = keyof typeof AUTH_ROUTE | keyof typeof PUBLIC_ROUTE

export type StackPropsVerificationCodeScreen = NativeStackScreenProps<
  RootStackParamList,
  'SAVED_WORD_SCREEN'
>

export type StackPropsPhoneRegistrationScreen = NativeStackScreenProps<
  RootStackParamList,
  'DETAIL_WORD_SCREEN'
>
