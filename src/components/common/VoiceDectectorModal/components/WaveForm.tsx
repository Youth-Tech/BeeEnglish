import React from 'react'
import { Block, BlockAnimated } from '@components'
import { useTheme } from '@themes'
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

export interface WaveFormFunc {
  play: () => void
  pause: () => void
}
export interface WaveFormProps {
  waveRef: React.ForwardedRef<WaveFormFunc>
}
interface IWaveform {
  index?: number
  min: number
  max: number
}
const waveFormData: IWaveform[] = [
  {
    min: 10,
    max: 60,
  },
  {
    min: 10,
    max: 80,
  },
  {
    min: 10,
    max: 120,
  },
  {
    min: 10,
    max: 130,
  },
  {
    min: 10,
    max: 120,
  },
  {
    min: 10,
    max: 60,
  },
]
const Wave = React.forwardRef<WaveFormFunc, IWaveform>((props, ref) => {
  const { index, min, max } = props
  const { colors } = useTheme()
  const heightValue = useSharedValue(10)
  React.useImperativeHandle(
    ref,
    () => {
      return {
        play() {
          // heightValue.value = withRepeat(
          //     withSequence(
          //         withTiming(max, { duration: 100 * (index! + 2) }),
          //         withTiming(min),
          //     ),
          //     -1,
          //     true,
          // )
        },
        pause() {
          // heightValue.value = withTiming(0)
          // cancelAnimation(heightValue)
        },
      }
    },
    [],
  )
  React.useEffect(() => {
    heightValue.value = withRepeat(
      withSequence(
        withTiming(max, { duration: 100 * (index! + 2) }),
        withTiming(min),
      ),
      -1,
      true,
    )
  }, [])
  const rStyle = useAnimatedStyle(() => {
    return {
      height: heightValue.value,
    }
  })
  return (
    <BlockAnimated
      backgroundColor={colors.orangePrimary}
      width={10}
      radius={10}
      style={[rStyle]}
    />
  )
})
const WaveForm: React.FC<WaveFormProps> = ({ waveRef }) => {
  return (
    <Block row gap={14} alignEnd>
      {waveFormData.map((item, index) => (
        <Wave
          ref={waveRef}
          key={`item-wave-${index}`}
          index={index}
          max={item.max}
          min={item.min}
        />
      ))}
    </Block>
  )
}
export default WaveForm
