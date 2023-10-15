import React, { useState } from 'react'
import { useTheme } from '@themes'
import { Block, Text } from '@components'
import { Pressable } from 'react-native'
import { Icon } from '@assets'

export interface DictonaryItemProps {
  word: string
  wordType: string
  wordPronounce: string
  onPressBookMark?: () => void
  onPress?: () => void
}

export const DictionaryItem: React.FC<DictonaryItemProps> = ({
  word,
  onPressBookMark,
  wordType,
  wordPronounce,
  onPress,
}) => {
  const { colors } = useTheme()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onPressBookMark && onPressBookMark()
  }
  return (
    <Pressable onPress={onPress}>
      <Block>
        <Block backgroundColor={colors.white} height={60} paddingLeft={35}>
          <Block row alignCenter>
            <Text size={'h4'} fontFamily="semiBold" lineHeight={40}>
              {word}
            </Text>
            <Text
              size={'h5'}
              fontFamily="regular"
              marginLeft={4}
              lineHeight={40}
              color={colors.greyDark}
            >
              ({wordType})
            </Text>
            <Pressable
              onPress={toggleBookmark}
              style={{ position: 'absolute', right: 29, top: 0 }}
            >
              <Block
                width={26}
                height={30}
                backgroundColor={colors.white}
                alignCenter
                justifyCenter
                borderBottomLeftRadius={10}
                borderBottomRightRadius={10}
                shadow
              >
                <Icon
                  state="Bookmark"
                  stroke={colors.orangeDark}
                  fill={isBookmarked ? colors.orangeDark : 'transparent'}
                />
              </Block>
            </Pressable>
          </Block>
          <Text size={'h5'} fontFamily="regular" color={colors.greyDark}>
            /{wordPronounce}/
          </Text>
        </Block>
        <Block
          backgroundColor={colors.greyLight}
          height={1}
          width="100%"
        ></Block>
      </Block>
    </Pressable>
  )
}
