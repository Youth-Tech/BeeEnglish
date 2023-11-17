import React, { useRef, useState } from 'react'
import { useTheme } from '@themes'
import { useStyles } from './styles'
import { Block, Text } from '@components'
import ReplyComment from './component/ReplyComment'
import AvatarUserCard from './component/CommentUserCard'
import { DocumentSelectionState, TouchableOpacity, View } from 'react-native'
import { PostServices } from '@services/PostService'
import { CommentNested } from '@screens/DetailPostScreen/components/BottomSheetComment'
import { useAppDispatch } from '@hooks'
import { setParentCommentId } from '@redux/reducers'

export interface comment {
  id: number
  text: string
  comments: comment[]
}

interface CommentComponentProps {
  level: number
  postId: string
  comment: CommentNested
  parentCommentId: string
  parentCommentIndex: number
  listComment: Array<CommentNested>
  textInputRef: React.RefObject<DocumentSelectionState>
  setCommentData: React.Dispatch<React.SetStateAction<Array<CommentNested>>>
}

const CommentComponent: React.FC<CommentComponentProps> = ({
  postId,
  comment,
  level = 0,
  listComment,
  textInputRef,
  setCommentData,
  parentCommentIndex,
  parentCommentId,
}) => {
  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const styles = useStyles()
  const refComment = useRef<View | null>(null)
  const refCommentParent = useRef<View | null>(null)
  const [heightParent, setHeightParent] = useState(0)
  const [isShowReply, setIsShowReply] = useState(false)
  const [heightChildren, setHeightChildren] = useState(0)
  const [isLoadReplies, setIsLoadReplies] = React.useState(false)

  const getListReplies = async (commentId: string, commentIndex: number) => {
    try {
      const res = await PostServices.getRepliesPostComment({
        postId,
        commentId,
      })

      if (res.status === 200) {
        listComment[commentIndex].comments = res.data.data.comments.map(
          (item) => ({
            ...item,
            comments: [],
          }),
        )
        setIsLoadReplies(true)
        setIsShowReply(res.data.data.comments.length > 0)
      }
    } catch (e) {
      console.log(e)
    }
  }

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

  const onRepliesPress = () => {
    console.log('onRepliesPress')
    textInputRef.current?.focus()
    dispatch(setParentCommentId(parentCommentId))
  }

  return (
    <Block
      style={styles.container}
      ref={refCommentParent}
      onLayout={handlerReplyCommentParent}
    >
      <AvatarUserCard creator={comment.creator} isOvalShow={level >= 2} />
      <Block style={styles.boxContent}>
        <Block style={styles.boxLines}>
          {isShowReply && comment.comments.length > 0 && (
            <Block
              style={[
                styles.line,
                { height: heightParent - heightChildren - 50 },
              ]}
            ></Block>
          )}
        </Block>
        <Block style={styles.contentComment}>
          <Text size={'h5'} fontFamily={'regular'}>
            {comment.content}
          </Text>
          <ReplyComment
            level={level}
            createAt={comment.createdAt}
            onReplyPress={onRepliesPress}
          />
          {!isLoadReplies && (
            <TouchableOpacity
              onPress={() => getListReplies(comment._id, parentCommentIndex)}
            >
              <Text
                size={'h5'}
                fontFamily={'semiBold'}
                color={colors.greyPrimary}
              >
                more
              </Text>
            </TouchableOpacity>
          )}

          {!isShowReply && level <= 3 && isLoadReplies && (
            <TouchableOpacity onPress={() => setIsShowReply(!isShowReply)}>
              <Text
                size={'h5'}
                fontFamily={'semiBold'}
                color={colors.greyPrimary}
              >
                {comment.comments.length} replies
              </Text>
            </TouchableOpacity>
          )}
          {isShowReply &&
            comment.comments.map((item, index) => {
              return (
                <Block
                  key={index}
                  ref={refComment}
                  onLayout={handlerReplyComment}
                >
                  <CommentComponent
                    level={1}
                    key={index}
                    comment={item}
                    postId={postId}
                    parentCommentId={item._id}
                    parentCommentIndex={index}
                    textInputRef={textInputRef}
                    listComment={comment.comments}
                    setCommentData={setCommentData}
                  />
                </Block>
              )
            })}
          {isShowReply && level < 3 && comment.comments.length > 0 && (
            <TouchableOpacity onPress={() => setIsShowReply(!isShowReply)}>
              <Text
                size={'h5'}
                fontFamily={'semiBold'}
                color={colors.greyPrimary}
              >
                Read less
              </Text>
            </TouchableOpacity>
          )}
        </Block>
      </Block>
    </Block>
  )
}

export default React.memo(CommentComponent)
