import React from 'react'

import { timeSince } from '@utils/helpers'
import { makeStyles, useTheme } from '@themes'
import { Block, Text, Image } from '@components'

export interface NewsItemProps {
  title: string
  image: string
  topic: string
  createAt: string
  textColor: string
}

export const NewsItem: React.FC<NewsItemProps> = (props) => {
  const { title, image, topic, createAt } = props
  const { colors } = useTheme()
  const styles = useStyle(props)
  return (
    <Block
      row
      gap={10}
      alignCenter
      space="between"
      paddingVertical={15}
      borderBottomWidth={1}
      backgroundColor="white"
      borderColor={colors.greyLighter}
    >
      <Block flex space="between" gap={20}>
        <Text fontFamily="semiBold" numberOfLines={3}>
          {title}
        </Text>
        <Block row alignCenter gap={10}>
          <Text
            size={10}
            paddingVertical={4}
            fontFamily="semiBold"
            paddingHorizontal={5}
            style={styles.topicTextStyle}
          >
            {topic}
          </Text>
          <Text size={10} fontFamily="semiBold" color={colors.greyPrimary}>
            {timeSince(new Date(createAt))}
          </Text>
        </Block>
      </Block>
      <Image
        source={{
          uri: image,
        }}
        resizeMode="cover"
        style={styles.imageStyle}
      />
    </Block>
  )
}

const useStyle = makeStyles<NewsItemProps>()(({ normalize }) => ({
  imageStyle: {
    aspectRatio: 1,
    width: normalize.h(90),
    borderRadius: normalize.m(5),
  },
  topicTextStyle: ({ textColor }) => ({
    flex: 0,
    borderRadius: 5,
    color: textColor,
    backgroundColor: `${textColor}20`,
  }),
}))
