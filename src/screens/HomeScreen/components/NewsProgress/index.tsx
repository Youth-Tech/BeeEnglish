import React, { useState } from 'react'
import { useTheme } from '@themes'
import { Block, Text, Image } from '@components'
import { Icon } from '@assets'
import { ImageRequireSource, Pressable } from 'react-native'

interface NewsProgressProps {
  title: string
  image: string
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
      <Block
        shadow
        width={142}
        height={186}
        radius={10}
        elevation={5}
        overflow="hidden"
        backgroundColor={colors.white}
      >
        <Block padding={3} flex backgroundColor={colors.white}>
          <Image
            radius={10}
            width="100%"
            height={110}
            source={{
              uri: 'https://static.wikia.nocookie.net/nisekoi/images/c/c6/Chitoge-nisekoi.png/revision/latest?cb=20150603043239',
            }}
          />
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
          <Text
            paddingLeft={3}
            fontFamily="regular"
            size={'h5'}
            color={colors.black}
            numberOfLines={3}
            lineHeight={18}
          >
            {title}
          </Text>
        </Block>
        <Text
          marginLeft={6}
          marginBottom={5}
          fontFamily="bold"
          size={'h5'}
          color={colors.orangeDark}
        >
          {combinedText}
        </Text>
      </Block>
    </Pressable>
  )
}