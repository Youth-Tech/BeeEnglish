import React from 'react'
import { baseStyles } from '@themes'
import { Pressable } from 'react-native'
import { Portal } from 'react-native-portalize'
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated'
import { Block } from '../Block'
import { Container } from '../Container'
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
          <Container>
            <Block flex row>
              <AnimatedPressable
                style={[
                  baseStyles.absoluteFill,
                  { backgroundColor: 'rgba(0,0,0,0.5)' },
                ]}
                entering={FadeIn}
                exiting={FadeOut}
                onPress={handleCloseModal}
              />
              <AnimatedBlock
                entering={SlideInDown}
                exiting={SlideOutDown}
                flex
                alignSelf={
                  position === 'top'
                    ? 'flex-start'
                    : position === 'bottom'
                    ? 'flex-end'
                    : 'center'
                }
              >
                {children}
              </AnimatedBlock>
            </Block>
          </Container>
        )}
      </Portal>
    )
  },
)
