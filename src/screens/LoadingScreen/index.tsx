import React from 'react'
import { Block, BlockAnimated, Text } from '@components'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import LottieView from 'lottie-react-native'
import { animation } from '@assets'
import { StyleSheet } from 'react-native'
import { baseStyles, useTheme } from '@themes'
import { useTranslation } from 'react-i18next'
import { Portal } from 'react-native-portalize'

export const LoadingScreen = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  return (
    <Portal>
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
          style={baseStyles.absoluteFill}
          justifyEnd
          marginBottom={130}
          paddingHorizontal={20}
          alignCenter
        >
          <Text size={'heading'} fontFamily={'bold'} color={colors.orangeDark}>
            LOADING...
          </Text>
          <Text size={'h3'} color={colors.orangeDark} marginTop={20}>
            {t('loading_text')}
          </Text>
        </Block>
      </BlockAnimated>
    </Portal>
  )
}
const styles = StyleSheet.create({
  loadingAnimation: {
    // width: '100%',
    height: '100%',
    aspectRatio: 1,
  },
})
