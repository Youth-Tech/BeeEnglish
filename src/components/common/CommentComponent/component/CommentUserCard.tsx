import React from 'react'

import { Block, Image, Text } from '@components'
import { useStyles } from './styles'
import { View } from 'react-native'
import LinesComment from '@assets/icons/LinesComment'
import { useTranslation } from 'react-i18next'

interface CommentUserCardProps {
  isOvalShow: boolean
  creator: Comment['creator']
}

const CommentUserCard: React.FC<CommentUserCardProps> = ({
  isOvalShow = false,
  creator,
}) => {
  const styles = useStyles()
  const { t } = useTranslation()
  return (
    <View>
      <Block style={styles.boxAvatar}>
        {isOvalShow && <LinesComment style={styles.ovalComment} />}
        <LinesComment style={styles.ovalComment} />
        <Image
          source={{
            uri:
              creator?.avatar?.src ??
              'https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/344801128_1233279023987872_6973065749643585930_n.jpg?stp=dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=sknRvPwEFvAAX84riq0&_nc_ht=scontent.fsgn5-6.fna&cb_e2o_trans=t&oh=00_AfAQyGppVYNVQ77uqckdPGNxbeo0Om2HPARyfzkxHR5t0g&oe=653A7321',
          }}
          style={styles.avatar}
        />
        <Text size={'h4'} fontFamily={'bold'}>
          {creator?.username ?? t('unknown_user')}
        </Text>
      </Block>
    </View>
  )
}

export default CommentUserCard
