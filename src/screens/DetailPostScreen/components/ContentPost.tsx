import React from 'react'
import { Block } from '@components'
import { useTheme } from '@themes'
import { useStyles } from '@screens/DetailPostScreen/styles'
import ItemWord from '@screens/DetailPostScreen/components/ItemWord'
import TranslateVi from "@screens/DetailPostScreen/components/TranslateVi";

interface ParagraphProps {
    data: PostResponse,
}
const ContentPost: React.FC<ParagraphProps> = ({ data}) => {
  const { colors } = useTheme()
  const styles = useStyles(colors)
  const pattern = /\S+(['".,!?;:]?)(?=\s|$)/g;
  const words = data.english.match(pattern);
  return (
    <Block>
      <Block style={styles.boxContent}>
        {words!.map((word, index) => (
          <ItemWord
            key={index}
            value={word}
            onPress={() => {
              word = word.replace(/['".,!?;:]/g, '');
            }}
          />
        ))}
      </Block>
      <TranslateVi value={data.vietnamese} />
    </Block>
  )
}

export default React.memo(ContentPost);
