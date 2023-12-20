import { debounce } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableHighlight } from 'react-native'

import {
  setPostBookmark,
  changeShowComment,
  setIsAdjustPostData,
} from '@redux/reducers'
import { Icon } from '@assets'
import { UserService } from '@services'
import { navigate } from '@navigation'
import { widthWindow } from '@utils/helpers'
import { PostServices } from '@services/PostService'
import { Block, GuestModal, Text } from '@components'
import { useAppDispatch, useAppSelector } from '@hooks'
import { makeStyles, normalize, useTheme } from '@themes'
import { ModalFunction } from '@components/bases/Modal/type'
import { getIsLoginWithGuest, getUserData } from '@redux/selectors'

export interface IEmotionPost {
  postId: string
  liked: boolean
  likeCount: number
  userLiked: string[]
  commentCount: number
  setCurrentPost: React.Dispatch<React.SetStateAction<PostResponse>>
}

export const EmotionPost: React.FC<IEmotionPost> = React.memo(
  ({ liked, postId, likeCount, commentCount, setCurrentPost }) => {
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

    React.useEffect(() => {
      const isBookmark = user.postBookmarks.find((item) => item === postId)
      if (isBookmark && !bookmark) {
        React.startTransition(() => {
          setBookmark(true)
        })
      }
    }, [user])

    const setEmotion = debounce((type: 'LIKE' | 'COMMENT' | 'BOOKMARK') => {
      if (isLoginWithGuestRole) {
        guestModalRef.current?.openModal()
        return
      }

      switch (type) {
        case 'LIKE':
          React.startTransition(() => {
            setLike(!like)
          })
          updateLike(!like)
          break
        case 'COMMENT':
          dispatch(changeShowComment(true))
          break
        case 'BOOKMARK':
          handleBookmark()
          break
      }
      if (!isAdjustPostData) {
        dispatch(setIsAdjustPostData(true))
      }
    }, 200)

    const handleBookmark = async () => {
      React.startTransition(() => {
        setBookmark((prev) => !prev)
      })
      try {
        const res = await UserService.bookmarkPost(postId)
        if (res.status === 200) {
          const resGetPostBookmark = await UserService.getPostBookmark()
          if (res.status === 200) {
            dispatch(
              setPostBookmark({
                postBookmarks: resGetPostBookmark.data.data.posts.map(
                  (item) => item._id,
                ),
              }),
            )
          }
        }
      } catch (e) {
        console.log(e)
        React.startTransition(() => {
          setBookmark((prevState) => !prevState)
        })
      }
    }

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
        React.startTransition(() => {
          setLike(!like)
        })
        dispatch(setIsAdjustPostData(false))
        console.log(e)
      }
    }

    const colorsUnderline = colors.orangeDark + '20'

    const onButtonGuestModalPress = () => {
      navigate('REGISTER_SCREEN', { isGuest: true })
      guestModalRef?.current?.dismissModal()
    }

    const renderTextLike = () => {
      if (like) {
        if (likeCount > 1) {
          return t('post_emotion_status_user', {
            user: user.fullName,
            amount: likeCount,
          })
        } else {
          return user.fullName
        }
      } else {
        if (likeCount > 0) {
          return t('post_emotion_status', { amount: likeCount })
        } else {
          return t('no_like')
        }
      }
    }

    return (
      <Block style={styles.container}>
        <Block style={styles.countComment}>
          <Text>{renderTextLike()}</Text>
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
          onButtonPress={onButtonGuestModalPress}
        />
      </Block>
    )
  },
)

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
