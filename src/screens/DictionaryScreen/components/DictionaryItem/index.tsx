import React, { useState } from 'react'
import { useTheme } from '@themes'
import { Block, Text } from '@components'
import { Pressable } from 'react-native'
import { Icon } from '@assets'
import { dataProps } from '@screens/DictionaryScreen/const'

export interface DictonaryItemProps {
  data :dataProps
  onPressBookMark?: () => void
  onPress?: () => void
}

export const DictionaryItem: React.FC<DictonaryItemProps> = ({
  data,
  onPressBookMark,
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
              {data.word}
            </Text>
            <Text
              size={'h5'}
              fontFamily="regular"
              marginLeft={4}
              lineHeight={40}
              color={colors.greyDark}
            >
              ({data.wordType})
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
            /{data.wordPronounce}/
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
