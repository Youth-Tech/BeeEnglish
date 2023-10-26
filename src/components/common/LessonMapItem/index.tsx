import React from 'react'
import { Pressable, StyleSheet } from 'react-native'

import { Icon } from '@assets'
import { normalize, useTheme } from '@themes'
import { Block, Text } from '@components/bases'
import { ItemLesson, ItemLessonProps } from './components'

export interface LessonMapItemProps {
  index?: number
  title: string
  data: ItemLessonProps[]
  lessonComplete: number
  status: 'lock' | 'unlock'
}
export const LessonMapItem: React.FC<LessonMapItemProps> = ({
  index,
  data,
  title,
  lessonComplete,
  status,
}) => {
  const { colors } = useTheme()
  return (
    <Block>
      {/* header */}
      {/* <Pressable>
        <Block
          row
          radius={8}
          height={68}
          alignCenter
          style={styles.header}
          paddingHorizontal={25}
          backgroundColor={status === 'lock' ? '#F3F8F3' : '#70773A'}
        >
          <Text
            size={64}
            fontFamily="cutie"
            color={status === 'unlock' ? colors.white : colors.greyPrimary}
          >
            {index}
          </Text>
          <Block style={styles.headerLabelBlock}>
            <Text
              size={'h3'}
              fontFamily="bold"
              color={status === 'unlock' ? colors.white : colors.greyPrimary}
            >
              {title}
            </Text>

            <Text
              size={'h3'}
              fontFamily="bold"
              color={status === 'unlock' ? colors.white : colors.greyPrimary}
            >
              Lessons completed: {lessonComplete}/{data.length}
            </Text>
          </Block>

          {status === 'lock' && (
            <Block absolute alignSelf="center" right={25}>
              <Icon state="Lock" fill={colors.greyPrimary} />
            </Block>
          )}
        </Block>
      </Pressable> */}
      {/* end header */}

      {/* <Block marginTop={20}>
        {data.map((item, index, originArr) => {
          return (
            <ItemLesson
              {...item}
              key={index}
              isEndItem={index === originArr.length - 1}
            />
          )
        })}
      </Block> */}
    </Block>
  )
}

const styles = StyleSheet.create({
  header: {
    gap: normalize.h(20),
  },
  headerLabelBlock: { gap: 5 },
})
