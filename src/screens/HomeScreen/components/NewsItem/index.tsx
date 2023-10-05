import React from 'react'
import { Block, Text, Image } from '@components'
import { ImageRequireSource, Pressable } from 'react-native'
import { useTheme } from '@themes'

interface NewsItemProps {
  title: string
  image: string
  onPress?: () => void
}

export const NewsItem: React.FC<NewsItemProps> = ({
  title,
  image,
  onPress,
}) => {
  const { colors } = useTheme()
  return (
    <Pressable onPress={onPress}>
      <Block
        row
        shadow
        radius={10}
        height={60}
        alignCenter
        paddingHorizontal={10}
        marginTop={14}
        backgroundColor={colors.white}
      >
        <Image
          radius={5}
          width={50}
          height={50}
          source={{ uri: image }}
          resizeMode="cover"
        />
        <Block flex marginLeft={15}>
          <Text
            numberOfLines={2}
            size={'h3'}
            fontFamily="semiBold"
            lineHeight={19}
          >
            {title}
          </Text>
        </Block>
      </Block>
    </Pressable>
  )
}
