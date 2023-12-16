import React from 'react'
import { useTranslation } from 'react-i18next'
import { FadeInRight, FadeOutLeft } from 'react-native-reanimated'

import { images } from '@assets'
import { useTheme } from '@themes'
import { WordList } from '../WordList'
import { GrammarView } from '@components/common'
import { Block, BlockAnimated, Image, Text } from '@components/bases'

export interface WordChoiceProps {
  data: Question
}

export const WordChoice = React.forwardRef<WordListRefFunc, WordChoiceProps>(
  ({ data }, ref) => {
    const { t } = useTranslation()
    const { colors } = useTheme()
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
      <Block flex>
        {visible && (
          <BlockAnimated
            flex
            exiting={FadeOutLeft.duration(500)}
            entering={FadeInRight.duration(500)}
          >
            <Text size={'h1'} fontFamily="bold" marginTop={40}>
              {t('remake_sentence')}
            </Text>

            <Block row justifyStart alignCenter marginTop={30}>
              <Image
                width={60}
                height={60}
                resizeMode="contain"
                source={images.BeeTeacher}
              />

              <Block flex row>
                <Block
                  radius={10}
                  justifyCenter
                  borderWidth={1}
                  marginLeft={16}
                  borderColor={colors.greyLight}
                >
                  <Text
                    size={'h4'}
                    paddingVertical={14}
                    fontFamily="semiBold"
                    paddingHorizontal={15}
                  >
                    {data.question}
                  </Text>
                </Block>
              </Block>
            </Block>
            <GrammarView data={data.grammar} />

            <WordList
              key={data.id}
              ref={wordListRef}
              answers={data.answer as string[]}
            />
          </BlockAnimated>
        )}
      </Block>
    )
  },
)
