import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, ListRenderItemInfo } from 'react-native'

import { useStyles } from './styles'
import { colorTopic, normalize } from '@themes'
import { parsePostData } from '@screens/HomeScreen'
import { PostServices } from '@services/PostService'
import { useAppDispatch, useAppSelector } from '@hooks'
import { NewsItem } from '@screens/HomeScreen/components'
import HeaderApp from '@components/common/HeaderComponent'
import { Block, Container, Image, Text } from '@components'
import { FlatList, ScrollView, Dimensions } from 'react-native'
import { newsData, posts } from '@screens/DetailPostScreen/const'
import BottomSheetApp from '@components/common/BottomSheetComponent'
import ContentPost from '@screens/DetailPostScreen/components/ContentPost'
import EmotionPost from '@screens/DetailPostScreen/components/EmotionPost'
import { changeBottomSheetState, changeShowComment } from '@redux/reducers'
import BottomSheetWord from '@screens/DetailPostScreen/components/BottomSheetWord'
import BottomSheetComment from '@screens/DetailPostScreen/components/BottomSheetComment'

export const DetailPost: React.FC = () => {
  const styles = useStyles()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.root.detailPost)

  const [postData, setPostData] = React.useState<
    (PostResponse & { textColor: string })[]
  >([])

  const onCloseBottomSheet = () => {
    dispatch(changeBottomSheetState(false))
  }
  const onCloseComment = () => {
    dispatch(changeShowComment(false))
  }

  const onPostItemPress = (item: PostResponse) => {}

  const renderNewsItem = ({
    index,
    item,
  }: ListRenderItemInfo<PostResponse & { textColor: string }>) => {
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
    callPost()
  }, [])

  return (
    <Container style={styles.container}>
      <HeaderApp title={t('detail_post_header')} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: normalize.m(20) }}
      >
        <Block style={styles.boxImagePost}>
          <Image
            source={{
              uri: 'https://www.usatoday.com/gcdn/authoring/authoring-images/2023/09/06/USAT/70779211007-xxx-motions-ba-040-4181316.JPG?width=660&height=441&fit=crop&format=pjpg&auto=webp',
            }}
            style={styles.image}
          />
          <Block style={styles.boxTitle}>
            <Text style={styles.title} size={'h3'} fontFamily={'bold'}>
              Luyện kỹ năng đọc hiểu
            </Text>
          </Block>
        </Block>
        <FlatList
          data={posts.english}
          scrollEnabled={false}
          style={styles.listParagraph}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ContentPost english={item} vietnamese={posts.vietnamese[index]} />
          )}
        />
        <EmotionPost />
        <Text size={'h3'} fontFamily={'bold'} marginTop={10}>
          {t('news')}
        </Text>
        <FlatList
          data={postData}
          scrollEnabled={false}
          renderItem={renderNewsItem}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `item-${index}`}
        />
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
        <BottomSheetComment />
      </BottomSheetApp>
    </Container>
  )
}
