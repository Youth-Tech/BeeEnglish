import React from 'react'
import { FastImageProps, Source } from 'react-native-fast-image'
import { DefaultStyleProps } from '@components/utils'

export interface ImageProps extends FastImageProps, DefaultStyleProps {
  width?: number | string
  height?: number | string
  backgroundColor?: string
  ImageComponent?: React.ComponentType<any>
  placeholderImage?: Source | number
  placeholderImageProps?: Omit<FastImageProps, 'source'>
}
