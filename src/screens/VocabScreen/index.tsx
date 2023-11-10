import React, { useRef } from 'react'
import {
  Block,
  Container,
  Difficulty,
  LeaveProcessModal,
  Progress,
  ShadowButton,
  Text,
  VocabularyWord,
} from '@components'

import { Icon } from '@assets'
import { useTheme } from '@themes'
import { useTranslation } from 'react-i18next'
import { VocabularyFunc } from '@components/common/VocabularyWord/type'
import { FlipVocabularyProps } from '@components/common/VocabularyWord/components/type'
import { ModalFunction } from '@components/bases/Modal/type'
import { navigate, RootStackParamList } from '@navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { KnowledgeService, Word } from '@services'
import { LoadingScreen } from '@screens/LoadingScreen'

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
  const [wordData, setWordData] = React.useState<FlipVocabularyProps[]>([])
  const [data, setData] = React.useState<FlipVocabularyProps>(null)
  const [step, setStep] = React.useState(0)
  const vocabRef = React.useRef<VocabularyFunc>(null)
  const [currentPos, setCurrentPos] = React.useState(0)
  const [nextText, setNextText] = React.useState(t('continue_button'))
  const leaveModal = useRef<ModalFunction>(null)
  const onClosePress = () => {
    console.log('hey')
    leaveModal.current?.openModal()
  }
  const handleNextVocab = () => {
    if (currentPos + 1 > wordData.length - 1) {
      navigate('CONGRATULATION_SCREEN')
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
        difficulty: Difficulty.easy,
        isBookmarked: false,
      }
    })
  }
  const callApi = async () => {
    try {
      const response = await KnowledgeService.getWordByLessonId(lessonId)
      console.log(formatData(response.data.data.words))
      setWordData(formatData(response.data.data.words))
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    callApi()
  }, [])
  React.useEffect(() => {
    console.log(wordData.length)
    if (wordData.length > 0) {
      setData(wordData[0])
      console.log('hey')
    }
  }, [wordData])
  React.useEffect(() => {
    console.log('data', data)
  }, [data])
  React.useEffect(() => {
    if (currentPos === wordData.length - 1) {
      setNextText(t('finish'))
    } else {
      setNextText(t('continue_button'))
    }
    setData(wordData[currentPos])

    setStep(currentPos * (100 / (wordData.length - 1)))
  }, [currentPos])
  // @ts-ignore
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
          navigation.goBack()
        }}
        onPressCancel={() => {
          leaveModal.current?.dismissModal()
        }}
      />
    </Container>
  )
}
