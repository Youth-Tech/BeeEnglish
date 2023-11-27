import React, { useRef } from 'react'

import {
  Text,
  Block,
  Progress,
  Container,
  Difficulty,
  ShadowButton,
  VocabularyWord,
  LeaveProcessModal,
} from '@components'
import { Icon } from '@assets'
import { useTheme } from '@themes'
import { useAppSelector } from '@hooks'
import { useTranslation } from 'react-i18next'
import { LoadingScreen } from '@screens/LoadingScreen'
import { navigate, RootStackParamList } from '@navigation'
import { ModalFunction } from '@components/bases/Modal/type'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { VocabularyFunc } from '@components/common/VocabularyWord/type'
import { KnowledgeService, ReviewService, UserService, Word } from '@services'
import { FlipVocabularyProps } from '@components/common/VocabularyWord/components/type'
import { TaskService } from '@services/TaskService'

type VocabScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'VOCAB_SCREEN'
>
const initialVocabulary: FlipVocabularyProps = {
  _id: '',
  english: '',
  pronunciation: '',

  attachments: [
    {
      id: '',
      src: '',
      type: '',
    },
  ],

  senses: [
    {
      _id: '',
      type: '',
      vietnamese: 'ví dụ như',
      exampleEnglish: '',
      exampleVietnamese: '',
      synonyms: [],
      antonyms: [],
    },
  ],
}

export const VocabScreen: React.FC<VocabScreenProps> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation()
  const { lessonId } = route.params
  const { colors } = useTheme()
  const bookmarkWords = useAppSelector(
    (state) => state.root.bookmarkReducer.bookmarkWords,
  )
  const reviewWords = useAppSelector(
    (state) => state.root.wordReviewReducer.reviewWords,
  )
  const leaveModal = useRef<ModalFunction>(null)
  const [step, setStep] = React.useState(0)
  const vocabRef = React.useRef<VocabularyFunc>(null)
  const [currentPos, setCurrentPos] = React.useState(0)
  const [nextText, setNextText] = React.useState(t('continue_button'))
  const [data, setData] = React.useState<FlipVocabularyProps>(null)
  const [wordData, setWordData] = React.useState<FlipVocabularyProps[]>([])
  const onClosePress = () => {
    leaveModal.current?.openModal()
  }
  const isIdInBookmarkArray = (id: string) => {
    const idSet = new Set(bookmarkWords.map((o) => o._id))
    return idSet.has(id)
  }
  const filterDifficulty = (id: string) => {
    console.log(id)
    const filteredWord = reviewWords.find((word) => word.word._id === id)
    console.log(filteredWord)
    if (filteredWord) {
      console.log('heyyyyyy')
      switch (filteredWord.difficulty) {
        case 'easy':
          return Difficulty.easy
        case 'medium':
          return Difficulty.medium
        case 'hard':
          return Difficulty.hard
        default:
          return Difficulty.easy
      }
    } else {
      return Difficulty.easy
    }
  }
  const callAPIBookmark = async (wordId: string) => {
    try {
      const response = await UserService.bookmarkWord(wordId)
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  const callAPIWordReview = async (wordId: string, difficulty: string) => {
    try {
      const response = await ReviewService.toggleWordReview({
        word: wordId,
        difficulty: difficulty,
      })
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const callMultipleWordReview = async () => {
    const promises = wordData.map((item) => {
      return callAPIWordReview(item._id, item.difficulty!)
    })
    try {
      const results = await Promise.all(promises)
      console.log('Results' + results)
    } catch (e) {
      console.log(e)
    }
  }

  const handleCallApi = () => {
    wordData.forEach((e) => {
      if (e.isBookmarked === true) {
        if (isIdInBookmarkArray(e._id)) {
          return
        } else {
          callAPIBookmark(e._id)
        }
      } else {
        if (isIdInBookmarkArray(e._id)) {
          callAPIBookmark(e._id)
        }
      }
    })
  }
  const handleNextVocab = () => {
    if (currentPos + 1 > wordData.length - 1) {
      navigate('CONGRATULATION_SCREEN', {
        status: 'success',
        point: 0,
        type: 'normal',
      })
      handleCallApi()
      callMultipleWordReview()
      stopCountingTime()
      return
    }
    setCurrentPos((prev) => prev + 1)
    vocabRef.current?.onRightTriggerAnimation()
  }
  const handleBackVocab = () => {
    if (currentPos - 1 < 0) {
      return
    }
    setCurrentPos((prev) => prev - 1)
    vocabRef.current?.onLeftTriggerAnimation()
  }
  const formatData = (data: Word[]): FlipVocabularyProps[] => {
    return data.map((item) => {
      return {
        _id: item._id,
        english: item.english,
        pronunciation: item.pronunciation,
        attachments: item.attachments,
        senses: item.senses,
        difficulty: filterDifficulty(item._id),
        isBookmarked: isIdInBookmarkArray(item._id) ? true : false,
      }
    })
  }

  const callApi = async () => {
    try {
      const response = await KnowledgeService.getWordByLessonId(lessonId)
      setWordData(formatData(response.data.data.words))
    } catch (e) {
      console.log(e)
    }
  }
  const startCountingTime = async () => {
    try {
      const response = await TaskService.startTime()
      console.log(response.data.message)
    } catch (e) {
      console.log(e)
    }
  }
  const stopCountingTime = async () => {
    try {
      const response = await TaskService.stopTime()
      console.log(response.data.message)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    callApi()
    startCountingTime()
  }, [])
  React.useEffect(() => {
    console.log(wordData.length)
    if (wordData.length > 0) {
      setData(wordData[0])
    }
  }, [wordData])
  React.useEffect(() => {
    if (currentPos === wordData.length - 1) {
      setNextText(t('finish'))
    } else {
      setNextText(t('continue_button'))
    }
    setData(wordData[currentPos])

    setStep(currentPos * (100 / (wordData.length - 1)))
  }, [currentPos])
  if (wordData.length == 0) {
    return <LoadingScreen />
  }
  return (
    <Container>
      <Block paddingHorizontal={15} paddingTop={10}>
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
      </Block>
      <VocabularyWord
        ref={vocabRef}
        data={data ?? initialVocabulary}
        setData={setData}
      />
      <Block flex />
      <Block
        row
        marginBottom={30}
        paddingHorizontal={20}
        justifyCenter
        space={'between'}
      >
        <ShadowButton
          buttonWidth={150}
          buttonHeight={40}
          buttonRadius={10}
          shadowHeight={8}
          buttonBorderSize={1}
          buttonColor={colors.white}
          buttonBorderColor={colors.greyLight}
          shadowButtonColor={colors.greyLight}
          onPress={handleBackVocab}
        >
          <Text size={'h2'} fontFamily={'semiBold'}>
            {t('previous')}
          </Text>
        </ShadowButton>
        <ShadowButton
          buttonWidth={150}
          buttonHeight={40}
          buttonRadius={10}
          shadowHeight={8}
          buttonColor={colors.orangeLight}
          buttonBorderColor={colors.orangePrimary}
          shadowButtonColor={colors.orangePrimary}
          onPress={handleNextVocab}
        >
          <Text size={'h2'} fontFamily={'semiBold'}>
            {nextText}
          </Text>
        </ShadowButton>
      </Block>
      <LeaveProcessModal
        ref={leaveModal}
        onPressApprove={() => {
          //TODO: navigate to the screen
          stopCountingTime()
          navigation.goBack()
        }}
        onPressCancel={() => {
          leaveModal.current?.dismissModal()
        }}
      />
    </Container>
  )
}
