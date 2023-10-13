import React from 'react'
import { useTranslation } from 'react-i18next'
import { Block, Image, Text } from '@components'
import { ImageRequireSource, Pressable } from 'react-native'

export interface VocabularyItemProps {
  name: string
  image: ImageRequireSource
  onPress?: () => void
}

export const VocabularyItem: React.FC<VocabularyItemProps> = ({
  name,
  image,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Block
        marginRight={10}
        radius={10}
        alignCenter
        paddingHorizontal={10}
        width={200}
        height={140}
        row
        
      >
        <Image source={image} width={50} height={67.29}></Image>
        <Text size={'h4'} fontFamily="bold" marginLeft={15}>
          {name}
        </Text>
      </Block>
    </Pressable>
  )
}
