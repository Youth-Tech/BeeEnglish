import React from 'react'
import { Block, BlockAnimated, Text } from '@components'
import Video from 'react-native-video'
import { Pressable, StyleSheet } from 'react-native'
import { heightWindow, widthScreen } from '@utils/helpers'
import { baseStyles, useTheme } from '@themes'
import BackButton from '@screens/ChooseVideoScreen/components/BackButton'
import PlayIcon from '@assets/icons/PlayIcon'
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  runOnJS,
  SlideInDown,
  SlideOutDown,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {
  FlatList,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler'
import { Icon } from '@assets'
import { getStatusBarHeight } from '@components/bases/StatusBar/status_bar_height'
import { handleColor } from '@components/utils'
import { G, Rect, Svg } from 'react-native-svg'
import { Portal } from 'react-native-portalize'
import SubtitleItem from '@screens/ChooseVideoScreen/components/SubtitleItem'
import { NativeSyntheticEvent } from 'react-native/Libraries/Types/CoreEventTypes'
import { NativeScrollEvent } from 'react-native/Libraries/Components/ScrollView/ScrollView'
import memoizeOne from 'memoize-one'

export interface VideoComponentProps {
  data: PostResponse
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const AnimatedLineSvg = Animated.createAnimatedComponent(Rect)
const VideoComponent: React.FC<VideoComponentProps> = (props) => {
  const { data } = props
  const { colors, normalize } = useTheme()
  const [script, setScript] = React.useState(data.attachments[0].script)
  const [widthSvg, setWidthSvg] = React.useState<number>(0)
  const progressStepValue = useSharedValue(0)
  const _strokeHeight = normalize.v(5)
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])
  const currentIndex = React.useRef<number>(0)
  const subtitleListRef = React.useRef<FlatList>(null)
  const [duration, setDuration] = React.useState<number>(0)
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

  const panGesture = Gesture.Pan().onChange((event) => {
    offset.value = offset.value + event.changeY
    if (offset.value > height / 2) {
      offset.value = withTiming(height)
    }
    if (offset.value < height / 2) {
      offset.value = withTiming(0)
    }
    if (offset.value >= height) offset.value = height
    if (offset.value <= 0) offset.value = 0
    console.log(offset.value)
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
    console.log('hello')
  }, [offset.value])
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

  return (
    <Portal>
      <BlockAnimated
        entering={SlideInDown}
        exiting={SlideOutDown}
        paddingTop={getStatusBarHeight()}
      >
        <GestureDetector gesture={panGesture}>
          <BlockAnimated style={[translateY]}>
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
                    console.log('duration:' + data.duration)
                    setDuration(data.duration)
                  }}
                  source={{
                    uri: data.attachments[0].src,
                  }}
                  ref={videoRef}
                  onBuffer={onBuffer}
                  onError={onError}
                  style={[styles.video]}
                  // repeat={true}

                  resizeMode={'cover'}
                  paused={isPaused}
                  onEnd={() => {
                    currentIndex.current = 0
                    scrollToIndex(currentIndex.current)
                    videoRef.current?.seek(0)
                  }}
                  onProgress={(data) => {
                    // console.log(data.currentTime)
                    if (isPaused === false) {
                      progressStepValue.value =
                        data.currentTime * (100 / data.playableDuration)
                      if (
                        data.currentTime >=
                          Number(script[currentIndex.current].start) &&
                        currentIndex.current < script.length - 1
                      ) {
                        currentIndex.current++
                        console.log(currentIndex.current)
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
                {offset.value === height && (
                  <>
                    <Text size={'h3'} color={'white'}>
                      {data.english}
                    </Text>
                    <Icon state={'Delete'} fill={colors.white} />
                  </>
                )}
              </Block>
            </Block>
            <VideoProgress />
            <BlockAnimated
              height={'100%'}
              style={[opacityAnimate]}
              backgroundColor={'white'}
            >
              <FlatList
                ref={subtitleListRef}
                horizontal
                data={script}
                renderItem={({ item, index }) => {
                  return (
                    <SubtitleItem
                      subtitle={item.content}
                      positionText={`${index + 1}/${script.length}`}
                      onPressNext={() => {
                        handleClickNext(index)
                      }}
                      onPressPrevious={() => {
                        handleClickPrevious(index)
                      }}
                    />
                  )
                }}
                scrollEventThrottle={16}
                snapToAlignment={'center'}
                snapToInterval={normalize.h(340)}
                onMomentumScrollEnd={onMomentumEndDrag}
              />
            </BlockAnimated>
          </BlockAnimated>
        </GestureDetector>
      </BlockAnimated>
    </Portal>
  )
}
export default VideoComponent
const styles = StyleSheet.create({
  video: {
    aspectRatio: 1920 / 1080,
  },
})
