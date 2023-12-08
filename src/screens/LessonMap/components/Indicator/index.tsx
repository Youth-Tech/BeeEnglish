import {
  SharedValue,
  interpolate,
  Extrapolation,
  useAnimatedStyle,
} from 'react-native-reanimated'
import React from 'react'
import { StyleSheet } from 'react-native'

import { BlockAnimated } from '@components'
import {COURSE_ITEM_WIDTH} from "@screens/LessonMap/components";

export interface IndicatorProps {
  animatedControl: SharedValue<number>
  index: number
}

export const Indicator = ({ animatedControl, index }: IndicatorProps) => {
  const style = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedControl.value,
      [
        (index - 2) * COURSE_ITEM_WIDTH,
        (index - 1) * COURSE_ITEM_WIDTH,
        index * COURSE_ITEM_WIDTH,
      ],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    )

    return {
      opacity,
    }
  })

  return <BlockAnimated style={[styles.indicatorStyle, style]} />
}

const styles = StyleSheet.create({
  indicatorStyle: {
    width: 8,
    aspectRatio: 1,
    borderRadius: 4,
    backgroundColor: '#F4B80A',
  },
})
