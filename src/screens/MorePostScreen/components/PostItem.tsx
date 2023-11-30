import React from 'react'
import { Pressable } from 'react-native'
import { timeSince } from '@utils/helpers'
import { Block, Image, Text } from '@components'
import LikeIcon from '@screens/MorePostScreen/components/LikeIcon'
import CommentIcon from '@screens/MorePostScreen/components/CommentIcon'

export interface PostItemProps {
  data: PostResponse
  onPress: () => void
}
const PostItem: React.FC<PostItemProps> = (props) => {
  const { data, onPress } = props
  return (
    <Pressable onPress={onPress}>
      <Block>
        <Image
          source={{
            uri: data.attachments[0].src,
          }}
          width={'100%'}
          height={180}
          resizeMode={'cover'}
          radius={8}
        />
        <Text size={'h2'} fontFamily={'bold'} marginTop={10}>
          {data.title}
        </Text>
        <Block row space={'between'} alignCenter>
          <Text>
            {timeSince(new Date(data.createdAt))} | {data.topic.name}
          </Text>
          <Block row gap={10}>
            <Block row alignCenter gap={3}>
              <LikeIcon />
              <Text size={'h4'} fontFamily={'regular'} lineHeight={20}>
                {data.likeCount}
              </Text>
            </Block>
            <Block row alignCenter gap={3}>
              <CommentIcon />
              <Text size={'h4'} fontFamily={'regular'} lineHeight={20}>
                {data.commentCount}
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
    </Pressable>
  )
}
export default PostItem
