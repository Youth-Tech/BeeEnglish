import {
  CommonActions,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native'
import React from 'react'
import { RootStackParamList, RouteKeys } from './routes'

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>()

export function navigate(name: RouteKeys, params?: any, key?: string) {
  if (key) {
    navigationRef.current?.navigate({ key, name, params })
    return
  }
  navigationRef.current?.navigate(name, params)
}

export function goBack() {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current?.goBack()
  } else {
    navigateAndReset([{ name: 'BOTTOM_TAB' }], 0)
  }
}

export function navigateAndReset(
  routes: { name: RouteKeys; params?: any }[],
  index: number,
) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index,
      routes,
    }),
  )
}

export function push(name: RouteKeys, params?: any) {
  navigationRef.current?.dispatch(StackActions.push(name, params))
}

export function replace(name: RouteKeys, params?: any) {
  navigationRef.current?.dispatch(StackActions.replace(name, params))
}

export function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop())
}

export function pop(count?: number) {
  navigationRef.current?.dispatch(StackActions.pop(count))
}

export default {
  navigate,
  push,
  replace,
  pop,
  popToTop,
  navigationRef,
}
