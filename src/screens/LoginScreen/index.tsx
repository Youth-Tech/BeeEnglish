import {
  Pressable,
  KeyboardAvoidingView,
  DocumentSelectionState,
  Keyboard,
} from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { useAppDispatch, useAppSelector } from '@hooks'
import { TokenService } from '@services'
import { SocialLoginButton } from '@components'
import { AuthService } from '@services/AuthService'
import { DeviceInfoConfig, Provider } from '@configs'
import { goBack, navigate, replace } from '@navigation'
import {
  defaultUserState,
  setAuthState,
  setLoadingStatusAction,
  setUserState,
} from '@redux/reducers'
import { signingWithFacebook, signingWithGoogle } from '@utils/authUtils'
import { useValidateInput } from '@utils/validateInput'
import { login, resendVerifyEmail } from '@redux/actions/auth.action'

export const LoginScreen = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { colors, normalize } = useTheme()
  const [email, setEmail] = React.useState('')
  const [checkMail, setCheckMail] = useState(true)
  const [checkPass, setCheckPass] = useState(true)
  const [password, setPassword] = React.useState('')
  const dataUser = useAppSelector((state) => state.root.user)
  const isResend = useAppSelector((state) => state.root.auth.isResendVerifyEmail);

  const [disabledLogin, setDisabledLogin] = React.useState(true)

  const passwordInputRef = React.useRef<DocumentSelectionState>()

  const onSubmit = () => {
    dispatch(setUserState(defaultUserState))
    dispatch(setAuthState({isResendVerifyEmail: false}))
    if (email && password) dispatch(login({ email, password }))
  }
  const goRegister = () => {
    navigate('REGISTER_SCREEN')
  }
  const forgotPassword = () => {
    navigate('SEND_PASSWORD_SCREEN')
  }

  useEffect(() => {
    if (dataUser.email && dataUser.isVerified) {
      replace('BOTTOM_TAB')
    }
    if (isResend && email) {
      dispatch(resendVerifyEmail(email))
      navigate('VERIFICATION_CODE_SCREEN')
    }
  }, [dataUser, isResend])

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
  const validate = useValidateInput()
  const onCheckEmail = (value: string) => {
    setCheckMail(validate.validateEmail(value))
    return
  }

  const onCheckPass = (value: string) => {
    setCheckPass(validate.validatePassword(value))
  }

  const showError = (type: 'email' | 'password') => {
    switch (type) {
      case 'email':
        if (email.length === 0) return `${t('email')}${t('is_required')}`
        if (!checkMail) return `${t('email')}${t('is_invalid')}`
        break
      case 'password':
        if (password.length === 0) return `${t('password')}${t('is_required')}`
        if (password.length < 8) return `${t('password')}${t('is_too_short')}`
        if (!checkPass) return `${t('password')}${t('is_invalid')}`
        break
    }
    return 'hello'
  }

  const handleEndEditing = () => {
    Keyboard.dismiss()
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Container>
        <DismissKeyBoardBlock style={{ flex: 1 }}>
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
                  onChangeText={(value) => {
                    setEmail(value)
                    useValidateInput().checkError(checkMail, () => {
                      onCheckEmail(value)
                    })
                  }}
                  value={email}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus()
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={
                    checkMail ? colors.placeholder : colors.red
                  }
                  error={showError('email')}
                  showError={!checkMail}
                  onBlur={() => onCheckEmail(email)}
                />
              </Block>
              <Block marginTop={25}>
                <TextInput
                  ref={passwordInputRef}
                  label={t('password')}
                  placeholder="•••••••••••••"
                  onChangeText={(value) => {
                    setPassword(value)
                    useValidateInput().checkError(checkPass, () => {
                      onCheckPass(value)
                    })
                  }}
                  returnKeyType="done"
                  value={password}
                  secureTextEntry
                  blurOnSubmit={false}
                  placeholderTextColor={
                    checkPass ? colors.placeholder : colors.red
                  }
                  error={showError('password')}
                  showError={!checkPass}
                  onBlur={() => onCheckPass(password)}
                  onEndEditing={handleEndEditing}
                  onSubmitEditing={handleEndEditing}
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
