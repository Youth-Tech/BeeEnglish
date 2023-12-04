import {
  Keyboard,
  Pressable,
  KeyboardAvoidingView,
  DocumentSelectionState,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import {
  Text,
  Block,
  Container,
  TextInput,
  ShadowButton,
  SocialLoginButton,
  DismissKeyBoardBlock,
} from '@components'
import {
  login,
  loginOAuthThunk,
  resendVerifyEmail,
} from '@redux/actions/auth.action'
import { Icon } from '@assets'
import { useTheme } from '@themes'
import { UserService } from '@services'
import { navigate, replace } from '@navigation'
import { DeviceInfoConfig, Provider } from '@configs'
import { getFCMToken } from '@utils/notificationUtils'
import { useAppDispatch, useAppSelector } from '@hooks'
import { useValidateInput } from '@utils/validateInput'
import { defaultUserState, setAuthState, setUserState } from '@redux/reducers'

export const LoginScreen = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const { colors, normalize } = useTheme()
  const [email, setEmail] = React.useState('')
  const [checkMail, setCheckMail] = useState(true)
  const [checkPass, setCheckPass] = useState(true)
  const [password, setPassword] = React.useState('')
  const dataUser = useAppSelector((state) => state.root.user)
  const isResend = useAppSelector(
    (state) => state.root.auth.isResendVerifyEmail,
  )

  const [disabledLogin, setDisabledLogin] = React.useState(true)
  const emailInputRef = React.useRef<DocumentSelectionState>()
  const passwordInputRef = React.useRef<DocumentSelectionState>()
  const isErrorBeforeSubmit = () => {
    if (!validate.validateEmail(email)) {
      emailInputRef.current?.focus()
      return true
    }
    if (!validate.validatePassword(password)) {
      passwordInputRef.current?.focus()
      return true
    }

    return false
  }

  const onSubmit = () => {
    if (isErrorBeforeSubmit()) return
    dispatch(setUserState(defaultUserState))
    dispatch(setAuthState({ isResendVerifyEmail: false }))
    if (email && password)
      dispatch(
        login({
          email,
          password,
          deviceId: DeviceInfoConfig.deviceId,
          deviceName: DeviceInfoConfig.deviceName,
        }),
      )
  }
  const goRegister = () => {
    navigate('REGISTER_SCREEN')
  }
  const forgotPassword = () => {
    navigate('SEND_PASSWORD_SCREEN')
  }

  const updateFCMToken = async () => {
    try {
      const fcmToken = await getFCMToken()
      await UserService.updateFCMToken({
        fcmToken: fcmToken ?? '',
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (dataUser.email && dataUser.isVerified) {
      updateFCMToken()
      if (dataUser.pretest) {
        replace('BOTTOM_TAB')
      } else {
        replace('EXAM_TEST_SCREEN')
      }
    }
    if (isResend && email) {
      dispatch(resendVerifyEmail(email))
      navigate('VERIFICATION_CODE_SCREEN', { type: 'signUp', email })
    }
  }, [dataUser, isResend])

  const handleLoginOAuth = async (providerId: Provider) => {
    dispatch(loginOAuthThunk({ providerId }))
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
        if (!checkPass)
          return `${t('password')}${t('password_need_1_capital_normal_number')}`
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
              <Icon
                state="Back"
                onPress={() => {
                  if (navigation.canGoBack()) {
                    navigation.goBack()
                  } else {
                    replace('NAVIGATE_SCREEN')
                  }
                }}
              />
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
                  ref={emailInputRef}
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
                  onPress={() => handleLoginOAuth(Provider.google)}
                />
                <SocialLoginButton
                  name="Facebook"
                  icon="facebook"
                  onPress={() => handleLoginOAuth(Provider.facebook)}
                />
              </Block>
            </Block>
          </Block>
        </DismissKeyBoardBlock>
      </Container>
    </KeyboardAvoidingView>
  )
}
