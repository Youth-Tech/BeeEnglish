import React from 'react'
import { TouchableWithoutFeedback, Keyboard, ViewStyle } from 'react-native'

import { Block } from '../Block'

function DismissKeyboardHOC(Comp: any) {
  return ({
    children,
    style,
    ...props
  }: {
    style?: ViewStyle
    children: React.ReactNode
  }) => (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      touchSoundDisabled
    >
      {/*@ts-ignore*/}
      <Comp style={[{ flex: 1 }, style]} {...props}>
        {children}
      </Comp>
    </TouchableWithoutFeedback>
  )
}

export const DismissKeyBoardBlock = DismissKeyboardHOC(Block)
