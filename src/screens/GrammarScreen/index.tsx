import React from 'react'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Portal } from 'react-native-portalize'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SlideInDown, SlideOutDown } from 'react-native-reanimated'

import {
  Text,
  Block,
  Progress,
  Container,
  ShadowButton,
  GrammarOptions,
  WordChoice,
  QuestionRefFunction,
  VocabularyChoiceFunc,
  VocabularyChoice,
  VocabularyOptionsFunc,
  VocabularyOptions,
  BlockAnimated,
  LeaveProcessModal,
} from '@components'
import { Icon, animation } from '@assets'
import { normalize, useTheme } from '@themes'
import { RootStackParamList, goBack, navigateAndReset } from '@navigation'
import { KnowledgeService, Quiz } from '@services'
import { QuestionType } from './constants'
import LottieView from 'lottie-react-native'
import { ModalFunction } from '@components/bases/Modal/type'

export type GrammarScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'GRAMMAR_SCREEN'
>

const parseQuizDataToQuestion = (quizzes: Quiz[]): Question[] => {
  return quizzes.map((item) => {
    return {
      question: item.question,
      answer: item.answer,
      id: item._id,
      correctAnswer: item.correctAnswer,
      wordImage: item.attachment?.src,
      type: QuestionType[item.type],
    }
  })
}

export const GrammarScreen: React.FC<GrammarScreenProps> = ({
  route,
  navigation,
}) => {
  const { lessonId } = route.params

  const wordChoiceRef = React.useRef<WordListRefFunc>(null)
  const optionRef = React.useRef<QuestionRefFunction>(null)
  const vocabChoiceRef = React.useRef<VocabularyChoiceFunc>(null)
  const vocabOptionRef = React.useRef<VocabularyOptionsFunc>(null)
  const leaveModalRef = React.useRef<ModalFunction>(null)
  const { t } = useTranslation()
  const { colors, normalize } = useTheme()

  const [step, setStep] = React.useState(0)
  const [questions, setQuestions] = React.useState<Question[]>([])
  const [result, setResult] = React.useState<ResultType[]>()

  const [modalStatus, setModalStatus] = React.useState<ModalStatus>({
    show: false,
    status: 'no_status',
  })
  const [currentQuestion, setCurrentQuestion] = React.useState<CurrentQuestion>(
    {
      index: 0,
      data: null,
    },
  )

  const callAPi = async () => {
    try {
      const res = await KnowledgeService.getQuizByLessonId(lessonId)
      const parseRes = parseQuizDataToQuestion(res.data.data.quizzes)
      setCurrentQuestion({
        index: 0,
        data: parseRes[0],
      })
      setQuestions(parseRes)
      console.log(parseRes)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    callAPi()
  }, [])

  React.useEffect(() => {
    console.log(result)
  }, [result])

  const onClosePress = () => {
    leaveModalRef.current?.openModal()
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

  const checkResult = () => {
    if (currentQuestion.data === null) return

    let result: boolean = !!null

    if (currentQuestion.data.type === QuestionType.multipleWord) {
      if (currentQuestion.data.wordImage) {
        result = !!vocabOptionRef.current?.check()
      } else {
        result = !!optionRef.current?.check()
      }
    } else if (currentQuestion.data.type === QuestionType.multipleImage) {
      result = !!vocabChoiceRef.current?.check()
    } else {
      result = !!wordChoiceRef.current?.check(
        currentQuestion.data.correctAnswer!,
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
          questionId: currentQuestion.data!.id,
          result: result ? 'correct' : 'incorrect',
        },
      ]
    })
  }

  const nextQuestion = () => {
    //next question
    const nextQuestion =
      currentQuestion.index + 1 >= questions.length
        ? -1
        : currentQuestion.index + 1

    if (nextQuestion == -1) {
      console.log('complete quiz')
      setStep(100)
      navigation.navigate('CONGRATULATION_SCREEN')
    } else {
      if (questions[nextQuestion].type === QuestionType.multipleWord) {
        optionRef.current?.triggerChangeLayout()
      } else if (questions[nextQuestion].type === QuestionType.multipleImage) {
        vocabChoiceRef.current?.onTriggerAnimation()
      } else if (
        questions[nextQuestion].type === QuestionType.multipleImage &&
        questions[nextQuestion].wordImage
      ) {
        vocabOptionRef.current?.onTriggerAnimation()
      } else if (questions[nextQuestion].type === QuestionType.cloze) {
        wordChoiceRef.current?.onTriggerAnimation()
      }

      setCurrentQuestion(() => {
        return {
          index: nextQuestion,
          data: questions[nextQuestion],
        }
      })
    }
  }

  const renderQuestion = (question: Question) => {
    if (currentQuestion.data === null) return <></>

    switch (question.type) {
      case QuestionType.cloze:
        return (
          <WordChoice wordListRef={wordChoiceRef} data={currentQuestion.data} />
        )
      case QuestionType.multipleWord:
        if (question.attachment?.src) {
          return (
            <VocabularyOptions
              ref={vocabOptionRef}
              data={currentQuestion.data}
            />
          )
        }
        return <GrammarOptions ref={optionRef} data={currentQuestion.data} />
      case QuestionType.multipleImage:
        return (
          <VocabularyChoice ref={vocabChoiceRef} data={currentQuestion.data} />
        )
    }
  }

  if (questions.length <= 0 && currentQuestion.data === null) {
    return (
      <Container>
        <Block flex alignCenter justifyCenter>
          <LottieView
            autoPlay
            source={animation.beeFlying}
            style={styles.loadingAnimation}
          />
        </Block>
      </Container>
    )
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

        {renderQuestion(currentQuestion.data!)}

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
      <LeaveProcessModal
        ref={leaveModalRef}
        onPressApprove={() => {
          leaveModalRef.current?.dismissModal()
          navigateAndReset([{ name: 'BOTTOM_TAB' }], 0)
        }}
        onPressCancel={() => {
          leaveModalRef.current?.dismissModal()
        }}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  loadingAnimation: {
    height: normalize.v(500),
    aspectRatio: 1,
  },
})
