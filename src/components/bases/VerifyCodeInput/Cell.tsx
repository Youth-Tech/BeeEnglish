import { makeStyles, useTheme } from '@themes'
import { Block } from '../Block'
import { Text } from '../Text'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated'
import React from 'react'

export interface CellProps {
  width?: number
  height?: number
  value: string
  hasTrack: boolean
}

export const Cell: React.FC<CellProps> = ({
  value,
  height,
  width,
  hasTrack,
}) => {
  const { colors } = useTheme()

  const trackAnim = useSharedValue(1)

  React.useEffect(() => {
    trackAnim.value = withRepeat(
      withSpring(0, {
        duration: 1500,
      }),
      withSpring(1, {
        duration: 1500,
      }),
    )
  }, [])

  const trackAnimatedStyle = useAnimatedStyle(() => ({
    opacity: trackAnim.value,
  }))

  const styles = useStyles({ height } as CellProps)

  return (
    <Block
      height={height}
      width={width}
      alignCenter
      justifyCenter
      borderColor={
        typeof value === 'undefined' && !hasTrack
          ? colors.greyLight
          : colors.orangeDark
      }
      borderWidth={1}
      radius={10}
    >
      <Text size={'h1'} fontFamily="bold" color={colors.orangeDark}>
        {value}
      </Text>
      {hasTrack && (
        <Animated.View style={[styles.inputStyle, trackAnimatedStyle]} />
      )}
    </Block>
  )
}

Cell.defaultProps = {
  height: 46,
}

const useStyles = makeStyles<CellProps>()(({ colors, normalize }) => ({
  inputStyle: ({ height }) => ({
    backgroundColor: colors.orangeDark,
    position: 'absolute',
    width: normalize.m(2),
    height: normalize.m(height! - 30),
  }),
}))
