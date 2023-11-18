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

export interface VideoComponentProps {}
const script = [
  {
    start: '0.159',
    end: '1.99',
    subtitle: 'Different ways to say.',
  },
  {
    start: '2.0',
    end: '3.75',
    subtitle: 'Could you repeat please?',
  },
  {
    start: '3.759',
    end: '5.309',
    subtitle: 'In English language?',
  },
  {
    start: '7.05',
    end: '8.159',
    subtitle: 'I beg your pardon?',
  },
  {
    start: '8.289',
    end: '9.31',
    subtitle: "I'm sorry,",
  },
  {
    start: '9.319',
    end: '10.97',
    subtitle: "I didn't catch that.",
  },
  {
    start: '11.0',
    end: '12.029',
    subtitle: 'Excuse me?',
  },
  {
    start: '12.039',
    end: '15.047',
    subtitle: 'Could you repeat please come again.',
  },
]
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const AnimatedLineSvg = Animated.createAnimatedComponent(Rect)
const VideoComponent: React.FC<VideoComponentProps> = (props) => {
  const { colors, normalize } = useTheme()
  const [widthSvg, setWidthSvg] = React.useState<number>(0)
  const progressStepValue = useSharedValue(0)
  const _strokeHeight = normalize.v(5)
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])
  let currentIndex = 0
  const subtitleListRef = React.useRef<FlatList>(null)
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
      runOnJS(forceUpdate)()
    }
    if (offset.value < height / 2) {
      offset.value = withTiming(0)
      runOnJS(forceUpdate)()
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
  // const renderSubtitleItem = ({
  //   index,
  //   item,
  // }: ListRenderItemInfo<SubtitleItemProps>) => {
  //   return (
  //     <Block marginLeft={5}>
  //       <SubtitleItem
  //         subtitle={item.subtitle}
  //         positionText={`${index + 1}/${script.length}`}
  //       />
  //     </Block>
  //   )
  // }
  const handleClickNext = (index: number) => {
    handleSeek(Number(script[index].start))
    progressStepValue.value = Number(script[index].start) * (100 / 15.047)
    if (index === script.length - 1) return
    subtitleListRef.current?.scrollToIndex({
      index: index + 1,
      animated: true,
    })
  }
  const handleClickPrevious = (index: number) => {
    handleSeek(Number(script[index].start))
    progressStepValue.value = Number(script[index].start) * (100 / 15.047)
    if (index === 0) return
    subtitleListRef.current?.scrollToIndex({
      index: index - 1,
      animated: true,
    })
  }
  const handleSeek = (seconds: number) => {
    videoRef.current?.seek(seconds)
  }
  const onMomentumEndDrag = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / normalize.h(340),
    )
    console.log(index)
    handleSeek(Number(script[index].start))
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
      <Block paddingTop={getStatusBarHeight()}>
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
                  }}
                  source={{
                    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
                  }}
                  ref={videoRef}
                  onBuffer={onBuffer}
                  onError={onError}
                  style={[styles.video]}
                  repeat={true}
                  resizeMode={'cover'}
                  paused={isPaused}
                  onProgress={(data) => {
                    console.log(data.currentTime)
                    if (data.currentTime >= Number(script[currentIndex].end)) {
                      subtitleListRef.current?.scrollToIndex({
                        index: currentIndex,
                        animated: false,
                      })
                      if (currentIndex === script.length - 1) {
                        console.log('oke')
                        currentIndex = 0
                      } else {
                        currentIndex++
                      }
                      // console.log(currentIndex)
                    }
                    progressStepValue.value =
                      data.currentTime * (100 / data.playableDuration)
                  }}
                  onSeek={(data) => {
                    console.log('current time' + data.currentTime)
                    console.log('seektime' + data.seekTime)
                    console.log('target' + data.target)
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
                      Me and mountains
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
                    <Block>
                      <SubtitleItem
                        subtitle={item.subtitle}
                        positionText={`${index + 1}/${script.length}`}
                        onPressNext={() => {
                          handleClickNext(index)
                        }}
                        onPressPrevious={() => {
                          handleClickPrevious(index)
                        }}
                      />
                    </Block>
                  )
                }}
                scrollEventThrottle={16}
                snapToAlignment={'center'}
                pagingEnabled
                onMomentumScrollEnd={onMomentumEndDrag}
              />
            </BlockAnimated>
          </BlockAnimated>
        </GestureDetector>
      </Block>
    </Portal>
  )
}
export default VideoComponent
const styles = StyleSheet.create({
  video: {
    aspectRatio: 1920 / 1080,
  },
})
