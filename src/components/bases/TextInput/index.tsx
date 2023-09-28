import { fontFamily as fontFamilyApp, useTheme } from '@themes'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native'

import { EyeOff, EyeOn } from '@assets'
import { Block, Text } from '@components'
import { InputProps } from './types'
import { handleFontSize, isString } from '@components/utils'

const DEFAULT_HEIGHT_INPUT = 63

export const TextInput = forwardRef<any, InputProps>((props, ref) => {
  const inputRef = useRef<any>(null)
  const { colors } = useTheme()

  const {
    label,
    labelStyle,
    required,
    containerStyle,
    error,
    errorStyle,
    showError,
    inputContainerStyle,
    style,
    fontFamily = 'regular',
    size = 'h4',
    disabled,
    disabledInputStyle,
    leftIcon,
    leftIconContainerStyle,
    onLeftIconPress,
    rightIcon,
    rightIconContainerStyle,
    onRightIconPress,
    secureTextEntry,
    onFocus,
    onBlur,
    hideFocus,
    numberOfLines = 1,
    maxLength,
    value = '',
    ...rest
  } = props

  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (ref && typeof ref !== 'function') {
      ;(ref as any).current = inputRef.current
    }
  }, [ref])

  const _renderLabel = () => {
    if (isString(label)) {
      return (
        <Text marginBottom={4} color="textLabel" size="h3" style={labelStyle}>
          {label}
          {required && <Text color="red"> *</Text>}
        </Text>
      )
    }
    return label
  }

  const _renderError = () => {
    if (isString(error)) {
      return (
        <Text color="red" style={errorStyle}>
          {error}
        </Text>
      )
    }
    return error
  }

  const inputInitStyle: any = StyleSheet.flatten([
    fontFamilyApp[fontFamily],
    {
      color: colors.black,
      minHeight: DEFAULT_HEIGHT_INPUT,
      flex: 1,
      fontSize: handleFontSize(size),
      borderRadius: 8,
      paddingLeft: leftIcon ? 0 : 16,
      paddingRight: rightIcon || props.secureTextEntry ? 0 : 16,
    },
    disabled && {
      backgroundColor: colors.greyLight,
      color: colors.greyDark,
    },
    disabled && disabledInputStyle,
    !!numberOfLines && {
      height: handleFontSize(size) * 1.6 * numberOfLines,
    },
    style,
  ])

  const [secureEye, setSecureEye] = useState(true)

  const _renderIcon = (isRight?: boolean) => {
    const defaultIconStyle = {
      minHeight: DEFAULT_HEIGHT_INPUT,
      paddingHorizontal: 16,
      opacity: disabled ? 0.5 : 1,
      justifyContent: 'center' as ViewStyle['justifyContent'],
    }

    if (secureTextEntry && isRight && !rightIcon) {
      return (
        <Pressable
          onPress={() => {
            if (!disabled) {
              setSecureEye((prev) => !prev)
            }
          }}
          style={defaultIconStyle}
        >
          {!secureEye ? <EyeOn /> : <EyeOff />}
        </Pressable>
      )
    }

    const [icon, iconStyle, onPressIcon] = isRight
      ? [rightIcon, rightIconContainerStyle, onRightIconPress]
      : [leftIcon, leftIconContainerStyle, onLeftIconPress]

    return (
      <Pressable
        onPress={onPressIcon}
        style={StyleSheet.flatten([defaultIconStyle, iconStyle])}
      >
        {icon}
      </Pressable>
    )
  }

  const _onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true)
    onFocus && onFocus(e)
  }

  const _onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false)
    onBlur && onBlur(e)
  }

  const _renderInput = () => {
    return (
      <RNTextInput
        autoCapitalize="none"
        allowFontScaling={false}
        underlineColorAndroid="transparent"
        style={inputInitStyle}
        autoCorrect={false}
        placeholderTextColor={disabled ? colors.greyDark : colors.greyLight}
        selectionColor={showError ? colors.orangeDark : colors.orangeDark}
        editable={!disabled}
        {...rest}
        value={value}
        onFocus={_onFocus}
        onBlur={_onBlur}
        maxLength={maxLength}
        secureTextEntry={
          rightIcon ? props.secureTextEntry : props.secureTextEntry && secureEye
        }
        ref={(e) => {
          inputRef.current = e
          typeof ref === 'function' && ref(e)
        }}
      />
    )
  }

  const _renderHint = () => {
    return (
      <Text marginLeft={4} color="placeholder">
        {`${value.length}/${maxLength}`}
      </Text>
    )
  }
  const checkStyleBlock: { justifyContent: 'space-between' | 'flex-end' } = {
    justifyContent: showError && error ? 'space-between' : 'flex-end',
  }

  return (
    <Block style={containerStyle}>
      {!!label && _renderLabel()}
      <TouchableWithoutFeedback
        onPress={() => {
          if (!disabled) {
            inputRef.current?.focus()
          }
        }}
      >
        <Block
          row
          alignCenter
          backgroundColor={disabled ? 'greyLight' : 'white'}
          radius={8}
          borderWidth={1}
          borderColor={
            !hideFocus && error && showError
              ? colors.red
              : isFocused
              ? colors.orangeDark
              : colors.borderColor
          }
          style={inputContainerStyle}
        >
          {leftIcon && _renderIcon()}
          {_renderInput()}
          {(rightIcon || props.secureTextEntry) && _renderIcon(true)}
        </Block>
      </TouchableWithoutFeedback>
      <Block row style={checkStyleBlock} alignStart marginTop={4}>
        {showError && error && _renderError()}
        {!!maxLength && _renderHint()}
      </Block>
    </Block>
  )
})
