import { normalize } from './normalize'

export type FontSize = {
  /**
   * 28
   */
  heading: number
  /**
   * 24
   */
  h1: number
  /**
   * 18
   */
  h2: number
  /**
   * 16
   */
  h3: number
  /**
   * 14
   */
  h4: number
  /**
   * 12
   */
  h5: number
  /**
   * 12
   */
  body: number
}

export type Font = {
  size: FontSize
}

export type FontKeys = keyof typeof font.size

export const font: Font = {
  size: {
    /**
     * 28
     */
    heading: normalize.m(28),
    /**
     * 24
     */
    h1: normalize.m(24),
    /**
     * 18
     */
    h2: normalize.m(18),
    /**
     * 16
     */
    h3: normalize.m(16),
    /**
     * 14
     */
    h4: normalize.m(14),
    /**
     * 12
     */
    h5: normalize.m(12),
    /**
     * 12
     */
    body: normalize.m(12),
  },
}

export const fontFamily = {
  bold: 'Quicksand-Bold',
  semiBold: 'Quicksand-SemiBold',
  regular: 'Quicksand-Regular',
  light: 'Quicksand-Light',
}
