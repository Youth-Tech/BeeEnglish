import React from 'react'
import { Pressable, SectionListData, StyleSheet } from 'react-native'

import { Icon } from '@assets'
import { SectionData } from '@screens'
import { Block, Text } from '@components'
import { normalize, useTheme } from '@themes'
import { ItemLessonProps } from '@screens/LessonMap/components'
import { useTranslation } from 'react-i18next'

export interface SectionHeaderProps {
  item: {
    section: SectionListData<ItemLessonProps, SectionData>
  }
}

export const SectionHeader = ({ item }: SectionHeaderProps) => {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <Pressable key={item.section.title}>
      <Block
        row
        radius={8}
        height={68}
        alignCenter
        style={styles.header}
        paddingHorizontal={25}
        backgroundColor={item.section.status === 'lock' ? '#F3F8F3' : '#70773A'}
      >
        <Text
          size={64}
          lineHeight={64}
          fontFamily="cutie"
          color={
            item.section.status === 'unlock' ? colors.white : colors.greyPrimary
          }
        >
          {item.section.index!}
        </Text>
        <Block style={styles.headerLabelBlock}>
          <Text
            size={'h3'}
            fontFamily="bold"
            color={
              item.section.status === 'unlock'
                ? colors.white
                : colors.greyPrimary
            }
          >
            {item.section.title}
          </Text>

          <Text
            size={'h3'}
            fontFamily="bold"
            color={
              item.section.status === 'unlock'
                ? colors.white
                : colors.greyPrimary
            }
          >
            {t('lesson_completed')}{' '}
            {
              item.section.data.filter(
                (item) =>
                  item.status === 'completed' && item.type !== 'checkpoint',
              ).length
            }
            /
            {
              item.section.data.filter((item) => item.type !== 'checkpoint')
                .length
            }
          </Text>
        </Block>

        {item.section.status === 'lock' && (
          <Block absolute alignSelf="center" right={25}>
            <Icon state="Lock" fill={colors.greyPrimary} />
          </Block>
        )}
      </Block>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  header: {
    gap: normalize.h(20),
  },
  headerLabelBlock: { gap: 5 },
})
