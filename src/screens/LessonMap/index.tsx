import React from 'react'
import {
  Pressable,
  StyleSheet,
  SectionList,
  SectionListData,
  SectionListRenderItem,
} from 'react-native'

import { Icon, animation } from '@assets'
import { normalize, useTheme } from '@themes'
import { Text, Block, Container, BlockAnimated } from '@components'
import { ItemLesson, ItemLessonProps } from './components'
import { Chapter, KnowledgeService, Lesson } from '@services'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import LottieView from 'lottie-react-native'
import { MOCK_DATA_LESSON } from './mock'
import { navigate } from '@navigation'

export type SectionData = (typeof MOCK_DATA_LESSON)[number]

const parseDataToLessonData = (
  data: Lesson[],
  fakeState?: boolean,
  chapterStatus?: 'lock' | 'unlock',
): ItemLessonProps[] => {
  return data.map((item, index, arr) => {
    return {
      id: item._id,
      lessonDescription: item.description,
      lessonTitle: item.name,
      status: fakeState && index === 0 ? 'current' : 'lock',
      thumbnail: item.attachment?.src || '',
      type: index === arr.length - 1 ? 'checkpoint' : 'normal',
      chapterStatus: chapterStatus || 'lock',
    }
  })
}

const parseDataToSectionData = (data: Chapter[]): SectionData[] => {
  return data.map((item, index) => {
    return {
      data: parseDataToLessonData(
        item.lessons,
        index === 0,
        index === 0 ? 'unlock' : 'lock',
      ),
      index: item.order,
      lessonComplete: index === 0 ? 1 : 0,
      status: index === 0 ? 'unlock' : 'lock',
      title: item.name,
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

  const onStartLessonPress = (id: string, isRestart?: boolean) => {
    console.log('onStartLesson', id, 'with isRestart', !!isRestart)
    navigate('DETAIL_LESSON_SCREEN', { lessonId: id })
  }

  const onUnlockPress = (id: string) => {
    console.log('onUnlockPress', id)
  }

  const callApi = async () => {
    try {
      const res = await KnowledgeService.getChapterAndLesson()
      setData(parseDataToSectionData(res.data.data.chapters))
      console.log(res.data.data.chapters)
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

  return (
    <Container>
      <Block style={styles.listContainer}>
        {data?.length > 0 ? (
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
        ) : (
          <BlockAnimated
            flex
            alignCenter
            justifyCenter
            entering={FadeIn}
            exiting={FadeOut}
          >
            <LottieView
              autoPlay
              source={animation.beeFlying}
              style={styles.loadingAnimation}
            />
          </BlockAnimated>
        )}
      </Block>
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
