import React from 'react'
import { Pressable } from 'react-native'
import { useTranslation } from 'react-i18next'
import { makeStyles, useTheme } from '@themes'
import { images, SoundProgress } from '@assets'
import { Block, BlockAnimated, Image, Text } from '@components/bases'
import { FadeInRight, FadeOutLeft } from 'react-native-reanimated'

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
  const [visible, setVisible] = React.useState(true)
  const [currentOption, setCurrentOption] = React.useState<number | null>(null)
  const tempArr = data.answer as Answer[]

  React.useImperativeHandle(ref, () => ({
    onTriggerAnimation() {
      setVisible(false)
      setCurrentOption(null)
      setVisible(true)
    },
    check() {
      const result =
        currentOption == null
          ? false
          : (data.answer as Answer[])[currentOption].isValid
      return result
    },
  }))

  return (
    <>
      {visible && (
        <BlockAnimated
          flex
          paddingTop={30}
          space={'between'}
          entering={FadeInRight.duration(500)}
          exiting={FadeOutLeft.duration(500)}
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
              <SoundProgress
                fill={colors.orangePrimary}
                style={{ marginStart: normalize.h(15) }}
              />
            </Block>
            <Block alignCenter marginTop={30}>
              <Image
                source={{
                  uri: data.wordImage,
                }}
                style={styles.image}
                resizeMode={'contain'}
              />
            </Block>
          </Block>

          <Block style={styles.blockOptions}>
            {tempArr.map((_, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    setCurrentOption(index)
                  }}
                >
                  <Block
                    height={52}
                    backgroundColor={
                      index === currentOption
                        ? colors.orangeLighter
                        : colors.greyLighter
                    }
                    justifyCenter
                    alignCenter
                    radius={48}
                  >
                    <Text
                      color={
                        index === currentOption
                          ? colors.orangeDark
                          : colors.greyDark
                      }
                      size={'h3'}
                      fontFamily="semiBold"
                    >
                      {(data.answer as Answer[])[index].option as string}
                    </Text>
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
    gap: normalize.v(16),
    marginTop: normalize.v(80),
  },
}))
