import React, { useRef, useState } from 'react'
import { useStyles } from './styles'
import { Block, Text } from '@components'
import ReplyComment from './component/ReplyComment'
import AvatarUserCard from './component/CommentUserCard'
import { TouchableOpacity, View } from 'react-native'

export interface comment {
  id: number
  text: string
  comments: comment[]
}

interface CommentComponentProps {
  level: number
  comment: comment
}

const CommentComponent: React.FC<CommentComponentProps> = ({
  level = 0,
  comment,
}) => {
  const styles = useStyles()
  const refComment = useRef<View | null>(null)
  const refCommentParent = useRef<View | null>(null)
  const [heightParent, setHeightParent] = useState(0)
  const [heightChildren, setHeightChildren] = useState(0)
  const [isShowReply, setIsShowReply] = useState(false)

  const handlerReplyComment = () => {
    //@ts-ignore
    refComment?.current?.measure((x, y, pageX, pageY) => {
      if (pageY !== heightChildren) {
        setHeightChildren(pageY)
      }
    })
  }
  const handlerReplyCommentParent = () => {
    //@ts-ignore
    refCommentParent?.current?.measure((x, y, pageX, pageY) => {
      if (pageY !== heightParent) {
        setHeightParent(pageY)
      }
    })
  }
  return (
    <Block
      style={styles.container}
      ref={refCommentParent}
      onLayout={handlerReplyCommentParent}
    >
      <AvatarUserCard isOvalShow={level >= 2} />
      <Block style={styles.boxContent}>
        <Block style={styles.boxLines}>
          {isShowReply && comment.comments.length > 0 && (
            <Block
              style={[styles.line, { height: heightParent - heightChildren - 50 }]}
            ></Block>
          )}
        </Block>
        <Block style={styles.contentComment}>
          <Text size={'h5'} fontFamily={'regular'}>
            {comment.text}
          </Text>
          <ReplyComment />
          {!isShowReply && comment.comments.length > 0 && (
            <TouchableOpacity onPress={() => setIsShowReply(!isShowReply)}>
              <Text>{comment.comments.length} replies</Text>
            </TouchableOpacity>
          )}
          {isShowReply &&
            comment.comments.map((item, index) => {
              return (
                <Block
                  ref={refComment}
                  key={index}
                  onLayout={handlerReplyComment}
                >
                  <CommentComponent level={level + 1} comment={item} />
                </Block>
              )
            })}
          {isShowReply && (
            <TouchableOpacity onPress={() => setIsShowReply(!isShowReply)}>
              <Text>Read less</Text>
            </TouchableOpacity>
          )}
        </Block>
      </Block>
    </Block>
  )
}

export default React.memo(CommentComponent)
