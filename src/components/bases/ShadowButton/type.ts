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
  buttonRadius?: number
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

  /**
   *
   * ```
   * disabled='boolean' <=> { disabled: boolean | undefined }
   * ```
   *
   */
  disabled?: boolean
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
