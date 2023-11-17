import React from 'react'
import { Block, BlockAnimated, Image, Text } from '@components'
import { makeStyles } from '@themes'
import { Pressable } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

// export interface VideoItemData {
//   id?: string
//   thumbnail: string
//   title: string
//   duration: string
// }
export interface VideoItemProps {
  data: PostResponse
  index: number
  onPress: () => void
}

const VideoItem: React.FC<VideoItemProps> = (props) => {
  const { data, index, onPress } = props
  const styles = useStyles()
  const isAttachmentEmpty = Object.keys(data.attachments[0]).length === 0
  const duration = () => {
    const second = Math.floor(data.attachments[0].duration! % 60)
    const minute = Math.floor(data.attachments[0].duration! / 60)
    return `${minute}:${second}`
  }
  return (
    <BlockAnimated entering={FadeInDown.delay(200 * index)}>
      <Pressable style={styles.container} onPress={onPress}>
        <Image
          source={{
            uri: isAttachmentEmpty ? data.attachments[0].thumbnail : '',
          }}
          style={styles.image}
        />
        <Block flex paddingTop={15} space={'between'}>
          <Text size={'h2'} numberOfLines={3} fontFamily={'semiBold'}>
            {data.title}
          </Text>
          <Text size={'h3'} alignSelf={'flex-end'}>
            {duration()}
          </Text>
        </Block>
      </Pressable>
    </BlockAnimated>
  )
}
export default VideoItem
const useStyles = makeStyles()(({ colors, normalize }) => ({
  container: {
    marginTop: normalize.v(10),
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: normalize.h(10),
    gap: normalize.h(8),
    padding: normalize.m(10),
  },
  image: {
    width: normalize.h(120),
    height: normalize.h(120),
    borderRadius: normalize.h(10),
  },
}))
