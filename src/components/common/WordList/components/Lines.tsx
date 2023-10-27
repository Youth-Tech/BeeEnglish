import React from 'react'
import { StyleSheet } from 'react-native'

import { Block } from '@components/bases'
import { WORD_HEIGHT } from '@components/common/WordList'

export interface LineProps {
  lines: number
}

export const Lines: React.FC<LineProps> = ({ lines }) => {
  const arr = new Array(lines).fill(0)
  return (
    <Block style={[StyleSheet.absoluteFill, { top: WORD_HEIGHT }]}>
      {arr.map((_, index) => {
        return (
          <Block
            height={1}
            key={index}
            width={'100%'}
            backgroundColor="greyLight"
            style={{
              top: (WORD_HEIGHT + 3) * index - 3,
            }}
          />
        )
      })}
    </Block>
  )
}
