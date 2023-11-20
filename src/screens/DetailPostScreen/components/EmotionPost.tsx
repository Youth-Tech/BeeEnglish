import { Icon } from '@assets'
import { debounce } from 'lodash'
import { useAppDispatch, useAppSelector } from '@hooks'
import React, { useState } from 'react'
import { Block, GuestModal, Text } from '@components'
import { useTranslation } from 'react-i18next'
import { makeStyles, normalize, useTheme } from '@themes'
import { TouchableHighlight } from 'react-native'
import { changeShowComment, setIsAdjustPostData } from '@redux/reducers'
import { widthWindow } from '@utils/helpers'
import { PostServices } from '@services/PostService'
import { getIsLoginWithGuest, getUserData } from '@redux/selectors'
import { ModalFunction } from '@components/bases/Modal/type'

export interface IEmotionPost {
  postId: string
  liked: boolean
  likeCount: number
  userLiked: string[]
  commentCount: number
  setCurrentPost: React.Dispatch<React.SetStateAction<PostResponse>>
}

const EmotionPost: React.FC<IEmotionPost> = ({
  liked,
  postId,
  likeCount,
  commentCount,
  setCurrentPost,
}) => {
  const { colors } = useTheme()
  const user = useAppSelector(getUserData)
  const isLoginWithGuestRole = useAppSelector(getIsLoginWithGuest)
  const isAdjustPostData = useAppSelector(
    (state) => state.root.detailPost.isAdjustPostData,
  )

  const styles = useStyles({ widthItem: widthWindow })
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const guestModalRef = React.useRef<ModalFunction>(null)

  const [like, setLike] = useState(liked)
  const [bookmark, setBookmark] = useState(false)

  const setEmotion = debounce((type: 'LIKE' | 'COMMENT' | 'BOOKMARK') => {
    if (isLoginWithGuestRole) {
      guestModalRef.current?.openModal()
      return
    }

    switch (type) {
      case 'LIKE':
        setLike(!like)
        updateLike(!like)
        break
      case 'COMMENT':
        dispatch(changeShowComment(true))
        break
      case 'BOOKMARK':
        setBookmark(!bookmark)
        break
    }
    if (!isAdjustPostData) {
      dispatch(setIsAdjustPostData(true))
    }
  }, 200)

  const updateLike = async (like: boolean) => {
    try {
      setCurrentPost((prev) => {
        return {
          ...prev,
          likeCount: like ? prev.likeCount + 1 : prev.likeCount - 1,
        }
      })
      await PostServices.updateLikePost({
        postId,
      })
    } catch (e) {
      setLike(!like)
      dispatch(setIsAdjustPostData(false))
      console.log(e)
    }
  }

  const colorsUnderline = colors.orangeDark + '20'

  return (
    <Block style={styles.container}>
      <Block style={styles.countComment}>
        <Text>
          {like
            ? t('post_emotion_status_user', {
                user: user.username,
                amount: likeCount,
              })
            : t('post_emotion_status', { amount: likeCount })}
        </Text>
        <Text>{t('comments', { amount: commentCount })}</Text>
      </Block>
      <Block style={styles.boxEmotion}>
        <TouchableHighlight
          onPress={() => setEmotion('LIKE')}
          style={styles.boxItem}
          underlayColor={colorsUnderline}
        >
          <Block style={styles.itemEmotion}>
            <Icon
              state={like ? 'Like' : 'DisLike'}
              fill={like ? colors.orangeDark : undefined}
            />
            <Text>{t('like')}</Text>
          </Block>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => setEmotion('COMMENT')}
          style={styles.boxItem}
          underlayColor={colorsUnderline}
        >
          <Block style={styles.itemEmotion}>
            <Icon state={'Comment'} />
            <Text>{t('comment')}</Text>
          </Block>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => setEmotion('BOOKMARK')}
          style={styles.boxItem}
          underlayColor={colorsUnderline}
        >
          <Block style={styles.itemEmotion}>
            <Icon
              state={bookmark ? 'BookmarkEmotion' : 'BookmarkEmotionOutline'}
              fill={bookmark ? colors.orangeDark : undefined}
            />
            <Text>{t('bookmark')}</Text>
          </Block>
        </TouchableHighlight>
      </Block>

      <GuestModal
        position={'center'}
        ref={guestModalRef}
        animationType={'fade'}
      />
    </Block>
  )
}

export default React.memo(EmotionPost)

interface IEmotion {
  widthItem: number
}

const useStyles = makeStyles<IEmotion>()(({ colors }) => ({
  container: {
    // marginHorizontal: normalize.m(20),
    backgroundColor: 'transparent',
  },
  countComment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize.m(10),
  },
  boxEmotion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.greyLighter,
    paddingVertical: normalize.m(5),
  },
  itemEmotion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize.m(10),
  },
  boxItem: () => ({
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize.m(5),
    flexGrow: 1,
    borderRadius: normalize.m(10),
  }),
}))
