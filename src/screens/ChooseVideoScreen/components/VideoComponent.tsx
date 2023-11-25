import React from 'react'
import Video from 'react-native-video'
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'
import PlayIcon from '@assets/icons/PlayIcon'
import { baseStyles, useTheme } from '@themes'
import { Block, BlockAnimated, Text } from '@components'
import { heightWindow, widthScreen } from '@utils/helpers'
import BackButton from '@screens/ChooseVideoScreen/components/BackButton'
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
import { Icon } from '@assets'
import memoizeOne from 'memoize-one'
import { useAppSelector } from '@hooks'
import FilmIcon from '@assets/icons/FilmIcon'
import { useTranslation } from 'react-i18next'
import { handleColor } from '@components/utils'
import { G, Rect, Svg } from 'react-native-svg'
import { Portal } from 'react-native-portalize'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import SubtitleItem from '@screens/ChooseVideoScreen/components/SubtitleItem'
import { getStatusBarHeight } from '@components/bases/StatusBar/status_bar_height'
import { NativeSyntheticEvent } from 'react-native/Libraries/Types/CoreEventTypes'
import { NativeScrollEvent } from 'react-native/Libraries/Components/ScrollView/ScrollView'
import VideoListItem from '@screens/ChooseVideoScreen/components/VideoListItem'

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
  const scrollX = useSharedValue(0)
  const { t } = useTranslation()
  const progressStepValue = useSharedValue(0)
  const currentIndex = React.useRef<number>(0)
  const subtitleListRef = React.useRef<FlatList>(null)
  const [widthSvg, setWidthSvg] = React.useState<number>(0)
  const [duration, setDuration] = React.useState<number>(0)
  const [visibleName, setVisibleName] = React.useState(false)
  const [videoData, setVideoData] = React.useState<PostResponse>(data)
  const [componentKey, setComponentKey] = React.useState(0)
  const [script, setScript] = React.useState(
    videoData.attachments[0].script ?? [],
  )
  const videos = useAppSelector((state) => state.root.videoReducer.videos)
  const [recommendData, setRecommendData] =
    React.useState<PostResponse[]>(videos)
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
    .onEnd((event) => {
      if (offset.value < height / 2) {
        console.log('to 0')
        runOnJS(handleVisibleName)(false)
      } else if (offset.value > height / 2) {
        console.log('to height')
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
    if (index === script.length - 1) return
    handleSeek(Number(script[index + 1].start))
    subtitleListRef.current?.scrollToIndex({
      index: index + 1,
      animated: true,
    })
  }
  const handleClickPrevious = (index: number) => {
    if (index === 0) return
    handleSeek(Number(script[index - 1].start))
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
    handleSeek(Number(script[index].start))
  }
  const scrollToIndex = (index: number) => {
    subtitleListRef.current?.scrollToIndex({
      index: currentIndex.current,
      animated: true,
    })
  }
  React.useEffect(() => {
    console.log(videoData)
  }, [videoData])
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
              {/* Background Line */}
              <Rect
                width={'100%'}
                height={_strokeHeight}
                fill={handleColor(colors, 'greyLight')}
              />

              {/* Progress Line */}
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
    if (!item._id) {
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
          id={item._id}
          title={item.title}
          src={item.attachments[0].thumbnail}
          description={item.note}
          onPress={() => {
            const newVideo = { ...item }
            setVideoData(newVideo)
          }}
          index={index}
          scrollX={scrollX}
        />
      </Block>
    )
  }
  const handleForceRender = () => {
    // Update the component key to force re-render
    setComponentKey((prevKey) => prevKey + 1)
  }
  React.useEffect(() => {
    setRecommendData([
      { key: 'left-spacer' },
      ...recommendData,
      { key: 'right-spacer' },
    ])
  }, [])
  // React.useEffect(() => {
  //   setScript(videoData.attachments[0].script ?? [])
  //   handleForceRender()
  // }, [videoData])
  return (
    <Portal key={componentKey}>
      <BlockAnimated
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={[{ paddingTop: getStatusBarHeight() }, translateY]}
      >
        <Block>
          <GestureDetector gesture={panGesture}>
            <Block row>
              <AnimatedPressable onPress={handlePause} style={[widthAnimate]}>
                <Block
                  style={baseStyles.absoluteFill}
                  backgroundColor={isPaused ? 'rgba(0,0,0,0.5)' : 'transparent'}
                  zIndex={1}
                  padding={10}
                >
                  {isPaused && (
                    <BlockAnimated flex entering={FadeIn} exiting={FadeOut}>
                      <BackButton onPress={() => {}} />
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
                <Video
                  onLoad={(data) => {
                    setDuration(data.duration)
                  }}
                  source={{
                    uri: videoData.attachments[0].src,
                    type: 'm3u8',
                  }}
                  ref={videoRef}
                  onBuffer={onBuffer}
                  onError={onError}
                  style={[styles.video]}
                  resizeMode={'cover'}
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
                          Number(script[currentIndex.current].end) &&
                        currentIndex.current < script.length - 1
                      ) {
                        currentIndex.current++
                        scrollToIndex(currentIndex.current)
                      }
                    }
                  }}
                />
              </AnimatedPressable>
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
          <FlatList
            ref={subtitleListRef}
            keyExtractor={(_, index) => `item-subtitle-${index}`}
            horizontal
            data={script}
            pagingEnabled
            renderItem={({ item, index }) => {
              return (
                <Block marginHorizontal={5} key={`item-${index}`}>
                  <SubtitleItem
                    subtitle={item.content}
                    positionText={`${index + 1}/${script.length}`}
                    onPressNext={() => {
                      handleClickNext(index)
                    }}
                    onPressPrevious={() => {
                      handleClickPrevious(index)
                    }}
                    onPressRewind={() => {
                      const seconds = Number(script[index].start)
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
          <Block row alignCenter paddingHorizontal={20} marginTop={10}>
            <FilmIcon />
            <Text size={'h3'} fontFamily={'bold'} marginLeft={10}>
              {t('good_videos')}
            </Text>
          </Block>
          <Animated.FlatList
            horizontal
            keyExtractor={(_, index) => index.toString()}
            data={recommendData}
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
    </Portal>
  )
}
export default React.memo(VideoComponent)
const styles = StyleSheet.create({
  video: {
    aspectRatio: 1920 / 1080,
  },
})
