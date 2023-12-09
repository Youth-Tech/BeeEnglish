import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useStyles } from './styles'
import { Block, Text } from '@components'
import { useTheme } from '@themes'
import { timeSince } from '@utils/helpers'
import { useTranslation } from 'react-i18next'

export interface ReplyCommentProps {
  createAt: string
  onReplyPress: () => void
  level: number
}

const ReplyComment: React.FC<ReplyCommentProps> = ({
  level,
  createAt,
  onReplyPress,
}) => {
  const styles = useStyles()
  const { t } = useTranslation()
  const { colors } = useTheme()
  return (
    <Block style={styles.replyComment}>
      <Text size={'h5'} fontFamily={'semiBold'} color={colors.greyPrimary}>
        {timeSince(new Date(createAt))}
      </Text>
      {level <= 2 && (
        <TouchableOpacity onPress={onReplyPress}>
          <Text size={'h5'} fontFamily={'semiBold'} color={colors.greyPrimary}>
            {t('reply')}
          </Text>
        </TouchableOpacity>
      )}
    </Block>
  )
}

export default React.memo(ReplyComment)
