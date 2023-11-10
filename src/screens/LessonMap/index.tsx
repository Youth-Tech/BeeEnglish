import {
  Pressable,
  StyleSheet,
  SectionList,
  SectionListData,
  SectionListRenderItem,
} from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import { Icon } from '@assets'
import { navigate } from '@navigation'
import { LoadingScreen } from '@screens'
import { MOCK_DATA_LESSON } from './mock'
import { normalize, useTheme } from '@themes'
import { Chapter, KnowledgeService, Lesson } from '@services'
import { Text, Block, Container, BlockAnimated } from '@components'
import { InfoOnStartLesson, ItemLesson, ItemLessonProps } from './components'

export type SectionData = (typeof MOCK_DATA_LESSON)[number] & {
  chapterId: string
}

const parseDataToLessonData = (
  data: Lesson[],
  chapterStatus?: 'lock' | 'unlock',
): ItemLessonProps[] => {
  const listLessonWithOrder = data.filter((item) => item.status === true)

  const currentLesson =
    listLessonWithOrder.length > 0
      ? listLessonWithOrder[listLessonWithOrder.length - 1]
      : data[0]

  return data.map((item, index, arr) => {
    const nextLesson = arr[index + 1] || item

    return {
      id: item._id,
      lessonDescription: item.description,
      lessonTitle: item.name,
      status: !item.status
        ? 'lock'
        : item._id === currentLesson._id
        ? 'current'
        : 'complete',
      thumbnail: item.attachment?.src || '',
      type: index === arr.length - 1 ? 'checkpoint' : 'normal',
      chapterStatus: chapterStatus || 'lock',
      nextLessonId: nextLesson._id,
    }
  })
}

const parseDataToSectionData = (data: Chapter[]): SectionData[] => {
  return data.map((item) => {
    let lessonComplete = item.lessons.filter(
      (item) => item.status === true,
    ).length

    return {
      data: parseDataToLessonData(
        item.lessons,
        item.status ? 'unlock' : 'lock',
      ),
      lessonComplete,
      index: item.order,
      title: item.name,
      status: item.status ? 'unlock' : 'lock',
      chapterId: item._id,
    }
  })
}

export const LessonMap = () => {
  const { colors } = useTheme()
  const [data, setData] = React.useState<SectionData[]>([])

  const onStartExaminationPress = (id: string) => {
    console.log('onStartExamination', id)
    navigate('DETAIL_LESSON_SCREEN', { lessonId: id })
  }

  const onStartLessonPress = ({
    nextLessonId,
    chapterId,
    lessonId,
  }: InfoOnStartLesson) => {
    navigate('DETAIL_LESSON_SCREEN', { lessonId, chapterId, nextLessonId })
  }

  const onUnlockPress = (id: string) => {
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
              Lessons completed: {item.section.lessonComplete}/
              {item.section.data.length}
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
