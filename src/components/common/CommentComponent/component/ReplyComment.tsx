import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useStyles } from './styles'
import { Block, Text } from '@components'
import { useTheme } from '@themes'

const ReplyComment: React.FC = () => {
  const styles = useStyles()
  const { colors } = useTheme()
  return (
    <Block style={styles.replyComment}>
      <Text size={'h5'} fontFamily={'semiBold'} color={colors.greyPrimary}>
        5h truoc
      </Text>
      <TouchableOpacity>
        <Text size={'h5'} fontFamily={'semiBold'} color={colors.greyPrimary}>
          tra loi
        </Text>
      </TouchableOpacity>
    </Block>
  )
}

export default React.memo(ReplyComment)

