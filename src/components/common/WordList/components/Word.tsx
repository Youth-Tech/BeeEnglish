import React from 'react'
import { Block, ShadowBlock, Text } from '@components/bases'
import { Pressable } from 'react-native'
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated'
import { Offset } from '..'
import {
  CONTAINER_WIDTH,
  WORD_HEIGHT,
  MARGIN_TOP,
} from '@components/common/WordList'
import { wordAnimationConfig } from '@assets'
import Placeholder from './Placeholder'

export interface WordProps {
  id: string
  word: string
  index?: number
  lines?: number
  offsets?: Offset[]
}

const BlockAnimated = Animated.createAnimatedComponent(Block)
const byOrder = (a: Offset, b: Offset) => {
  'worklet'
  return a.order.value > b.order.value ? 1 : -1
}

export const Word: React.FC<WordProps> = ({
  word,
  index = 0,
  offsets,
  lines,
}) => {
  const offset = offsets![index]

  const translate = useDerivedValue(() => {
    return offset.order.value === -1
      ? {
          x: offset.originalX.value,
          y: offset.originalY.value,
        }
      : {
          x: offset.x.value,
          y: offset.y.value,
        }
  })

  const blockStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(translate.value.x, wordAnimationConfig),
        },
        {
          translateY: withSpring(translate.value.y, wordAnimationConfig),
        },
      ],
      marginTop: offset.order.value !== -1 && lines! >= 2 ? 6 : 0,
    }
  })

  const handleWordTranslation = () => {
    runOnUI(() => {
      'worklet'
      if (offset.order.value === -1) {
        offset.order.value =
          offsets?.filter((item) => item.order.value !== -1).length || 0

        const listInBank =
          offsets?.filter((item) => item.order.value !== -1).sort(byOrder) || []

        let lineNumber = lines!
        let lineBreak = 0

        listInBank?.forEach((offset, index) => {
          const total = listInBank
            .slice(lineBreak, index)
            .reduce(
              (acc, o) => acc + o.width.value + 10 /**<--marginRight */,
              0,
            )
          if (total + offset.width.value > CONTAINER_WIDTH) {
            lineNumber -= 1
            lineBreak = index

            offset.x.value = 0
          } else {
            offset.x.value = offset.order.value != 0 ? total : 0
          }
        })
        offset.y.value = -((WORD_HEIGHT + 3) * lineNumber + WORD_HEIGHT - 3)
      } else {
        offset.order.value = -1

        //calculate layout
        const listInBank =
          offsets?.filter((item) => item.order.value !== -1).sort(byOrder) || []

        listInBank.map((offset, index) => (offset.order.value = index))

        let lineNumber = lines!
        let lineBreak = 0

        listInBank?.forEach((offset, index) => {
          const total = listInBank
            .slice(lineBreak, index)
            .reduce(
              (acc, o) => acc + o.width.value + 10 /**<--marginRight */,
              0,
            )
          if (total + offset.width.value > CONTAINER_WIDTH) {
            lineNumber -= 1
            lineBreak = index

            offset.x.value = 0
          } else {
            offset.x.value = offset.order.value != 0 ? total : 0
          }

          offset.y.value = -((WORD_HEIGHT + 3) * lineNumber + WORD_HEIGHT - 3)
        })
      }
    })()
  }

  return (
    <>
      <Placeholder {...offset} />
      <Pressable onPress={handleWordTranslation}>
        <BlockAnimated style={[blockStyle]} absolute>
          <ShadowBlock
            radius={15}
            height={WORD_HEIGHT - 10}
            alignCenter
            justifyCenter
            shadowHeight={3}
          >
            <Text
              color="purpleDark"
              fontFamily="bold"
              style={{
                paddingHorizontal: 15,
              }}
            >
              {word}
            </Text>
          </ShadowBlock>
        </BlockAnimated>
      </Pressable>
    </>
  )
}
