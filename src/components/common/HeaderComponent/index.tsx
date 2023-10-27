import React from 'react'
import { ColorsMode, useTheme } from '@themes'
import { useStyles } from './styles'
import { Block } from '@components'
import { Icon, TIcon } from '@assets'
import { TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { navigateAndReset } from '@navigation'

interface HeaderAppProps {
  onPressLeftIcon?: () => void
  onPressRightIcon?: () => void
  title?: string
  rightIcon?: TIcon
  style?: StyleProp<ViewStyle>
  color?: keyof ColorsMode
}

const HeaderApp: React.FC<HeaderAppProps> = ({
  rightIcon,
  onPressRightIcon,
  onPressLeftIcon,
  color = 'black',
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
    <Block style={[styles.boxHeader, rest.style]}>
      <TouchableOpacity onPress={onPressGoBack} style={styles.iconBack}>
        <Icon state={'Back'} stroke={colors[color]} />
      </TouchableOpacity>
      {rest.title && (
        <Text
          style={[styles.titleHeader, { color: colors[color] }]}
          ellipsizeMode={'tail'}
          numberOfLines={1}
        >
          {rest.title}
        </Text>
      )}
      <TouchableOpacity onPress={onPressGoBack} style={styles.iconBack}>
        {rightIcon && (
          <Icon state={rightIcon} fill={colors[color]} stroke={colors[color]} />
        )}
      </TouchableOpacity>
    </Block>
  )
}

export default HeaderApp
