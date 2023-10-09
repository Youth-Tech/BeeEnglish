import { BlockProps } from '../Block/types'
import { CommonTextProps } from '../Text/type'

export interface ShadowBlockProps extends BlockProps {
  /**
   * shadow height of component
   */
  shadowHeight?: number
  /**
   * position of shadow
   */
  shadowPosition?: 'top' | 'bottom'
  /**
   * position of shadow
   */
  shadowLabel?: string
  /**
   * define style for shadow label
   */
  shadowLabelTextStyle?: CommonTextProps
  /**
   * define style for shadow label container
   */
  shadowLabelContainerStyle?: BlockProps
  /**
   * ```
   * shadowColor='string' <=> { color: string | `ColorKeys` }
   * `ColorKeys` base on App Theme (@themes/color)
   * ```
   */
  shadowColor?: string
  /**
   * ```
   * containerPaddingVertical='string' <=> { paddingVertical: number }
   * ```
   */
  containerPaddingVertical?: number
  /**
   * ```
   * containerPaddingHorizontal='number' <=> { paddingHorizontal: number }
   * ```
   */
  containerPaddingHorizontal?: number
  /**
   * ```
   * containerPaddingRight='number' <=> { paddingRight: number }
   * ```
   */
  containerPaddingRight?: number
  /**
   * ```
   * containerPaddingLeft='number' <=> { paddingLeft: number }
   * ```
   */
  containerPaddingLeft?: number
  /**
   * ```
   * containerPaddingTop='number' <=> { paddingTop: number }
   * ```
   */
  containerPaddingTop?: number
  /**
   * ```
   * containerPaddingBottom='number' <=> { paddingBottom: number }
   * ```
   */
  containerPaddingBottom?: number
}
