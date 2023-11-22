import React from 'react'
import { Pressable } from 'react-native'

import { useTheme } from '@themes'
import { SoundProgress } from '@assets'
import { Block, Text } from '@components'
import { Word } from '@services'

export interface Props {
  index?: number
  data: Word
  onPressAudio?: () => void
  onPress?: () => void
}

export const LearnWordItem: React.FC<Props> = ({
  data,
  onPress,
  onPressAudio,
}) => {
  const { colors } = useTheme()
  const isSenseEmpty = Object.keys(data.senses[0]).length === 0
  return (
    <Pressable onPress={onPress}>
      <Block
        backgroundColor={colors.greyLighter}
        width={145}
        radius={15}
        alignSelf="center"
        paddingBottom={10}
        marginRight={10}
      >
        <Block paddingHorizontal={17} paddingTop={17}>
          <SoundProgress fill={colors.orangePrimary} onPress={onPressAudio} />
          <Block row wrap>
            <Text
              fontFamily="bold"
              size={'h3'}
              lineHeight={30}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {data.english}
            </Text>
            <Text
              lineHeight={30}
              size={'h4'}
              fontFamily="regular"
              color={colors.greyPrimary}
              marginLeft={3}
            >
              /{data.pronunciation}/
            </Text>
          </Block>
          <Text fontFamily="semiBold" size={'h4'} lineHeight={30}>
            {isSenseEmpty ? '' : data.senses[0].vietnamese}
          </Text>
        </Block>
        <Block height={20}></Block>
      </Block>
    </Pressable>
  )
}
