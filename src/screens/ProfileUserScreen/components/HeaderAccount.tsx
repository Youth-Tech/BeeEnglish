import React from 'react'
import { useStyles } from './styles'
import { Block, Image } from '@components'
import { Icon, images } from '@assets'
import { TouchableOpacity, Animated, Linking } from 'react-native'
import { useTheme } from '@themes'
import { useTranslation } from 'react-i18next'
import { navigate } from '@navigation'

interface Props {
  opacity: Animated.AnimatedInterpolation<number>
  unOpacity: Animated.AnimatedInterpolation<number>
  color: Animated.AnimatedInterpolation<string>
}

const HeaderAccount: React.FC<Props> = ({ opacity, unOpacity, color }) => {
  const styles = useStyles()
  const { colors } = useTheme()
  const { t } = useTranslation()

  const handleOnPressSetting = () => {
    navigate('SETTING_SCREEN')
  }

  return (
    <Block>
      <Block style={styles.boxHeaderContainer}>
        <TouchableOpacity activeOpacity={0.5} style={styles.headerLeft}>
          <Image source={images.AccountBee} style={styles.accountBee} />
          <Animated.Text style={[styles.titleAccount, { color }]}>
            {t('account')}
          </Animated.Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.headerLeft,
            styles.headerRight,
            { opacity: unOpacity },
          ]}
        >
          <TouchableOpacity>
            <Icon state={'SendPaper'} stroke={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOnPressSetting}>
            <Icon state={'Setting'} stroke={colors.white} />
          </TouchableOpacity>
        </Animated.View>
      </Block>
      <Animated.View style={[{ opacity }, styles.backgroundHeader]}>
        <Block style={[styles.headerLeft, styles.headerRight]}>
          <TouchableOpacity>
            <Icon state={'SendPaper'} stroke={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOnPressSetting}>
            <Icon state={'Setting'} stroke={colors.black} />
          </TouchableOpacity>
        </Block>
      </Animated.View>
    </Block>
  )
}

export default HeaderAccount
