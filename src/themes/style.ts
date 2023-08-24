import { useMemo } from 'react'

import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { baseStyles, BaseStyles } from './baseStyles'
import { colors, ThemeColor } from './color'
import { font, Font } from './font'
import { normalize, Normalize } from './normalize'
import { useAppSelector } from '@hooks/useRedux'
import { keys } from '@utils/helpers'

export type ThemeColors = { [key: string]: string }

export type Theme = {
  font: Font
  colors: ThemeColors | ThemeColor['light']
  normalize: Normalize
  theme: string
}

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle
}

type NamedStylesFn<Props extends {}, T> = {
  [P in keyof T]:
    | ((args: Props) => ViewStyle | TextStyle | ImageStyle)
    | ViewStyle
    | TextStyle
    | ImageStyle
}

type StyleThemFn<
  Props extends {},
  T extends NamedStyles<T> | NamedStyles<any> | NamedStylesFn<Props, T>,
> = (args: Theme) => T | NamedStyles<any> | NamedStylesFn<Props, T>

type ReturnNameStyled<T, P> = T & P

export const theme = {
  light: {
    font,
    colors: colors.light,
    normalize,
    theme: 'light' as 'light' | 'dark',
  },
  dark: {
    font,
    colors: colors.dark,
    normalize,
    theme: 'dark' as 'light' | 'dark',
  },
}

export const useTheme = () => {
  const { theme: themeStore } = useAppSelector((state) => state.root.themeApp)
  return {
    font,
    normalize,
    colors: theme[themeStore || 'light'].colors,
    theme: themeStore,
  } as Theme // here
}

const createStyle = (styles: any, props?: any) => {
  return keys(styles).reduce((results, key) => {
    if (typeof styles[key] === 'function') {
      results[key] = styles[key](props)
    } else {
      results[key] = styles[key]
    }
    return results
  }, {} as any)
}

export const makeStyles =
  <Props extends {}>() =>
  <T extends NamedStyles<T> | NamedStyles<any> | NamedStylesFn<Props, T>>(
    styles:
      | StyleThemFn<Props, T>
      | T
      | NamedStyles<T>
      | NamedStylesFn<Props, T>,
  ) => {
    return (props?: Props) => {
      const { theme: themeStore } = useAppSelector(
        (state) => state.root.themeApp,
      )
      return useMemo<{
        [P in keyof ReturnNameStyled<T, BaseStyles>]: {}
      }>(
        () =>
          StyleSheet.create({
            ...baseStyles,
            ...createStyle(
              typeof styles === 'function'
                ? styles({
                    ...theme[themeStore || 'light'], // here
                  })
                : styles,
              props,
            ),
          }),
        [props, themeStore],
      )
    }
  }
