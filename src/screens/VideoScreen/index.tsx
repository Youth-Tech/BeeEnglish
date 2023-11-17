import React from 'react'
import { Block, Container } from '@components'
import { makeStyles, useTheme } from '@themes'
import VideoListItem, {
  VideoListItemProps,
} from '../ChooseVideoScreen/components/VideoListItem'
import { ListRenderItemInfo, View } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import { widthScreen } from '@utils/helpers'
import VideoComponent from '@screens/ChooseVideoScreen/components/VideoComponent'

export interface VideoScreenProps {}
const VideoData: VideoListItemProps[] = [
  {
    id: '1',
    src: 'https://i.guim.co.uk/img/media/fd930767343be91bec31ec23f260c283f0892a27/0_194_7589_4554/master/7589.jpg?width=700&quality=85&auto=format&fit=max&s=8b60154746dbad72fb6092cc21862674',
    title: 'Redefine the skyline: Vietnam Skyline',
    description:
      'Xem bài viết bằng tiếng Anh về câu chuyện hình thành các tòa nhà chọc trời tại Việt Name',
  },
  {
    id: '2',
    src: 'https://i.guim.co.uk/img/media/fd930767343be91bec31ec23f260c283f0892a27/0_194_7589_4554/master/7589.jpg?width=700&quality=85&auto=format&fit=max&s=8b60154746dbad72fb6092cc21862674',
    title: 'Redefine the skyline: Vietnam Skyline',
    description:
      'Xem bài viết bằng tiếng Anh về câu chuyện hình thành các tòa nhà chọc trời tại Việt Name',
  },
  {
    id: '3',
    src: 'https://i.guim.co.uk/img/media/fd930767343be91bec31ec23f260c283f0892a27/0_194_7589_4554/master/7589.jpg?width=700&quality=85&auto=format&fit=max&s=8b60154746dbad72fb6092cc21862674',
    title: 'Redefine the skyline: Vietnam Skyline',
    description:
      'Xem bài viết bằng tiếng Anh về câu chuyện hình thành các tòa nhà chọc trời tại Việt Name',
  },
  {
    id: '4',
    src: 'https://i.guim.co.uk/img/media/fd930767343be91bec31ec23f260c283f0892a27/0_194_7589_4554/master/7589.jpg?width=700&quality=85&auto=format&fit=max&s=8b60154746dbad72fb6092cc21862674',
    title: 'Redefine the skyline: Vietnam Skyline',
    description:
      'Xem bài viết bằng tiếng Anh về câu chuyện hình thành các tòa nhà chọc trời tại Việt Name',
  },
  {
    id: '5',
    src: 'https://i.guim.co.uk/img/media/fd930767343be91bec31ec23f260c283f0892a27/0_194_7589_4554/master/7589.jpg?width=700&quality=85&auto=format&fit=max&s=8b60154746dbad72fb6092cc21862674',
    title: 'Redefine the skyline: Vietnam Skyline',
    description:
      'Xem bài viết bằng tiếng Anh về câu chuyện hình thành các tòa nhà chọc trời tại Việt Name',
  },
]

export const VideoScreen: React.FC<VideoScreenProps> = (props) => {
  const { normalize } = useTheme()
  const scrollX = useSharedValue(0)
  const [recommendData, setRecommendData] =
    React.useState<VideoListItemProps[]>(VideoData)
  const ITEM_SIZE = normalize.h(279)
  const SPACER_ITEM_SIZE = (widthScreen - ITEM_SIZE) / 2
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x
  })

  const renderVideoItemList = ({
    index,
    item,
  }: ListRenderItemInfo<VideoListItemProps>) => {
    if (!item.id) {
      return (
        <View
          key={`item-spacer-${index}`}
          style={{
            width: SPACER_ITEM_SIZE,
            height: 100,
          }}
        />
      )
    }
    return (
      <Block
        key={`item-video-${index}`}
        marginRight={index >= recommendData.length - 2 ? 0 : 10}
      >
        <VideoListItem
          id={item.id}
          title={item.title}
          src={item.src}
          description={item.description}
          onPress={() => {
            console.log('click item:' + item.id)
          }}
          index={index}
          scrollX={scrollX}
        />
      </Block>
    )
  }

  React.useEffect(() => {
    setRecommendData([
      { key: 'left-spacer' },
      ...recommendData,
      { key: 'right-spacer' },
    ])
  }, [])
  return (
    <Container>
      <VideoComponent />
      {/*<Block marginTop={20}>*/}
      {/*  <Animated.FlatList*/}
      {/*    horizontal*/}
      {/*    keyExtractor={(_, index) => `item-video-${index}`}*/}
      {/*    data={recommendData}*/}
      {/*    onScroll={scrollHandler}*/}
      {/*    renderItem={renderVideoItemList}*/}
      {/*    showsHorizontalScrollIndicator={false}*/}
      {/*    scrollEventThrottle={16}*/}
      {/*    decelerationRate={'fast'}*/}
      {/*    snapToAlignment={'start'}*/}
      {/*    snapToInterval={ITEM_SIZE + normalize.v(10)}*/}
      {/*  />*/}
      {/*</Block>*/}
    </Container>
  )
}

const useStyles = makeStyles()(({}) => ({}))
