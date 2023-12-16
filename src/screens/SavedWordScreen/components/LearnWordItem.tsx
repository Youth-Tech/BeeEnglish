import React from 'react'
import { Pressable } from 'react-native'

import { useTheme } from '@themes'
import { SoundProgress, SoundProgressFcRef } from '@assets'
import { Block, Text } from '@components'
import { Word } from '@services'
import Sound from 'react-native-sound'

export interface Props {
  index?: number
  data: Word
  onPress?: () => void
}

export const LearnWordItem: React.FC<Props> = ({ data, onPress }) => {
  const { colors } = useTheme()
  const isSenseEmpty = Object.keys(data.senses[0]).length === 0
  const soundUrl = data.attachments.find((o) => o.type === 'audio')
  console.log(soundUrl?.src)
  const sound = new Sound(
    soundUrl?.src ??
      'https://api.dictionaryapi.dev/media/pronunciations/en/default-uk.mp3',
    '',
    (error) => {
      if (error) console.log('Fail to load sound')
    },
  )
  const soundProgressRef = React.useRef<SoundProgressFcRef>(null)
  const handleSoundProgress = () => {
    soundProgressRef.current?.start()

    sound.play((success) => {
      if (success) {
        console.log('successfully finished playing')
        soundProgressRef.current?.pause()
      } else {
        console.log('playback failed due to audio decoding errors')
      }
    })
  }
  return (
    <Pressable onPress={onPress}>
      <Block
        width={'100%'}
        radius={15}
        borderWidth={1}
        borderColor={colors.borderColor}
        paddingBottom={10}
        marginRight={10}
      >
        <Block row space={'between'} alignCenter paddingHorizontal={17}>
          <Block paddingTop={10}>
            <Block row gap={10}>
              <Text
                size={'h3'}
                lineHeight={30}
                fontFamily="bold"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {data.english}
              </Text>
              <Text
                size={'h4'}
                fontFamily="regular"
                color={colors.greyPrimary}
                lineHeight={30}
              >
                {data.pronunciation}
              </Text>
            </Block>
            <Text fontFamily="semiBold" size={'h3'} lineHeight={30}>
              {isSenseEmpty ? '' : data.senses[0].vietnamese}
            </Text>
          </Block>
          <SoundProgress
            ref={soundProgressRef}
            width={30}
            height={30}
            fill={colors.orangePrimary}
            onPress={handleSoundProgress}
          />
        </Block>
      </Block>
    </Pressable>
  )
}
