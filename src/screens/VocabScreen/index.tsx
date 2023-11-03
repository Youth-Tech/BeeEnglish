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
import { navigate } from '@navigation'

interface VocabScreenProps {}

const vocabularyData: FlipVocabularyProps[] = [
  {
    id: '1',
    english: 'Mother',
    vietnamese: 'Người mẹ',
    pronunciation: '/ˈmʌð.ər/',
    exampleEnglish: 'My mother is very beatiful',
    exampleVietnamese: 'Mẹ tôi rất xinh đẹp',
    attachment: {
      image: 'https://cdn-icons-png.flaticon.com/512/4478/4478097.png',
    },
    difficulty: Difficulty.easy,
    isBookmarked: false,
  },
  {
    id: '2',
    english: 'Grandfather',
    vietnamese: 'Người ông',
    pronunciation: '/ˈɡræn.fɑː.ðər/',
    exampleEnglish: 'My grandfather is very kind',
    exampleVietnamese: 'Ông của tôi rất tốt',
    attachment: {
      image:
        'https://images-ext-2.discordapp.net/external/xkVkmdmOzEPh8Pv9CY4GRdE3ZNgZhm98JJr32jMdl-o/https/png.pngtree.com/png-vector/20190115/ourlarge/pngtree-cartoon-old-man-crutches-grandfather-old-grandfather-cartoon-png-image_338331.jpg?width=468&height=468',
    },
    difficulty: Difficulty.easy,
    isBookmarked: false,
  },
  {
    id: '3',
    english: 'Grandmother',
    vietnamese: 'Người bà',
    pronunciation: '/ˈɡræn.mʌð.ər/',
    exampleEnglish: 'A cat lying on the ground',
    exampleVietnamese: 'Con mèo đang nằm trên sàn',
    attachment: {
      image:
        'https://images-ext-2.discordapp.net/external/06Y2tYMkBHJ49xDOacnygUQlz_2J01gKKJjQ50KoTaE/https/png.pngtree.com/png-vector/20190130/ourlarge/pngtree-cartoon-hand-drawn-grandmother-with-a-cane-paintedcomiccharactergrandmaold-mancrutchcaring-for-png-image_667922.jpg?width=468&height=468',
    },
    difficulty: Difficulty.easy,
    isBookmarked: false,
  },
  {
    id: '4',
    english: 'Cat',
    vietnamese: 'Con mèo',
    pronunciation: '/kat/',
    exampleEnglish: 'A cat lying on the ground',
    exampleVietnamese: 'Con mèo đang nằm trên sàn',
    attachment: {
      image:
        'https://g5-assets-cld-res.cloudinary.com/image/upload/x_44,y_0,h_1138,w_2017,c_crop/q_auto,f_auto,fl_lossy,c_fill,g_center,h_406,w_720/v1621535723/g5/g5-c-5lzenrews-olympus-property-management/g5-cl-1k8w0sqbn3-olympus-northpoint/services/OlympusNorthpoint_May2021_2_s8tomu.jpg',
    },
    difficulty: Difficulty.easy,
    isBookmarked: false,
  },
]
export const VocabScreen: React.FC<VocabScreenProps> = (props) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const [data, setData] = React.useState({})
  const [step, setStep] = React.useState(0)
  const vocabRef = React.useRef<VocabularyFunc>(null)
  const [currentPos, setCurrentPos] = React.useState(0)
  const [nextText, setNextText] = React.useState(t('continue_button'))
  const oneStep = 100 / (vocabularyData.length - 1)
  const leaveModal = useRef<ModalFunction>(null)
  const onClosePress = () => {
    console.log('hey')
    leaveModal.current?.openModal()
  }
  const handleNextVocab = () => {
    if (currentPos + 1 > vocabularyData.length - 1) {
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
  React.useEffect(() => {
    setData(vocabularyData[1])
  }, [])
  React.useEffect(() => {
    if (currentPos === vocabularyData.length - 1) {
      setNextText(t('finish'))
    } else {
      setNextText(t('continue_button'))
    }
    setData(vocabularyData[currentPos])

    setStep(currentPos * oneStep)
  }, [currentPos])
  // @ts-ignore
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
      <VocabularyWord ref={vocabRef} data={data} setData={setData} />
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
        }}
        onPressCancel={() => {
          leaveModal.current?.dismissModal()
        }}
      />
    </Container>
  )
}
