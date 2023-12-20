import React from 'react'
import { Pressable } from 'react-native'
import { useTranslation } from 'react-i18next'
import { FadeInRight, FadeOutLeft } from 'react-native-reanimated'

import { images } from '@assets'
import { makeStyles, useTheme } from '@themes'
import { Block, BlockAnimated, Image, Text } from '@components/bases'
import ImageAnswer from '@components/common/VocabularyChoice/components/ImageAnswer'

export interface VocabularyChoiceProps {
  data: Question
}

export interface VocabularyChoiceFunc {
  check: () => boolean
  onTriggerAnimation: () => void
}

export const VocabularyChoice = React.forwardRef<
  VocabularyChoiceFunc,
  VocabularyChoiceProps
>((props, ref) => {
  const { data } = props
  const styles = useStyle()
  const { t } = useTranslation()
  const { colors, normalize } = useTheme()

  // const soundProgressRef = useRef<SoundProgressFcRef>(null)
  const isCheck = React.useRef(false)
  const [visible, setVisible] = React.useState(true)
  const [userAnswer, setUserAnswer] = React.useState<number | null>(null)
  const [listBorderColor, setListBorderColor] = React.useState<Array<string>>(
    [],
  )
  const tempData = data.answer as Answer[]

  // const handlePressSound = () => {
  //   soundProgressRef.current?.start()
  // }

  React.useEffect(() => {
    setListBorderColor([...tempData.map(() => colors.transparent)])
  }, [data])

  React.useImperativeHandle(ref, () => ({
    check() {
      isCheck.current = true

      const isCorrect =
        userAnswer === null ? false : tempData[userAnswer].isValid

      const correctAnswer = (data.answer as Answer[]).findIndex(
        (item) => item.isValid,
      )

      const tempListBorderColor = [...listBorderColor]
      tempListBorderColor[correctAnswer] = '#58CC02'

      if (userAnswer !== null) {
        if (!isCorrect) {
          tempListBorderColor[userAnswer] = colors.red
        }
      }
      setListBorderColor(tempListBorderColor)

      return isCorrect
    },
    onTriggerAnimation() {
      isCheck.current = false
      setVisible(false)
      setUserAnswer(null)
      setVisible(true)
    },
  }))
  return (
    <>
      {visible && (
        <BlockAnimated
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
            {/*<SoundProgress*/}
            {/*  ref={soundProgressRef}*/}
            {/*  fill={colors.orangePrimary}*/}
            {/*  style={styles.soundIcon}*/}
            {/*  onPress={handlePressSound}*/}
            {/*/>*/}
          </Block>
          <Block row wrap style={{ gap: 10 }} marginTop={60}>
            {tempData.map((item, index) => {
              const shadowColor =
                isCheck.current && listBorderColor[index] !== colors.transparent
                  ? listBorderColor[index]
                  : index === userAnswer
                  ? colors.orangePrimary
                  : '#ccc'

              return (
                <Pressable
                  key={`item-vocab-${index}`}
                  onPress={() => {
                    setUserAnswer(index)
                  }}
                  style={index > 1 ? { marginTop: normalize.v(10) } : {}}
                >
                  <ImageAnswer
                    shadowColor={shadowColor}
                    isSelected={userAnswer === index}
                    answerImage={(item.option as Attachment).src!}
                  />
                </Pressable>
              )
            })}
          </Block>
        </BlockAnimated>
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
