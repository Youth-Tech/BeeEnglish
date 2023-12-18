import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, ViewStyle } from 'react-native'
import { FadeInRight, FadeOutLeft } from 'react-native-reanimated'

import { images } from '@assets'
import { makeStyles, useTheme } from '@themes'
import { Block, BlockAnimated, Image, Text } from '@components/bases'

export interface VocabularyOptionsFunc {
  check: () => boolean
  onTriggerAnimation: () => void
}

export interface VocabularyOptionsProps {
  data: Question
}

export const VocabularyOptions = React.forwardRef<
  VocabularyOptionsFunc,
  VocabularyOptionsProps
>((props, ref) => {
  const { data } = props
  const styles = useStyle()
  const { t } = useTranslation()
  const { colors, normalize } = useTheme()

  const isCheck = React.useRef(false)
  const [visible, setVisible] = React.useState(true)
  const [currentOption, setCurrentOption] = React.useState<number | null>(null)
  const [backgroundColor, setBackgroundColor] = React.useState<
    { overlay: string; text: string }[]
  >([])

  const parseAnswer = data.answer as Answer[]

  React.useEffect(() => {
    setBackgroundColor([
      ...(data.answer as Answer[]).map(() => ({
        overlay: colors.transparent,
        text: colors.transparent,
      })),
    ])
  }, [data])

  React.useImperativeHandle(ref, () => ({
    onTriggerAnimation() {
      isCheck.current = false

      setVisible(false)
      setCurrentOption(null)
      setVisible(true)
    },
    check() {
      isCheck.current = true

      const isCorrect =
        currentOption == null
          ? false
          : (data.answer as Answer[])[currentOption].isValid
      const correctAnswer = (data.answer as Answer[]).findIndex(
        (item) => item.isValid,
      )

      const tempBackground = [...backgroundColor]
      tempBackground[correctAnswer] = {
        overlay: '#58CC02',
        text: colors.white,
      }

      if (currentOption !== null) {
        if (!isCorrect) {
          tempBackground[currentOption] = {
            overlay: colors.red,
            text: colors.white,
          }
        }
      }
      setBackgroundColor(tempBackground)

      return isCorrect
    },
  }))

  return (
    <>
      {visible && (
        <BlockAnimated
          flex
          paddingTop={20}
          space={'between'}
          exiting={FadeOutLeft.duration(500)}
          entering={FadeInRight.duration(500)}
        >
          <Block>
            <Text size={'h2'} fontFamily={'bold'}>
              {t('choose_translation')}
            </Text>
            <Block row alignCenter marginTop={22}>
              <Image
                resizeMode={'contain'}
                source={images.QuestionBubble}
                style={styles.bubbleQuestion}
              />
              <Text
                size={'h2'}
                marginLeft={8}
                color={colors.black}
                fontFamily={'semiBold'}
              >
                {data.question}
              </Text>
              {/*<SoundProgress*/}
              {/*  fill={colors.orangePrimary}*/}
              {/*  style={{ marginStart: normalize.h(15) }}*/}
              {/*/>*/}
            </Block>
            <Block alignCenter marginTop={30}>
              <Image
                source={{
                  uri: data.wordImage,
                }}
                style={styles.image}
                resizeMode={'contain'}
                radius={5}
              />
            </Block>
          </Block>

          <Block style={styles.blockOptions}>
            {parseAnswer.map((_, index) => {
              const overlayStyle: ViewStyle = {
                backgroundColor:
                  backgroundColor[index]?.overlay ?? colors.transparent,
                borderRadius: normalize.m(48),
              }

              const textColor =
                isCheck.current &&
                backgroundColor[index].text !== colors.transparent
                  ? backgroundColor[index].text
                  : index === currentOption
                  ? colors.orangeDark
                  : colors.greyDark

              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    setCurrentOption(index)
                  }}
                >
                  <Block
                    height={52}
                    radius={48}
                    alignCenter
                    justifyCenter
                    backgroundColor={
                      index === currentOption
                        ? colors.orangeLighter
                        : colors.greyLighter
                    }
                  >
                    <Text
                      size={'h3'}
                      style={{
                        zIndex: 1,
                      }}
                      color={textColor}
                      fontFamily="semiBold"
                    >
                      {parseAnswer[index].option as string}
                    </Text>
                    <Block style={[StyleSheet.absoluteFill, overlayStyle]} />
                  </Block>
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
  bubbleQuestion: {
    width: normalize.h(25.78),
    height: normalize.h(30),
  },
  image: {
    width: normalize.h(180),
    height: normalize.h(180),
  },
  blockOptions: {
    flex: 0,
    gap: normalize.v(16),
    marginBottom: normalize.v(20),
  },
}))
