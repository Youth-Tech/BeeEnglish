import React from 'react'
import { Svg, Circle, G } from 'react-native-svg'
import Animated, {
  useDerivedValue,
  useAnimatedProps,
  withSpring,
} from 'react-native-reanimated'

import { Block } from '../Block'
import { ProgressCircleProps } from './type'
import { useTheme } from '@themes'
import { withSpringConfig } from '@assets'
import { handleColor } from '@components/utils'
import { Text } from '../Text'

const AnimatedCircleSvg = Animated.createAnimatedComponent(Circle)

export const CircleProgress: React.FC<ProgressCircleProps> = (props) => {
  const {
    step,
    totalSteps,
    stepColor = 'orange',
    totalStepsColor = 'greyLight',
    size,
    strokeWidth = 10,
    progressValueProps,
  } = props

  const { colors, normalize } = useTheme()

  const _strokeWidth = normalize.m(strokeWidth)
  const _size = normalize.m(size)
  const radius = (size - strokeWidth) / 2
  const circumfrence = 2 * Math.PI * radius

  const invertedCompletion = (totalSteps - step) / totalSteps
  const progressValue = useDerivedValue(() =>
    step >= totalSteps ? 0 : 2 * Math.PI * invertedCompletion,
  )

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withSpring(
        progressValue.value * radius,
        withSpringConfig,
      ),
    }
  }, [step, totalSteps, size])

  return (
    <Block width={_size} height={_size} alignCenter justifyCenter>
      <Svg width={_size} height={_size} viewBox={`0 0 ${_size} ${_size}`}>
        <G rotation={-90} originX={_size / 2} originY={_size / 2}>
          {/* Background Circle */}
          <Circle
            stroke={handleColor(colors, totalStepsColor)}
            fill="none"
            cx={'50%'}
            cy={'50%'}
            r={radius}
            strokeLinecap="round"
            strokeWidth={normalize.h(strokeWidth)}
          />

          {/* Progress Circle */}
          <AnimatedCircleSvg
            animatedProps={animatedProps}
            stroke={handleColor(colors, stepColor)}
            fill="none"
            cx={'50%'}
            cy={'50%'}
            r={radius}
            strokeDasharray={circumfrence}
            strokeLinecap="round"
            strokeWidth={_strokeWidth}
          />
        </G>
      </Svg>
      <Block absolute>
        <Text
          fontFamily="semiBold"
          size={'h3'}
          color="primary"
          {...progressValueProps}
        >
          {step}%
        </Text>
      </Block>
    </Block>
  )
}
