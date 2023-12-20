import React from 'react'
import { useTranslation } from 'react-i18next'
import { Block, Text } from '@components'
import { useTheme } from '@themes'
import { SoundProgress, SoundProgressFcRef } from '@assets'
import { Pressable } from 'react-native'
import { WordReviews } from '@services'
import Sound from 'react-native-sound'

export interface LearnedWordItemProps {
  index?: number
  data: WordReviews
  onPress?: () => void
}

export const LearnedWordItem: React.FC<LearnedWordItemProps> = ({
  data,
  onPress,
}) => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const soundRef = React.useRef<SoundProgressFcRef>(null)
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
  const soundAttachment = data.word.attachments.find(
    (attachment) => attachment?.type === 'audio',
  )
  console.log(soundAttachment?.src)
  const sound = new Sound(
    soundAttachment?.src ??
      'https://api.dictionaryapi.dev/media/pronunciations/en/default-uk.mp3',
    '',
    (error) => {
      if (error) console.log('Fail to load sound')
    },
  )
  const handlePressAudio = () => {
    soundRef.current?.start()
    sound.play((success) => {
      if (success) {
        console.log('successfully finished playing')
        soundRef.current?.pause()
      } else {
        console.log('playback failed due to audio decoding errors')
      }
    })
  }
  const isSensesEmpty = Object.keys(data.word.senses[0]).length === 0
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
          <SoundProgress
            ref={soundRef}
            fill={colors.orangePrimary}
            onPress={handlePressAudio}
          />
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
              {data.word.pronunciation}
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
