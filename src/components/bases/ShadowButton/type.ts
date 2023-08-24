import React from 'react'
import { FontKeys } from '@themes'
import { ViewStyle, TextStyle, PressableProps } from 'react-native'

export interface ButtonShadowProps extends PressableProps {
  /**
   * Width of the component
   */
  buttonWidth?: number | string
  /**
   * Height of the component
   */
  buttonHeight?: number | string
  /**
   * border width of the component
   */
  buttonBorderSize?: number
  /**
   *
   * border color of the component
   * value can be a string or ReactNode
   *
   * buttonBorderColor='string' <=> { backgroundColor: string | `ColorKeys` }
   *
   * `ColorKeys` base on App Theme (@themes/color)
   *
   * buttonBorderColor= `<ReactNode/>` <=> {`<ReactNode/>`}
   *
   * @example
   * <Block style={StyleSheet.absoluteFill}>
   *  <LinearGradient
   *    colors={['#FFEFAD', '#FFC107']}
   *    containerStyle={{ width: '100%', height: '100%' }}
   *  />
   * </Block>
   *
   */
  buttonBorderColor?: string | React.ReactNode
  /**
   *
   * ```
   * style of shadow button
   * ```
   *
   */
  containerStyle?: ViewStyle
  /**
   *
   * ```
   * labelSize={number} <=> { fontSize: number | `FontKeys` }
   * ```
   *
   */
  labelSize?: FontKeys | number
  /**
   *
   * ```
   * labelColor='string' <=> { color: string | `ColorKeys` }
   *
   * `ColorKeys` base on App Theme (@themes/color)
   * ```
   *
   */
  labelColor?: string
  /**
   *
   * ```
   * fontFamily='string'<=> { fontFamily: string }
   * ```
   *
   */
  fontFamily?: 'bold' | 'semiBold' | 'regular' | 'light'
  /**
   *
   * ```
   * advance style of button label
   * ```
   *
   */
  labelStyle?: TextStyle

  /**
   *
   * ```
   * bottom_shadow for button
   * ```
   *
   */
  shadowHeight?: number
  /**
   *
   * ```
   * buttonRadius='number' <=> { borderRadius: number }
   * ```
   *
   */
  buttonRadius: number
  /**
   *
   * ```
   * buttonColor='string' <=> { backgroundColor: string | `ColorKeys` }
   * `ColorKeys` base on App Theme (@themes/color)
   * ```
   *
   */
  buttonColor?: string
  /**
   *
   * ```
   * shadowButtonColor='string' <=> { backgroundColor: string | `ColorKeys` }
   * `ColorKeys` base on App Theme (@themes/color)
   * ```
   *
   */
  shadowButtonColor?: string
  // /**
  //  *
  //  * ```
  //  * press callback for shadowButton
  //  * ```
  //  *
  //  */
  // onPress?: () => void
  // /**
  //  *
  //  * ```
  //  * press in callback for shadowButton
  //  * ```
  //  *
  //  */
  // onPressIn?: () => void
  // /**
  //  *
  //  * ```
  //  * press out callback for shadowButton
  //  * ```
  //  *
  //  */
  // onPressOut?: () => void
}
