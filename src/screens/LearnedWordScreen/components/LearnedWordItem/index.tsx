import React from 'react'
import { useTranslation } from 'react-i18next'
import { Block, Image, Text } from '@components'
import { useTheme } from '@themes'
import { Icon } from '@assets'

export interface LearnedWordItemProps {
  index?: number
  word: string
  wordType: string
  translation: string
  onPressAudio?: ()=> void
}

export const LearnedWordItem: React.FC<LearnedWordItemProps> = ({
  index,
  word,
  wordType,
  translation,
  onPressAudio,
}) => {
  const { colors } = useTheme()
  return (
    <Block backgroundColor={colors.greyLighter} width={146} height={151} radius={15}>
      <Block paddingHorizontal={15} paddingTop={17}>
        <Icon state="WaveAudio" fill={colors.orangePrimary} onPress={onPressAudio}></Icon>
        <Block row>
          <Text fontFamily="bold" size={'h3'} lineHeight={30}>
            {word}
          </Text>
          <Text marginLeft={3} fontFamily="regular" size={'h4'} color={colors.greyPrimary} lineHeight={30}>
            /{wordType}/
          </Text>
        </Block>
        <Text fontFamily='semiBold' size={'h4'} lineHeight={30}>{translation}</Text>
      </Block>
      <Block row paddingLeft={7} paddingTop={9}>
        <Block radius={100} width={5} height={5} backgroundColor={colors.greenLighter} ></Block>
        <Text size={'h5'} fontFamily="bold" marginLeft={4} >
          Độ Khó: siêu dễ
        </Text>
      </Block>
    </Block>
  )
}
