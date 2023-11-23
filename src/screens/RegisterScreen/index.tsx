import {
  Keyboard,
  Pressable,
  KeyboardAvoidingView,
  DocumentSelectionState,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'

import {
  Text,
  Block,
  TextInput,
  Container,
  ShadowButton,
  SocialLoginButton,
  DismissKeyBoardBlock,
} from '@components'
import { Icon } from '@assets'
import { useTheme } from '@themes'
import { Provider } from '@configs'
import { AuthService } from '@services/AuthService'
import { useValidateInput } from '@utils/validateInput'
import { useAppDispatch, useAppSelector } from '@hooks'
import { setLoadingStatusAction } from '@redux/reducers'
import { loginOAuthThunk } from '@redux/actions/auth.action'
import { goBack, navigate, navigateAndReset } from '@navigation'

export const RegisterScreen = () => {
  const dispatch = useAppDispatch()
  const validate = useValidateInput()

  const { t } = useTranslation()
  const { colors, normalize } = useTheme()

  // const isSignedIn = useAppSelector((state) => state.root.auth.isSignedIn)
  // const isSignUp = useAppSelector((state) => state.root.auth.isSignUp)
  const isSignedInOAuth = useAppSelector(
    (state) => state.root.auth.isSignedInOAuth,
  )

  const fullNameInputRef = React.useRef<DocumentSelectionState>()
  const emailInputRef = React.useRef<DocumentSelectionState>()
  const passwordInputRef = React.useRef<DocumentSelectionState>()
  const confirmPasswordInputRef = React.useRef<DocumentSelectionState>()

  const [email, setEmail] = React.useState('')
  const [fullName, setFullName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [checkMail, setCheckMail] = useState(true)
  const [checkPass, setCheckPass] = useState(true)
  const [checkFullName, setCheckFullName] = useState(true)
  const [disabledLogin, setDisabledLogin] = React.useState(true)
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [checkConfirmPass, setCheckConfirmPass] = useState(true)

  const handleLoginGoogle = () => {
    dispatch(loginOAuthThunk({ providerId: Provider.google }))
  }

  const handleLoginFacebook = () => {
    dispatch(loginOAuthThunk({ providerId: Provider.facebook }))
  }

  useEffect(() => {
    email.length > 0 && password.length >= 6 && fullName.length >= 3
      ? setDisabledLogin(false)
      : setDisabledLogin(true)
  }, [email, password, fullName])

  const onCheckEmail = (value: string) => {
    setCheckMail(validate.validateEmail(value))
    return
  }

  const onCheckPass = (value: string, type: 'password' | 'confirmPassword') => {
    if (type === 'password') {
      setCheckPass(validate.validatePassword(value))
    } else {
      setCheckConfirmPass(validate.validateConfirmPassword(value, password))
    }
  }
  const onCheckFullName = (value: string) => {
    setCheckFullName(validate.validateFullName(value))
    return
  }

  const showError = (
    type: 'email' | 'password' | 'name' | 'confirmPassword',
  ) => {
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
      case 'confirmPassword':
        if (confirmPassword.length === 0)
          return `${t('confirm_password')}${t('is_required')}`
        if (confirmPassword.length < 8)
          return `${t('confirm_password')}${t('is_too_short')}`
        if (password !== confirmPassword)
          return `${t('confirm_password')}${t('is_not_same')}`
        if (!checkConfirmPass)
          return `${t('confirm_password')}${t('is_invalid')}`

        break
      case 'name':
        if (fullName.length === 0) return `${t('full_name')}${t('is_required')}`
        if (fullName.length < 3) return `${t('full_name')}${t('is_too_short')}`
        if (fullName.length > 30) return `${t('full_name')}${t('is_too_long')}`
        if (!checkFullName) return `${t('full_name')}${t('is_invalid')}`
        break
    }
    return 'hello'
  }

  const goLogin = () => {
    navigate('LOGIN_SCREEN')
  }
  const isErrorBeforeSubmit = () => {
    if (!validate.validateFullName(fullName)) {
      fullNameInputRef.current?.focus()
      return true
    }
    if (!validate.validateEmail(email)) {
      emailInputRef.current?.focus()
      return true
    }
    if (!validate.validatePassword(password)) {
      passwordInputRef.current?.focus()
      return true
    }
    if (!validate.validateConfirmPassword(confirmPassword, password)) {
      confirmPasswordInputRef.current?.focus()
      return true
    }
    return false
  }

  const onSubmit = async () => {
    if (isErrorBeforeSubmit()) return
    dispatch(setLoadingStatusAction(true))
    try {
      const res = await AuthService.signUp({
        email,
        password,
        confirmPassword,
        fullName,
      })
      if (res.status === 200) {
        navigate('VERIFICATION_CODE_SCREEN', { type: 'signUp', email })
      }
    } catch (e) {
      console.log(e)
    }
    dispatch(setLoadingStatusAction(false))
  }

  React.useEffect(() => {
    if (isSignedInOAuth) {
      navigateAndReset(
        [
          {
            name: 'BOTTOM_TAB',
          },
        ],
        0,
      )
    }
  }, [isSignedInOAuth])

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Container>
        <DismissKeyBoardBlock>
          <Block
            flex
            paddingHorizontal={24}
            space="between"
            paddingTop={10}
            paddingVertical={0}
          >
            <Block>
              <Icon state="Back" onPress={goBack} />
              <Text
                color={colors.black}
                size={'heading'}
                fontFamily="bold"
                marginTop={15}
              >
                {t('sign_up')}
              </Text>
              <Block marginTop={30}>
                <TextInput
                  label={t('full_name')}
                  placeholder={t('full_name_placeholder')}
                  onChangeText={(value) => {
                    setFullName(value)
                    useValidateInput().checkError(checkFullName, () => {
                      onCheckFullName(value)
                    })
                  }}
                  value={fullName}
                  returnKeyType="next"
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  blurOnSubmit={false}
                  placeholderTextColor={
                    checkFullName ? colors.placeholder : colors.red
                  }
                  error={showError('name')}
                  showError={!checkFullName}
                  onBlur={() => onCheckFullName(fullName)}
                />
              </Block>
              <Block marginTop={18}>
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
              <Block marginTop={18}>
                <TextInput
                  ref={passwordInputRef}
                  label={t('password')}
                  placeholder="•••••••••••••"
                  onChangeText={(value) => {
                    setPassword(value)
                    useValidateInput().checkError(checkPass, () => {
                      onCheckPass(value, 'password')
                    })
                    if (value.length > 8 && confirmPassword.length > 8) {
                      onCheckPass(confirmPassword, 'confirmPassword')
                      useValidateInput().checkError(checkConfirmPass, () => {
                        onCheckPass(value, 'confirmPassword')
                      })
                      showError('confirmPassword')
                      console.log('xin chao')
                    }
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    confirmPasswordInputRef.current?.focus()
                  }}
                  value={password}
                  secureTextEntry
                  blurOnSubmit={false}
                  placeholderTextColor={
                    checkPass ? colors.placeholder : colors.red
                  }
                  error={showError('password')}
                  showError={!checkPass}
                  onBlur={() => onCheckPass(password, 'password')}
                />
              </Block>
              <Block marginTop={18}>
                <TextInput
                  ref={confirmPasswordInputRef}
                  label={t('confirm_password')}
                  placeholder="•••••••••••••"
                  onChangeText={(value) => {
                    setConfirmPassword(value)
                    useValidateInput().checkError(checkConfirmPass, () => {
                      onCheckPass(value, 'confirmPassword')
                    })
                  }}
                  value={confirmPassword}
                  secureTextEntry
                  blurOnSubmit={false}
                  returnKeyType="default"
                  onSubmitEditing={() => {
                    Keyboard.dismiss()
                  }}
                  placeholderTextColor={
                    checkConfirmPass ? colors.placeholder : colors.red
                  }
                  error={showError('confirmPassword')}
                  showError={!checkConfirmPass}
                  onBlur={() => onCheckPass(confirmPassword, 'confirmPassword')}
                />
              </Block>

              <ShadowButton
                onPress={onSubmit}
                buttonHeight={35}
                buttonWidth={194}
                buttonRadius={10}
                shadowButtonColor={colors.orangeLighter}
                buttonColor={colors.orangePrimary}
                shadowHeight={7}
                disabled={disabledLogin}
                containerStyle={{
                  alignSelf: 'center',
                  marginTop: normalize.v(40),
                }}
              >
                <Text color="white" fontFamily="bold" size={'h3'}>
                  {t('sign_up')}
                </Text>
              </ShadowButton>

              <Block row marginTop={25} justifyCenter alignCenter>
                <Text size={'h4'} fontFamily="bold" color={colors.greyPrimary}>
                  {t('have_account')}?
                </Text>
                <Pressable
                  onPress={goLogin}
                  style={{ marginStart: normalize.h(3) }}
                >
                  <Text size={'h4'} fontFamily="bold" color={colors.orangeDark}>
                    {t('login')}
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
                  onPress={handleLoginGoogle}
                />
                <SocialLoginButton
                  name="Facebook"
                  icon="facebook"
                  onPress={handleLoginFacebook}
                />
              </Block>
            </Block>
          </Block>
        </DismissKeyBoardBlock>
      </Container>
    </KeyboardAvoidingView>
  )
}
