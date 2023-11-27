import React from 'react'
import { Image, ShadowBlock } from '@components'
import { makeStyles } from '@themes'

export interface ImageAnswerProps {
  isSelected: boolean
  answerImage: string
  shadowColor: string
}
const ImageAnswer: React.FC<ImageAnswerProps> = (props) => {
  const { isSelected, answerImage ,shadowColor} = props
  const styles = useStyle()
  return (
    <ShadowBlock
      alignCenter
      radius={10}
      width={150}
      height={150}
      justifyCenter
      shadowColor={shadowColor}
      shadowHeight={isSelected ? 1 : 5}
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
