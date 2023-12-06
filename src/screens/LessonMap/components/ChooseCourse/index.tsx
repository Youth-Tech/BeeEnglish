import Animated, {
  SlideInUp,
  SlideOutUp,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated'
import React from 'react'
import { Portal } from 'react-native-portalize'
import { ListRenderItemInfo, Pressable, StyleSheet } from 'react-native'

import { Icon } from '@assets'
import { useTheme } from '@themes'
import { CourseItem } from './CourseItem'
import { getCurrentCourse } from '@redux/selectors'
import { Course, KnowledgeService } from '@services'
import { updateCurrentCourse } from '@redux/reducers'
import { Block, BlockAnimated, Text } from '@components'
import { heightScreen, widthScreen } from '@utils/helpers'
import {useAppDispatch, useAppSelector, useBackHandler} from '@hooks'
import { CourseImage, Indicator} from '@screens/LessonMap/components'

interface ICourseItem {
  type: 'spacer' | 'data'
  data?: Course
}

export const COURSE_ITEM_WIDTH = widthScreen * 0.74
export const SPACING = 10
export const EMPTY_ITEM_SIZE = (widthScreen - COURSE_ITEM_WIDTH) / 2

export const ChooseCourse = () => {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const currentCourse = useAppSelector(getCurrentCourse)

  const animatedControl = useSharedValue(0)

  const [visible, setVisible] = React.useState(false)
  const [courseList, setCourseList] = React.useState<Array<ICourseItem>>([])

  useBackHandler({
    enabled: visible,
    callback(){
      setVisible(false)
    }
  })

  React.useEffect(() => {
    const callCourse = async () => {
      try {
        const res = await KnowledgeService.getAlCourse()
        if (res.status === 200) {
          const arr: Array<ICourseItem> = [
            { type: 'spacer' },
            ...(res.data.data.courses.map((item) => ({
              type: 'data',
              data: item,
            })) as Array<ICourseItem>),
            { type: 'spacer' },
          ]
          setCourseList(arr)
          dispatch(updateCurrentCourse(res.data.data.courses?.[0]))
        }
      } catch (e) {
        console.log(e)
      }
    }

    callCourse()
  }, [])

  const onScrollHandler = useAnimatedScrollHandler((e) => {
    animatedControl.value = e.contentOffset.x
  })

  const onPress = () => {
    setVisible(true)
  }

  const onItemPress = (item: ICourseItem) => {
    if (item.data !== undefined) {
      dispatch(updateCurrentCourse(item.data))
      setVisible(false)

      //reset animated value
      if (animatedControl.value !== 0) {
        animatedControl.value = 0
      }
    }
  }

  const renderCourseList = ({
    item,
    index,
  }: ListRenderItemInfo<ICourseItem>) => {
    if (item.data !== undefined) {
      return (
        <CourseItem
          key={index}
          index={index}
          data={item.data}
          animatedControl={animatedControl}
          onItemPress={() => onItemPress(item)}
        />
      )
    }

    return <Block style={styles.spacer} />
  }

  if (courseList.length <= 0) {
    return <></>
  }

  return (
    <>
      <Pressable onPress={onPress}>
        <Block
          row
          radius={8}
          alignCenter
          height={50}
          width={'100%'}
          marginBottom={10}
          paddingHorizontal={15}
          backgroundColor={'#70773A'}
        >
          <Icon state={'RightArrow'} rotation={-90} stroke={colors.white} />
          <Text
            flex
            center
            size={'h3'}
            fontFamily={'bold'}
            color={colors.white}
          >
            {currentCourse?.name ?? ''}
          </Text>
          <Block width={24} />
        </Block>
      </Pressable>
      {visible && (
        <Portal>
          <BlockAnimated
            flex
            paddingTop={30}
            paddingBottom={10}
            backgroundColor={'#f3f3f3'}
            entering={SlideInUp.springify().damping(200)}
            exiting={SlideOutUp.springify().damping(200)}
          >
            <Block
              width={150}
              alignCenter
              height={150}
              justifyCenter
              alignSelf={'center'}
              marginTop={heightScreen * 0.1}
            >
              {courseList.length > 0 &&
                courseList.map((item, index) => {
                  if (item.type === 'data') {
                    return (
                      <CourseImage
                        key={index}
                        width={150}
                        height={150}
                        index={index}
                        src={item.data?.attachment.src}
                        animatedControl={animatedControl}
                      />
                    )
                  }

                  return null
                })}
            </Block>
            <Block flex />
            <Animated.FlatList
              horizontal
              bounces={false}
              data={courseList}
              style={styles.listStyle}
              scrollEventThrottle={16}
              overScrollMode={'never'}
              snapToAlignment={'start'}
              onScroll={onScrollHandler}
              decelerationRate={'normal'}
              renderItem={renderCourseList}
              renderToHardwareTextureAndroid
              snapToInterval={COURSE_ITEM_WIDTH}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listContainerStyle}
            />
            <Block row alignSelf={'center'} gap={5} marginBottom={10}>
              {courseList.length > 0 &&
                courseList.map((item, index) => {
                  if (item.type === 'data') {
                    return (
                      <Indicator
                        key={index}
                        index={index}
                        animatedControl={animatedControl}
                      />
                    )
                  }
                  return null
                })}
            </Block>
          </BlockAnimated>
        </Portal>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  spacer: {
    width: EMPTY_ITEM_SIZE,
  },
  listContainerStyle: { alignItems: 'center' },
  listStyle: { marginTop: 20 },
})
