import React from 'react'
import { useTranslation } from 'react-i18next'
import { Portal } from 'react-native-portalize'
import { SlideInDown, SlideOutDown } from 'react-native-reanimated'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import {
  Text,
  Block,
  Progress,
  Container,
  WordChoice,
  ShadowButton,
  BlockAnimated,
  GrammarOptions,
  VocabularyChoice,
  LeaveProcessModal,
  VocabularyOptions,
  QuestionRefFunction,
  VocabularyChoiceFunc,
  VocabularyOptionsFunc,
} from '@components'
import { Icon } from '@assets'
import { useTheme } from '@themes'
import { KnowledgeService } from '@services'
import { LoadingScreen } from '@screens/LoadingScreen'
import { useAppDispatch, useBackHandler } from '@hooks'
import { ModalFunction } from '@components/bases/Modal/type'
import { QuestionType } from '@screens/GrammarScreen/constants'
import {parseQuizDataToQuestion} from "@screens/GrammarScreen/utils";
import { setLoadingStatusAction, setUserState } from '@redux/reducers'
import { goBack, navigateAndReset, RootStackParamList } from '@navigation'

export type PreTestScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PRE_TEST_SCREEN'
>

export const PreTestScreen: React.FC<PreTestScreenProps> = () => {
  const leaveModalRef = React.useRef<ModalFunction>(null)
  const wordChoiceRef = React.useRef<WordListRefFunc>(null)
  const optionRef = React.useRef<QuestionRefFunction>(null)
  const vocabChoiceRef = React.useRef<VocabularyChoiceFunc>(null)
  const vocabOptionRef = React.useRef<VocabularyOptionsFunc>(null)

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { colors, normalize } = useTheme()

  const [step, setStep] = React.useState(0)
  const [result, setResult] = React.useState<ResultType[]>()
  const [questions, setQuestions] = React.useState<Question[]>([])
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
  const checkpointScore =
    result?.reduce((total, current) => {
      if (current.result === 'correct') {
        return total + 1
      }
      return total
    }, 0) ?? 0

  React.useEffect(() => {
    getPreTest()
  }, [])

  React.useEffect(() => {
    console.log(result)
  }, [result])

  useBackHandler({
    enabled: true,
    callback() {
      onClosePress()
    },
  })

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
    handleNextQuestion()
  }

  const checkResult = () => {
    if (currentQuestion.data === null) return

    let result: boolean = false

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

  const getPreTest = async () => {
    try {
      const res = await KnowledgeService.getPreTest()
      const parseRes = parseQuizDataToQuestion(res.data.data)
      setCurrentQuestion({
        index: 0,
        data: parseRes[0],
      })
      setQuestions(parseRes)
    } catch (error) {
      console.log(error)
    }
  }

  const handleNextQuestion = () => {
    //next question
    const nextQuestion =
      currentQuestion.index + 1 >= questions.length
        ? -1
        : currentQuestion.index + 1

    if (nextQuestion == -1) {
      console.log('complete quiz')
      sendPresTestResult()
      setStep(100)
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

  const sendPresTestResult = async () => {
    const finalPoint = (checkpointScore / questions.length) * 100
    console.log('checkpointScore', finalPoint)
    dispatch(setLoadingStatusAction(true))
    try {
      const res = await KnowledgeService.sendResultPreTest({
        score: finalPoint,
      })
      if (res.status === 200) {
        dispatch(setUserState(res.data.data))
        navigateAndReset(
          [
            {
              name: 'BOTTOM_TAB',
            },
          ],
          0,
        )
      }
    } catch (e) {
      console.log(e)
    }
    dispatch(setLoadingStatusAction(false))
  }

  const renderQuestion = (question: Question) => {
    if (currentQuestion.data === null) return <></>

    switch (question.type) {
      case QuestionType.cloze:
        return <WordChoice data={question} ref={wordChoiceRef} />
      case QuestionType.multipleWord:
        if (question.wordImage !== '') {
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

    return <></>
  }

  if (questions.length <= 0 && currentQuestion.data === null) {
    return <LoadingScreen />
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
          shadowHeight={6}
          buttonHeight={40}
          buttonRadius={10}
          buttonColor="#58CC02"
          onPress={onCheckPress}
          shadowButtonColor="#58A700"
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
              absolute
              left={0}
              right={0}
              bottom={0}
              alignCenter
              height={100}
              space={'between'}
              paddingHorizontal={20}
              entering={SlideInDown}
              exiting={SlideOutDown}
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
          goBack()
        }}
        onPressCancel={() => {
          leaveModalRef.current?.dismissModal()
        }}
      />
    </Container>
  )
}
