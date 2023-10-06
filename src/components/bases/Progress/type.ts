import { CommonTextProps } from '../Text/type'
import { StyleProp, ViewStyle } from 'react-native'

export type ProgressCircleProps = {
  /**
   * total step of progress component
   */
  totalSteps: number
  /**
   * current step of progress component
   */
  step: number
  /**
   * ```
   * size of progress component
   * size: 'number' <=> {width: number, height: number}
   * ```
   */
  size: number
  /**
   * ```
   * stroke width of progress component
   * strokeWidth: 'number' <=> {strokeWidth: number}
   * ```
   */
  strokeWidth?: number
  /**
   * ```
   * backgroundColor for `total` step part of progress component
   * totalStepsColor: 'string' <=> {fill: string | `ColorKeys`}
   * `ColorKeys` base on App Theme (@themes/color)
   * ```
   */
  totalStepsColor?: string
  /**
   * ```
   * backgroundColor for `current` step part of progress component
   * stepColor: 'string' <=> {fill: string | `ColorKeys`}
   * `ColorKeys` base on App Theme (@themes/color)
   * ```
   */
  stepColor?: string
  /**
   *  style for container progress component
   */
  progressContainerStyles?: StyleProp<ViewStyle>

  /**
   *  props for label progress value
   */
  progressValueProps?: CommonTextProps

  /**
   *
   * trigger when animation has been completed
   *
   * @argument isFinish: boolean | undefined
   * @returns void
   *
   */
  onCompleteAnimation?: (isFinish?: boolean) => void
}

export type ProgressProps = Omit<
  ProgressCircleProps,
  'strokeWidth' | 'size'
> & {
  /**
   * ```
   * stroke height of progress component
   * strokeWidth: 'number' <=> {height: number}
   * ```
   */
  strokeHeight?: number
}
