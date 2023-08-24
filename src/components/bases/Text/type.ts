import { TextProps as RNTextProps } from 'react-native'
import { DefaultStyleProps } from '@components/utils'
import { FontKeys } from '@themes'

export interface CommonTextProps extends DefaultStyleProps, RNTextProps {
  /**
   *
   * ```
   * size={number} <=> {fontSize: number | `FontKeys`}
   * ```
   *
   */
  size?: FontKeys | number

  /**
   *
   * ```
   * color='string' <=> {color: string | `ColorKeys`}
   * `ColorKeys` base on App Theme (@themes/color)
   * ```
   *
   */
  color?: string

  /**
   *
   * ```
   * center <=> { textAlign: 'center' }
   * ```
   *
   */
  center?: boolean

  /**
   *
   * ```
   * right <=> { textRight: 'right' }
   * ```
   *
   */
  right?: boolean

  /**
   *
   * ```
   * left <=> { textLeft: 'left' }
   * ```
   *
   */
  left?: boolean

  /**
   *
   * ```
   * justify <=> { textJustify: 'justify' }
   * ```
   *
   */
  justify?: boolean

  /**
   *
   * ```
   * paddingTop={number} <=> { paddingTop: number }
   * ```
   *
   */
  paddingTop?: number

  /**
   *
   * ```
   * paddingBottom={number} <=> { paddingBottom: number }
   * ```
   *
   */
  paddingBottom?: number

  /**
   *
   * ```
   * paddingLeft={number} <=> { paddingLeft: number }
   * ```
   *
   */
  paddingLeft?: number

  /**
   *
   * ```
   * paddingRight={number} <=> { paddingRight: number }
   * ```
   *
   */
  paddingRight?: number

  /**
   *
   * ```
   * marginBottom={number} <=> { marginBottom: number }
   * ```
   *
   */
  marginBottom?: number

  /**
   *
   * ```
   * marginLeft={number} <=> { marginLeft: number }
   * ```
   *
   */
  marginLeft?: number

  /**
   *
   * ```
   * marginRight={number} <=> { marginRight: number }
   * ```
   *
   */
  marginRight?: number

  /**
   *
   * ```
   * marginTop={number} <=> { marginTop: number }
   * ```
   *
   */
  marginTop?: number

  /**
   *
   * ```
   * paddingVertical={number} <=> { paddingVertical: number }
   * ```
   *
   */
  paddingVertical?: number

  /**
   *
   * ```
   * paddingHorizontal={number} <=> { paddingHorizontal: number }
   * ```
   *
   */
  paddingHorizontal?: number

  /**
   *
   * ```
   * marginVertical={number} <=> { marginVertical: number }
   * ```
   *
   */
  marginVertical?: number

  /**
   *
   * ```
   * marginHorizontal={number} <=> { marginHorizontal: number }
   * ```
   *
   */
  marginHorizontal?: number

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
   * lineHeight={number}<=> { lineHeight: number }
   * ```
   *
   */
  lineHeight?: number

  /**
   *
   * ```
   * textDecorationLine = 'solid' <=> { textDecorationLine : olid }
   * ```
   *
   */
  textDecorationLine?: 'solid' | 'double' | 'dotted' | 'dashed'

  /**
   *
   * ```
   * fontWeight='string'<=> { fontWeight: string }
   * ```
   *
   */
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined
}
