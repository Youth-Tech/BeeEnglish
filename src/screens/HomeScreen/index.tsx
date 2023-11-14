import React from 'react'
import { useTranslation } from 'react-i18next'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { FlatList, ListRenderItemInfo, Pressable, View } from 'react-native'

import {
  NewsItem,
  ToolItem,
  DailyTask,
  NewsProgress,
  LessonProgressItem,
  LessonProgressItemProps,
} from './components'
import { Icon } from '@assets'
import { navigate } from '@navigation'
import { LoadingScreen } from '@screens'
import { colorTopic, useTheme } from '@themes'
import { getStreakThunk } from '@redux/actions'
import { getDaySession } from '@utils/dateUtils'
import { PostServices } from '@services/PostService'
import { useAppDispatch, useAppSelector } from '@hooks'
import { getStreak, getUserData } from '@redux/selectors'
import { Block, BlockAnimated, Container, Image, Text } from '@components'

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

export const parsePostData = (
  postData: PostResponse[],
  colors: string[],
): (PostResponse & { textColor: string })[] => {
  const colorValue: Record<string, string> = {}

  postData.forEach((item) => {
    const isInclude = Object.keys(colorValue).includes(item.topic.name)
    if (!isInclude) {
      colorValue[item.topic.name] =
        colors[Math.floor(Math.random() * colors.length)]
    }
  })

  return postData.map((item) => {
    return {
      ...item,
      textColor: colorValue[item.topic.name],
    }
  })
}

export const HomeScreen = () => {
  const dispatch = useAppDispatch()
  const hasStreak = useAppSelector(getStreak).streakCount

  const userData = useAppSelector(getUserData)
  const [t] = useTranslation()
  const { colors, normalize } = useTheme()

  const [isLoading, setIsLoading] = React.useState(true)
  const [postData, setPostData] = React.useState<
    (PostResponse & { textColor: string })[]
  >([])

  const onPressDictionary = () => {
    navigate('DICTIONARY_SCREEN')
  }
  const onPressVideo = () => {}
  const onLearningWatchMore = () => {
    navigate('LEARNING_SCREEN')
  }

  const renderLessonProgressItem = ({
    index,
    item,
  }: ListRenderItemInfo<LessonProgressItemProps>) => {
    return (
      <View
        key={`item-${index}`}
        style={[
          index === 0 ? { marginStart: normalize.h(20) } : {},
          { flexDirection: 'row', alignItems: 'center' },
        ]}
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
  }: ListRenderItemInfo<PostResponse & { textColor: string }>) => {
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
          progress={50}
          title={item.title}
          topic={item.topic.name}
          topicColor={item.textColor}
          image={item.attachment[0].src || ''}
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
  }: ListRenderItemInfo<PostResponse & { textColor: string }>) => {
    return (
      <Pressable
        key={`item-${index}`}
        onPress={() => navigate('DETAIL_POST_SCREEN', { data: item })}
        style={[
          { marginHorizontal: normalize.h(20) },
          index === newsData.length - 1
            ? { marginBottom: normalize.v(19) }
            : {},
        ]}
      >
        <NewsItem
          title={item.title}
          topic={item.topic?.name}
          createAt={item.createdAt}
          textColor={item.textColor}
          image={item.attachment[0].src || ''}
        />
      </Pressable>
    )
  }

  const callPost = async () => {
    try {
      const res = await PostServices.getAllPost()
      setPostData(parsePostData(res.data.data.posts, colorTopic))
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    setIsLoading(false)
    callPost()

    //get streak
    dispatch(getStreakThunk())
  }, [])

  if (isLoading || postData.length <= 0) {
    return <LoadingScreen />
  }

  return (
    <Container hasScroll>
      <BlockAnimated flex entering={FadeIn}>
        <Block flex backgroundColor={colors.white} paddingHorizontal={20}>
          <Block row alignCenter space="between">
            <Block row>
              <Block row>
                <Image
                  width={45}
                  height={45}
                  radius={22.5}
                  resizeMode="cover"
                  source={{
                    uri: userData.avatar.src,
                  }}
                />
                <Block justifyCenter marginLeft={8}>
                  <Text size={'h4'} fontFamily="semiBold" color={colors.black}>
                    Hey, {userData.fullName}
                  </Text>
                  <Block row alignCenter marginTop={4}>
                    <Text size={'h5'} fontFamily="semiBold">
                      {getDaySession()}
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
            {hasStreak > 3 && (
              <BlockAnimated entering={FadeIn} exiting={FadeOut}>
                <Icon state="Fire" />
              </BlockAnimated>
            )}
          </Block>
          <Block marginTop={10}>
            <DailyTask
              icon="LearnBook"
              taskName="Học bài 15 phút"
              finishedTask={0}
              totalTask={5}
              onPress={() => navigate('STREAK_SCREEN')}
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
            horizontal
            data={learningData}
            renderItem={renderLessonProgressItem}
            style={{ marginTop: normalize.v(10) }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => `item-${index}`}
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
            horizontal
            data={postData}
            renderItem={renderNewsProgressItem}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: normalize.v(10) }}
            keyExtractor={(_, index) => `item-${index}`}
          />
        </Block>
        <Block marginTop={17}>
          <Text
            size={'h2'}
            marginLeft={20}
            fontFamily="bold"
            marginBottom={-10}
            color={colors.black}
          >
            {t('news')}
          </Text>
          <FlatList
            data={postData}
            renderItem={renderNewsItem}
            scrollEnabled={false}
            style={{ marginTop: normalize.v(10) }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => `item-${index}`}
          />
        </Block>
      </BlockAnimated>
    </Container>
  )
}
