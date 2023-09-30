import { NativeStackScreenProps } from '@react-navigation/native-stack'

export const AUTH_ROUTE = {
  //BOTTOM_TAB
  BOTTOM_TAB: 'BOTTOM_TAB',
  HOME_SCREEN: 'HOME_SCREEN',
  LEARNING_SCREEN: 'LEARNING_SCREEN',
  GAME_SCREEN: 'GAME_SCREEN',
  PROFILE_SCREEN: 'PROFILE_SCREEN',

  VERIFICATION_CODE_SCREEN: 'VERIFICATION_CODE_SCREEN',
  PHONE_REGISTRATION_SCREEN: 'PHONE_REGISTRATION_SCREEN',
} as const

export const PUBLIC_ROUTE = {
  SPLASH_SCREEN: 'SPLASH_SCREEN',
} as const

export type RootStackParamList = {
  [AUTH_ROUTE.BOTTOM_TAB]: undefined
  [AUTH_ROUTE.GAME_SCREEN]: undefined
  [AUTH_ROUTE.HOME_SCREEN]: undefined
  [AUTH_ROUTE.LEARNING_SCREEN]: undefined
  [AUTH_ROUTE.PROFILE_SCREEN]: undefined
  [AUTH_ROUTE.VERIFICATION_CODE_SCREEN]: undefined
  [AUTH_ROUTE.PHONE_REGISTRATION_SCREEN]: undefined

  [PUBLIC_ROUTE.SPLASH_SCREEN]: undefined
}

export type RouteKeys = keyof typeof AUTH_ROUTE | keyof typeof PUBLIC_ROUTE

export type StackPropsVerificationCodeScreen = NativeStackScreenProps<
  RootStackParamList,
  'VERIFICATION_CODE_SCREEN'
>

export type StackPropsPhoneRegistrationScreen = NativeStackScreenProps<
  RootStackParamList,
  'PHONE_REGISTRATION_SCREEN'
>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
