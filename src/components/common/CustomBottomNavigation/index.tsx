import { Icon, TIcon } from '@assets'
import { Block } from '@components/bases'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { colors, useTheme } from '@themes'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

type TBottomState = {
  iconName: TIcon
  color: string
}
const BOTTOM_ICON_STATE: Array<TBottomState> = [
  { iconName: 'Home', color: colors.dark.bluePrimary },
  { iconName: 'Dumbell', color: colors.dark.greenLighter },
  { iconName: 'User', color: colors.dark.red },
]
type Props = {
  type: TIcon
  fill: string
  isFocused: boolean
}

const BottomIcon = (props: Props) => {
  const { colors } = useTheme()
  return (
    <Icon
      state={props.type}
      fill={props.isFocused ? props.fill : colors.greyPrimary}
    />
  )
}
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
export const CustomBottomNavigation: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const scaleYHomeIcon = useSharedValue(1)
  const scaleYDumbbellIcon = useSharedValue(1)
  const scaleYProfileIcon = useSharedValue(1)
  const rStyleHome = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleYHomeIcon.value }],
    }
  })
  const rStyleDumbbell = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleYDumbbellIcon.value }],
    }
  })
  const rStyleProfile = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleYProfileIcon.value }],
    }
  })
  const rStyleArray = [rStyleHome, rStyleDumbbell, rStyleProfile]
  const scaleValueArray = [
    scaleYHomeIcon,
    scaleYDumbbellIcon,
    scaleYProfileIcon,
  ]
  const handleScaleAnimation = (index: number) => {
    scaleValueArray[index].value = withTiming(
      0.8,
      { duration: 50 },
      (isFinished) => {
        if (isFinished) scaleValueArray[index].value = withTiming(1)
      },
    )
  }
  return (
    <Block
      row
      shadow
      height={80}
      alignCenter
      elevation={20}
      backgroundColor={'#fff'}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index
        const onPressIcon = (index: number) => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
          handleScaleAnimation(index)
        }
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }
        return (
          <AnimatedPressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={() => {
              onPressIcon(index)
            }}
            onLongPress={onLongPress}
            style={[styles.iconButton, rStyleArray[index]]}
          >
            <BottomIcon
              type={BOTTOM_ICON_STATE[index].iconName}
              fill={BOTTOM_ICON_STATE[index].color}
              isFocused={isFocused}
            />
          </AnimatedPressable>
        )
      })}
    </Block>
  )
}
const styles = StyleSheet.create({
  iconButton: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
})
