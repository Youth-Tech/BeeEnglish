import React from 'react'
import { StyleSheet } from 'react-native'

import { Icon } from '@assets'
import { normalize, useTheme } from '@themes'
import { Block, Image, Text } from '@components/bases'

export interface ItemLessonProps {
  thumbnail: string
  lessonTitle: string
  isEndItem?: boolean
  lessonDescription: string
  type?: 'normal' | 'checkpoint'
  status: 'complete' | 'lock' | 'current'
}

export const ItemLesson: React.FC<ItemLessonProps> = ({
  status,
  thumbnail,
  isEndItem,
  lessonTitle,
  type = 'normal',
  lessonDescription,
}) => {
  const { colors } = useTheme()
  return (
    <Block row style={styles.itemContainer}>
      <Block>
        <Block
          width={68}
          height={68}
          radius={68}
          padding={5}
          borderWidth={2}
          borderColor={status === 'complete' ? colors.orangePrimary : '#DAE1EA'}
        >
          <Image
            style={styles.lessonImage}
            source={{
              uri: thumbnail,
            }}
          />

          {status === 'lock' && (
            <Block
              alignCenter
              radius={68}
              justifyCenter
              style={StyleSheet.absoluteFill}
              backgroundColor="rgba(255, 250, 250, 0.56)"
            >
              <Icon state="Lock" fill="white" />
            </Block>
          )}

          {status === 'complete' && !isEndItem && (
            <Block absolute bottom={-8} alignSelf="center">
              <Icon state="CheckSmall" />
            </Block>
          )}
        </Block>

        {!isEndItem && (
          <Block
            width={2}
            height={20}
            radius={10}
            alignSelf="center"
            marginTop={status === 'complete' ? 6 : 4}
            backgroundColor={
              status === 'complete' ? colors.orangePrimary : '#DAE1EA'
            }
          />
        )}
      </Block>

      <Block
        flex
        height={68}
        justifyCenter
        style={styles.blockLabel}
        backgroundColor={
          status === 'current'
            ? '#F3F8F3'
            : type === 'checkpoint'
            ? '#FFF2CE'
            : 'transparent'
        }
      >
        <Text fontFamily="bold" size={'h3'} numberOfLines={1}>
          {lessonTitle}
        </Text>
        <Text fontFamily="regular" size={'h5'} numberOfLines={2}>
          {lessonDescription}
        </Text>
      </Block>
    </Block>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    gap: normalize.h(10),
    marginBottom: normalize.h(4),
  },
  lessonImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  blockLabel: {
    borderRadius: 8,
    gap: normalize.v(5),
    padding: normalize.h(12),
  },
})
