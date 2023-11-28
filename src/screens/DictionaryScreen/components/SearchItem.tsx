import React from 'react'
import { useTheme } from '@themes'
import { Block, Text } from '@components'
import { Pressable } from 'react-native'
import { Word } from '@services'

export interface DictonaryItemProps {
  data: Word
  onPressBookMark?: () => void
  onPress?: () => void
}

export const SearchItem: React.FC<DictonaryItemProps> = ({ data, onPress }) => {
  const { colors } = useTheme()

  return (
    <Pressable onPress={onPress}>
      <Block>
        <Block height={60} paddingLeft={35}>
          <Block row alignCenter>
            <Text
              size={'h4'}
              fontFamily="bold"
              lineHeight={40}
              color={colors.black}
            >
              {data.english}
            </Text>
            <Text
              size={'h5'}
              fontFamily="semiBold"
              marginLeft={4}
              lineHeight={40}
              color={colors.red}
            >
              ({data.senses[0].type})
            </Text>
          </Block>
          <Text size={'h5'} fontFamily="regular" color={colors.greenLighter}>
            /{data.pronunciation}/
          </Text>
        </Block>
      </Block>
    </Pressable>
  )
}
