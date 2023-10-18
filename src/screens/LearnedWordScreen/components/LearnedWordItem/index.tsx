import React from 'react'
import { useTranslation } from 'react-i18next'
import { Block, Image, Text } from '@components'
import { useTheme } from '@themes'
import { Icon, SoundProgress } from '@assets'
import { Pressable } from 'react-native'

export interface LearnedWordItemProps {
  index?: number
  word: string
  wordType: string
  translation: string
  difficulty: 'easy' | 'normal' | 'hard'
  onPressAudio?: () => void
  onPress?: () => void
}

export const LearnedWordItem: React.FC<LearnedWordItemProps> = ({
  index,
  word,
  wordType,
  translation,
  difficulty,
  onPressAudio,
  onPress,
}) => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  let difficultyText = ''
  let dotColor = colors.greyLighter
  if (difficulty === 'easy') {
    difficultyText = t('easy')
    dotColor = colors.greenLighter
  } else if (difficulty === 'normal') {
    difficultyText = t('normal')
    dotColor = colors.bluePrimary
  } else if (difficulty === 'hard') {
    difficultyText = t('hard')
    dotColor = colors.redThick
  }
  return (
    <Pressable onPress={onPress}>
      <Block
        backgroundColor={colors.greyLighter}
        width={146}
        height={151}
        radius={15}
      >
        <Block paddingHorizontal={15} paddingTop={17}>
          <SoundProgress fill={colors.orangePrimary} onPress={onPressAudio} />
          <Block row>
            <Text fontFamily="bold" size={'h3'} lineHeight={30}>
              {word}
            </Text>
            <Text
              lineHeight={30}
              size={'h4'}
              fontFamily="regular"
              color={colors.greyPrimary}
              marginLeft={3}
            >
              /{wordType}/
            </Text>
          </Block>

          <Text fontFamily="semiBold" size={'h4'} lineHeight={30}>
            {translation}
          </Text>
        </Block>
        <Block row paddingLeft={7} paddingTop={9} alignCenter>
          <Block
            radius={100}
            width={5}
            height={5}
            backgroundColor={dotColor}
          ></Block>
          <Text size={'h5'} fontFamily="bold" marginLeft={4}>
            Độ Khó: {difficultyText}
          </Text>
        </Block>
      </Block>
    </Pressable>
  )
}
