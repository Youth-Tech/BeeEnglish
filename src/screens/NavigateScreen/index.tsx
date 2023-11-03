import { Pressable } from 'react-native'
import React from 'react'
import { Block, Container, Image, ShadowButton, Text } from '@components'
import { images } from '../../assets/images/index'
import { useTheme } from '@themes'
import { navigate } from '@navigation'
import { useTranslation } from 'react-i18next'

export const NavigateScreen = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  return (
    <Container>
      <Block backgroundColor={colors.white} flex>
        <Block marginTop={80} alignCenter>
          <Image
            source={images.BeeHello}
            width={183}
            height={229}
            resizeMode="cover"
          />
          <Text marginTop={25} size={'h1'} fontFamily="bold">
            BeeEnglish
          </Text>
          <Text marginTop={25} size={'h3'} fontFamily="semiBold">
            Learn Today, Lead Tomorrow
          </Text>
        </Block>
      </Block>

      <Block backgroundColor={colors.white}>
        <Block marginHorizontal={25} marginBottom={25}>
          <ShadowButton
            buttonHeight={40}
            buttonBorderSize={2}
            buttonBorderColor={colors.orangePrimary}
            shadowHeight={10}
            buttonRadius={8}
            shadowButtonColor={colors.orangeLighter}
            buttonColor={colors.orangePrimary}
            onPress={() => {
              navigate('LOGIN_SCREEN')
            }}
          >
            <Text size={'h3'} fontFamily="bold" color={colors.white}>
              {t('already_have_or_create_account')}
            </Text>
          </ShadowButton>
          <Pressable
            onPress={() => {
              navigate('BOTTOM_TAB')
            }}
          >
            <Text
              marginTop={20}
              size={'h3'}
              fontFamily="semiBold"
              center
              textDecorationLine="underline"
            >
              {t('continue_as_guest')}
            </Text>
          </Pressable>
        </Block>
      </Block>
    </Container>
  )
}
