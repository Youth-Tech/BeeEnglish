import React from 'react'
import {
  Block,
  Container,
  Image,
  MARGIN_TOP,
  Progress,
  ShadowButton,
  Text,
  WordList,
  WordListRefFunc,
} from '@components'
import { Icon, images } from '@assets'
import { useTheme } from '@themes'
import { goBack } from '@navigation'
import { useTranslation } from 'react-i18next'
import { widthScreen } from '@utils/helpers'
import { Portal } from 'react-native-portalize'
import Animated, {
  Easing,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
} from 'react-native-reanimated'

const Question = [
  {
    id: '12',
    question: 'Tôi làm việc ở đây 1',
    answer: 'I go to school by bike1',
  },
  {
    id: '13',
    question: 'Tôi làm việc ở đây 2',
    answer: 'I go to school by bike2',
  },
  {
    id: '14',
    question: 'Tôi làm việc ở đây 3',
    answer: 'I go to school by bike3',
  },
  {
    id: '15',
    question: 'Tôi làm việc ở đây 4',
    answer: 'I go to school by bike4',
  },
  {
    id: '16',
    question: 'Tôi làm việc ở đây 5',
    answer: 'I go to school by bike5',
  },
  {
    id: '17',
    question: 'Tôi làm việc ở đây 6',
    answer: 'I go to school by bike6',
  },
]

const BlockAnimated = Animated.createAnimatedComponent(Block)

export const GrammarScreen: React.FC = () => {
  const wordListRef = React.useRef<WordListRefFunc>(null)

  const { t } = useTranslation()
  const { colors, normalize } = useTheme()
  const [step, setStep] = React.useState(10)
  const [result, setResult] =
    React.useState<{ question: string; result: boolean }[]>()
  const [showModal, setShowModal] = React.useState(false)
  const [currentQuestion, setCurrentQuestion] = React.useState({
    index: 0,
    data: Question[0],
  })

  const onClosePress = () => {
    goBack()
  }

  const onCheckPress = () => {
    setShowModal(true)
    const _result =
      result?.map((item) => ({
        question: item.question,
        result: item.result,
      })) || []

    _result?.push({
      question: currentQuestion.data.id,
      result: !!wordListRef.current?.check(currentQuestion.data.answer),
    })

    setResult(_result)
  }

  React.useEffect(() => {
    console.log(result)
  }, [result])

  const nextQuestion = () => {
    //next question
    const nextQuestion =
      currentQuestion.index + 1 >= Question.length
        ? -1
        : currentQuestion.index + 1
    if (nextQuestion == -1) {
      console.log('complete quiz')
    } else {
      setCurrentQuestion({
        index: nextQuestion,
        data: Question[nextQuestion],
      })
    }
  }

  return (
    <Container>
      <Block flex paddingHorizontal={15} paddingTop={10}>
        <Block row alignCenter space="between">
          <Icon state="Cancel" onPress={onClosePress} />
          <Progress
            step={step}
            totalSteps={100}
            strokeHeight={16}
            stepColor={colors.orangePrimary}
            progressContainerStyles={{
              flex: 1,
              marginStart: 5,
            }}
          />
        </Block>

        <Text size={'h1'} fontFamily="bold" marginTop={40}>
          Viết lại câu bằng tiếng Anh
        </Text>

        <Block row justifyStart alignCenter marginTop={20}>
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
                widthScreen -
                normalize.h(15) -
                normalize.h(60) -
                normalize.h(20),
            }}
          >
            <Text
              paddingHorizontal={20}
              paddingVertical={14}
              size={'h4'}
              fontFamily="semiBold"
            >
              {currentQuestion.data.question}
            </Text>
          </Block>
        </Block>

        <Block flex marginTop={-MARGIN_TOP * 2.5} justifyCenter>
          <WordList ref={wordListRef} sentence={currentQuestion.data.answer} />
        </Block>

        <ShadowButton
          buttonHeight={40}
          buttonColor="#58CC02"
          shadowButtonColor="#58A700"
          buttonRadius={10}
          shadowHeight={6}
          onPress={onCheckPress}
          containerStyle={{
            marginBottom: normalize.v(20),
          }}
        >
          <Text size={'h3'} fontFamily="bold" color="white">
            {t('check')}
          </Text>
        </ShadowButton>
        {showModal && (
          <Portal>
            <BlockAnimated
              row
              height={100}
              paddingHorizontal={20}
              entering={SlideInDown}
              exiting={SlideOutDown}
              bottom={0}
              absolute
              left={0}
              right={0}
              alignCenter
              space={'between'}
              backgroundColor={'#D7FFB8'}
            >
              <Block
                row
                alignCenter
                justifyStart
                style={{
                  gap: normalize.h(10),
                }}
              >
                <Icon state="Check" />
                <Text size={'h4'} fontFamily="bold" color={colors.greenLighter}>
                  Đúng rồi nè!
                </Text>
              </Block>
              <ShadowButton
                buttonHeight={30}
                buttonWidth={100}
                buttonRadius={10}
                shadowButtonColor="#58A700"
                buttonColor="#58CC02"
                onPress={() => {
                  setShowModal(false)
                  nextQuestion()
                }}
              >
                <Text size="h3" fontFamily="bold" color="white">
                  {t('continue_button')}
                </Text>
              </ShadowButton>
            </BlockAnimated>
          </Portal>
        )}
      </Block>
    </Container>
  )
}
