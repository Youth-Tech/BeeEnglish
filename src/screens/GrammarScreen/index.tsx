import React from 'react'
import { useTranslation } from 'react-i18next'
import { Portal } from 'react-native-portalize'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'

import {
  Text,
  Block,
  Progress,
  Container,
  ShadowButton,
  WordListRefFunc,
  GrammarOptions,
  WordChoice,
  QuestionRefFunction,
  VocabularyChoiceFunc,
  VocabularyChoice,
} from '@components'
import { Icon } from '@assets'
import { useTheme } from '@themes'
import { goBack } from '@navigation'

export interface Question {
  id: string
  question: string
  answer: string | Answer[]
  type: QuestionType
}

export enum QuestionType {
  OPTION = 'OPTION',
  WORD_CHOICE = 'WORD_CHOICE',
  VOCAB_CHOICE = 'VOCAB_CHOICE',
}

export interface Answer {
  option: string
  isValid: boolean
}

const QUESTION: Question[] = [
  {
    id: '1',
    question: 'Tôi làm việc ở đây 1',
    answer: 'I go to school by bike1',
    type: QuestionType.WORD_CHOICE,
  },
  {
    id: '4',
    question: 'I drink coffee_______.',
    answer: [
      {
        isValid: false,
        option: 'three times for a days',
      },
      {
        isValid: false,
        option: 'three time for a day',
      },
      {
        isValid: true,
        option: 'three times for a day',
      },
      {
        isValid: false,
        option: 'three time for a days',
      },
    ],
    type: QuestionType.OPTION,
  },
  {
    id: '4',
    question: 'I drink soda_______.',
    answer: [
      {
        isValid: false,
        option: 'three times for a days',
      },
      {
        isValid: false,
        option: 'three time for a day',
      },
      {
        isValid: true,
        option: 'three times for a day',
      },
      {
        isValid: false,
        option: 'three time for a days',
      },
    ],
    type: QuestionType.OPTION,
  },
  {
    id: '2',
    question: 'Tôi làm việc ở đây 2',
    answer: 'I go to school by bike2',
    type: QuestionType.WORD_CHOICE,
  },
  {
    id: '3',
    question: 'Tôi làm việc ở đây 3',
    answer: 'I go to school by bike3',
    type: QuestionType.WORD_CHOICE,
  },
  {
    id: '5',
    question: 'Dog',
    answer: [
      {
        option: 'https://cdn-icons-png.flaticon.com/512/2002/2002611.png',
        isValid: false,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/1993/1993713.png',
        isValid: false,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/1998/1998627.png',
        isValid: true,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/437/437562.png',
        isValid: false,
      },
    ],
    type: QuestionType.VOCAB_CHOICE,
  },

  {
    id: '6',
    question: 'Cat',
    answer: [
      {
        option: 'https://cdn-icons-png.flaticon.com/512/2002/2002611.png',
        isValid: false,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/1993/1993713.png',
        isValid: false,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/1998/1998627.png',
        isValid: false,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/437/437562.png',
        isValid: true,
      },
    ],
    type: QuestionType.VOCAB_CHOICE,
  },
  {
    id: '7',
    question: 'Chicken',
    answer: [
      {
        option: 'https://cdn-icons-png.flaticon.com/512/2002/2002611.png',
        isValid: true,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/1993/1993713.png',
        isValid: false,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/1998/1998627.png',
        isValid: false,
      },
      {
        option: 'https://cdn-icons-png.flaticon.com/512/437/437562.png',
        isValid: false,
      },
    ],
    type: QuestionType.VOCAB_CHOICE,
  },
]

export interface ResultType {
  questionId: string
  result: 'correct' | 'incorrect'
}

export interface ModalStatus {
  show: boolean
  status: 'correct' | 'incorrect' | 'no_status'
}

const BlockAnimated = Animated.createAnimatedComponent(Block)

