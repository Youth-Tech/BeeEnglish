import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import React from 'react'
import { Pressable, GestureResponderEvent } from 'react-native'

import { Block } from '../Block'
import { ButtonShadowProps } from './type'
import { baseStyles, useTheme } from '@themes'
import { isNumber, handleColor } from '@components/utils'

const BlockAnimated = Animated.createAnimatedComponent(Block)

/**
 * Create a button with awesome shadow
 * @see https://www.figma.com/file/QniAD9a1zQX8Vn12K89a0n/UI?type=design&node-id=191-1536&mode=design&t=VeIGgE2wQFQ4JnWB-0
 */

export const ShadowButton: React.FC<ButtonShadowProps> = (props) => {
  const {
    children,
    disabled,
    buttonWidth,
    buttonHeight,
    containerStyle,
    shadowHeight = 5,
    buttonRadius = 5,
    buttonBorderSize = 0,
    buttonColor = 'primary',
    shadowButtonColor = 'greyLight',
    buttonBorderColor = 'white',

    ...rest
  } = props
  const { colors, normalize } = useTheme()

  const buttonBlockStyle: {} = React.useMemo(() => {
    return [
      {
        backgroundColor: !disabled
          ? handleColor(colors, shadowButtonColor)
          : handleColor(colors, 'greyLight'),
        marginHorizontal: 5,
        borderRadius: normalize.m(buttonRadius),
      },
      buttonWidth && {
        width: isNumber(buttonWidth) ? normalize.h(buttonWidth) : buttonWidth,
      },
      buttonHeight && {
        height: isNumber(buttonHeight)
          ? normalize.h(buttonHeight)
          : buttonHeight,
      },
    ]
  }, [props])

  const buttonShadowHeight = useSharedValue(-shadowHeight)

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: buttonShadowHeight.value }],
    }
  }, [shadowHeight])

  const handlePressInAnimation = React.useCallback(
    (e: GestureResponderEvent) => {
      buttonShadowHeight.value = withTiming(0, { duration: 100 })
      rest?.onPressIn && rest?.onPressIn(e)
    },
    [shadowHeight],
  )

  const handlePressOutAnimation = React.useCallback(
    (e: GestureResponderEvent) => {
      buttonShadowHeight.value = withTiming(-shadowHeight, { duration: 100 })
      rest?.onPressOut && rest?.onPressOut(e)
    },
    [shadowHeight],
  )

  const renderBorderButton = React.useMemo(() => {
    if (typeof buttonBorderColor === 'string' || disabled) {
      return (
        <Block
          style={baseStyles.absoluteFill}
          backgroundColor={
            disabled
              ? 'greyLight'
              : handleColor(colors, buttonBorderColor as string)
          }
        />
      )
    }

    return buttonBorderColor
  }, [buttonBorderColor, disabled])

  React.useEffect(() => {
    buttonShadowHeight.value = -shadowHeight
  }, [shadowHeight])

  return (
    <Pressable
      disabled={disabled}
      onPressIn={handlePressInAnimation}
      onPressOut={handlePressOutAnimation}
      {...rest}
      style={containerStyle}
    >
      <Block style={buttonBlockStyle}>
        <BlockAnimated
          style={[buttonStyle]}
          radius={buttonRadius}
          overflow={'hidden'}
          alignCenter
          justifyCenter
          flex
          padding={buttonBorderSize}
        >
          {renderBorderButton}
          <Block
            backgroundColor={handleColor(
              colors,
              !disabled ? buttonColor : '#ccc',
            )}
            width={'100%'}
            height={'100%'}
            overflow="hidden"
            radius={buttonRadius}
            alignCenter
            justifyCenter
          >
            {children}
          </Block>
        </BlockAnimated>
      </Block>
    </Pressable>
  )
}
