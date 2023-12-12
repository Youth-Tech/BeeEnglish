import React from 'react'
import { animation } from '@assets'
import { StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'
import { baseStyles, useTheme } from '@themes'
import { useTranslation } from 'react-i18next'
import { Block, BlockAnimated, Text } from '@components'
import { FadeIn, FadeOut } from 'react-native-reanimated'

export const LoadingScreen = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  return (
    <BlockAnimated
      flex
      alignCenter
      entering={FadeIn}
      exiting={FadeOut}
      backgroundColor={colors.white}
    >
      <LottieView
        autoPlay
        source={animation.beeLoading}
        style={styles.loadingAnimation}
      />
      <Block
        justifyEnd
        alignCenter
        marginBottom={80}
        paddingHorizontal={20}
        style={baseStyles.absoluteFill}
      >
        <Text size={'heading'} fontFamily={'bold'} color={colors.orangeDark}>
          LOADING...
        </Text>
        <Text size={'h3'} color={colors.orangeDark} marginTop={20}>
          {t('loading_text')}
        </Text>
      </Block>
    </BlockAnimated>
  )
}
const styles = StyleSheet.create({
  loadingAnimation: {
    height: '100%',
    aspectRatio: 1,
  },
})
