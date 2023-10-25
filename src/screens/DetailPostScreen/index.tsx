import React from 'react'
import { normalize } from '@themes'
import { useStyles } from './styles'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@hooks'
import { newsData, posts } from '@screens/DetailPostScreen/const'
import { changeBottomSheetState, changeShowComment } from '@redux/reducers'
import HeaderApp from '@components/common/HeaderComponent'
import { Block, Container, Image, Text } from '@components'
import { FlatList, ScrollView, Dimensions } from 'react-native'
import BottomSheetApp from '@components/common/BottomSheetComponent'
import ContentPost from '@screens/DetailPostScreen/components/ContentPost'
import EmotionPost from '@screens/DetailPostScreen/components/EmotionPost'
import BottomSheetWord from '@screens/DetailPostScreen/components/BottomSheetWord'
import { NewsItem } from '@screens/HomeScreen/components'
import BottomSheetComment from '@screens/DetailPostScreen/components/BottomSheetComment'

const DetailPost: React.FC = () => {
  const { t } = useTranslation()
  const styles = useStyles()
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.root.detailPost)
  const onCloseBottomSheet = () => {
    dispatch(changeBottomSheetState(false))
  }
  const onCloseComment = () => {
    dispatch(changeShowComment(false))
  }
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
          style={styles.listParagraph}
          scrollEnabled={false}
          data={posts}
          renderItem={({ item }) => <ContentPost data={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
        <EmotionPost />
        <Text size={'h3'} fontFamily={'bold'} marginTop={10}>
          {t('news')}
        </Text>
        <FlatList
          data={newsData}
          keyExtractor={(_, index) => `item-${index}`}
          renderItem={({ item }) => (
            <NewsItem title={item.title} image={item.image} />
          )}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>

      {/*<BottomSheetComment />*/}
      <BottomSheetApp
        snapPoints={['20%', '20%', '50%', '70%']}
        visible={data.isShowBottomSheet}
        onClose={onCloseBottomSheet}
        backgroundStyle={{ borderRadius: normalize.m(10), elevation: 10 }}
        children={<BottomSheetWord />}
      />

      <BottomSheetApp
        height={Dimensions.get('window').height}
        snapPoints={['100%', '100%']}
        visible={data.isShowComment}
        onClose={onCloseComment}
        enablePanDownToClose={false}
        backgroundStyle={{ borderRadius: normalize.m(10), elevation: 10 }}>
          <BottomSheetComment />
      </BottomSheetApp>
    </Container>
  )
}

export default DetailPost
