import React from 'react'
import { Pressable } from 'react-native'

import { useTheme } from '@themes'
import { SoundProgress } from '@assets'
import { DataLearnProps } from '../const'
import { Block, Text } from '@components'

export interface Props {
  index?: number
  data: DataLearnProps
  onPressAudio?: () => void
  onPress?: () => void
}

export const LearnWordItem: React.FC<Props> = ({
  data,
  onPress,
  onPressAudio,
}) => {
  const { colors } = useTheme()

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
              {data.word}
            </Text>
            <Text
              lineHeight={30}
              size={'h4'}
              fontFamily="regular"
              color={colors.greyPrimary}
              marginLeft={3}
            >
              /{data.wordType}/
            </Text>
          </Block>
          <Text fontFamily="semiBold" size={'h4'} lineHeight={30}>
            {data.translation}
          </Text>
        </Block>
        <Block height={20}></Block>
      </Block>
    </Pressable>
  )
}
