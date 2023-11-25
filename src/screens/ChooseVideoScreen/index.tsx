import React from 'react'
import { normalize } from '@themes'
import { useAppDispatch } from '@hooks'
import { ScrollView } from 'react-native'
import { updateVideos } from '@redux/reducers'
import { useTranslation } from 'react-i18next'
import { RootStackParamList } from '@navigation'
import { PostServices } from '@services/PostService'
import { Block, Container, Text } from '@components'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import VideoItem from '@screens/ChooseVideoScreen/components/VideoItem'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import VideoComponent from '@screens/ChooseVideoScreen/components/VideoComponent'

type ChooseVideoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CHOOSE_VIDEO_SCREEN'
>

export const ChooseVideoScreen: React.FC<ChooseVideoScreenProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [visible, setVisible] = React.useState(false)
  const [videoData, setVideoData] = React.useState<PostResponse[]>([])
  const [video, setVideo] = React.useState<PostResponse>()
  const handleCloseVideo = () => {
    setVisible(false)
  }
  const handleClickItem = (index: number) => {
    setVisible(false)
    setVideo(videoData[index])
    setVisible(true)
  }
  const renderVideoItem = ({
    index,
    item,
  }: ListRenderItemInfo<PostResponse>) => {
    return (
      <VideoItem
        data={item}
        index={index}
        onPress={() => {
          handleClickItem(index)
        }}
      />
    )
  }
  const callGetAllVideoAPI = async () => {
    try {
      const response = await PostServices.getAllPost({ type: 'video' })
      setVideoData(response.data.data.posts)
      dispatch(updateVideos(response.data.data.posts))
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    callGetAllVideoAPI()
  }, [])

  return (
    <Container statusColor={'#F8F8FF'}>
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
        {visible && video && (
          <VideoComponent
            key={video?._id}
            data={video}
            onPressClose={handleCloseVideo}
          />
        )}
      </Block>
    </Container>
  )
}
