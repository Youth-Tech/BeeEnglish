import React from 'react'
import { useStyles } from './styles'
import { Block, Image, Text } from '@components'
import { Icon, images } from '@assets'
import { TouchableOpacity, Animated } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@themes'

interface Props {
  opacity: Animated.AnimatedInterpolation<number>
}

const HeaderAccount: React.FC<Props> = ({ opacity }) => {
  const styles = useStyles()
  const { t } = useTranslation()
  const { colors } = useTheme()
  return (
    <Block>
      <Block style={styles.boxHeaderContainer}>
        <TouchableOpacity activeOpacity={0.5} style={styles.headerLeft}>
          <Image source={images.AccountBee} style={styles.accountBee} />
          <Text style={styles.titleAccount} size={'h2'} color={colors.white}>
            {t('account')}
          </Text>
        </TouchableOpacity>
        <Block style={[styles.headerLeft, styles.headerRight]}>
          <TouchableOpacity>
            <Icon state={'SendPaper'} stroke={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon state={'Setting'} stroke={colors.white} />
          </TouchableOpacity>
        </Block>
      </Block>
      <Animated.View
        style={[{ opacity }, styles.backgroundHeader]}
      ></Animated.View>
    </Block>
  )
}

export default HeaderAccount
