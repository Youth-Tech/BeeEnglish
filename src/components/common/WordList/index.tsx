import {
  runOnJS,
  runOnUI,
  FadeOutLeft,
  FadeInRight,
  useSharedValue,
} from 'react-native-reanimated'
import React from 'react'
import { View, StyleSheet } from 'react-native'

import { normalize } from '@themes'
import { widthScreen } from '@utils/helpers'
import { Lines, Word } from './components'
import { Block, BlockAnimated, ShadowBlock, Text } from '@components/bases'

export const WORD_HEIGHT = 50
export const MARGIN_TOP = 40
export const CONTAINER_WIDTH = widthScreen - normalize.h(10) * 2

const answersWordPropsToList = (answers: string[]): WordProps[] => {
  return answers.map((item, index) => {
    return {
      id: index.toString(),
      word: item,
      index,
    }
  })
}

export const WordList = React.forwardRef<WordListRefFunc, WordListProps>(
  ({ answers }, ref) => {
    const [lines, setLines] = React.useState(0)
    const [ready, setReady] = React.useState(false)

    React.useImperativeHandle(ref, () => ({
      check(value) {
        const currentValue = offsets
          .filter((item) => item.order.value !== -1)
          .sort((a, b) => (a.order.value > b.order.value ? 1 : -1))
          .map((item) => {
            return item.value.word
          })

        return value === currentValue.join(' ')
      },
      onTriggerAnimation() {
        setReady(false)
      },
    }))

    const data = answersWordPropsToList(answers)
    //pre calculate data dimension
    let offsets: Offset[] = data.map((item) => {
      return {
        value: item,
        x: useSharedValue(0),
        y: useSharedValue(0),
        order: useSharedValue(0),
        width: useSharedValue(0),
        height: useSharedValue(0),
        originalX: useSharedValue(0),
        originalY: useSharedValue(0),
      }
    })

    if (!ready) {
      return (
        <Block row alignCenter flex wrap opacity={0}>
          {data.map((word, index) => {
            return (
              <View
                key={index}
                onLayout={(e) => {
                  const { width, height, x, y } = e.nativeEvent.layout
                  const offset = offsets[index]

                  offset.order.value = -1
                  offset.originalX.value = x
                  offset.originalY.value = y
                  offset.width.value = width
                  offset.height.value = height

                  runOnUI(() => {
                    'worklet'
                    if (
                      offsets.filter((o) => o.order.value !== -1).length === 0
                    ) {
                      const amountOfWidth = offsets.reduce((acc, o) => {
                        return acc + o.width.value + 10
                      }, 0)

                      runOnJS(setLines)(
                        Math.ceil(amountOfWidth / CONTAINER_WIDTH),
                      )
                      runOnJS(setReady)(true)
                    }
                  })()
                }}
                style={styles.wordStyle}
              >
                <ShadowBlock
                  radius={15}
                  alignCenter
                  justifyCenter
                  height={WORD_HEIGHT}
                >
                  <Text
                    fontFamily="bold"
                    style={{
                      paddingHorizontal: 15,
                    }}
                  >
                    {word.word}
                  </Text>
                </ShadowBlock>
              </View>
            )
          })}
        </Block>
      )
    }

    return (
      <BlockAnimated
        exiting={FadeOutLeft.duration(500)}
        entering={FadeInRight.duration(500)}
      >
        <Block>
          <Lines lines={lines} />
        </Block>
        <Block
          row
          wrap
          flex
          style={{
            marginTop: WORD_HEIGHT * (lines + 1),
          }}
        >
          {data.map((item, index) => {
            return (
              <Word
                {...item}
                index={index}
                lines={lines}
                offsets={offsets}
                key={`item${item.id}`}
              />
            )
          })}
        </Block>
      </BlockAnimated>
    )
  },
)

const styles = StyleSheet.create({
  wordStyle: {
    marginBottom: 10,
    marginRight: 10,
  },
})
