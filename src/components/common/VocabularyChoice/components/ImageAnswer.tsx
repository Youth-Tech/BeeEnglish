import React from 'react'
import { Image, ShadowBlock } from '@components'
import { makeStyles, useTheme } from '@themes'

export interface ImageAnswerProps {
  isSelected: boolean
  answerImage: string
}
const ImageAnswer: React.FC<ImageAnswerProps> = (props) => {
  const { isSelected, answerImage } = props
  const { colors } = useTheme()
  const styles = useStyle()
  return (
    <ShadowBlock
      width={150}
      height={150}
      justifyCenter
      alignCenter
      radius={10}
      shadowHeight={isSelected ? 1 : 5}
      shadowColor={isSelected ? colors.orangePrimary : '#ccc'}
    >
      <Image
        source={{
          uri: answerImage,
        }}
        style={styles.image}
      />
    </ShadowBlock>
  )
}
export default ImageAnswer
const useStyle = makeStyles()(({ normalize }) => ({
  image: {
    width: normalize.h(100),
    height: normalize.h(100),
  },
}))
