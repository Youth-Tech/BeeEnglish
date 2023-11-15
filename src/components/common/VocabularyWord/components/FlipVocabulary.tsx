import React from 'react'
import { baseStyles, useTheme } from '@themes'
import { useTranslation } from 'react-i18next'
import { Block, Image, Text } from '@components/bases'
import { FlipVocabularyProps } from '@components/common/VocabularyWord/components/type'
import {
  Icon,
  SoundProgress,
  withSpringConfig,
  SoundProgressFcRef,
  images,
} from '@assets'
import { Pressable } from 'react-native'
import Animated, {
  withSpring,
  interpolate,
  Extrapolation,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import Sound from 'react-native-sound'

const AnimatedBlock = Animated.createAnimatedComponent(Block)
const FlipVocabulary: React.FC<FlipVocabularyProps> = (props) => {
  const {
    _id,
    english,
    senses,
    attachments,
    pronunciation,
    isBookmarked,
    onPressSoundProgress,
    onPressBookmark,
    onPressMoreExample,
  } = props
  const { t } = useTranslation()
  const rotateY = useSharedValue(0)
  const { colors, normalize } = useTheme()
  const soundUrl = attachments.find((o) => o.type === 'audio')
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
  const soundProgressRef1 = React.useRef<SoundProgressFcRef>(null)
  const rotateYValue = useDerivedValue(() => {
    return withSpring(rotateY.value === 0 ? 0 : 180, withSpringConfig)
  })

  const rStyleRotate = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotateYValue.value}deg` }],
    }
  })

  const handleClickVocab = () => {
    console.log('clicked')
    if (rotateY.value <= 180 && rotateY.value != 0) {
      rotateY.value = 0
    } else {
      rotateY.value = 1
    }
  }
  const rotateContentStyleFront = useAnimatedStyle(() => {
    const rotateYContent = interpolate(rotateYValue.value, [0, 180], [1, 0], {
      extrapolateRight: Extrapolation.CLAMP,
      extrapolateLeft: Extrapolation.CLAMP,
    })
    return {
      opacity: rotateYContent,
    }
  })
  const rotateContentStyleBack = useAnimatedStyle(() => {
    const rotateYContent = interpolate(rotateYValue.value, [0, 180], [0, 1], {
      extrapolateRight: Extrapolation.CLAMP,
      extrapolateLeft: Extrapolation.CLAMP,
    })
    return {
      opacity: rotateYContent,
    }
  })
  const zIndexContentStyleBack = useAnimatedStyle(() => {
    const rotateYContent = interpolate(rotateYValue.value, [0, 180], [-1, 0], {
      extrapolateRight: Extrapolation.CLAMP,
      extrapolateLeft: Extrapolation.CLAMP,
    })
    return {
      zIndex: rotateYContent,
    }
  })

  const handleBookmark = () => {
    onPressBookmark?.()
  }
  const handleSoundProgress = () => {
    soundProgressRef.current?.start()
    soundProgressRef1.current?.start()
    sound.play((success) => {
      if (success) {
        console.log('successfully finished playing')
        soundProgressRef.current?.pause()
        soundProgressRef1.current?.pause()
      } else {
        console.log('playback failed due to audio decoding errors')
      }
    })
  }
  const isAttachmentEmpty = Object.keys(attachments[0]).length === 0
  const isSensesEmpty = Object.keys(senses[0]).length === 0
  return (
    <Pressable onPress={handleClickVocab} key={_id}>
      <AnimatedBlock
        width={320}
        height={423}
        radius={10}
        style={[
          rStyleRotate,
          { borderWidth: 1, borderColor: colors.borderColor },
        ]}
        backgroundColor={'white'}
        overflow={'hidden'}
      >
        <Block>
          <AnimatedBlock
            row
            space={'between'}
            paddingHorizontal={15}
            paddingTop={16}
            style={rotateContentStyleFront}
          >
            <Icon state={'QuestionMark'} />
            <Icon
              state={'Bookmark'}
              size={24}
              strokeWidth={0.5}
              fill={isBookmarked ? colors.orangePrimary : 'none'}
              stroke={isBookmarked ? colors.orangePrimary : colors.black}
              onPress={handleBookmark}
            />
          </AnimatedBlock>
          <Block alignCenter>
            <Image
              source={
                isAttachmentEmpty
                  ? images.BeeDiscovery
                  : { uri: attachments[0].src }
              }
              width={199}
              height={199}
              resizeMode={'contain'}
            />
            <AnimatedBlock style={rotateContentStyleFront} alignCenter>
              <Block marginTop={14} row alignCenter>
                <Text size={'heading'} fontFamily={'bold'} color={colors.black}>
                  {english ?? 'Default'}
                </Text>
                <Pressable
                  style={{
                    marginBottom: normalize.v(3),
                    marginStart: normalize.h(5),
                  }}
                  onPress={handleSoundProgress}
                >
                  <SoundProgress
                    fill={colors.orangeDark}
                    ref={soundProgressRef}
                  />
                </Pressable>
              </Block>
              <Text
                size={'h1'}
                fontFamily={'regular'}
                color={colors.greyPrimary}
                marginTop={5}
              >
                /{pronunciation ?? 'dɪˈfɒlt'}/
              </Text>
              <Text
                size={'h2'}
                fontFamily={'regular'}
                paddingHorizontal={27}
                marginTop={20}
              >
                {isSensesEmpty
                  ? 'This is a default example'
                  : senses[0].exampleEnglish}
              </Text>
            </AnimatedBlock>
          </Block>
        </Block>
        <AnimatedBlock
          style={[
            { transform: [{ rotateY: '-180deg' }] },
            baseStyles.absoluteFill,
            zIndexContentStyleBack,
          ]}
        >
          <AnimatedBlock
            row
            space={'between'}
            paddingHorizontal={15}
            paddingTop={16}
            style={[rotateContentStyleBack]}
          >
            <Icon state={'QuestionMark'} />
            <Icon
              state={'Bookmark'}
              size={24}
              strokeWidth={0.5}
              fill={isBookmarked ? colors.orangePrimary : 'none'}
              stroke={isBookmarked ? colors.orangePrimary : colors.black}
              onPress={handleBookmark}
            />
          </AnimatedBlock>
          <Block alignCenter flex>
            <Block width={199} height={199} />
            <AnimatedBlock
              flex
              alignCenter
              width={'100%'}
              space={'between'}
              paddingHorizontal={18}
              style={[rotateContentStyleBack]}
            >
              <Block alignCenter>
                <Block marginTop={14} row alignCenter>
                  <Text
                    size={'heading'}
                    fontFamily={'bold'}
                    color={colors.black}
                  >
                    {senses[0].vietnamese ?? ''}
                  </Text>
                  <Pressable
                    style={{
                      marginBottom: normalize.v(3),
                      marginStart: normalize.h(5),
                    }}
                    onPress={handleSoundProgress}
                  >
                    <SoundProgress
                      fill={colors.orangeDark}
                      ref={soundProgressRef1}
                    />
                  </Pressable>
                </Block>

                <Text
                  size={'h2'}
                  fontFamily={'regular'}
                  paddingHorizontal={27}
                  marginTop={20}
                >
                  {isSensesEmpty
                    ? 'Ví dụ mặc định'
                    : senses[0].exampleVietnamese}
                </Text>
              </Block>
              <Pressable
                onPress={onPressMoreExample}
                style={{ alignSelf: 'flex-start' }}
              >
                <Text size={'h4'} color={colors.bluePrimary} marginBottom={18}>
                  {t('more_example')}
                </Text>
              </Pressable>
            </AnimatedBlock>
          </Block>
        </AnimatedBlock>
      </AnimatedBlock>
    </Pressable>
  )
}

export default FlipVocabulary
