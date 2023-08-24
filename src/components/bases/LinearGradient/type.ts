import { ViewStyle } from 'react-native'
import { TransformedProps } from 'react-native-svg'

export interface LinearGradientProps {
  /**
   * ```
   * List color for gradient map
   * ```
   */
  colors: string[]
  /**
   * ```
   * Style for component
   * ```
   */
  containerStyle?: ViewStyle
  /**
   *
   * Orientation for color gradient
   *
   * @param orientation 'horizontal' | 'vertical' | `number` <=> {10}
   *
   */
  orientation?: 'horizontal' | 'vertical' | number
  /**
   * ```
   * Revers list color
   * ```
   */
  revers?: boolean
  /**
   * ```
   * The `transform` attribute contains the definition of an optional additional transformation from the gradient coordinate system onto the target coordinate system
   * ```
   */
  transform?: Partial<TransformedProps>
}
