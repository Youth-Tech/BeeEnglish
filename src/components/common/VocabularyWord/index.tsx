import React from 'react'
import i18next from 'i18next'
import { Icon, images } from '@assets'
import { normalize, useTheme } from '@themes'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet } from 'react-native'
import { ModalFunction } from '../../bases/Modal/type'
import FlipVocabulary from './components/FlipVocabulary'
import { Block, Image, Modal, Text } from '@components/bases'
import { VocabularyFunc, VocabularyWordProps } from './type'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export enum Difficulty {
  'easy' = 0,
  'medium' = 1,
  'hard' = 2,
}
const AnimatedBlock = Animated.createAnimatedComponent(Block)

export const VocabularyWord = React.forwardRef<
  VocabularyFunc,
  VocabularyWordProps
>((props, ref) => {
  const { data, setData, onPressSoundProgress, onPressMoreExample } = props
  const { colors, normalize } = useTheme()
  const difficulties = {
    [Difficulty.easy]: {
      label: i18next.t('easy'),
      value: Difficulty.easy,
      color: colors.greenLighter,
    },
    [Difficulty.medium]: {
      label: i18next.t('medium'),
      value: Difficulty.medium,
      color: colors.orangeThick,
    },
    [Difficulty.hard]: {
      label: i18next.t('hard'),
      value: Difficulty.hard,
      color: colors.redThick,
    },
  }
  const { t } = useTranslation()

  const difficultyArray = Object.keys(difficulties)
  const FadeInOutAnimation = (min: number, max: number) => {
    translateX.value = withTiming(max, { duration: 300 }, (isFinished) => {
      if (isFinished) {
        translateX.value = min
      }
      translateX.value = withTiming(0)
    })
  }
  const questionModalRef = React.useRef<ModalFunction>(null)
  const selectModalRef = React.useRef<ModalFunction>(null)
  const handleOpenQuestionModal = React.useCallback(() => {
    questionModalRef.current?.openModal()
  }, [])
  const handleSelectDifficulty = () => {
    selectModalRef.current?.openModal()
  }
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])
  React.useImperativeHandle(ref!, () => {
    return {
      onLeftTriggerAnimation() {
        FadeInOutAnimation(-10, 10)
      },
      onRightTriggerAnimation() {
        FadeInOutAnimation(10, -10)
      },
    }
  })

  const translateX = useSharedValue(0)
  const rTranslate = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [-10, 0, 10], [0, 1, 0])
    return {
      transform: [{ translateX: translateX.value }],
      opacity: opacity,
    }
  })
  const onPressBookmark = () => {
    const tempData = data
    tempData.isBookmarked = !tempData.isBookmarked
    setData(tempData)
    forceUpdate()
  }

  return (
    <Block flex>
      <AnimatedBlock style={[rTranslate]}>
        <Block paddingTop={15} alignCenter>
          <Block marginTop={15}>
            <FlipVocabulary
              _id={data._id}
              senses={data.senses}
              english={data.english}
              attachments={data.attachments}
              pronunciation={data.pronunciation}
              isBookmarked={data.isBookmarked}
              onPressBookmark={onPressBookmark}
              onPressMoreExample={onPressMoreExample}
              onPressSoundProgress={onPressSoundProgress}
            />
          </Block>
        </Block>
        <Block
          row
          space={'between'}
          marginTop={20}
          paddingLeft={20}
          paddingRight={23}
          alignCenter
          justifyCenter
        >
          <Text size={'h3'} fontFamily={'bold'}>
            {t('word_difficulty')}
          </Text>
          <Icon
            state={'QuestionCircle'}
            style={{ marginBottom: normalize.v(3) }}
            onPress={handleOpenQuestionModal}
          />
        </Block>
        <Pressable onPress={handleSelectDifficulty}>
          <Block
            radius={5}
            alignCenter
            marginTop={14}
            paddingVertical={10}
            marginHorizontal={20}
            backgroundColor={colors.white}
            borderWidth={1}
            borderColor={colors.borderColor}
          >
            <Text
              size={'h3'}
              fontFamily={'bold'}
              color={difficulties[data.difficulty as Difficulty]?.color}
            >
              {difficulties[data.difficulty as Difficulty]?.label}
            </Text>
          </Block>
        </Pressable>
        <Modal
          ref={questionModalRef}
          position={'center'}
          animationType={'fade'}
        >
          <Block
            height={252}
            radius={8}
            marginHorizontal={20}
            backgroundColor={colors.orangeSecondary}
          >
            <Text
              size={'h1'}
              fontFamily={'bold'}
              color={colors.white}
              paddingTop={15}
              paddingBottom={11}
              alignSelf={'center'}
            >
              {t('word_difficulty')}
            </Text>
            <Block
              flex
              radius={8}
              margin={5}
              paddingTop={10}
              paddingHorizontal={7}
              backgroundColor={'white'}
            >
              <Text size={'h3'} fontFamily={'bold'}>
                {t('choose_word_difficulty')}
              </Text>
              <Block row marginTop={15}>
                <Text size={'h3'} fontFamily={'bold'}>
                  {t('hard')}:
                </Text>
                <Text marginLeft={3} size={'h3'} fontFamily={'regular'}>
                  {t('review_after_minutes', { val: 1 })}
                </Text>
              </Block>
              <Block row marginTop={8}>
                <Text size={'h3'} fontFamily={'bold'}>
                  {t('medium')}:
                </Text>
                <Text marginLeft={3} size={'h3'} fontFamily={'regular'}>
                  {t('review_after_day', { val: 1 })}
                </Text>
              </Block>
              <Block row marginTop={8}>
                <Text size={'h3'} fontFamily={'bold'}>
                  {t('easy')}:
                </Text>
                <Text marginLeft={3} size={'h3'} fontFamily={'regular'}>
                  {t('review_after_month', { val: 1 })}
                </Text>
              </Block>
            </Block>
          </Block>
        </Modal>
        <Modal ref={selectModalRef} position={'bottom'}>
          <Block paddingHorizontal={20} marginBottom={20}>
            <Block
              radius={10}
              overflow={'hidden'}
              backgroundColor={colors.white}
            >
              <Image
                source={images.BeeReading}
                style={styles.image}
                resizeMode={'contain'}
              />
              {difficultyArray.map((value, index) => (
                <Pressable
                  key={`item-diffWord-${index}`}
                  style={styles.optionButton}
                  android_ripple={{ color: colors.borderColor }}
                  onPress={() => {
                    const tempData = data
                    console.log(tempData.difficulty)
                    tempData.difficulty =
                      difficulties[Number(value) as Difficulty].value
                    setData(tempData)
                    forceUpdate()
                    selectModalRef.current?.dismissModal()
                  }}
                >
                  <Text
                    size={'h3'}
                    fontFamily={'bold'}
                    color={difficulties[Number(value) as Difficulty].color}
                  >
                    {difficulties[Number(value) as Difficulty].label}
                  </Text>
                </Pressable>
              ))}
            </Block>
          </Block>
        </Modal>
      </AnimatedBlock>
    </Block>
  )
})
const styles = StyleSheet.create({
  optionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize.v(15),
  },
  image: {
    width: normalize.h(50),
    height: normalize.h(50),
    alignSelf: 'center',
    paddingTop: normalize.v(10),
  },
})
