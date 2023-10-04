import React from 'react'
import { useTheme } from '@themes'
import { Block, Text, Image } from '@components'
import { Icon } from '@assets'
import { ImageRequireSource, Pressable } from 'react-native'

interface NewsProgressProps {
  title: string
  image: ImageRequireSource
  progress: number
  onPress?: () => void
}

export const NewsProgress: React.FC<NewsProgressProps> = ({
  title,
  image,
  progress,
  onPress,
}) => {
  const { colors } = useTheme()

  const combinedText = `${progress}%`
  return (
    <Pressable onPress={onPress}>
      <Block shadow width={142} radius={10} elevation={5} overflow="hidden">
        <Block>
          <Block marginTop={3} alignCenter>
            <Image radius={10} width={152} height={110} source={image}></Image>
          </Block>
          <Block
            width={26}
            height={30}
            backgroundColor={colors.white}
            alignCenter
            justifyCenter
            borderBottomLeftRadius={10}
            borderBottomRightRadius={10}
            absolute
            right={20}
          >
            <Icon
              state="Bookmark"
              stroke={colors.orangePrimary}
              strokeWidth={1.5}
            />
          </Block>
        </Block>
        <Text
          marginLeft={6}
          marginTop={10}
          fontFamily="regular"
          size={'h5'}
          color={colors.black}
        >
          {title}
        </Text>
        <Text
          marginLeft={6}
          fontFamily="bold"
          size={'h5'}
          marginBottom={10}
          marginTop={20}
          color={colors.orangeDark}
        >
          {combinedText}
        </Text>
      </Block>
    </Pressable>
  )
}
