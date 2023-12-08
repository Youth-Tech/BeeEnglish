import React from 'react'
import Video from 'react-native-video'
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  runOnJS,
  SlideInDown,
  SlideOutDown,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Icon, images } from '@assets'
import memoizeOne from 'memoize-one'
import { useAppSelector } from '@hooks'
import { navigate } from '@navigation'
import FilmIcon from '@assets/icons/FilmIcon'
import PlayIcon from '@assets/icons/PlayIcon'
import { useTranslation } from 'react-i18next'
import { handleColor } from '@components/utils'
import { Portal } from 'react-native-portalize'
import { G, Rect, Svg } from 'react-native-svg'
import { PostServices, UserService } from '@services'
import { baseStyles, makeStyles, useTheme } from '@themes'
import { heightWindow, widthScreen } from '@utils/helpers'
import { ModalFunction } from '@components/bases/Modal/type'
import { Block, BlockAnimated, Image, Modal, Text } from '@components'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import SubtitleItem from '@screens/ChooseVideoScreen/components/SubtitleItem'
import VideoListItem from '@screens/ChooseVideoScreen/components/VideoListItem'
import { getStatusBarHeight } from '@components/bases/StatusBar/status_bar_height'
import { NativeSyntheticEvent } from 'react-native/Libraries/Types/CoreEventTypes'
import { NativeScrollEvent } from 'react-native/Libraries/Components/ScrollView/ScrollView'

