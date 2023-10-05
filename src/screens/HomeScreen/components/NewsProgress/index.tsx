import React, { useState } from 'react'
import { useTheme } from '@themes'
import { Block, Text, Image } from '@components'
import { Icon } from '@assets'
import { ImageRequireSource, Pressable } from 'react-native'

interface NewsProgressProps {
  title: string
  image: ImageRequireSource
  progress: number
  onPressBookMark?: () => void
  onPress?: () => void
}

export const NewsProgress: React.FC<NewsProgressProps> = ({
  title,
  image,
  progress,
  onPressBookMark,
  onPress,
}) => {
  const { colors } = useTheme()
  const combinedText = `${progress}%`
  const [isBookmarked, setIsBookmarked] = useState(false)

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onPressBookMark && onPressBookMark()
  }
  return (
    <Pressable onPress={onPress}>
      <Block shadow width={142} radius={10} elevation={5} overflow="hidden">
        <Block>
          <Block margin={3} alignCenter>
            <Image radius={10} width="100%" height={110} source={image}></Image>
          </Block>
          <Pressable onPress={toggleBookmark}>
            <Block
              width={26}
              height={30}
              backgroundColor={colors.white}
              alignCenter
              justifyCenter
              absolute
              right={10}
              borderBottomLeftRadius={10}
              borderBottomRightRadius={10}
              bottom={75}
            >
              <Icon
                state="Bookmark"
                stroke={colors.orangeDark}
                strokeWidth={1.5}
                fill={isBookmarked ? colors.orangeDark : 'transparent'}
              />
            </Block>
          </Pressable>
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
