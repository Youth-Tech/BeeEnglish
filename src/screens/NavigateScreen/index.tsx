import React from 'react'
import { Pressable } from 'react-native'
import { useTranslation } from 'react-i18next'

import { images } from '@assets'
import { useTheme } from '@themes'
import { DeviceInfoConfig } from '@configs'
import { navigate, replace } from '@navigation'
import { loginForGuest } from '@redux/actions'
import { getIsLoginWithGuest } from '@redux/selectors'
import { useAppDispatch, useAppSelector } from '@hooks'
import { Block, Container, Image, ShadowButton, Text } from '@components'

export const NavigateScreen = () => {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const { t } = useTranslation()

  const isLoginWithGuest = useAppSelector(getIsLoginWithGuest)

  const onContinueWithGuestPress = () => {
    dispatch(
      loginForGuest({
        deviceId: DeviceInfoConfig.deviceId,
        deviceName: DeviceInfoConfig.deviceName,
      }),
    )
  }

  React.useEffect(() => {
    if (isLoginWithGuest) {
      console.log('bug')
      replace('EXAM_TEST_SCREEN')
    }
  }, [isLoginWithGuest])

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
          <Pressable onPress={onContinueWithGuestPress}>
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
