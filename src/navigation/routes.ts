import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { Quiz } from '@services'

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
  VOCAB_SCREEN: 'VOCAB_SCREEN',
  CHANGE_PASSWORD_SCREEN: 'CHANGE_PASSWORD_SCREEN',

  LEARNED_WORD_SCREEN: 'LEARNED_WORD_SCREEN',
  GRAMMAR_SCREEN: 'GRAMMAR_SCREEN',
  SAVED_WORD_SCREEN: 'SAVED_WORD_SCREEN',
  DETAIL_WORD_SCREEN: 'DETAIL_WORD_SCREEN',
  SETTING_SCREEN: 'SETTING_SCREEN',
  DICTIONARY_SCREEN: 'DICTIONARY_SCREEN',
  DETAIL_LESSON_SCREEN: 'DETAIL_LESSON_SCREEN',
  LESSON_MAP_SCREEN: 'LESSON_MAP_SCREEN',

  CONGRATULATION_SCREEN: 'CONGRATULATION_SCREEN',
  VIDEO_SCREEN: 'VIDEO_SCREEN',
  CHOOSE_VIDEO_SCREEN: 'CHOOSE_VIDEO_SCREEN',
  RANKING_SCREEN: 'RANKING_SCREEN',

  PRE_TEST_SCREEN: 'PRE_TEST_SCREEN',
  MORE_POST_SCREEN: 'MORE_POST_SCREEN',
  SUBSCRIPTION_SCREEN: 'SUBSCRIPTION_SCREEN',
  INVOICE_SCREEN: 'INVOICE_SCREEN',
} as const

export const PUBLIC_ROUTE = {
  SPLASH_SCREEN: 'SPLASH_SCREEN',
  ABOUT_THE_TEST_SCREEN: 'ABOUT_THE_TEST_SCREEN',
  EXAM_TEST_SCREEN: 'EXAM_TEST_SCREEN',
  DETAIL_POST_SCREEN: 'DETAIL_POST_SCREEN',
  STREAK_SCREEN: 'STREAK_SCREEN',
  TEST_SCREEN: 'TEST_SCREEN',
  NAVIGATE_SCREEN: 'NAVIGATE_SCREEN',
} as const

export type RootStackParamList = {
  [AUTH_ROUTE.BOTTOM_TAB]: undefined
  [AUTH_ROUTE.GAME_SCREEN]: undefined
  [AUTH_ROUTE.HOME_SCREEN]: undefined
  [AUTH_ROUTE.LEARNING_SCREEN]: undefined
  [AUTH_ROUTE.PROFILE_SCREEN]: undefined
  [AUTH_ROUTE.VERIFICATION_CODE_SCREEN]: {
    type: 'signUp' | 'forgotPassword' | 'migrate'
    email: string
  }
  [AUTH_ROUTE.EMAIL_REGISTRATION_SCREEN]: undefined
  [AUTH_ROUTE.SEND_PASSWORD_SCREEN]: undefined
  [AUTH_ROUTE.CHANGE_PASSWORD_SCREEN]: undefined
  [AUTH_ROUTE.RESET_PASSWORD_SCREEN]: undefined
  [AUTH_ROUTE.LOGIN_SCREEN]: undefined
  [AUTH_ROUTE.REGISTER_SCREEN]: { isGuest?: boolean }
  [AUTH_ROUTE.VOCAB_SCREEN]: { lessonId: string }
  [AUTH_ROUTE.SETTING_SCREEN]: undefined
  [AUTH_ROUTE.DETAIL_LESSON_SCREEN]: {
    lessonId: string
    chapterId: string
    checkpointLesson?: Quiz[]
  }
  [AUTH_ROUTE.CHOOSE_VIDEO_SCREEN]: undefined
  [AUTH_ROUTE.DICTIONARY_SCREEN]: undefined
  [AUTH_ROUTE.LESSON_MAP_SCREEN]: undefined
  [AUTH_ROUTE.VIDEO_SCREEN]: undefined
  [AUTH_ROUTE.RANKING_SCREEN]: undefined
  [AUTH_ROUTE.MORE_POST_SCREEN]: undefined
  [AUTH_ROUTE.SUBSCRIPTION_SCREEN]: undefined
  [AUTH_ROUTE.INVOICE_SCREEN]: { getMe: boolean }

  [PUBLIC_ROUTE.SPLASH_SCREEN]: undefined
  [PUBLIC_ROUTE.ABOUT_THE_TEST_SCREEN]: undefined
  [PUBLIC_ROUTE.STREAK_SCREEN]: undefined
  [PUBLIC_ROUTE.EXAM_TEST_SCREEN]: undefined
  [PUBLIC_ROUTE.TEST_SCREEN]: undefined
  [PUBLIC_ROUTE.DETAIL_POST_SCREEN]: { post: PostResponse; isRead?: boolean }
  [PUBLIC_ROUTE.ABOUT_THE_TEST_SCREEN]: undefined
  [PUBLIC_ROUTE.TEST_SCREEN]: undefined
  [PUBLIC_ROUTE.NAVIGATE_SCREEN]: undefined
  [AUTH_ROUTE.LEARNED_WORD_SCREEN]: undefined
  [AUTH_ROUTE.GRAMMAR_SCREEN]: {
    lessonId: string
    chapterId: string
    checkpointLesson?: Quiz[]
  }
  [AUTH_ROUTE.SAVED_WORD_SCREEN]: undefined
  [AUTH_ROUTE.DETAIL_WORD_SCREEN]: { wordId: string }
  [AUTH_ROUTE.CONGRATULATION_SCREEN]: {
    status?: 'success' | 'failure'
    point: number
    type: 'normal' | 'checkpoint'
  }
  [AUTH_ROUTE.PRE_TEST_SCREEN]: undefined
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
