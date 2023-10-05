import React from 'react'
import { Block, Text, Image } from '@components'
import { ImageRequireSource, Pressable } from 'react-native'
import { useTheme } from '@themes'

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
  const { normalize } = useTheme()
  return (
    <Pressable onPress={onPress}>
      <Block row shadow radius={normalize.m(10)} width={normalize.h(280)}>
        <Image
          radius={normalize.m(5)}
          width={normalize.h(40)}
          height={normalize.h(40)}
          source={image}
          margin={normalize.m(10)}
          resizeMode="cover"
        />
        <Block
          width="75%"
          radius={normalize.m(10)}
          paddingHorizontal={normalize.h(10)}
          paddingVertical={normalize.v(12)}
        >
          <Text numberOfLines={2} size={'h3'} fontFamily="semiBold">
            {title}
          </Text>
        </Block>
      </Block>
    </Pressable>
  )
}
