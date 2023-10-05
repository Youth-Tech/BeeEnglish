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
  const { colors, normalize } = useTheme()
  const combinedText = `${progress}%`
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onPressBookMark && onPressBookMark();
  };
  return (
    <Pressable onPress={onPress}>
      <Block
        shadow
        width={normalize.h(142)}
        radius={normalize.v(10)}
        elevation={5}
        overflow="hidden"
      >
        <Block>
          <Block margin={normalize.m(3)} alignCenter>
            <Image
              radius={normalize.m(10)}
              width="100%"
              height={normalize.v(110)}
              source={image}
            ></Image>
          </Block>
          <Block
            width={normalize.h(26)}
            height={normalize.v(30)}
            backgroundColor={colors.white}
            alignCenter
            justifyCenter
            borderBottomLeftRadius={normalize.m(10)}
            borderBottomRightRadius={normalize.m(10)}
            absolute
            right={normalize.h(10)}
          >
            <Icon
              state="Bookmark"
              stroke={colors.orangeDark}
              strokeWidth={1.5}
              onPress={toggleBookmark}
              fill={isBookmarked ? colors.orangeDark : 'transparent'} 
            />
          </Block>
        </Block>
        <Text
          marginLeft={normalize.h(6)}
          marginTop={normalize.v(10)}
          fontFamily="regular"
          size={'h5'}
          color={colors.black}
        >
          {title}
        </Text>
        <Text
          marginLeft={normalize.h(6)}
          fontFamily="bold"
          size={'h5'}
          marginBottom={normalize.v(10)}
          marginTop={normalize.v(20)}
          color={colors.orangeDark}
        >
          {combinedText}
        </Text>
      </Block>
    </Pressable>
  )
}
