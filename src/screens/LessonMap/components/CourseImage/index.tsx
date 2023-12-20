import {
  interpolate,
  SharedValue,
  Extrapolation,
  useAnimatedStyle,
} from 'react-native-reanimated'
import React from 'react'
import { Image, StyleSheet } from 'react-native'

import { BlockAnimated } from '@components'
import { normalize, useTheme } from '@themes'
import { COURSE_ITEM_WIDTH } from '@screens/LessonMap/components'

export interface CourseImageProps {
  src?: string
  index: number
  animatedControl: SharedValue<number>
  width: number
  height: number
  blurRadius?: number
}

export const CourseImage = ({
  src,
  index,
  width,
  height,
  blurRadius,
  animatedControl,
}: CourseImageProps) => {
  const { colors } = useTheme()
  const imageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedControl.value,
      [
        (index - 2) * COURSE_ITEM_WIDTH,
        (index - 1) * COURSE_ITEM_WIDTH,
        index * COURSE_ITEM_WIDTH,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP,
    )
    return {
      opacity,
    }
  })

  return (
    <BlockAnimated
      absolute
      radius={10}
      width={width}
      height={height}
      borderWidth={2}
      style={imageStyle}
      backgroundColor={'#fff'}
      borderColor={colors.borderColor}
    >
      <Image
        source={{ uri: src }}
        blurRadius={blurRadius}
        style={styles.imageStyle}
      />
    </BlockAnimated>
  )
}

const styles = StyleSheet.create({
  imageStyle: {
    borderRadius: normalize.m(10),
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
})
