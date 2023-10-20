import React from 'react'
import { Block } from '@components'
import { useTheme } from '@themes'
import { useStyles } from '@screens/DetailPost/styles'
import ItemWord from '@screens/DetailPost/components/ItemWord'
import TranslateVi from "@screens/DetailPost/components/TranslateVi";

interface ParagraphProps {
    data: PostResponse,
}
const ContentPost: React.FC<ParagraphProps> = ({ data}) => {
  const { colors } = useTheme()
  const styles = useStyles(colors)
  const pattern = /\S+(['".,!?;:]?)(?=\s|$)/g;
  const words = data.english.match(pattern);
  return (
    <Block paddingHorizontal={20}>
      <Block style={styles.boxContent}>
        {words!.map((word, index) => (
          <ItemWord
            key={index}
            value={word}
            onPress={() => {
              word = word.replace(/['".,!?;:]/g, '')
              console.log(word)
            }}
          />
        ))}
      </Block>
      <TranslateVi value={data.vietnamese} />
    </Block>
  )
}

export default React.memo(ContentPost);
