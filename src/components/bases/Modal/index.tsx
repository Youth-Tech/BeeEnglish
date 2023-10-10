import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Portal } from 'react-native-portalize'
import { baseStyles } from '@themes'
import Animated, {
  SlideInDown,
  SlideOutDown,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated'
import { Block } from '../Block'
import { ModalFunction, ModalProps } from './type'
const AnimatedBlock = Animated.createAnimatedComponent(Block)
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
export const Modal = React.forwardRef<ModalFunction, ModalProps>(
  (props, ref) => {
    const { position, children, onShow, onDismiss } = props
    const [visible, setVisible] = React.useState<boolean>(false)
    const handleCloseModal = () => {
      setVisible(false)
      onDismiss?.()
    }
    const handleOpenModal = () => {
      setVisible(true)
      onShow?.()
    }
    React.useImperativeHandle(
      ref!,
      () => {
        return {
          openModal() {
            handleOpenModal()
          },
          dismissModal() {
            handleCloseModal()
          },
        }
      },
      [],
    )
    return (
      <Portal>
        {visible && (
          <AnimatedPressable
            style={[
              baseStyles.absoluteFill,
              { backgroundColor: 'rgba(0,0,0,0.5)' },
            ]}
            entering={FadeIn}
            exiting={FadeOut}
            onPress={handleCloseModal}
          >
            <AnimatedBlock
              alignSelf="center"
              marginVertical={30}
              entering={SlideInDown}
              exiting={SlideOutDown}
              flex
              style={
                position === 'top'
                  ? { justifyContent: 'flex-start' }
                  : position === 'bottom'
                  ? { justifyContent: 'flex-end' }
                  : { justifyContent: 'center' }
              }
            >
              {children}
            </AnimatedBlock>
          </AnimatedPressable>
        )}
      </Portal>
    )
  },
)
