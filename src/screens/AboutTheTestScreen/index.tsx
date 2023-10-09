import React from 'react'
import { Text, Block, Container, ShadowButton, Image } from '@components'
import { Icon, images } from '@assets'
import { useTheme } from '@themes'
import { goBack } from '@navigation'
import { useTranslation } from 'react-i18next'

export const AboutTheTestScreen = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
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
          buttonHeight={40}
          buttonBorderSize={2}
          buttonBorderColor={colors.orangeLight}
          shadowHeight={6}
          buttonRadius={8}
          shadowButtonColor={colors.orangePrimary}
          buttonColor={colors.orangeLight}
          onPress={() => {
            console.log('press')
          }}
        >
          <Text size={'h3'} fontFamily="semiBold" color={colors.black}>
            {t('continue_button')}
          </Text>
        </ShadowButton>
      </Block>
    </Container>
  )
}
