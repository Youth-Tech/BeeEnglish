import React from 'react'
import { Block, Text, Image } from '@components'
import { images } from '@assets'
import { ImageRequireSource, Pressable } from 'react-native'
interface NewsItemProps {
  title: string
  image: ImageRequireSource
  onPress?: () => void
}

export const NewsItem: React.FC<NewsItemProps> = ({
  title,
  image,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Block row shadow radius={10}>
        <Image
          radius={5}
          width={40}
          height={40}
          source={image}
          margin={10}
          resizeMode="cover"
        />
        <Block width={250}>
          <Text
            numberOfLines={2}
            marginLeft={5}
            marginTop={12}
            size={'h3'}
            fontFamily="semiBold"
          >
            {title}
          </Text>
        </Block>
      </Block>
    </Pressable>
  )
}
