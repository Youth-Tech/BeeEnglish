import { scale, verticalScale, moderateScale } from 'react-native-size-matters'

/**
 * Nomalize font sizes, padding, margin, etc. between different devices
 * @param size: the positive number you want to set for nomalize
 */

const horizontal = (size: number) => {
  return scale(size)
}
const vertical = (size: number) => {
  return verticalScale(size)
}
const moderate = (size: number) => {
  return moderateScale(size, 0.3)
}

/**
 * getSize.h(number) Responsive for [padding - margin]_left - right - horizontal.
 *
 * getSize.v(number) Responsive for [padding - margin]_top - bottom - vertical
 *
 * getSize.m(number) Responsive for [padding - margin]_left - right - top - bottom -  horizontal - vertical
 **/

export const normalize = {
  h: horizontal,
  v: vertical,
  m: moderate,
}

export type Normalize = typeof normalize
