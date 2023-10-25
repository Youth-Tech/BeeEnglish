import React from 'react'
import Animated, {
  withDelay,
  withTiming,
  withRepeat,
  withSequence,
  useSharedValue,
  cancelAnimation,
  useDerivedValue,
  useAnimatedProps,
} from 'react-native-reanimated'
import { Path, Svg } from 'react-native-svg'

import { colors } from '@themes'
import { Props, soundState1, soundState2, soundState3 } from '@assets'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export type SoundProgressFcRef = {
  pause: () => void
  start: () => void
}

export const SoundProgress = React.forwardRef<SoundProgressFcRef, Props>(
  (props, ref) => {
    const animatedControl = useSharedValue(3)

    const animated = useDerivedValue(() => {
      return animatedControl.value <= 1
        ? soundState1
        : animatedControl.value <= 2
        ? soundState2
        : soundState3
    })

    const animatedProps = useAnimatedProps(() => {
      return {
        d: animated.value,
      }
    })

    React.useImperativeHandle(ref, () => {
      return {
        pause() {
          cancelAnimation(animatedControl)
          animatedControl.value = withTiming(3)
        },
        start() {
          animatedControl.value = withRepeat(
            withSequence(
              withDelay(0, withTiming(1)),
              withDelay(400, withTiming(2)),
              withDelay(0, withTiming(3)),
            ),
            -1,
            false,
          )
        },
      }
    })
    return (
      <Svg
        width={props.size || 24}
        height={props.size || 24}
        fill="blue"
        viewBox="0 0 100 100"
        {...props}
      >
        <AnimatedPath
          fill={props.fill || colors.dark.black}
          animatedProps={animatedProps}
        />
      </Svg>
    )
  },
)
