import React, { useState } from 'react'
import { Pressable } from 'react-native'

import { Icon } from '@assets'
import { Block, Text, Image } from '@components'
import { makeStyles, normalize, useTheme } from '@themes'

export interface NewsProgressProps {
  title: string
  image: string
  progress: number
  onPressBookMark?: () => void
  onPress?: () => void
  topicColor: string
  topic: string
}

export const NewsProgress: React.FC<NewsProgressProps> = (props) => {
  const { title, image, onPress, progress, onPressBookMark, topic } = props

  const { colors } = useTheme()
  const styles = useStyle(props)
  // @ts-ignore
  const combinedText = `${progress}%`
  const [isBookmarked, setIsBookmarked] = useState(false)

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onPressBookMark && onPressBookMark()
  }
  return (
    <Pressable onPress={onPress} style={[{ marginVertical: normalize.v(5) }]}>
      <Block
        radius={8}
        width={142}
        overflow="hidden"
        style={styles.container}
        borderWidth={2}
        borderColor={colors.borderColor}
        backgroundColor={colors.white}
      >
        <Block padding={4} flex>
          <Image
            width="100%"
            height={110}
            radius={8 - 4}
            source={{
              uri: image,
            }}
          />
          {/*<Pressable*/}
          {/*  onPress={toggleBookmark}*/}
          {/*  style={{ position: 'absolute', right: 10 }}*/}
          {/*>*/}
          {/*  <Block*/}
          {/*    width={26}*/}
          {/*    height={30}*/}
          {/*    alignCenter*/}
          {/*    justifyCenter*/}
          {/*    borderBottomLeftRadius={10}*/}
          {/*    borderBottomRightRadius={10}*/}
          {/*    backgroundColor={colors.white}*/}
          {/*  >*/}
          {/*    <Icon*/}
          {/*      state="Bookmark"*/}
          {/*      stroke={colors.orangeDark}*/}
          {/*      fill={isBookmarked ? colors.orangeDark : 'transparent'}*/}
          {/*    />*/}
          {/*  </Block>*/}
          {/*</Pressable>*/}
          <Text
            size={'h4'}
            paddingLeft={3}
            lineHeight={18}
            numberOfLines={3}
            paddingVertical={5}
            color={colors.black}
            fontFamily="semiBold"
          >
            {title}
          </Text>
        </Block>
        <Block row space="between" padding={6} alignEnd>
          <Text
            size={10}
            paddingVertical={4}
            fontFamily="semiBold"
            paddingHorizontal={5}
            style={styles.topicTextStyle}
          >
            {topic}
          </Text>
          <Text fontFamily="bold" size={'h5'} color={colors.orangeDark}>
            {/*{combinedText}*/}
          </Text>
        </Block>
      </Block>
    </Pressable>
  )
}

const useStyle = makeStyles<NewsProgressProps>()(({ normalize }) => ({
  container: {
    height: normalize.v(200),
  },
  topicTextStyle: ({ topicColor }) => ({
    flex: 0,
    borderRadius: 5,
    color: topicColor,
    backgroundColor: `${topicColor}20`,
  }),
}))
