import {
  Pressable,
  KeyboardAvoidingView,
  DocumentSelectionState,
} from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'

import {
  Text,
  Block,
  TextInput,
  Container,
  ShadowButton,
  DismissKeyBoardBlock,
} from '@components'
import { Icon } from '@assets'
import { useTheme } from '@themes'
import { useAppDispatch } from '@hooks'
import { TokenService } from '@services'
import { SocialLoginButton } from '@components'
import { AuthService } from '@services/AuthService'
import { DeviceInfoConfig, Provider } from '@configs'
import { goBack, navigate, replace } from '@navigation'
import { setAuthState, setLoadingStatusAction } from '@redux/reducers'
import { signingWithFacebook, signingWithGoogle } from '@utils/authUtils'

export const LoginScreen = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { colors, normalize } = useTheme()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [disabledLogin, setDisabledLogin] = React.useState(true)

  const passwordInputRef = React.useRef<DocumentSelectionState>()

  const onSubmit = () => {
    navigate('EMAIL_REGISTRATION_SCREEN')
  }
  const goRegister = () => {
    navigate('REGISTER_SCREEN')
  }
  const forgotPassword = () => {}

  const handleLoginOAuth = async (providerId: number) => {
    dispatch(setLoadingStatusAction(true))
    try {
      const loginHandle =
        providerId == Provider.Facebook
          ? signingWithFacebook
          : signingWithGoogle

      const resOAuth = await loginHandle()

      const res = await AuthService.oAuthLogin({
        accessToken: resOAuth as string,
        deviceId: DeviceInfoConfig.deviceId,
        deviceName: DeviceInfoConfig.deviceName,
        provider: providerId,
      })

      if (res.status === 200 && res.data?.data) {
        const { accessToken, refreshToken } = res.data.data
        dispatch(
          setAuthState({
            providerId: providerId,
          }),
        )

        TokenService.setAccessToken(accessToken)
        TokenService.setRefreshToken(refreshToken)
        replace('BOTTOM_TAB')
      }
    } catch (error) {
      console.log(`Error login with ${Provider[providerId]}`, error.message)
    }
    dispatch(setLoadingStatusAction(false))
  }

  React.useEffect(() => {
    email.length > 0 && password.length > 0
      ? setDisabledLogin(false)
      : setDisabledLogin(true)
  }, [email, password])

  return (
    <KeyboardAvoidingView style={{ flex: 1}}>
      <Container>
        <DismissKeyBoardBlock style={{flex: 1}}>
          <Block flex paddingHorizontal={24} paddingTop={10} space="between">
            <Block>
              <Icon state="Back" onPress={goBack} />
              <Text
                color={colors.black}
                size={'heading'}
                fontFamily="bold"
                marginTop={20}
              >
                {t('login')}
              </Text>
              <Block marginTop={25}>
                <TextInput
                  label={'E-mail'}
                  placeholder="example@gmail.com"
                  onChangeText={setEmail}
                  value={email}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  blurOnSubmit={false}
                />
              </Block>
              <Block marginTop={25}>
                <TextInput
                  ref={passwordInputRef}
                  label={t('password')}
                  placeholder="•••••••••••••"
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry
                />
              </Block>
              <Block alignCenter marginTop={125.4}>
                <Pressable
                  style={{
                    alignItems: 'center',
                    width: normalize.h(200),
                  }}
                  onPress={forgotPassword}
                >
                  <Text size={'h4'} fontFamily="bold" color={colors.orangeDark}>
                    {t('forgot_password')}?
                  </Text>
                </Pressable>
              </Block>
              <ShadowButton
                onPress={onSubmit}
                buttonHeight={35}
                buttonWidth={194}
                buttonRadius={10}
                shadowButtonColor={colors.orangeLighter}
                buttonColor={colors.orangePrimary}
                shadowHeight={7}
                containerStyle={{
                  alignSelf: 'center',
                  marginTop: normalize.v(26),
                }}
                disabled={disabledLogin}
              >
                <Text color="white" fontFamily="bold" size={'h3'}>
                  {t('login')}
                </Text>
              </ShadowButton>
              <Block row marginTop={25} justifyCenter alignCenter>
                <Text size={'h4'} fontFamily="bold" color={colors.greyPrimary}>
                  {t('dont_have_account')}?
                </Text>
                <Pressable
                  onPress={goRegister}
                  style={{ marginStart: normalize.h(3) }}
                >
                  <Text size={'h4'} fontFamily="bold" color={colors.orangeDark}>
                    {t('sign_up')}
                  </Text>
                </Pressable>
              </Block>
            </Block>
            <Block>
              <Block row alignCenter>
                <Block height={1} backgroundColor={colors.greyLighter} flex />
                <Text
                  size={'h4'}
                  fontFamily="bold"
                  color={colors.greyPrimary}
                  marginHorizontal={5}
                >
                  {t('login_with')}
                </Text>
                <Block height={1} backgroundColor={colors.greyLighter} flex />
              </Block>
              <Block marginBottom={16} row space="between">
                <SocialLoginButton
                  name="Google"
                  icon="google"
                  onPress={() => handleLoginOAuth(Provider.Google)}
                />
                <SocialLoginButton
                  name="Facebook"
                  icon="facebook"
                  onPress={() => handleLoginOAuth(Provider.Facebook)}
                />
              </Block>
            </Block>
          </Block>
        </DismissKeyBoardBlock>
      </Container>
    </KeyboardAvoidingView>
  )
}
