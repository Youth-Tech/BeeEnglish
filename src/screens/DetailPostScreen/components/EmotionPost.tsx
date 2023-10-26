import { Icon } from '@assets'
import { debounce } from 'lodash'
import { useAppDispatch } from '@hooks'
import React, { useState } from 'react'
import { Block, Text } from '@components'
import { useTranslation } from 'react-i18next'
import { makeStyles, normalize, useTheme } from '@themes'
import { Dimensions, TouchableHighlight } from 'react-native'
import { changeShowComment } from '@redux/reducers'

const EmotionPost: React.FC = () => {
  const { colors } = useTheme()
  const widthItem = Dimensions.get('window').width
  const styles = useStyles({ widthItem })
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [like, setLike] = useState(false)
  const [bookmark, setBookmark] = useState(false)
  const setEmotion = debounce((type: 'LIKE' | 'COMMENT' | 'BOOKMARK') => {
    switch (type) {
      case 'LIKE':
        setLike(!like)
        break
      case 'COMMENT':
        dispatch(changeShowComment(true))
        break
      case 'BOOKMARK':
        setBookmark(!bookmark)
        break
    }
  }, 200)
  const colorsUnderline = colors.orangeDark + '20'
  return (
    <Block style={styles.container}>
      <Block style={styles.countComment}>
        <Text>Vu and 30 others</Text>
        <Text>30 comments</Text>
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
    backgroundColor: "transparent"
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
