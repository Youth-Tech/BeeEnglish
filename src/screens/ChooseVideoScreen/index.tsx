import React from 'react'
import { Block, Container, Text } from '@components'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@navigation'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { normalize } from '@themes'
import VideoItem, {
  VideoItemData,
} from '@screens/ChooseVideoScreen/components/VideoItem'
import VideoComponent from '@screens/ChooseVideoScreen/components/VideoComponent'
import { PostServices } from '@services/PostService'

type ChooseVideoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CHOOSE_VIDEO_SCREEN'
>
const fakeData: VideoItemData[] = [
  {
    id: '1',
    thumbnail:
      'https://images.unsplash.com/photo-1699786663101-de7e9de292f9?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Me and mountains',
    duration: '3:40',
  },
  {
    id: '2',
    thumbnail:
      'https://images.unsplash.com/photo-1699786663101-de7e9de292f9?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Me and mountains',
    duration: '3:40',
  },
  {
    id: '3',
    thumbnail:
      'https://images.unsplash.com/photo-1699786663101-de7e9de292f9?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Me and mountains',
    duration: '3:40',
  },
  {
    id: '4',
    thumbnail:
      'https://images.unsplash.com/photo-1699786663101-de7e9de292f9?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Me and mountains',
    duration: '3:40',
  },
  {
    id: '5',
    thumbnail:
      'https://images.unsplash.com/photo-1699786663101-de7e9de292f9?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Me and mountains',
    duration: '3:40',
  },
  {
    id: '6',
    thumbnail:
      'https://images.unsplash.com/photo-1699786663101-de7e9de292f9?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Me and mountains',
    duration: '3:40',
  },
]
export const ChooseVideoScreen: React.FC<ChooseVideoScreenProps> = (props) => {
  const { t } = useTranslation()
  const [visible, setVisible] = React.useState(false)
  const [videoData, setVideoData] = React.useState<PostResponse[]>([])
  const handleClickItem = () => {
    setVisible(!visible)
  }
  const renderVideoItem = ({
    index,
    item,
  }: ListRenderItemInfo<PostResponse>) => {
    return <VideoItem data={item} index={index} onPress={handleClickItem} />
  }
  const callGetAllVideoAPI = async () => {
    try {
      const response = await PostServices.getAllPost({ type: 'video' })
      setVideoData(response.data.data.posts)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    callGetAllVideoAPI()
  }, [])
  return (
    <Container>
      <Block>
        <ScrollView
          style={{
            backgroundColor: '#F8F8FF',
            paddingHorizontal: normalize.h(20),
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text size={'heading'} fontFamily={'bold'} marginTop={10}>
            {t('learn_with_video')}
          </Text>
          <Block style={{ minHeight: 5, minWidth: 5 }}>
            <FlashList
              data={videoData}
              estimatedItemSize={140}
              renderItem={renderVideoItem}
            />
          </Block>
        </ScrollView>
        {visible && <VideoComponent />}
      </Block>
    </Container>
  )
}
