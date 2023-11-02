import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Block, Container, Image, Modal, Text } from '@components'
import { useTheme } from '@themes'
import { Icon } from '@assets'
import { View, FlatList, ListRenderItemInfo, Pressable } from 'react-native'
import {
  NewsItem,
  NewsItemProps,
  NewsProgress,
  NewsProgressProps,
  DailyTask,
  LessonProgressItem,
  LessonProgressItemProps,
  ToolItem,
} from './components'
import { Portal, Host } from 'react-native-portalize'
import { widthScreen } from '@utils/helpers'
import { ModalFunction } from '@components/bases/Modal/type'
const learningData = [
  {
    id: 1,
    lessonLabel: `Lesson 1: Bữa sáng cùng gia đình`,
    topicName: 'Gia đình',
    topicImage: `https://clipart-library.com/image_gallery/372235.png`,
    progress: 50,
  },
  {
    id: 2,
    lessonLabel: `Lesson 2: Bữa sáng cùng gia đình`,
    topicName: 'Công sở',
    topicImage: `https://clipart-library.com/2023/business-persons-meeting-clipart-md.png`,
    progress: 10,
  },
  {
    id: 3,
    lessonLabel: `Lesson 6: Bữa sáng cùng gia đình`,
    topicName: 'Trường học',
    topicImage: `https://media.istockphoto.com/id/639973478/vector/people-and-education-group-of-happy-students-with-books.jpg?s=612x612&w=0&k=20&c=fVA-VABlOliuVKSWk1h6mOgH6PKimTfPEKG4qzueQQY=`,
    progress: 23.5,
  },
  {
    id: 4,
    lessonLabel: `Lesson 3: Bữa sáng cùng gia đình`,
    topicName: 'Tiệc tùng',
    topicImage: `https://cutewallpaper.org/24/happy-people-clip-art/1375620031.jpg`,
    progress: 75.5,
  },
  {
    id: 5,
    lessonLabel: `Lesson 4: Bữa sáng cùng gia đình`,
    topicName: 'Du lịch',
    topicImage: `https://clipart-library.com/image_gallery/372235.png`,
    progress: 60,
  },
]
const newsData = [
  {
    id: 1,
    title: `Bữa sáng cùng gia đình`,
    image: `https://media.saigontourist.edu.vn/Media/1_STHCHOME/FolderFunc/202303/Images/fine-dining-la-gi-20230320091553-e.jpg`,
    progress: 50,
  },
  {
    id: 2,
    title: `Bữa sáng cùng gia đình`,
    image: `https://media.saigontourist.edu.vn/Media/1_STHCHOME/FolderFunc/202303/Images/fine-dining-la-gi-20230320091553-e.jpg`,
    progress: 50,
  },
  {
    id: 3,
    title: `Bữa sáng cùng gia đình`,
    image: `https://media.saigontourist.edu.vn/Media/1_STHCHOME/FolderFunc/202303/Images/fine-dining-la-gi-20230320091553-e.jpg`,
    progress: 50,
  },
  {
    id: 4,
    title: `Bữa sáng cùng gia đình`,
    image: `https://media.saigontourist.edu.vn/Media/1_STHCHOME/FolderFunc/202303/Images/fine-dining-la-gi-20230320091553-e.jpg`,
    progress: 50,
  },
  {
    id: 5,
    title: `Bữa sáng cùng gia đình`,
    image: `https://media.saigontourist.edu.vn/Media/1_STHCHOME/FolderFunc/202303/Images/fine-dining-la-gi-20230320091553-e.jpg`,
    progress: 50,
  },
]
export const HomeScreen = () => {
  const [t] = useTranslation()
  const dispatch = useDispatch()
  const { colors, normalize } = useTheme()
  const onPressDictionary = () => {}
  const onPressVideo = () => {}
  const onLearningWatchMore = () => {}
  const renderLessonProgressItem = ({
    index,
    item,
  }: ListRenderItemInfo<LessonProgressItemProps>) => {
    return (
      <View
        style={[
          index === 0 ? { marginStart: normalize.h(20) } : {},
          { flexDirection: 'row', alignItems: 'center' },
        ]}
        key={`item-${index}`}
      >
        <LessonProgressItem
          lessonLabel={item.lessonLabel}
          progress={item.progress}
          topicImage={item.topicImage}
          topicName={item.topicName}
          onPress={() => {
            console.log('item:' + index)
          }}
          index={index}
        />
        {index === learningData.length - 1 && (
          <Pressable onPress={onLearningWatchMore}>
            <Block
              padding={10}
              marginHorizontal={20}
              backgroundColor={colors.orangePrimary}
              radius={50}
            >
              <Icon state="RightArrow" stroke={colors.white} />
            </Block>
          </Pressable>
        )}
      </View>
    )
  }
  const renderNewsProgressItem = ({
    index,
    item,
  }: ListRenderItemInfo<NewsProgressProps>) => {
    return (
      <View
        style={[
          index === 0
            ? { marginStart: normalize.h(20) }
            : { marginStart: normalize.h(10) },
          { flexDirection: 'row', alignItems: 'center' },
        ]}
        key={`item-${index}`}
      >
        <NewsProgress
          title={item.title}
          image={item.image}
          progress={item.progress}
          index={index}
        />
        {index === newsData.length - 1 && (
          <Pressable onPress={onLearningWatchMore}>
            <Block
              padding={10}
              marginHorizontal={20}
              backgroundColor={colors.orangePrimary}
              radius={50}
            >
              <Icon state="RightArrow" stroke={colors.white} />
            </Block>
          </Pressable>
        )}
      </View>
    )
  }
  const renderNewsItem = ({
    index,
    item,
  }: ListRenderItemInfo<NewsItemProps>) => {
    return (
      <View
        style={[
          { marginHorizontal: normalize.h(20) },
          index === newsData.length - 1
            ? { marginBottom: normalize.v(19) }
            : {},
        ]}
        key={`item-${index}`}
      >
        <NewsItem title={item.title} image={item.image} />
      </View>
    )
  }
  return (
    <Container hasScroll>
      <Block flex backgroundColor={colors.white} paddingHorizontal={20}>
        <Block row alignCenter space="between">
          <Block row>
            <Block row>
              <Image
                width={45}
                height={45}
                radius={22.5}
                source={{
                  uri: 'https://i.pinimgVo.com/736x/9b/88/51/9b88513699abae664fc34b23c3d0a6d3.jpg',
                }}
                resizeMode="cover"
              />
              <Block justifyCenter marginLeft={8}>
                <Text size={'h4'} fontFamily="semiBold" color={colors.black}>
                  Hey, Duy Vo
                </Text>
                <Block row alignCenter marginTop={4}>
                  <Text size={'h5'} fontFamily="semiBold">
                    Chào buổi sáng
                  </Text>
                  <Icon
                    state="Tree"
                    fill={colors.greyPrimary}
                    style={{ marginStart: normalize.h(3) }}
                  />
                </Block>
              </Block>
            </Block>
          </Block>
          <Icon state="Fire" />
        </Block>
        <Block marginTop={10}>
          <DailyTask
            icon="LearnBook"
            taskName="Học bài 15 phút"
            finishedTask={0}
            totalTask={5}
            onPress={() => {
              console.log('streak screen')
            }}
          />
        </Block>
        <Block marginTop={17}>
          <Text size={'h2'} fontFamily="bold" color={colors.black}>
            {t('tools')}
          </Text>
          <Block row marginTop={18}>
            <ToolItem
              icon="DictionaryColorized"
              name={t('dictionary')}
              onPress={onPressDictionary}
            />
            <View style={{ marginStart: normalize.h(28) }}>
              <ToolItem icon="Video" name="Video" onPress={onPressVideo} />
            </View>
          </Block>
        </Block>
      </Block>
      <Block marginTop={17}>
        <Text
          size={'h2'}
          fontFamily="bold"
          color={colors.black}
          marginLeft={20}
        >
          {t('learning')}
        </Text>
        <FlatList
          data={learningData}
          keyExtractor={(_, index) => `item-${index}`}
          renderItem={renderLessonProgressItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: normalize.v(10) }}
        />
      </Block>
      <Block marginTop={17}>
        <Text
          size={'h2'}
          fontFamily="bold"
          color={colors.black}
          marginLeft={20}
        >
          {t('watched')}
        </Text>
        <FlatList
          data={newsData}
          keyExtractor={(_, index) => `item-${index}`}
          renderItem={renderNewsProgressItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: normalize.v(10) }}
        />
      </Block>
      <Block marginTop={17}>
        <Text
          size={'h2'}
          fontFamily="bold"
          color={colors.black}
          marginLeft={20}
        >
          {t('news')}
        </Text>
        <FlatList
          data={newsData}
          keyExtractor={(_, index) => `item-${index}`}
          renderItem={renderNewsItem}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: normalize.v(10) }}
        />
      </Block>
    </Container>
  )
}
