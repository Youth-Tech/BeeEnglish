import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'

import { images } from '@assets'
import { normalize, useTheme } from '@themes'
import { Block, Image, Text } from '@components/bases'

const AnimatedBlock = Animated.createAnimatedComponent(Block)

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
  const { colors } = useTheme()
  const [currentOption, setCurrentOption] = React.useState<number | null>(null)
  const [ready, setReady] = React.useState(true)

  React.useImperativeHandle(ref, () => ({
    check() {
      const result =
        currentOption == null
          ? false
          : (data.answer as Answer[])[currentOption].isValid
      return result
    },

    triggerChangeLayout() {
      //reset component
      setReady(false)
      setCurrentOption(null)
      setReady(true)
    },
  }))

  return (
    <>
      {ready && (
        <AnimatedBlock
          exiting={FadeOutLeft.duration(500)}
          entering={FadeInRight.duration(500)}
          flex
        >
          <Text size={'h2'} fontFamily="bold" marginTop={20}>
            {data.question}
          </Text>

          <Image
            source={images.BeeWithPencil}
            width={120}
            height={180}
            resizeMode="contain"
            style={styles.imageStyle}
          />
          <Block style={styles.blockOptions}>
            {(data.answer as Answer[]).map((item, index) => {
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
                      {item.option as string}
                    </Text>
                  </Block>
                </Pressable>
              )
            })}
          </Block>
        </AnimatedBlock>
      )}
    </>
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
