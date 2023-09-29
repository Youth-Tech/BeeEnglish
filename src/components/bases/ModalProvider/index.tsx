import { Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { ModalProviderProps } from './type'
import { Block } from '@components'
import { heightScreen, widthScreen } from '@utils/helpers'
import { useTheme } from '@themes'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { SpringConfig } from 'react-native-reanimated/lib/typescript/reanimated2/animation/springUtils'

export const ModalProvider = React.forwardRef<any, ModalProviderProps>(
  (props, ref) => {
    const {
      children,
      position = 'bottom',
      modalHeight = 279,
      animationType,
      modalComponent,
      backDropComponent,
      onShow,
      onDismiss,
    } = props
    const { colors } = useTheme()
    const [_visible, set_visible] = React.useState<boolean>(false)
    const AnimatedBlock = Animated.createAnimatedComponent(Block)
    const AnimatedTouchable = Animated.createAnimatedComponent(Pressable)
    const ModalSpringConfig: SpringConfig = {
      mass: 1,
      damping: 15,
      stiffness: 100,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 3,
    }
    const BOTTOM_AND_TOP_POSITION = 30
    const CENTER_POSITION = heightScreen / 2 - modalHeight / 2
    const opacity = useSharedValue(animationType !== 'fade' ? 1 : 0)
    const slideTo = useSharedValue(-modalHeight)

    const rOpacityStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
      }
    })
    const rSlideBottomStyle = useAnimatedStyle(() => {
      return {
        bottom: slideTo.value,
      }
    })
    const rSlideTopnCenterStyle = useAnimatedStyle(() => {
      return {
        top: slideTo.value,
      }
    })
    const handleDismiss = () => {
      if (animationType === 'fade') {
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished) {
            runOnJS(handleSetVisible)(false)
          }
        })
      } else {
        slideTo.value = withTiming(
          -modalHeight,
          { duration: 200 },
          (isFinished) => {
            if (isFinished) {
              runOnJS(handleSetVisible)(false)
            }
          },
        )
      }
      onDismiss?.()
    }
    const handleOpen = () => {
      handleSetVisible(true)
      if (animationType === 'fade') {
        opacity.value = withTiming(1)
      } else if (animationType === 'slide') {
        slideTo.value = withSpring(
          position === 'center' ? CENTER_POSITION : BOTTOM_AND_TOP_POSITION,
          ModalSpringConfig,
        )
      }
      onShow?.()
    }
    React.useImperativeHandle(
      ref,
      () => {
        return {
          openModal() {
            handleOpen()
          },
          dismissModal() {
            handleDismiss()
          },
        }
      },
      [],
    )
    const handleSetVisible = (visible: boolean) => {
      set_visible(visible)
    }

    return (
      <Block flex>
        {children}
        {_visible && (
          <AnimatedTouchable
            style={[
              StyleSheet.absoluteFill,
              rOpacityStyle,
              { backgroundColor: 'rgba(0,0,0,0.5)' },
            ]}
            onPress={handleDismiss}
          >
            <Block flex backgroundColor="transparent">
              {backDropComponent}
            </Block>
          </AnimatedTouchable>
        )}
        {position === 'bottom' && _visible && (
          <AnimatedBlock
            absolute
            width={widthScreen - 40}
            height={modalHeight}
            backgroundColor={colors.white}
            radius={15}
            alignSelf="center"
            style={[
              animationType === 'fade' ? rOpacityStyle : rSlideBottomStyle,
              animationType === 'fade'
                ? { bottom: BOTTOM_AND_TOP_POSITION }
                : { bottom: -modalHeight },
            ]}
          >
            {modalComponent}
          </AnimatedBlock>
        )}
        {position === 'top' && _visible && (
          <AnimatedBlock
            absolute
            width={widthScreen - 40}
            height={modalHeight}
            backgroundColor={colors.white}
            radius={15}
            alignSelf="center"
            style={[
              animationType === 'fade' ? rOpacityStyle : rSlideTopnCenterStyle,
              animationType === 'fade'
                ? { top: BOTTOM_AND_TOP_POSITION }
                : { top: -modalHeight },
            ]}
          >
            {modalComponent}
          </AnimatedBlock>
        )}

        {position === 'center' && _visible && (
          <AnimatedBlock
            absolute
            width={widthScreen - 40}
            height={modalHeight}
            backgroundColor={colors.white}
            radius={15}
            alignSelf="center"
            style={[
              animationType === 'fade' ? rOpacityStyle : rSlideTopnCenterStyle,
              animationType === 'fade'
                ? { top: CENTER_POSITION }
                : { top: -modalHeight },
            ]}
          >
            {modalComponent}
          </AnimatedBlock>
        )}
      </Block>
    )
  },
)
