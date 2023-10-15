import React from 'react'
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
        shadow
        radius={15}
        paddingHorizontal={10}
        row
        alignCenter
        width={200}
        height={120}
        marginRight={10}
      >
        <Image
          source={image}
          width={50}
          height={67.29}
          resizeMode="contain"
        ></Image>
        <Text size={'h4'} fontFamily="bold" marginHorizontal={10}>
          {name}
        </Text>
      </Block>
    </Pressable>
  )
}
