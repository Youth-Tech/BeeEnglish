import {
  Pressable,
  SectionList,
  SectionListData,
  SectionListRenderItem,
  StyleSheet,
} from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import { Icon } from '@assets'
import { navigate, RootStackParamList } from '@navigation'
import { LoadingScreen } from '@screens'
import { normalize, useTheme } from '@themes'
import { ItemLesson, ItemLessonProps } from './components'
import { Chapter, KnowledgeService, Lesson, Quiz } from '@services'
import { Block, BlockAnimated, Container, Text } from '@components'
import { defaultCheckPointLessonData } from '@screens/LessonMap/mock'
import { useAppSelector } from '@hooks'
import { getIsPreTest } from '@redux/selectors'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackActions } from '@react-navigation/native'

export type SectionData = {
  lessonComplete: number
  data: ItemLessonProps[]
  title: string
  status: 'lock' | 'unlock'
  index: number
  chapterId: string
  checkpoint?: Quiz[]
}

const parseDataToLessonData = (
  data: Lesson[],
  chapterStatus?: 'lock' | 'unlock',
): ItemLessonProps[] => {
  return data.map((item, index, arr) => {
    const nextLesson = arr[index + 1] || item

    return {
      id: item._id,
      lessonDescription: item.description,
      lessonTitle: item.name,
      status:
        item.status && item.completed
          ? 'completed'
          : item.status
          ? 'current'
          : 'lock',
      thumbnail: item.attachment?.src || '',
      type: 'normal',
      chapterStatus: chapterStatus || 'lock',
      nextLessonId: nextLesson._id,
    }
  })
}

const parseDataToSectionData = (data: Chapter[]): SectionData[] => {
  return data.map((item) => {
    let lessonComplete = item.lessons.filter((item) => item.status).length
    const data = parseDataToLessonData(
      item.lessons,
      item.status ? 'unlock' : 'lock',
    )

    data.push({
      ...defaultCheckPointLessonData,
      checkpoint: item.checkpoint?.questions ?? [],
      chapterStatus: item.status ? 'unlock' : 'lock',
      status: (item.checkpoint?.score ?? 0) > 80 ? 'completed' : 'current',
    })

    return {
      data,
      lessonComplete,
      index: item.order,
      title: item.name,
      status: item.status ? 'unlock' : 'lock',
      chapterId: item._id,
      checkpoint: item?.checkpoint?.questions || [],
    }
  })
}

export type LessonMapScreen = NativeStackScreenProps<
  RootStackParamList,
  'LEARNING_SCREEN'
>

export const LessonMap: React.FC<LessonMapScreen> = ({ navigation }) => {
  const isPreTest = useAppSelector(getIsPreTest)

  const { colors } = useTheme()
  const [data, setData] = React.useState<SectionData[]>([])

  React.useEffect(() => {
    if (!isPreTest) {
      console.log('to pre test')
      navigation.dispatch(StackActions.replace('EXAM_TEST_SCREEN'))
    }
  }, [isPreTest])

  const onStartExaminationPress = ({
    chapterId,
    id: lessonId,
    checkpoint: checkpointLesson,
  }: Partial<ItemLessonProps>) => {
    console.log('onStartExamination', lessonId)
    navigate('GRAMMAR_SCREEN', { lessonId, checkpointLesson, chapterId })
  }

  const onStartLessonPress = ({
    id: lessonId,
    chapterId,
    nextLessonId,
  }: Partial<ItemLessonProps>) => {
    navigate('DETAIL_LESSON_SCREEN', {
      lessonId,
      chapterId,
      nextLessonId,
    })
  }

  const onUnlockPress = ({ id }: Partial<ItemLessonProps>) => {
    console.log('onUnlockPress', id)
  }

  const callApi = async () => {
    try {
      const res = await KnowledgeService.getChapterAndLesson()
      setData(parseDataToSectionData(res.data.data.chapters))
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    callApi()
  }, [])

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
    return (
      <Pressable key={item.section.title}>
        <Block
          row
          radius={8}
          height={68}
          alignCenter
          style={styles.header}
          paddingHorizontal={25}
          backgroundColor={
            item.section.status === 'lock' ? '#F3F8F3' : '#70773A'
          }
        >
          <Text
            size={64}
            lineHeight={64}
            fontFamily="cutie"
            color={
              item.section.status === 'unlock'
                ? colors.white
                : colors.greyPrimary
            }
          >
            {item.section.index!}
          </Text>
          <Block style={styles.headerLabelBlock}>
            <Text
              size={'h3'}
              fontFamily="bold"
              color={
                item.section.status === 'unlock'
                  ? colors.white
                  : colors.greyPrimary
              }
            >
              {item.section.title}
            </Text>

            <Text
              size={'h3'}
              fontFamily="bold"
              color={
                item.section.status === 'unlock'
                  ? colors.white
                  : colors.greyPrimary
              }
            >
              Lessons completed:{' '}
              {
                item.section.data.filter(
                  (item) =>
                    item.status === 'completed' && item.type !== 'checkpoint',
                ).length
              }
              /
              {
                item.section.data.filter((item) => item.type !== 'checkpoint')
                  .length
              }
            </Text>
          </Block>

          {item.section.status === 'lock' && (
            <Block absolute alignSelf="center" right={25}>
              <Icon state="Lock" fill={colors.greyPrimary} />
            </Block>
          )}
        </Block>
      </Pressable>
    )
  }

  if (data?.length <= 0) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <BlockAnimated entering={FadeIn} style={styles.listContainer}>
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <SectionList
            sections={data}
            removeClippedSubviews
            renderItem={renderMapItem}
            stickySectionHeadersEnabled={true}
            showsVerticalScrollIndicator={false}
            renderSectionHeader={renderSectionHeader}
            SectionSeparatorComponent={() => <Block height={10} />}
            keyExtractor={(item, index) => item.lessonTitle + index}
          />
        </Animated.View>
      </BlockAnimated>
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