export const GrammarScreen: React.FC = () => {
  const wordChoiceRef = React.useRef<WordListRefFunc>(null)
  const optionRef = React.useRef<QuestionRefFunction>(null)
  const vocabChoiceRef = React.useRef<VocabularyChoiceFunc>(null)
  const { t } = useTranslation()
  const { colors, normalize } = useTheme()

  const [step, setStep] = React.useState(0)
  const [questions] = React.useState(QUESTION)
  const [result, setResult] = React.useState<ResultType[]>()

  const [modalStatus, setModalStatus] = React.useState<ModalStatus>({
    show: false,
    status: 'no_status',
  })
  const [currentQuestion, setCurrentQuestion] = React.useState({
    index: 0,
    data: questions[0],
  })

  const onClosePress = () => {
    goBack()
  }

  const onCheckPress = () => {
    checkResult()

    setModalStatus((prev) => ({
      ...prev,
      show: true,
    }))
  }

  const onContinuePress = () => {
    setModalStatus((prev) => ({
      ...prev,
      show: false,
    }))
    nextQuestion()
  }

  React.useEffect(() => {
    console.log(result)
  }, [result])

  const checkResult = () => {
    let result: boolean = !!null
    if (currentQuestion.data.type === QuestionType.OPTION) {
      result = !!optionRef.current?.check()
    } else if (currentQuestion.data.type === QuestionType.VOCAB_CHOICE) {
      result = !!vocabChoiceRef.current?.check()
    } else {
      result = !!wordChoiceRef.current?.check(
        currentQuestion.data.answer as string,
      )
    }
    setModalStatus((prev) => ({
      ...prev,
      status: result ? 'correct' : 'incorrect',
    }))

    setStep((_) => ((currentQuestion.index + 1) * 100) / questions.length)

    setResult((prev) => {
      const prevState = prev || []

      return [
        ...prevState,
        {
          questionId: currentQuestion.data.id,
          result: result ? 'correct' : 'incorrect',
        },
      ]
    })
  }

  React.useEffect(() => {
    console.log(result)
  }, [result])

  const nextQuestion = () => {
    //next question
    const nextQuestion =
      currentQuestion.index + 1 >= questions.length
        ? -1
        : currentQuestion.index + 1

    if (nextQuestion == -1) {
      console.log('complete quiz')
      setStep(100)

      //TODO: go to complete screen
    } else {
      if (questions[nextQuestion].type === QuestionType.OPTION) {
        optionRef.current?.triggerChangeLayout()
      } else if (questions[nextQuestion].type === QuestionType.VOCAB_CHOICE) {
        vocabChoiceRef.current?.onTriggerAnimation()
      }
      setCurrentQuestion((_) => {
        return {
          index: nextQuestion,
          data: questions[nextQuestion],
        }
      })
    }
  }
  const renderQuestion = (type: QuestionType) => {
    switch (type) {
      case 'WORD_CHOICE':
        return (
          <WordChoice wordListRef={wordChoiceRef} data={currentQuestion.data} />
        )
      case 'OPTION':
        return <GrammarOptions ref={optionRef} data={currentQuestion.data} />
      case 'VOCAB_CHOICE':
        return (
          <VocabularyChoice ref={vocabChoiceRef} data={currentQuestion.data} />
        )
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

        {renderQuestion(currentQuestion.data.type)}

        <Block flex />

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
        {modalStatus.show && (
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
              backgroundColor={
                modalStatus.status === 'correct' ? '#D7FFB8' : '#FFDFE0'
              }
            >
              <Block
                row
                alignCenter
                justifyStart
                style={{
                  gap: normalize.h(10),
                }}
              >
                <Icon
                  state={
                    modalStatus.status === 'correct' ? 'Check' : 'IncorrectIcon'
                  }
                />
                <Text
                  size={'h4'}
                  fontFamily="bold"
                  color={
                    modalStatus.status === 'correct'
                      ? colors.greenLighter
                      : colors.redButton
                  }
                >
                  {modalStatus.status === 'correct'
                    ? t('correct')
                    : t('incorrect')}
                </Text>
              </Block>
              <ShadowButton
                buttonHeight={30}
                buttonWidth={100}
                buttonRadius={10}
                shadowButtonColor={
                  modalStatus.status === 'correct' ? '#58A700' : colors.redThick
                }
                buttonColor={
                  modalStatus.status === 'correct' ? '#58CC02' : colors.red
                }
                onPress={onContinuePress}
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
