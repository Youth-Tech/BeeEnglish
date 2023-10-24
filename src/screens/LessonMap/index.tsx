import React from 'react'
import {
  Pressable,
  StyleSheet,
  SectionList,
  SectionListData,
  SectionListRenderItem,
} from 'react-native'

import { Icon } from '@assets'
import { normalize, useTheme } from '@themes'
import { Text, Block, Container } from '@components'
import { ItemLesson, ItemLessonProps } from './components'

export const MOCK_DATA: ItemLessonProps[] = [
  {
    id: 'id1',
    lessonTitle: 'Hello!',
    lessonDescription: 'Learn greetings for meeting people',
    thumbnail:
      'https://kenh14cdn.com/thumb_w/660/2019/12/26/garlicheaven79728792465586074371474299227813850164136n-1577341862556288584887.jpg',
    status: 'complete',
  },
  {
    id: 'id2',
    lessonTitle: 'Introducing yourself',
    lessonDescription: 'Say your name',
    thumbnail:
      'https://kenh14cdn.com/thumb_w/660/2019/12/26/garlicheaven79728792465586074371474299227813850164136n-1577341862556288584887.jpg',
    status: 'current',
  },
  {
    id: 'id3',
    lessonTitle: 'Saying how you are',
    lessonDescription: 'Talk about how you feel',
    thumbnail:
      'https://kenh14cdn.com/thumb_w/660/2019/12/26/garlicheaven79728792465586074371474299227813850164136n-1577341862556288584887.jpg',
    status: 'lock',
  },
  {
    id: 'id4',
    lessonTitle: 'Developing fluency',
    lessonDescription: 'Introduce yourself',
    thumbnail:
      'https://kenh14cdn.com/thumb_w/660/2019/12/26/garlicheaven79728792465586074371474299227813850164136n-1577341862556288584887.jpg',
    status: 'lock',
  },
  {
    id: 'id5',
    lessonTitle: 'Check point Introduce',
    lessonDescription: 'Test your skills to access the next chapter',
    thumbnail:
      'https://kenh14cdn.com/thumb_w/660/2019/12/26/garlicheaven79728792465586074371474299227813850164136n-1577341862556288584887.jpg',
    status: 'lock',
    type: 'checkpoint',
  },
]

const MOCK_DATA_LESSON = [
  {
    lessonComplete: 1,
    data: MOCK_DATA,
    title: 'Introduce my self',
    status: 'unlock',
    index: 0,
  },
  {
    lessonComplete: 1,
    data: MOCK_DATA,
    title: 'Introduce my self 2',
    status: 'lock',
    index: 1,
  },
  {
    lessonComplete: 1,
    data: MOCK_DATA,
    title: 'Introduce my self 3',
    status: 'lock',
    index: 2,
  },
  {
    lessonComplete: 1,
    data: MOCK_DATA,
    title: 'Introduce my self 4',
    status: 'lock',
    index: 3,
  },
]

export type SectionData = (typeof MOCK_DATA_LESSON)[number]

export const LessonMap = () => {
  const { colors } = useTheme()

  const onStartExaminationPress = (id: string) => {
    console.log('onStartExamination', id)
  }

  const onStartLessonPress = (id: string, isRestart?: boolean) => {
    console.log('onStartLesson', id, 'with isRestart', !!isRestart)
  }

  const onUnlockPress = (id: string) => {
    console.log('onUnlockPress', id)
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
            fontFamily="cutie"
            color={
              item.section.status === 'unlock'
                ? colors.white
                : colors.greyPrimary
            }
          >
            {item.section.index! + 1}
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
        <SectionList
          removeClippedSubviews
          renderItem={renderMapItem}
          sections={MOCK_DATA_LESSON}
          stickySectionHeadersEnabled={true}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={renderSectionHeader}
          SectionSeparatorComponent={() => <Block height={10} />}
          keyExtractor={(item, index) => item.lessonTitle + index}
        />
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
})
