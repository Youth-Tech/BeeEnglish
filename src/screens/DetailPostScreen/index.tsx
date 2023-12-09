import {
  FlatList,
  Pressable,
  Dimensions,
  ScrollView,
  ListRenderItemInfo,
} from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import {
  changeShowComment,
  setParentCommentId,
  changeBottomSheetState,
} from '@redux/reducers'
import { useStyles } from './styles'
import { PostServices } from '@services'
import { colorTopic, normalize } from '@themes'
import { RootStackParamList } from '@navigation'
import { LoadingScreen } from '@screens/LoadingScreen'
import { useAppDispatch, useAppSelector } from '@hooks'
import { parsePostData } from '@screens/HomeScreen/utils'
import { NewsItem } from '@screens/HomeScreen/components'
import HeaderApp from '@components/common/HeaderComponent'
import { newsData } from '@screens/DetailPostScreen/const'
import BottomSheetApp from '@components/common/BottomSheetComponent'
import ContentPost from '@screens/DetailPostScreen/components/ContentPost'
import EmotionPost from '@screens/DetailPostScreen/components/EmotionPost'
import { Block, BlockAnimated, Container, Image, Text } from '@components'
import BottomSheetWord from '@screens/DetailPostScreen/components/BottomSheetWord'
import BottomSheetComment from '@screens/DetailPostScreen/components/BottomSheetComment'

export type DetailPostScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DETAIL_POST_SCREEN'
>

export const DetailPost: React.FC<DetailPostScreenProps> = ({ route }) => {
  const dispatch = useAppDispatch()
  const styles = useStyles()
  const { t } = useTranslation()
  const data = useAppSelector((state) => state.root.detailPost)

  const scrollViewRef = React.useRef<ScrollView>(null)

  const [isLoading, setIsLoading] = React.useState(true)
  const [currentPost, setCurrentPost] = React.useState(route.params.post)
  const [postData, setPostData] = React.useState<
    (PostResponse & {
      textColor: string
    })[]
  >([])

  React.useEffect(() => {
    callPost()
  }, [])

  React.useEffect(() => {
    const timeOutApi = setTimeout(() => {
      markPostAsRead(currentPost._id)
    }, 60 * 1000)
    return () => clearTimeout(timeOutApi)
  }, [currentPost._id])

  React.useEffect(() => {
    setIsLoading(false)
  }, [currentPost])

  const markPostAsRead = async (id: string) => {
    try {
      await PostServices.markAsRead(id)
    } catch (e) {
      console.log(e)
    }
  }

  const onCloseBottomSheet = () => {
    dispatch(changeBottomSheetState(false))
  }

  const onCloseComment = () => {
    dispatch(changeShowComment(false))
    dispatch(setParentCommentId(''))
  }

  const onPostItemPress = (postItem: PostResponse) => {
    setIsLoading(true)
    setCurrentPost(postItem)
    scrollViewRef?.current?.scrollTo({
      animated: false,
      y: 0,
    })
  }

  const callPost = async () => {
    try {
      const res = await PostServices.getPostRecommend({
        activePost: currentPost._id,
        topic: currentPost.topic._id,
        limit: 10,
        page: 1,
      })
      setPostData(parsePostData(res.data.data.posts, colorTopic))
    } catch (error) {
      console.log(error)
    }
  }

  const renderNewsItem = ({
    index,
    item,
  }: ListRenderItemInfo<
    PostResponse & {
      textColor: string
    }
  >) => {
    return (
      <Pressable
        key={`item-${index}`}
        onPress={() => onPostItemPress(item)}
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

  const renderDetailPost = React.useMemo(() => {
    return (
      <FlatList
        data={currentPost.english}
        scrollEnabled={false}
        style={styles.listParagraph}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ContentPost
            english={item}
            vietnamese={currentPost.vietnamese[index]}
          />
        )}
      />
    )
  }, [currentPost])

  const renderListPostRecommend = React.useMemo(() => {
    return (
      <FlatList
        data={postData}
        scrollEnabled={false}
        renderItem={renderNewsItem}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `item-${index}`}
      />
    )
  }, [postData])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Container style={styles.container}>
      <BlockAnimated
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.container}
      >
        <HeaderApp title={t('detail_post_header')} />
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: normalize.m(20) }}
        >
          <Block style={styles.boxImagePost}>
            <Image
              source={{
                uri: currentPost.attachments[0].src,
              }}
              style={styles.image}
            />
            <Block style={styles.boxTitle}>
              <Text style={styles.title} size={'h3'} fontFamily={'bold'}>
                {t('detail_post_title')}
              </Text>
            </Block>
          </Block>
          {renderDetailPost}
          <EmotionPost
            postId={currentPost._id}
            liked={currentPost.liked}
            setCurrentPost={setCurrentPost}
            likeCount={currentPost.likeCount}
            userLiked={currentPost.usersLiked}
            commentCount={currentPost.commentCount}
          />

          <Text size={'h3'} fontFamily={'bold'} marginTop={10}>
            {t('news')}
          </Text>
          {renderListPostRecommend}
        </ScrollView>

        {/*<BottomSheetComment />*/}
        <BottomSheetApp
          onClose={onCloseBottomSheet}
          children={<BottomSheetWord />}
          visible={data.isShowBottomSheet}
          snapPoints={['20%', '20%', '50%', '70%']}
          backgroundStyle={{ borderRadius: normalize.m(10), elevation: 10 }}
        />

        <BottomSheetApp
          onClose={onCloseComment}
          visible={data.isShowComment}
          enablePanDownToClose={false}
          snapPoints={['100%', '100%']}
          height={Dimensions.get('window').height}
          backgroundStyle={{ borderRadius: normalize.m(10), elevation: 10 }}
        >
          <BottomSheetComment postId={currentPost._id} />
        </BottomSheetApp>
      </BlockAnimated>
    </Container>
  )
}
