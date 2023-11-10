// import { DefaultStyleProps } from '@components/utils';
import { ViewProps, ViewStyle } from 'react-native'
import { DefaultStyleProps } from '@components/utils'

export interface BlockProps extends DefaultStyleProps, ViewProps {
  /**
   * Width of the component
   */
  width?: number | string

  /**
   * Height of the component
   */
  height?: number | string

  /**
   * The flexible items are displayed horizontally, as a row
   */
  row?: boolean

  /**
   * The flexible items are displayed vertical, as a colum
   */
  column?: boolean

  /**
   *
   * ```
   * space="around" <=> {justifyContent: 'space-around'}
   * ```
   * ```
   * space="between" <=> {justifyContent: 'space-between'}
   * ```
   * ```
   * space="evenly" <=> {justifyContent: 'space-evenly'}
   * ```
   */
  space?: 'around' | 'between' | 'evenly'

  /**
   * ```
   * alignStart <=> { alignItems: 'flex-start' }
   * ```
   */
  alignStart?: boolean

  /**
   * ```
   * alignCenter <=> { alignItems: 'center' }
   * ```
   */
  alignCenter?: boolean

  /**
   * ```
   * alignEnd <=> { alignItems: 'flex-end' }
   * ```
   */
  alignEnd?: boolean

  /**
   * ```
   * justifyCenter <=> { justifyContent: "center" }
   * ```
   */
  justifyCenter?: boolean

  /**
   * ```
   * justifyEnd <=> { justifyContent: "flex-end" }
   * ```
   */
  justifyEnd?: boolean

  /**
   * ```
   * gap <=> { gap: number}
   * ```
   */
  gap?: number

  /**
   * ```
   * justifyStart <=> { justifyContent: "flex-start"}
   * ```
   */
  justifyStart?: boolean

  /**
   * ```
   * paddingTop={number} <=> { paddingTop: number}
   * ```
   */
  paddingTop?: number

  /**
   * ```
   * paddingBottom={number} <=> { paddingBottom: number}
   * ```
   */
  paddingBottom?: number

  /**
   * ```
   * paddingLeft={number} <=> { paddingLeft: number}
   * ```
   */
  paddingLeft?: number

  /**
   * ```
   * paddingRight={number} <=> { paddingRight: number}
   * ```
   */
  paddingRight?: number

  /**
   * ```
   * marginBottom={number} <=> { marginBottom: number}
   * ```
   */
  marginBottom?: number

  /**
   * ```
   * marginLeft={number} <=> { marginLeft: number}
   * ```
   */
  marginLeft?: number

  /**
   * ```
   * marginRight={number} <=> { marginRight: number}
   * ```
   */
  marginRight?: number

  /**
   * ```
   * marginTop={number} <=> { marginTop: number}
   * ```
   */
  marginTop?: number

  /**
   * ```
   * paddingVertical={number} <=> { paddingVertical: number}
   * ```
   */
  paddingVertical?: number

  /**
   * ```
   * paddingHorizontal={number} <=> { paddingHorizontal: number}
   * ```
   */
  paddingHorizontal?: number

  /**
   * ```
   * marginVertical={number} <=> { marginVertical: number}
   * ```
   */
  marginVertical?: number

  /**
   * ```
   * marginHorizontal={number} <=> { marginHorizontal: number}
   * ```
   */
  marginHorizontal?: number

  /**
   * ```
   * borderWidth={number} <=> { borderWidth: number}
   * ```
   */
  borderWidth?: number

  /**
   * ```
   * relative <=> { position: 'relative'}
   * ```
   */
  relative?: boolean

  /**
   * ```
   * absolute <=> { position: 'absolute'}
   * ```
   */
  absolute?: boolean

  /**
   * ```
   * borderColor='color' <=> { borderColor: 'color'}
   * ```
   */
  borderColor?: string

  /**
   * ```
   * shadowColor='color' <=> { shadowColor: 'color'}
   * ```
   */
  shadowColor?: string

  /**
   * ```
   * elevation={number} <=> { elevation: number}
   * ```
   */
  elevation?: number

  /**
   * ```
   * maxWidth={number} <=> { maxWidth: number}
   * ```
   */
  maxWidth?: number

  /**
   * ```
   * maxHeight={number} <=> { maxHeight: number}
   * ```
   */
  maxHeight?: number

  /**
   * ```
   * borderTopWidth={number} <=> { borderTopWidth: number}
   * ```
   */
  borderTopWidth?: number

  /**
   * ```
   * borderRightWidth={number} <=> { borderRightWidth: number}
   * ```
   */
  borderRightWidth?: number

  /**
   * ```
   * borderBottomWidth={number} <=> { borderBottomWidth: number}
   * ```
   */
  borderBottomWidth?: number

  /**
   * ```
   * isPaddingIos <=> { paddingBottom: Platform.OS === 'ios' ? useSafeAreaInsets().bottom : getSize.m(20) }
   * ```
   */
  isPaddingIos?: boolean

  /**
   * ```
   * zIndex={number} <=> { zIndex: number}
   * ```
   */
  zIndex?: number

  /**
   * ```
   * borderTopLeftRadius={number} <=> { borderTopLeftRadius: number}
   * ```
   */
  borderTopLeftRadius?: number

  /**
   * ```
   * borderTopRightRadius={number} <=> { borderTopRightRadius: number}
   * ```
   */
  borderTopRightRadius?: number

  /**
   * ```
   * borderBottomLeftRadius={number} <=> { borderBottomLeftRadius: number}
   * ```
   */
  borderBottomLeftRadius?: number

  /**
   * ```
   * borderBottomRightRadius={number} <=> { borderBottomRightRadius: number}
   * ```
   */
  borderBottomRightRadius?: number

  /**
   * ```
   * borderLeftWidth={number} <=> { borderLeftWidth: number}
   * ```
   */
  borderLeftWidth?: number

  /**
   * Background color of the component - (key of Colors (theme/colors.ts) or Color keywords)
   */
  backgroundColor?: string

  /**
   * **top** is the number of logical pixels to offset the top edge of this component.
   */
  top?: number | string

  /**
   * **bottom** is the number of logical pixels to offset the top edge of this component.
   */
  bottom?: number | string

  /**
   * **left** is the number of logical pixels to offset the top edge of this component.
   */
  left?: number | string

  /**
   * **right** is the number of logical pixels to offset the top edge of this component.
   */
  right?: number | string

  /**
   * Render content within the safe area boundaries of a device
   * Example:
   * ```
   * <Block
   *   inset="top"
   * />
   * ```
   * or
   * ```
   * <Block
   *   inset={["top", "bottom"]}
   * />
   * ```
   */

  /**
   * Enable default shadow style of component
   * ```
   * {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    }
   * ```
   */
  shadow?: boolean

  overflow?: ViewStyle['overflow']

  children?: any
}
