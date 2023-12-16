import React from 'react'
import { Pressable, StyleSheet, ViewStyle } from 'react-native'
import { FadeInRight, FadeOutLeft } from 'react-native-reanimated'

import { images } from '@assets'
import { normalize, useTheme } from '@themes'
import { Block, BlockAnimated, Image, Text } from '@components/bases'

export interface QuestionRefFunction {
  check: () => boolean
  triggerChangeLayout: () => void
}

export interface GrammarOptionProps {
  data: Question
}

export const GrammarOptions = React.forwardRef<
  QuestionRefFunction,
  GrammarOptionProps
>(({ data }, ref) => {
  const { colors, normalize } = useTheme()
  const isCheck = React.useRef(false)
  const [currentOption, setCurrentOption] = React.useState<number | null>(null)
  const [backgroundColor, setBackgroundColor] = React.useState<
    { overlay: string; text: string }[]
  >([])
  const [ready, setReady] = React.useState(true)

  React.useEffect(() => {
    setBackgroundColor([
      ...(data.answer as Answer[]).map(() => ({
        overlay: colors.transparent,
        text: colors.transparent,
      })),
    ])
  }, [data])

  React.useImperativeHandle(ref, () => ({
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

    triggerChangeLayout() {
      isCheck.current = false
      //reset component
      setReady(false)
      setCurrentOption(null)
      setReady(true)
    },
  }))

  return (
    <Block flex paddingBottom={25}>
      {ready && (
        <BlockAnimated
          flex
          exiting={FadeOutLeft.duration(500)}
          entering={FadeInRight.duration(500)}
        >
          <Text size={'h2'} fontFamily="bold" marginTop={20}>
            {data.question}
          </Text>

          <Image
            width={120}
            height={180}
            resizeMode="contain"
            style={styles.imageStyle}
            source={images.BeeWithPencil}
          />

          <Block flex />

          <Block style={styles.blockOptions}>
            {(data.answer as Answer[]).map((item, index) => {
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
                    padding={10}
                    justifyCenter
                    backgroundColor={
                      index === currentOption
                        ? colors.orangeLighter
                        : colors.greyLighter
                    }
                  >
                    <Text
                      color={textColor}
                      size={'h3'}
                      fontFamily="semiBold"
                      style={{
                        zIndex: 1,
                      }}
                    >
                      {item.option as string}
                    </Text>
                    <Block style={[StyleSheet.absoluteFill, overlayStyle]} />
                  </Block>
                </Pressable>
              )
            })}
          </Block>
        </BlockAnimated>
      )}
    </Block>
  )
})

const styles = StyleSheet.create({
  imageStyle: {
    alignSelf: 'flex-end',
    marginTop: normalize.v(20),
  },
  blockOptions: {
    gap: normalize.v(16),
    marginTop: normalize.v(20),
  },
})
