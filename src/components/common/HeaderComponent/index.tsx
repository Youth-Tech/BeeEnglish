import React from 'react'
import { useTheme } from '@themes'
import { useStyles } from '@components/common/HeaderComponent/styles'
import { Block } from '@components'
import { Icon, TIcon } from '@assets'
import {TouchableOpacity, Text} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { navigateAndReset } from '@navigation'

interface HeaderAppProps {
  onPressLeftIcon?: () => void
  onPressRightIcon?: () => void
  title: string
  rightIcon?: TIcon
}

const HeaderApp: React.FC<HeaderAppProps> = ({
  rightIcon,
  onPressRightIcon,
  onPressLeftIcon,
  ...rest
}) => {
  const { colors } = useTheme()
  const styles = useStyles(colors)
  const navigation = useNavigation()
  const onPressGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigateAndReset([{ name: 'BOTTOM_TAB' }], 0)
    }
  }
  return (
    <Block style={styles.boxHeader}>
      <TouchableOpacity onPress={onPressGoBack} style={styles.iconBack}>
        <Icon state={'Back'} />
      </TouchableOpacity>
      <Text style={styles.titleHeader} ellipsizeMode={"tail"} numberOfLines={1}>{rest.title}</Text>
      <TouchableOpacity onPress={onPressGoBack} style={styles.iconBack}>
        {rightIcon && <Icon state={rightIcon} />}
      </TouchableOpacity>
    </Block>
  )
}

export default HeaderApp
