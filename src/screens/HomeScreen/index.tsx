import React from 'react'
import { useTranslation } from 'react-i18next'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { useFocusEffect } from '@react-navigation/native'
import { FlatList, ListRenderItemInfo, Pressable, View } from 'react-native'

import {
  DailyTask,
  LessonProgressItem,
  LessonProgressItemProps,
  NewsItem,
  NewsProgress,
  ToolItem,
} from './components'
import { Icon } from '@assets'
import { AUTH_ROUTE, navigate } from '@navigation'
import { PostServices } from '@services'
import { LoadingScreen } from '@screens'
import { colorTopic, useTheme } from '@themes'
import { getStreakThunk, getTaskThunk } from '@redux/actions'
import { getDaySession } from '@utils/dateUtils'
import { setIsAdjustPostData } from '@redux/reducers'
import { useAppDispatch, useAppSelector } from '@hooks'
import { getStreak, getTask, getUserData } from '@redux/selectors'
import { Block, BlockAnimated, Container, Image, Text } from '@components'
import streakReducer from '@redux/reducers/streak.reducer'

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
  // const streak = useAppSelector(getStreak)
  const taskData = useAppSelector(getTask)
  const userData = useAppSelector(getUserData)
  const isAdjustPostData = useAppSelector(
    (state) => state.root.detailPost.isAdjustPostData,
  )
  const [t] = useTranslation()
  const { colors, normalize } = useTheme()

  const [isLoading, setIsLoading] = React.useState(true)
  const [postData, setPostData] = React.useState<
    (PostResponse & { textColor: string })[]
  >([])
  const [postDataRead, setPostDataRead] = React.useState<
    (PostResponse & { textColor: string })[]
  >([])

  const callPost = async () => {
    try {
      const res = await PostServices.getAllPost({
        type: 'text',
      })
      setPostData(parsePostData(res.data.data.posts, colorTopic))
    } catch (error) {
      console.log(error)
    }
  }

  const callPostRead = async () => {
    try {
      const res = await PostServices.getAllPost({
        type: 'text',
        read: true,
      })
      setPostDataRead(parsePostData(res.data.data.posts, colorTopic))
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    setIsLoading(false)
    callPost()
    callPostRead()
    // if (streak?.streaks?.length ?? 0 <= 0) {
    //   dispatch(getStreakThunk())
    // }
    console.log('useEffect')
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (isAdjustPostData) {
        callPost()
        callPostRead()
        console.log('useFocusEffect')
        dispatch(setIsAdjustPostData(false))
      }
    }, [isAdjustPostData]),
  )
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getTaskThunk())
    }, []),
  )
  const onPressDictionary = () => {
    navigate('DICTIONARY_SCREEN')
  }
  const onPressVideo = () => {
    navigate('CHOOSE_VIDEO_SCREEN')
  }
  const onPressRanking = () => {
    navigate('RANKING_SCREEN')
  }
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
      >
        <NewsProgress
          progress={50}
          title={item.title}
          topic={item.topic.name}
          topicColor={item.textColor}
          image={item.attachments?.[0]?.src ?? ''}
          onPress={() => navigate('DETAIL_POST_SCREEN', { post: item })}
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
        onPress={() => navigate('DETAIL_POST_SCREEN', { post: item })}
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
          image={item.attachments?.[0]?.src ?? ''}
        />
      </Pressable>
    )
  }

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
                    uri: userData?.avatar?.src ?? (userData.avatar as string),
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
            {/*{(hasStreak ?? 0) > 3 && (*/}
            {/*  <BlockAnimated entering={FadeIn} exiting={FadeOut}>*/}
            {/*    <Icon state="Fire" />*/}
            {/*  </BlockAnimated>*/}
            {/*)}*/}
          </Block>
          <Block marginTop={10}>
            <DailyTask
              data={taskData ?? []}
              onPress={() => navigate('STREAK_SCREEN')}
            />
          </Block>
          <Block marginTop={17}>
            <Text size={'h2'} fontFamily="bold" color={colors.black}>
              {t('tools')}
            </Text>
            <Block row marginTop={18} alignCenter justifyCenter>
              <ToolItem
                icon="DictionaryColorized"
                name={t('dictionary')}
                onPress={onPressDictionary}
              />
              <View style={{ marginStart: normalize.h(28) }}>
                <ToolItem icon="Video" name="Video" onPress={onPressVideo} />
              </View>
              <View style={{ marginStart: normalize.h(28) }}>
                <ToolItem
                  icon="Ranking"
                  name="Ranking"
                  onPress={onPressRanking}
                />
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
            data={postDataRead}
            renderItem={renderNewsProgressItem}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: normalize.v(10) }}
            keyExtractor={(_, index) => `item-${index}`}
          />
        </Block>
        <Block marginTop={17}>
          <Block row space={'between'} paddingHorizontal={20}>
            <Text
              size={'h2'}
              fontFamily="bold"
              marginBottom={-10}
              color={colors.black}
            >
              {t('news')}
            </Text>
            <Icon
              state={'RightArrow'}
              onPress={() => navigate('MORE_POST_SCREEN')}
            />
          </Block>
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
