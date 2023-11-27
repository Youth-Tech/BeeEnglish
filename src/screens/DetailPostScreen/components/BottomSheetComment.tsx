import {
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  DocumentSelectionState,
} from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'

import {Icon, images} from '@assets'
import { useStyles } from '../styles'
import { widthScreen } from '@utils/helpers'
import { normalize, useTheme } from '@themes'
import { PostServices } from '@services/PostService'
import { useAppDispatch, useAppSelector } from '@hooks'
import SendMessenger from '@assets/icons/SendMessenger'
import {Block, Image, Text, TextInput} from '@components'
import CommentComponent from '@components/common/CommentComponent'
import { changeShowComment, setParentCommentId } from '@redux/reducers'

export interface BottomSheetCommentProps {
  postId: string
}

export interface CommentNested extends Comment {
  comments: Array<CommentNested>
}

const BottomSheetComment: React.FC<BottomSheetCommentProps> = ({ postId }) => {
  const parentCommentId = useAppSelector(
    (state) => state.root.detailPost.parentCommentId,
  )
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const styles = useStyles()
  const { t } = useTranslation()

  const textInputRef = React.useRef<DocumentSelectionState>(null)
  const pagination = React.useRef<Pagination>({
    hasNext: false,
    hasPrev: false,
    page: 1,
    total: 0,
  })

  const [valueComment, setValueComment] = useState('')
  const [isFetchingComment, setIsFetchingComment] = React.useState(true)
  const [listComment, setListComment] = React.useState<Array<CommentNested>>([])

  React.useEffect(() => {
    getListComment()
  }, [])

  const getListComment = async () => {
    try {
      const res = await PostServices.getPostComments({
        postId,
        limit: 7,
        page: pagination.current.page,
      })

      if (res.status === 200) {
        const commentData: Array<CommentNested> = res.data.data.comments.map(
          (item) => ({
            ...item,
            comments: [],
          }),
        )
        setListComment((prevState) => [...prevState, ...commentData])
        pagination.current = res.data.data.pagination
        setIsFetchingComment(false)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onCloseComment = () => {
    dispatch(changeShowComment(false))
  }

  const onPressButtonSend = async () => {
    // const commentId = (Math.random() * 100000000).toString()
    // const newListComment = listComment
    //
    // newListComment.push({
    //   _id: commentId,
    //   creator: {
    //     avatar: {
    //       src: userInfo.avatar.src || '',
    //     },
    //     username: userInfo.username,
    //     _id: userInfo.id,
    //     id: userInfo.id,
    //   },
    //   content: valueComment,
    //   createdAt: new Date().toString(),
    //   id: commentId,
    //   comments: [],
    //   parent: parentCommentId === '' ? null : parentCommentId,
    //   post: postId,
    //   childCount: 0,
    //   likeCount: 0,
    //   updatedAt: new Date().toString(),
    // })
    Keyboard.dismiss()

    try {
      setValueComment('')

      const res = await PostServices.createComment(
        parentCommentId === ''
          ? {
              postId,
              content: valueComment,
            }
          : {
              postId: postId,
              parent: parentCommentId,
              content: valueComment,
            },
      )

      if (res.status === 200) {
        dispatch(setParentCommentId(''))

        if (res.data.data.parent === null) {
          const newListComment = [...listComment]
          newListComment.push({
            ...res.data.data,
            comments: [],
          })
          setListComment(newListComment)
        } else {
          pagination.current = {
            page: 1,
            total: 0,
            hasPrev: false,
            hasNext: false,
          }
          getListComment()
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const renderComment = ({
    item,
    index,
  }: ListRenderItemInfo<CommentNested>) => {
    return (
      <CommentComponent
        level={1}
        key={index}
        comment={item}
        postId={postId}
        listComment={listComment}
        parentCommentId={item._id}
        parentCommentIndex={index}
        textInputRef={textInputRef}
        setCommentData={setListComment}
      />
    )
  }

  const onEndReached = () => {
    if (pagination.current.hasNext && !isFetchingComment) {
      pagination.current.page++
      getListComment()
    }
  }

  const renderFooterComponent = () => {
    return (
      <Block alignCenter justifyCenter>
        {isFetchingComment ? (
          <ActivityIndicator size={'large'} color={colors.orangePrimary} />
        ) : (
          <></>
        )}
      </Block>
    )
  }

  return (
    <Block style={styles.boxComment}>
      <Block style={styles.headerComment}>
        <TouchableOpacity style={styles.buttonCancel} onPress={onCloseComment}>
          <Icon state={'Cancel'} />
        </TouchableOpacity>
        <Text size={'h4'} fontFamily={'bold'}>
          {t('comment')}
        </Text>
      </Block>
      <BottomSheetScrollView
        style={{ marginHorizontal: 20, marginTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/*{listComment.map((item, index) => (*/}
        {/*  <CommentComponent*/}
        {/*    level={1}*/}
        {/*    key={index}*/}
        {/*    comment={item}*/}
        {/*    postId={postId}*/}
        {/*    listComment={listComment}*/}
        {/*    parentCommentId={item._id}*/}
        {/*    parentCommentIndex={index}*/}
        {/*    textInputRef={textInputRef}*/}
        {/*    setCommentData={setListComment}*/}
        {/*  />*/}
        {/*))}*/}
        <Block style={styles.listContainer}>
          {listComment.length > 0 ? (
            <FlashList
              data={listComment}
              renderItem={renderComment}
              onEndReachedThreshold={0.2}
              onEndReached={onEndReached}
              estimatedItemSize={widthScreen}
              ListFooterComponent={renderFooterComponent}
            />
          ) : (
            <Block flex alignCenter justifyCenter>
              <Image source={images.BeeDiscovery} style={styles.imageNoData} resizeMode={'contain'}/>
              <Text>{t("no_comment")}</Text>
            </Block>
          )}
        </Block>
      </BottomSheetScrollView>
      <Block style={styles.inputBoxSend}>
        <TextInput
          ref={textInputRef}
          placeholder={'Viết bình luận'}
          containerStyle={{
            flex: 1,
          }}
          value={valueComment}
          inputContainerStyle={{
            borderRadius: normalize.m(30),
            height: normalize.m(35),
            borderColor: colors.greyDark,
          }}
          onChangeText={setValueComment}
        />
        <TouchableOpacity onPress={onPressButtonSend}>
          <SendMessenger onPress={onPressButtonSend} />
        </TouchableOpacity>
      </Block>
    </Block>
  )
}

export default BottomSheetComment
