import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { Block } from '../Block'
import { normalize } from '@themes'
import { Cell } from './Cell'

export interface VerifyCodeInputProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>

  inputHeight?: number
  cellCount?: number

  canSubmitOnEnd?: boolean
  onEnd?: (vale: string) => void
}

export const VerifyCodeInput: React.FC<VerifyCodeInputProps> = ({
  setValue,
  value,

  inputHeight,
  cellCount,

  canSubmitOnEnd,
  onEnd,
}) => {
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
        marginHorizontal={20}
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
    <Block height={inputHeight}>
      {renderCell()}
      <TextInput
        style={styles.inputTextStyle}
        onChangeText={_onChangeText}
        keyboardType="number-pad"
        value={value}
      />
    </Block>
  )
}

VerifyCodeInput.defaultProps = {
  inputHeight: normalize.m(64),
  cellCount: 4,
  canSubmitOnEnd: true,
}

const styles = StyleSheet.create({
  inputTextStyle: {
    // backgroundColor: 'red',
    opacity: 0,
    ...StyleSheet.absoluteFillObject,
    fontSize: 1,
  },
})
