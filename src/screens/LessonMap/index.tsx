import {
  StyleSheet,
  SectionList,
  RefreshControl,
  SectionListData,
  SectionListRenderItem,
} from 'react-native'
import React from 'react'
import { StackActions } from '@react-navigation/native'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import {
  ItemLesson,
  ChooseCourse,
  SectionHeader,
  ItemLessonProps,
} from './components'
import { normalize } from '@themes'
import { useAppSelector } from '@hooks'
import { LoadingScreen } from '@screens'
import { parseDataToSectionData } from './utils'
import { KnowledgeService, Quiz } from '@services'
import { navigate, RootStackParamList } from '@navigation'
import { Block, BlockAnimated, Container, GuestModal } from '@components'
import { getCurrentCourse, getIsPreTest, getUserRole } from '@redux/selectors'
import Toast from 'react-native-toast-message'
import { useTranslation } from 'react-i18next'
import { ModalFunction } from '@components/bases/Modal/type'

export type SectionData = {
  lessonComplete: number
  data: ItemLessonProps[]
  title: string
  status: 'lock' | 'unlock'
  index: number
  chapterId: string
  checkpoint?: Quiz[]
}

export type LessonMapScreen = NativeStackScreenProps<
  RootStackParamList,
  'LEARNING_SCREEN'
>

export const LessonMap: React.FC<LessonMapScreen> = ({ navigation }) => {
  const { t } = useTranslation()

  const userRole = useAppSelector(getUserRole)
  const isPreTest = useAppSelector(getIsPreTest)
  const currentCourse = useAppSelector(getCurrentCourse)

  const guestModalRef = React.useRef<ModalFunction>(null)

  const [data, setData] = React.useState<SectionData[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    if (!isPreTest) {
      // console.log('to pre test')
      navigation.dispatch(StackActions.replace('EXAM_TEST_SCREEN'))
    }
  }, [isPreTest])

  React.useEffect(() => {
    if (currentCourse !== undefined && currentCourse._id !== '') {
      callApi()
    }
  }, [currentCourse])

  const onButtonGuestModalPress = () => {
    navigate('REGISTER_SCREEN', { isGuest: true })
    guestModalRef?.current?.dismissModal()
  }

  const onStartExaminationPress = ({
    chapterId,
    id: lessonId,
    checkpoint: checkpointLesson,
  }: Partial<ItemLessonProps>) => {
    // console.log('onStartExamination', lessonId)
    navigate('GRAMMAR_SCREEN', { lessonId, checkpointLesson, chapterId })
  }

  const onStartLessonPress = ({
    id: lessonId,
    chapterId,
  }: Partial<ItemLessonProps>) => {
    navigate('DETAIL_LESSON_SCREEN', {
      lessonId,
      chapterId,
    })
  }

  const onUnlockPress = ({ id }: Partial<ItemLessonProps>) => {
    console.log('onUnlockPress', id)
    if (userRole === 'guest') {
      guestModalRef?.current?.openModal()
    } else {
      Toast.show({
        type: 'info',
        text1: 'Oh! no',
        position: 'top',
        text2: t('function_in_develop'),
      })
    }
  }

  const callApi = async () => {
    try {
      setIsLoading(true)
      const res = await KnowledgeService.getChapterAndLesson(currentCourse!._id)
      setData(parseDataToSectionData(res.data.data.chapters))
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const renderMapItem: SectionListRenderItem<ItemLessonProps, SectionData> = ({
    item,
    index,
    section,
  }) => {
    return (
      <ItemLesson
        {...item}
        key={index}
        onUnlockPress={onUnlockPress}
        chapterId={section.chapterId}
        nextLessonId={item.nextLessonId}
        checkpoint={section?.checkpoint || []}
        onStartLessonPress={onStartLessonPress}
        isEndItem={index === section.data.length - 1}
        onStartExaminationPress={onStartExaminationPress}
      />
    )
  }

  const renderSectionHeader = (item: {
    section: SectionListData<ItemLessonProps, SectionData>
  }) => {
    return <SectionHeader item={item} />
  }

  const onRefresh = () => {
    if (currentCourse !== undefined && currentCourse._id !== '') {
      callApi()
    }
  }

  const renderListChapter = () => {
    if (isLoading || data?.length <= 0) {
      return <LoadingScreen />
    }

    // if (data?.length <= 0) {
    //   return (
    //     <Image
    //       width={200}
    //       height={200}
    //       alignSelf={'center'}
    //       resizeMode={'contain'}
    //       source={images.BeeDiscovery}
    //     />
    //   )
    // }

    return (
      <SectionList
        sections={data}
        removeClippedSubviews
        renderItem={renderMapItem}
        stickySectionHeadersEnabled={true}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={renderSectionHeader}
        SectionSeparatorComponent={() => <Block height={10} />}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        keyExtractor={(item, index) => item.lessonTitle + index}
      />
    )
  }

  return (
    <Container>
      <BlockAnimated
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.listContainer}
      >
        <ChooseCourse />
        {/*<Animated.View entering={FadeIn} exiting={FadeOut}>*/}
        {renderListChapter()}
        {/*</Animated.View>*/}
      </BlockAnimated>
      <GuestModal
        position={'center'}
        ref={guestModalRef}
        animationType={'fade'}
        onButtonPress={onButtonGuestModalPress}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: normalize.h(15),
    marginTop: normalize.v(10),
  },
  mapList: {
    paddingBottom: normalize.v(30),
    marginTop: normalize.v(20),
  },
  header: {
    gap: normalize.h(20),
  },
  headerLabelBlock: { gap: 5 },
  loadingAnimation: {
    height: normalize.v(500),
    aspectRatio: 1,
  },
})
