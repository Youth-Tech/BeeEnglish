import React from 'react'
import { Block } from '@components'
import { useTheme } from '@themes'
import { useStyles } from '@screens/DetailPostScreen/styles'
import { ItemWord, TranslateVi } from '@screens/DetailPostScreen/components'

interface ParagraphProps {
  english: string
  vietnamese: string
}
export const ContentPost: React.FC<ParagraphProps> = React.memo(
  ({ english, vietnamese }) => {
    const { colors } = useTheme()
    const styles = useStyles(colors)
    const pattern = /\S+(['".,!?;:]?)(?=\s|$)/g
    const words = english.match(pattern)

    return (
      <Block>
        <Block style={styles.boxContent}>
          {words!.map((word, index) => (
            <ItemWord
              key={index}
              value={word}
              onPress={() => {
                word = word.replace(/['".,!?;:]/g, '')
              }}
            />
          ))}
        </Block>
        <TranslateVi value={vietnamese} />
      </Block>
    )
  },
)
