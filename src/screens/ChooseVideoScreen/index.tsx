import React from 'react'
import { images } from '@assets'
import { UserService } from '@services'
import { useTranslation } from 'react-i18next'
import { updateVideos } from '@redux/reducers'
import { PostServices } from '@services/PostService'
import { useAppDispatch, useAppSelector } from '@hooks'
import { makeStyles, normalize, useTheme } from '@themes'
import { navigate, RootStackParamList } from '@navigation'
import { ScrollView, TouchableOpacity } from 'react-native'
import { ModalFunction } from '@components/bases/Modal/type'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import VideoItem from '@screens/ChooseVideoScreen/components/VideoItem'
import { Block, Container, GuestModal, Image, Modal, Text } from '@components'
import VideoComponent from '@screens/ChooseVideoScreen/components/VideoComponent'

type ChooseVideoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CHOOSE_VIDEO_SCREEN'
>

export const ChooseVideoScreen: React.FC<ChooseVideoScreenProps> = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const styles = useStyle()
  const modalRef = React.useRef<ModalFunction>(null)
  const [visible, setVisible] = React.useState(false)
  const [videoData, setVideoData] = React.useState<PostResponse[]>([])
  const [video, setVideo] = React.useState<PostResponse>()
  const [userCoins, setUserCoins] = React.useState<number>(0)
  const isLoginWithGuest = useAppSelector(
    (state) => state.root.auth.isLoginWithGuest,
  )
  const guestModalRef = React.useRef<ModalFunction>(null)
  const handleCloseVideo = () => {
    setVisible(false)
  }
  const handleClickItem = (index: number) => {
    if (isLoginWithGuest) {
      guestModalRef.current?.openModal()
    } else {
      // if (userCoins < 20) {
      //   modalRef.current?.openModal()
      // } else {
      //   setVisible(false)
      //   setVideo(videoData[index])
      //   setVisible(true)
      //   getCoins()
      // }
      setVisible(false)
      setVideo(videoData[index])
      setVisible(true)
    }
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
  const getCoins = async () => {
    try {
      const response = await UserService.getCoins()
      setUserCoins(response.data.data.coin)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    callGetAllVideoAPI()
    getCoins()
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
      <GuestModal
        ref={guestModalRef}
        position={'center'}
        onButtonPress={() => {
          navigate('REGISTER_SCREEN', { isGuest: true })
          guestModalRef?.current?.dismissModal()
        }}
      />
      <Modal ref={modalRef} position={'center'}>
        <Block
          radius={15}
          height={300}
          paddingTop={41}
          marginBottom={30}
          marginHorizontal={20}
          backgroundColor={colors.white}
        >
          <Block alignCenter>
            <Image
              style={styles.image}
              source={images.BeeSad}
              resizeMode={'contain'}
            />
            <Text
              size={'h2'}
              fontFamily={'semiBold'}
              color={colors.black}
              marginTop={15}
              center
            >
              {t('you_need_at_least_honey', { val: 20 })}
            </Text>
            <Text size={'h5'} fontFamily={'bold'} marginTop={12.77} center>
              {t('subscribe_to_premium_for_more_perks')}
            </Text>
          </Block>

          <Block row space={'between'} paddingHorizontal={20} marginTop={15}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.orangePrimary }]}
              onPress={() => {
                navigate('SUBSCRIPTION_SCREEN')
                modalRef.current?.dismissModal()
              }}
            >
              <Text size={'h2'} fontFamily={'semiBold'} color={colors.white}>
                {t('subscribe')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                modalRef.current?.dismissModal()
              }}
            >
              <Text size={'h2'} fontFamily={'semiBold'} color={colors.greyDark}>
                {t('later')}
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </Modal>
    </Container>
  )
}
const useStyle = makeStyles()(({ colors, normalize }) => ({
  image: {
    width: normalize.h(89),
    height: normalize.h(98),
  },
  button: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.greyLight,
    width: normalize.h(128.7),
    height: normalize.h(41.8),
    borderRadius: normalize.m(10),
  },
}))
