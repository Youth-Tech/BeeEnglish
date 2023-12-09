import React from 'react'
import { useTranslation } from 'react-i18next'

import { useTheme } from '@themes'
import { Icon, images } from '@assets'
import { goBack, replace } from '@navigation'
import { Block, Container, Image, ShadowButton, Text } from '@components'

export const AboutTheTestScreen = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const onContinuePress = () => {
    replace('PRE_TEST_SCREEN')
  }

  return (
    <Container>
      <Block flex>
        <Block row alignCenter paddingHorizontal={25}>
          <Block>
            <Icon state="Back" onPress={goBack} />
          </Block>
          <Block flex paddingRight={25}>
            <Text size={'h2'} fontFamily="bold" center>
              {t('test')}
            </Text>
          </Block>
        </Block>
        <Block alignCenter justifyCenter flex>
          <Block paddingHorizontal={25}>
            <Text size={'h2'} fontFamily="bold" numberOfLines={2} center>
              {t('take_the_test_to_let_us_know_your_capabilities')}
            </Text>
          </Block>
          <Block paddingTop={20}>
            <Image
              source={images.BeeHello}
              width={175}
              height={229}
              resizeMode="contain"
            />
          </Block>
        </Block>
      </Block>
      <Block marginBottom={40} paddingHorizontal={20}>
        <ShadowButton
          buttonRadius={8}
          shadowHeight={6}
          buttonHeight={40}
          buttonBorderSize={2}
          onPress={onContinuePress}
          buttonColor={colors.orangeLight}
          buttonBorderColor={colors.orangeLight}
          shadowButtonColor={colors.orangePrimary}
        >
          <Text size={'h3'} fontFamily="semiBold" color={colors.black}>
            {t('continue_button')}
          </Text>
        </ShadowButton>
      </Block>
    </Container>
  )
}
