import { BlockProps } from '../Block/types'

export interface ShadowBlockProps extends BlockProps {
  /**
   * shadow height of component
   */
  shadowHeight?: number
  /**
   * ```
   * shadowBackgroundColor='string' <=> { color: string | `ColorKeys` }
   * `ColorKeys` base on App Theme (@themes/color)
   * ```
   */
  shadowBackgroundColor?: string
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
}
