import React from 'react'
import { StyleSheet } from 'react-native'
import { Block } from '@components/bases'
import { WORD_HEIGHT } from '@components/common/WordList'

export interface LineProps {
  lines: number
}

export const Lines: React.FC<LineProps> = ({ lines }) => {
  return (
    <Block style={[StyleSheet.absoluteFill, { top: WORD_HEIGHT }]}>
      {new Array(lines).fill(0).map((_, index) => {
        return (
          <Block
            key={index}
            style={{
              top: (WORD_HEIGHT + 10) * index,
            }}
            width={'100%'}
            backgroundColor="greyLight"
            height={1}
          />
        )
      })}
    </Block>
  )
}