export interface VideoComponentProps {
  data: PostResponse
  onPressClose?: () => void
}
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const AnimatedLineSvg = Animated.createAnimatedComponent(Rect)
const VideoComponent: React.FC<VideoComponentProps> = (props) => {
  const { data, onPressClose } = props
  const { colors, normalize } = useTheme()
  const _strokeHeight = normalize.v(5)
  const styles = useStyle()
  const modalRef = React.useRef<ModalFunction>(null)
  const scrollX = useSharedValue(0)
  const { t } = useTranslation()
  const progressStepValue = useSharedValue(0)
  const currentIndex = React.useRef<number>(0)
  const subtitleListRef = React.useRef<FlatList>(null)
  const [userCoins, setUserCoins] = React.useState(0)
  const [widthSvg, setWidthSvg] = React.useState<number>(0)
  const [duration, setDuration] = React.useState<number>(0)
  const [visibleName, setVisibleName] = React.useState(false)
  const [videoData, setVideoData] = React.useState<PostResponse>(data)
  const videos = useAppSelector((state) => state.root.videoReducer.videos)
  const [visibleVideo, setVisibleVideo] = React.useState(false)
  const ITEM_SIZE = normalize.h(279)
  const SPACER_ITEM_SIZE = (widthScreen - ITEM_SIZE) / 2
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x
  })

  const animatedProps = useAnimatedProps(() => {
    return {
      width: `${progressStepValue.value}%`,
    }
  }, [])

  const videoRef = React.useRef<Video>(null)
  const [isPaused, setIsPaused] = React.useState(false)
  const offset = useSharedValue(0)
  const onBuffer = () => {
    console.log('Buffered')
  }
  const onError = (e) => {
    console.log('Error' + JSON.stringify(e))
  }
  const handlePause = () => {
    setIsPaused(!isPaused)
  }
  const height = heightWindow - (getStatusBarHeight() + 90)
  const handleVisibleName = (state: boolean) => {
    setVisibleName(state)
  }
  const panGesture = Gesture.Pan()
    .onChange((event) => {
      console.log(offset.value)
      offset.value = offset.value + event.changeY
      if (offset.value > height / 2) {
        offset.value = withTiming(height)
      }
      if (offset.value < height / 2) {
        offset.value = withTiming(0)
      }
      if (offset.value >= height) {
        offset.value = height
      }
      if (offset.value <= 0) {
        offset.value = 0
      }
    })
    .onEnd(() => {
      if (offset.value < height / 2) {
        runOnJS(handleVisibleName)(false)
      } else if (offset.value > height / 2) {
        runOnJS(handleVisibleName)(true)
      }
    })
  const translateY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset.value }],
    }
  })
  const widthAnimate = useAnimatedStyle(() => {
    const width = interpolate(
      offset.value,
      [0, height],
      [widthScreen, 150],
      Extrapolation.CLAMP,
    )
    return {
      width: width,
    }
  })
  const opacityAnimate = useAnimatedStyle(() => {
    const opacity = interpolate(
      offset.value,
      [0, height],
      [1, 0],
      Extrapolation.CLAMP,
    )
    return {
      opacity,
    }
  })

  const handleClickNext = (index: number) => {
    if (index === videoData.attachments[0].script!.length - 1) return
    handleSeek(Number(videoData.attachments[0].script![index + 1].start))
    subtitleListRef.current?.scrollToIndex({
      index: index + 1,
      animated: true,
    })
  }
  const handleClickPrevious = (index: number) => {
    if (index === 0) return
    handleSeek(Number(videoData.attachments[0].script![index - 1].start))
    subtitleListRef.current?.scrollToIndex({
      index: index - 1,
      animated: true,
    })
  }
  const handleSeek = memoizeOne((seconds: number) => {
    setIsPaused(true)
    videoRef.current?.seek(seconds)
    progressStepValue.value = seconds * (100 / duration)
  })
  const onMomentumEndDrag = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / normalize.h(340),
    )
    handleSeek(Number(videoData.attachments[0].script![index].start))
  }
  const scrollToIndex = (_: number) => {
    subtitleListRef.current?.scrollToIndex({
      index: currentIndex.current,
      animated: true,
    })
  }

  const VideoProgress = () => {
    return (
      <Block width={'100%'} height={_strokeHeight} alignCenter justifyCenter>
        <Block
          width={'100%'}
          onLayout={(e) => {
            setWidthSvg(e.nativeEvent.layout.width)
          }}
        >
          <Svg height={_strokeHeight} width={widthSvg}>
            <G>
              <Rect
                width={'100%'}
                height={_strokeHeight}
                fill={handleColor(colors, 'greyLight')}
              />

              <AnimatedLineSvg
                animatedProps={animatedProps}
                height={_strokeHeight}
                fill={handleColor(colors, 'red')}
              />
            </G>
          </Svg>
        </Block>
      </Block>
    )
  }

  const renderVideoItemList = ({
    index,
    item,
  }: ListRenderItemInfo<PostResponse>) => {
    return (
      <Block
        key={`item-video-${index}`}
        marginRight={index === videos.length - 1 ? SPACER_ITEM_SIZE : 10}
        marginLeft={index === 0 ? SPACER_ITEM_SIZE : 0}
        style={[
          index === videos.length - 1
            ? { marginEnd: SPACER_ITEM_SIZE }
            : { marginEnd: normalize.v(10) },
          index === 0 ? { marginStart: SPACER_ITEM_SIZE } : {},
        ]}
      >
        <VideoListItem
          id={item._id}
          title={item.title}
          src={item.attachments[0].thumbnail}
          description={item.note}
          onPress={() => {
            if (userCoins < 20) {
              modalRef.current?.openModal()
            } else {
              setIsPaused(true)
              setVisibleVideo(false)
              setVideoData(item)
              videoRef.current?.seek(0)
              currentIndex.current = 0
              subtitleListRef.current?.scrollToIndex({
                index: 0,
                animated: true,
              })
              setTimeout(() => {
                setVisibleVideo(true)
                setIsPaused(false)
              }, 1000)
            }
          }}
          index={index}
          scrollX={scrollX}
        />
      </Block>
    )
  }
  const getCoins = async () => {
    try {
      const response = await UserService.getCoins()
      setUserCoins(response.data.data.coin)
    } catch (e) {
      console.log(e)
    }
  }
  const callAPIMarkAsRead = async (postId: string) => {
    try {
      const response = await PostServices.markAsRead(postId)
      console.log(response.data.message)
    } catch (e) {
      console.log(e)
    }
  }
  const handleVisibleVideo = (finished: boolean) => {
    'worklet'
    if (finished) {
      runOnJS(setVisibleVideo)(true)
    }
  }
  React.useEffect(() => {
    callAPIMarkAsRead(videoData._id)
    getCoins()
  }, [videoData])
  return (
    <Portal>
      <BlockAnimated
        entering={SlideInDown.withCallback(handleVisibleVideo)}
        exiting={SlideOutDown}
        style={[{ paddingTop: getStatusBarHeight() }, translateY]}
      >
        <Block>
          <GestureDetector gesture={panGesture}>
            <Block row>
              {visibleVideo ? (
                <AnimatedPressable onPress={handlePause} style={[widthAnimate]}>
                  <Block
                    style={baseStyles.absoluteFill}
                    backgroundColor={
                      isPaused ? 'rgba(0,0,0,0.5)' : 'transparent'
                    }
                    zIndex={1}
                    padding={10}
                  >
                    {isPaused && (
                      <BlockAnimated flex entering={FadeIn} exiting={FadeOut}>
                        <Block
                          style={baseStyles.absoluteFill}
                          justifyCenter
                          alignCenter
                        >
                          <PlayIcon />
                        </Block>
                      </BlockAnimated>
                    )}
                  </Block>
                  <Block
                    style={baseStyles.absoluteFill}
                    backgroundColor={colors.black}
                    padding={10}
                  />
                  <Video
                    onLoad={(data) => {
                      console.log('called')
                      setDuration(data.duration)
                      // setVisibleVideo(true)
                    }}
                    source={{
                      uri: videoData.attachments[0].src,
                      type: 'm3u8',
                    }}
                    ref={videoRef}
                    onBuffer={onBuffer}
                    onError={onError}
                    style={[styles.video]}
                    resizeMode={'contain'}
                    paused={isPaused}
                    onEnd={() => {
                      currentIndex.current = 0
                      scrollToIndex(currentIndex.current)
                      videoRef.current?.seek(0)
                    }}
                    onProgress={(data) => {
                      if (isPaused === false) {
                        progressStepValue.value =
                          data.currentTime * (100 / data.playableDuration)
                        if (
                          data.currentTime >=
                            Number(
                              videoData.attachments[0].script![
                                currentIndex.current
                              ].end,
                            ) &&
                          currentIndex.current <
                            videoData.attachments[0].script!.length - 1
                        ) {
                          currentIndex.current++
                          scrollToIndex(currentIndex.current)
                        }
                      }
                    }}
                  />
                </AnimatedPressable>
              ) : (
                <BlockAnimated
                  style={[styles.video, widthAnimate]}
                  alignCenter
                  justifyCenter
                  backgroundColor={colors.black}
                >
                  <ActivityIndicator size={'large'} color={colors.white} />
                </BlockAnimated>
              )}

              <Block
                flex
                row
                space={'between'}
                alignCenter
                backgroundColor={'black'}
                paddingHorizontal={10}
              >
                {visibleName && (
                  <>
                    <Text size={'h3'} color={'white'}>
                      {videoData.title}
                    </Text>
                    <Icon
                      state={'Delete'}
                      fill={colors.white}
                      onPress={onPressClose}
                    />
                  </>
                )}
              </Block>
            </Block>
          </GestureDetector>
          <VideoProgress />
        </Block>

        <Animated.ScrollView
          style={[opacityAnimate]}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: 'white',
          }}
        >
          {visibleVideo ? (
            <FlatList
              ref={subtitleListRef}
              keyExtractor={(_, index) => `item-subtitle-${index}`}
              horizontal
              data={videoData.attachments[0].script}
              pagingEnabled
              renderItem={({ item, index }) => {
                return (
                  <Block marginHorizontal={5} key={`item-${index}`}>
                    <SubtitleItem
                      subtitle={item.content}
                      positionText={`${index + 1}/${
                        videoData.attachments[0].script!.length
                      }`}
                      onPressNext={() => {
                        handleClickNext(index)
                      }}
                      onPressPrevious={() => {
                        handleClickPrevious(index)
                      }}
                      onPressRewind={() => {
                        const seconds = Number(
                          videoData.attachments[0].script![index].start,
                        )
                        videoRef.current?.seek(seconds)
                        progressStepValue.value = seconds * (100 / duration)
                      }}
                    />
                  </Block>
                )
              }}
              scrollEventThrottle={16}
              onMomentumScrollEnd={onMomentumEndDrag}
            />
          ) : (
            <Block height={240} alignCenter justifyCenter>
              <ActivityIndicator size={'large'} color={colors.black} />
            </Block>
          )}
          <Block row alignCenter paddingHorizontal={20} marginTop={10}>
            <FilmIcon />
            <Text size={'h3'} fontFamily={'bold'} marginLeft={10}>
              {t('good_videos')}
            </Text>
          </Block>
          <Animated.FlatList
            horizontal
            keyExtractor={(_, index) => index.toString()}
            data={videos}
            onScroll={scrollHandler}
            renderItem={renderVideoItemList}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            decelerationRate={'fast'}
            snapToAlignment={'start'}
            contentContainerStyle={{
              marginTop: normalize.v(20),
              height: normalize.h(350) + 50,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
            snapToInterval={ITEM_SIZE + normalize.v(10)}
          />
          <Block height={200}></Block>
        </Animated.ScrollView>
      </BlockAnimated>
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
    </Portal>
  )
}
export default React.memo(VideoComponent)

const useStyle = makeStyles()(({ colors, normalize }) => ({
  video: {
    aspectRatio: 1920 / 1080,
  },
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
