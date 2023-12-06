import React from 'react'
import {
  SharedValue,
  interpolate,
  Extrapolation,
  useAnimatedStyle,
} from 'react-native-reanimated'
import {StyleSheet} from "react-native";
import { useTranslation } from 'react-i18next'

import { Course } from '@services'
import { useTheme } from '@themes'
import {COURSE_ITEM_WIDTH, SPACING} from '@screens/LessonMap/components'
import { Block, BlockAnimated, Progress, ShadowButton, Text } from '@components'

export interface CourseItemProps {
  data: Course
  index: number
  onItemPress?: () => void
  animatedControl: SharedValue<number>
}

export const CourseItem = ({
  data,
  index,
  onItemPress,
  animatedControl,
}: CourseItemProps) => {
  const { colors, normalize } = useTheme()
  const { t } = useTranslation()

  const itemStyle = useAnimatedStyle(() => {
    const scaleY = interpolate(
      animatedControl.value,
      [
        (index - 2) * COURSE_ITEM_WIDTH,
        (index - 1) * COURSE_ITEM_WIDTH,
        index * COURSE_ITEM_WIDTH,
      ],
      [0.9, 1, 0.9],
      Extrapolation.CLAMP,
    )
    return {
      transform: [{ scaleY }],
    }
  })

  return (
    <Block
      style={styles.itemContainer}
    >
      <BlockAnimated
        radius={20}
        height={250}
        padding={SPACING}
        backgroundColor={'#F4B80A'}
        style={[itemStyle, { marginHorizontal: SPACING }]}
      >
        <Text center color={colors.white} size={'h2'} fontFamily={'bold'}>
          {data.name}
        </Text>

        <Text
          center
          marginTop={10}
          fontFamily={'semiBold'}
          color={colors.white}
        >
          {data.completed.toString().concat(' ')}
          <Text fontFamily={'semiBold'} color={colors.white}>
            / {data.chapters} {t('chapter')}
          </Text>
        </Text>

        <Progress
          totalSteps={100}
          step={data?.progress || 0}
          stepColor={colors.orangeDark + 90}
          totalStepsColor={colors.orangeLighter}
          progressContainerStyles={{
            marginTop: normalize.v(15),
          }}
        />

        <Text
          center
          color={colors.white}
          marginTop={15}
          fontFamily={'semiBold'}
        >
          {data.description}
        </Text>
        <Block flex />

        <ShadowButton
          shadowHeight={7}
          buttonHeight={35}
          buttonRadius={10}
          buttonColor="#58CC02"
          onPress={onItemPress}
          disabled={!data.status}
          shadowButtonColor="#58A700"
          containerStyle={{
            marginTop: normalize.v(25),
          }}
        >
          <Text color="white" fontFamily="bold" size={'h3'}>
            {t('continue_button')}
          </Text>
        </ShadowButton>
      </BlockAnimated>
    </Block>
  )
}

const styles = StyleSheet.create({
  itemContainer:{
    width: COURSE_ITEM_WIDTH
  }
})
