import React, { useRef } from 'react'
import { Pressable } from 'react-native'
import { useTranslation } from 'react-i18next'
import { makeStyles, useTheme } from '@themes'
import { Answer, QuestionType } from '@screens'
import { Block, Image, Text } from '@components/bases'
import { images, SoundProgress, SoundProgressFcRef } from '@assets'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'
import ImageAnswer from '@components/common/VocabularyChoice/components/ImageAnswer'

export interface Question {
  id: string
  question: string
  answer: string | Answer[]
  type: QuestionType
}
export interface VocabularyChoiceProps {
  data: Question
}
export interface VocabularyChoiceFunc {
  check: () => boolean
  onTriggerAnimation: () => void
}
const AnimatedBlock = Animated.createAnimatedComponent(Block)
export const VocabularyChoice = React.forwardRef<
  VocabularyChoiceFunc,
  VocabularyChoiceProps
>((props, ref) => {
  const { data } = props
  const styles = useStyle()
  const { t } = useTranslation()
  const { colors, normalize } = useTheme()

  const soundProgressRef = useRef<SoundProgressFcRef>(null)
  const [visible, setVisible] = React.useState(true)
  const [userAnswer, setUserAnswer] = React.useState<number | null>(null)
  const tempData = data.answer as Answer[]
  const handlePressSound = () => {
    soundProgressRef.current?.start()
  }

  React.useImperativeHandle(ref, () => ({
    check() {
      const result =
        userAnswer === null
          ? false
          : (data.answer as Answer[])[userAnswer].isValid
      return result
    },
    onTriggerAnimation() {
      setVisible(false)
      setUserAnswer(null)
      setVisible(true)
    },
  }))
  return (
    <>
      {visible && (
        <AnimatedBlock
          flex
          entering={FadeInRight.duration(500)}
          exiting={FadeOutLeft.duration(500)}
        >
          <Block paddingTop={30} row alignCenter>
            <Image source={images.QuestionBubble} style={styles.image} />
            <Text size={'h3'} fontFamily={'semiBold'} marginLeft={15}>
              {t('choose_correct_image')}
            </Text>
          </Block>
          <Block row marginTop={15}>
            <Text size={'h2'} fontFamily={'bold'}>
              {data.question}
            </Text>
            <SoundProgress
              ref={soundProgressRef}
              fill={colors.orangePrimary}
              style={styles.soundIcon}
              onPress={handlePressSound}
            />
          </Block>
          <Block row wrap style={{ gap: 10 }} marginTop={60}>
            {tempData.map((item, index) => (
              <Pressable
                key={`item-vocab-${index}`}
                onPress={() => {
                  setUserAnswer(index)
                }}
                style={index > 1 ? { marginTop: normalize.v(10) } : {}}
              >
                <ImageAnswer
                  isSelected={userAnswer === index ? true : false}
                  answerImage={item.option}
                />
              </Pressable>
            ))}
          </Block>
        </AnimatedBlock>
      )}
    </>
  )
})
const useStyle = makeStyles()(({ normalize }) => ({
  image: {
    width: normalize.h(25.78),
    height: normalize.h(30),
  },
  soundIcon: {
    marginStart: normalize.h(5),
  },
}))
