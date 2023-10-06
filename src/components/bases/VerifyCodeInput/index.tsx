import React from 'react'
import { TextInput, StyleSheet, ViewStyle, StyleProp } from 'react-native'
import { Block } from '../Block'
import { makeStyles, normalize } from '@themes'
import { Cell } from './Cell'

export interface VerifyCodeInputRefFunction {
  focus: () => void
  submit: (value: string) => void
}

export interface VerifyCodeInputProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>

  inputHeight?: number
  cellCount?: number

  canSubmitOnEnd?: boolean
  onEnd?: (vale: string) => void

  inputContainerStyle?: StyleProp<ViewStyle>
}

export const VerifyCodeInput = React.forwardRef<
  VerifyCodeInputRefFunction,
  VerifyCodeInputProps
>(
  (
    {
      setValue,
      value,

      inputHeight,
      cellCount,

      canSubmitOnEnd,
      onEnd,

      inputContainerStyle,
    },
    ref,
  ) => {
    const styles = useStyle({ inputContainerStyle })

    const verifyInputRef = React.useRef<TextInput>(null)

    React.useImperativeHandle(
      ref,
      () => {
        return {
          focus: () => {
            verifyInputRef?.current?.focus()
          },
          submit: (value1) => {
            onEnd?.(value1)
          },
        }
      },
      [onEnd],
    )

    const renderCell = () => {
      return (
        <Block
          absolute
          top={0}
          left={0}
          bottom={0}
          right={0}
          row
          space="between"
        >
          {[...Array(cellCount).keys()].map((_, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                value={value[index]}
                hasTrack={value.length === index}
                //   cellIndex={index}
                height={64}
                width={64}
              />
            )
          })}
        </Block>
      )
    }

    const _onChangeText = (text: string) => {
      if (text.length > cellCount!) {
        return
      }

      setValue(text)
    }

    React.useEffect(() => {
      if (value.length === cellCount) {
        canSubmitOnEnd && onEnd?.(value)
      }
    }, [value])

    return (
      <Block height={inputHeight} style={styles.inputStyle}>
        {renderCell()}
        <TextInput
          style={styles.inputTextStyle}
          ref={verifyInputRef}
          onChangeText={_onChangeText}
          keyboardType="number-pad"
          autoFocus
          caretHidden
          value={value}
        />
      </Block>
    )
  },
)

VerifyCodeInput.defaultProps = {
  inputHeight: normalize.m(64),
  cellCount: 4,
  canSubmitOnEnd: true,
  inputContainerStyle: {},
}

const useStyle = makeStyles<Partial<VerifyCodeInputProps>>()(({}) => ({
  inputStyle: ({ inputContainerStyle }) => ({
    ...StyleSheet.flatten(inputContainerStyle),
  }),
  inputTextStyle: {
    opacity: 0,
    ...StyleSheet.absoluteFillObject,
    fontSize: 1,
  },
}))
