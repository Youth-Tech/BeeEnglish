import React from 'react'
import { Block, ShadowBlock, Text } from '@components/bases'
import { Lines, Word, WordProps } from './components'
import { View, StyleSheet } from 'react-native'
import {
  SharedValue,
  runOnJS,
  runOnUI,
  useSharedValue,
} from 'react-native-reanimated'
import { shuffle, widthScreen } from '@utils/helpers'
import { normalize } from '@themes'

export type SharedValues<T extends Record<string, string | number | boolean>> =
  {
    [K in keyof T]: SharedValue<T[K]>
  }

export type Offset = SharedValues<{
  order: number
  width: number
  height: number
  x: number
  y: number
  originalX: number
  originalY: number
}> & {
  value: WordProps
}

export const WORD_HEIGHT = 50
export const MARGIN_TOP = 40
export const CONTAINER_WIDTH = widthScreen - normalize.h(10) * 2

const sentenceToList = (sentence: string): WordProps[] => {
  return shuffle(
    sentence
      .trim()
      .split(' ')
      .map((item, index) => {
        return {
          id: index.toString(),
          word: item,
          index,
        }
      }),
  )
}

export interface WordListProps {
  sentence: string
}

export interface WordListRefFunc {
  check: (value: string) => boolean
}

export const WordList = React.forwardRef<WordListRefFunc, WordListProps>(
  ({ sentence }, ref) => {
    const [data, setData] = React.useState<WordProps[]>(
      sentenceToList(sentence),
    )
    const [ready, setReady] = React.useState(false)
    const [lines, setLines] = React.useState(0)

    //pre calculate data dimension
    let offsets: Offset[] = data.map((item) => {
      return {
        value: item,
        order: useSharedValue(0),
        width: useSharedValue(0),
        height: useSharedValue(0),
        x: useSharedValue(0),
        y: useSharedValue(0),
        originalX: useSharedValue(0),
        originalY: useSharedValue(0),
      }
    })

    React.useEffect(() => {
      setData(sentenceToList(sentence))
      setReady(false)
    }, [sentence])

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
    }))

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
                  offset.height.value = height
                  offset.width.value = width
                  offset.originalX.value = x
                  offset.originalY.value = y

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
                  height={WORD_HEIGHT}
                  alignCenter
                  justifyCenter
                >
                  <Text
                    style={{
                      paddingHorizontal: 15,
                    }}
                    fontFamily="bold"
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
      <Block>
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
      </Block>
    )
  },
)
const styles = StyleSheet.create({
  wordStyle: {
    marginBottom: 10,
    marginRight: 10,
  },
})
