import React from 'react'
import { useTranslation } from 'react-i18next'
import { FadeIn } from 'react-native-reanimated'
import { useFocusEffect } from '@react-navigation/native'
import { FlatList, ListRenderItemInfo, Pressable, View } from 'react-native'

import {
  Text,
  Block,
  Image,
  Container,
  GuestModal,
  BlockAnimated,
} from '@components'
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
import { getTaskThunk } from '@redux/actions'
import { getDaySession } from '@utils/dateUtils'
import { setIsAdjustPostData } from '@redux/reducers'
import { PostServices, UserService } from '@services'
import { useAppDispatch, useAppSelector } from '@hooks'
import { getTask, getUserData } from '@redux/selectors'
import { ModalFunction } from '@components/bases/Modal/type'
import { parseCurrentLesson, parsePostData } from '@screens/HomeScreen/utils'

export const HomeScreen = () => {
  const dispatch = useAppDispatch()
  // const streak = useAppSelector(getStreak)
  const taskData = useAppSelector(getTask)
  const userData = useAppSelector(getUserData)
  const isAdjustPostData = useAppSelector(
    (state) => state.root.detailPost.isAdjustPostData,
  )
  const isLoginWithGuest = useAppSelector(
    (state) => state.root.auth.isLoginWithGuest,
  )
  const [t] = useTranslation()
  const { colors, normalize } = useTheme()
  const guestModalRef = React.useRef<ModalFunction>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [postData, setPostData] = React.useState<
    (PostResponse & { textColor: string })[]
  >([])
  const [postDataRead, setPostDataRead] = React.useState<
    (PostResponse & { textColor: string })[]
  >([])
  const [currentLesson, setCurrentLesson] = React.useState<
    Array<LessonProgressItemProps>
  >([])

  React.useEffect(() => {
    setIsLoading(false)
    callPost()
    callPostRead()
    callCurrentLesson()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (isAdjustPostData) {
        callPost()
        callPostRead()
        // console.log('useFocusEffect')
        dispatch(setIsAdjustPostData(false))
      }
    }, [isAdjustPostData]),
  )
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getTaskThunk())
    }, []),
  )

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

  const callCurrentLesson = async () => {
    try {
      const res = await UserService.getCurrentLesson()
      if (res.status === 200) {
        setCurrentLesson(parseCurrentLesson(res.data.data))
      }
    } catch (e) {
      console.log(e)
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
  const onReadMore = () => {
    navigate('MORE_POST_SCREEN')
  }

  const onLearningPress = (item: LessonProgressItemProps) => {
    navigate('DETAIL_LESSON_SCREEN', {
      lessonId: item.lessonId,
      chapterId: item.chapterId,
    })
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
          index={index}
          lessonId={item.lessonId}
          chapterId={item.chapterId}
          topicName={item.topicName}
          topicImage={item.topicImage}
          lessonLabel={item.lessonLabel}
          onPress={() => onLearningPress(item)}
        />
        {index === currentLesson.length - 1 && currentLesson.length > 5 && (
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
        {index === postDataRead.length - 1 && postDataRead.length > 5 && (
          <Pressable onPress={onReadMore}>
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
          index === postData.length - 1
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
              onPress={() => {
                if (isLoginWithGuest) {
                  guestModalRef.current?.openModal()
                } else {
                  navigate('STREAK_SCREEN')
                }
              }}
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
            data={currentLesson}
            renderItem={renderLessonProgressItem}
            style={{ marginTop: normalize.v(10) }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => `item-${index}`}
          />
        </Block>
        {postDataRead.length > 0 ? (
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
        ) : (
          <></>
        )}
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
      <GuestModal
        ref={guestModalRef}
        position={'center'}
        onButtonPress={() => {
          navigate('REGISTER_SCREEN', { isGuest: true })
          guestModalRef?.current?.dismissModal()
        }}
      />
    </Container>
  )
}
