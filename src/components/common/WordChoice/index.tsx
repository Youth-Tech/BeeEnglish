import React from 'react'
import { FadeInRight, FadeOutLeft } from 'react-native-reanimated'

import { images } from '@assets'
import { useTheme } from '@themes'
import { WordList } from '../WordList'
import { widthScreen } from '@utils/helpers'
import { Block, BlockAnimated, Image, Text } from '@components/bases'

export interface WordChoiceProps {
  data: Question
}

export const WordChoice = React.forwardRef<WordListRefFunc, WordChoiceProps>(
  ({ data }, ref) => {
    const { colors, normalize } = useTheme()
    const [visible, setVisible] = React.useState(true)
    const wordListRef = React.useRef<WordListRefFunc>(null)

    React.useImperativeHandle(ref, () => ({
      check(value) {
        return !!wordListRef.current?.check(value)
      },
      onTriggerAnimation() {
        setVisible(false)
        setVisible(true)
      },
    }))

    return (
      <>
        {visible && (
          <BlockAnimated
            flex
            exiting={FadeOutLeft.duration(500)}
            entering={FadeInRight.duration(500)}
          >
            <Text size={'h1'} fontFamily="bold" marginTop={40}>
              Viết lại câu bằng tiếng Anh
            </Text>

            <Block row justifyStart alignCenter marginTop={30}>
              <Image
                width={60}
                height={60}
                resizeMode="contain"
                source={images.BeeTeacher}
              />
              <Block
                radius={10}
                alignCenter
                justifyCenter
                borderWidth={1}
                marginLeft={16}
                borderColor={colors.greyLight}
                style={{
                  maxWidth:
                    widthScreen -
                    normalize.h(15) -
                    normalize.h(60) -
                    normalize.h(20),
                }}
              >
                <Text
                  size={'h4'}
                  paddingVertical={14}
                  fontFamily="semiBold"
                  paddingHorizontal={20}
                >
                  {data.question}
                </Text>
              </Block>
            </Block>

            <Block flex justifyCenter marginTop={10}>
              <WordList
                key={data.id}
                ref={wordListRef}
                answers={data.answer as string[]}
              />
            </Block>
          </BlockAnimated>
        )}
      </>
    )
  },
)
