import React from 'react'
import { FadeInRight, FadeOutLeft } from 'react-native-reanimated'

import { images } from '@assets'
import { useTheme } from '@themes'
import { WordList } from '../WordList'
import { widthScreen } from '@utils/helpers'
import { Block, BlockAnimated, Image, Text } from '@components/bases'

export interface WordChoiceProps {
  wordListRef?: React.Ref<WordListRefFunc> | undefined
  data: Question
}

export const WordChoice: React.FC<WordChoiceProps> = ({
  data,
  wordListRef,
}) => {
  const { colors, normalize } = useTheme()
  return (
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
          source={images.BeeTeacher}
          width={60}
          height={60}
          resizeMode="contain"
        />
        <Block
          borderWidth={1}
          borderColor={colors.greyLight}
          radius={10}
          alignCenter
          justifyCenter
          marginLeft={16}
          // flex
          style={{
            maxWidth:
              widthScreen - normalize.h(15) - normalize.h(60) - normalize.h(20),
          }}
        >
          <Text
            paddingHorizontal={20}
            paddingVertical={14}
            size={'h4'}
            fontFamily="semiBold"
          >
            {data.question}
          </Text>
        </Block>
      </Block>

      <Block flex justifyCenter marginTop={10}>
        <WordList ref={wordListRef} answers={data.answer as string[]} />
      </Block>
    </BlockAnimated>
  )
}
