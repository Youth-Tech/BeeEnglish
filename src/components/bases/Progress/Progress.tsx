import React from 'react'
import { Svg, G, Rect } from 'react-native-svg'
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { Block } from '../Block'
import { ProgressProps } from './type'
import { useTheme } from '@themes'
import { withSpringConfig } from '@assets'
import { handleColor } from '@components/utils'

const AnimatedLineSvg = Animated.createAnimatedComponent(Rect)

export const Progress: React.FC<ProgressProps> = (props) => {
  const {
    step,
    totalSteps,
    stepColor = 'orange',
    totalStepsColor = 'greyLight',
    strokeHeight = 10,
    progressContainerStyles,
    onCompleteAnimation = () => {
      'worklet'
    },
  } = props

  const { colors, normalize } = useTheme()
  const [widthSvg, setWidthSvg] = React.useState<number>(0)
  const progressStepValue = useSharedValue(0)
  const _strokeHeight = normalize.v(strokeHeight)

  const animatedProps = useAnimatedProps(() => {
    return {
      width: `${progressStepValue.value}%`,
    }
  }, [step, totalSteps])

  React.useEffect(() => {
    progressStepValue.value =
      step > totalSteps
        ? withSpring(totalSteps, withSpringConfig, _onCompleteAnimation)
        : withSpring(step, withSpringConfig, _onCompleteAnimation)
  }, [step, totalSteps])

  const _onCompleteAnimation = (isFinish?: boolean) => {
    'worklet'
    // console.log(isFinish)
    onCompleteAnimation(isFinish)
  }

  const _progressContainerStyles: {} = [
    progressContainerStyles && { ...progressContainerStyles },
  ]

  return (
    <Block
      width={'100%'}
      height={_strokeHeight}
      alignCenter
      justifyCenter
      style={_progressContainerStyles}
    >
      <Block
        width={'100%'}
        onLayout={(e) => {
          setWidthSvg(e.nativeEvent.layout.width)
        }}
      >
        <Svg height={_strokeHeight} width={widthSvg}>
          <G>
            {/* Background Line */}
            <Rect
              width={'100%'}
              height={_strokeHeight}
              ry={_strokeHeight / 2}
              rx={_strokeHeight / 2}
              fill={handleColor(colors, totalStepsColor)}
            />

            {/* Progress Line */}
            <AnimatedLineSvg
              animatedProps={animatedProps}
              height={_strokeHeight}
              ry={_strokeHeight / 2}
              rx={_strokeHeight / 2}
              fill={handleColor(colors, stepColor)}
            />
          </G>
        </Svg>
      </Block>
    </Block>
  )
}
