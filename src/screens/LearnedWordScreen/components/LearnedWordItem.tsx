import React from 'react'
import { useTranslation } from 'react-i18next'
import { Block, Text } from '@components'
import { useTheme } from '@themes'
import { SoundProgress } from '@assets'
import { Pressable } from 'react-native'
import { dataProps } from '@screens/LearnedWordScreen/const'
import { ReviewService, WordReviews } from '@services'

export interface LearnedWordItemProps {
  index?: number
  data: WordReviews
  onPressAudio?: () => void
  onPress?: () => void
}

export const LearnedWordItem: React.FC<LearnedWordItemProps> = ({
  data,
  onPressAudio,
  onPress,
}) => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  let difficultyText = ''
  let dotColor = colors.greyLighter
  if (data.difficulty === 'easy') {
    difficultyText = t('easy')
    dotColor = colors.greenLighter
  } else if (data.difficulty === 'medium') {
    difficultyText = t('medium')
    dotColor = colors.bluePrimary
  } else if (data.difficulty === 'hard') {
    difficultyText = t('hard')
    dotColor = colors.redThick
  }
  const isSensesEmpty = Object.keys(data.word.senses).length === 0
  return (
    <Pressable onPress={onPress}>
      <Block
        shadow
        backgroundColor={colors.white}
        width={146}
        radius={15}
        alignSelf="center"
        paddingBottom={10}
      >
        <Block paddingHorizontal={15} paddingTop={17}>
          <SoundProgress fill={colors.orangePrimary} onPress={onPressAudio} />
          <Block row wrap>
            <Text
              fontFamily="bold"
              size={'h3'}
              lineHeight={30}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {data.word.english}
            </Text>
            <Text
              lineHeight={30}
              size={'h4'}
              fontFamily="regular"
              color={colors.greyPrimary}
              marginLeft={3}
            >
              /{data.word.pronunciation}/
            </Text>
          </Block>

          <Text fontFamily="semiBold" size={'h4'} lineHeight={30}>
            {isSensesEmpty ? '' : data.word.senses[0].vietnamese}
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
            {t('level_of_difficult')}
            {difficultyText}
          </Text>
        </Block>
        <Block height={20}></Block>
      </Block>
    </Pressable>
  )
}
