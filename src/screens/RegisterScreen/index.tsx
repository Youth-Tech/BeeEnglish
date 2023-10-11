import {
  Pressable,
  DocumentSelectionState,
  KeyboardAvoidingView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  Block,
  Container,
  DismissKeyBoardBlock,
  ShadowButton,
  SocialLoginButton,
  Text,
  TextInput,
} from '@components'
import { Icon } from '@assets'
import { goBack, navigate } from '@navigation'
import { useTheme } from '@themes'
import { useTranslation } from 'react-i18next'
import { debounce } from 'lodash'
import {useAppDispatch, useAppSelector} from "@hooks";
import {signIn} from "@redux/actions/auth.action";
import {setEmailSignIn} from "@redux/reducers";

export const RegisterScreen = () => {
  const { colors, normalize } = useTheme()
  const { t } = useTranslation()
  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [disabledLogin, setDisabledLogin] = React.useState(true)
  const [checkMail, setCheckMail] = useState(true)
  const [checkPass, setCheckPass] = useState(true)
  const [checkFullName, setCheckFullName] = useState(true)
  const [checkConfirmPass, setCheckConfirmPass] = useState(true)

  const emailInputRef = React.useRef<DocumentSelectionState>()
  const passwordInputRef = React.useRef<DocumentSelectionState>()

  const dispatch = useAppDispatch();
  const store = useAppSelector(state => state.root.user);

  const handleLoginGoogle = () => {}
  const handleLoginFacebook = () => {}
  useEffect(() => {
    email.length > 0 && password.length >= 6 && fullName.length >= 3
      ? setDisabledLogin(false)
      : setDisabledLogin(true)
  }, [email, password, fullName])

  const onCheckEmail = (value: string) => {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (pattern.test(value)) setCheckMail(true)
    else setCheckMail(false)
  }

  const onCheckPass = (value: string, type: 'password' | 'confirmPassword') => {
    if (value.length >= 6) {
      if (type === 'password') setCheckPass(true)
      if(type === 'confirmPassword') setCheckConfirmPass(true)
    } else {
      if (type === 'password') setCheckPass(false)
      if (type === 'confirmPassword') setCheckConfirmPass(false)
    }
    if(type === 'confirmPassword') {
      if (value === password) setCheckConfirmPass(true)
      else setCheckConfirmPass(false)
    }
    if(type === 'password') {
      if (value === confirmPassword && !checkConfirmPass) setCheckConfirmPass(true)
      else setCheckConfirmPass(false)
    }
  }
  const onCheckFullName = (value: string) => {
    const pattern = /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}/
    console.log(value.length >= 3 && pattern.test(value))
    if (value.length >= 3 && pattern.test(value)) setCheckFullName(true)
    else setCheckFullName(false)
  }

  const checkError = debounce(
    (
      value: string,
      type: 'email' | 'password' | 'name' | 'confirmPassword',
    ) => {
      switch (type) {
        case 'email':
          if (!checkMail) onCheckEmail(value)
          break
        case 'password':
          if (!checkPass) onCheckPass(value, "password")
          break
        case 'confirmPassword':
          if (!checkConfirmPass) onCheckPass(value, "confirmPassword")
          break
        case 'name':
          if (!checkFullName) onCheckFullName(value)
          break
      }
    },
    300,
  )
  const showError = (
    type: 'email' | 'password' | 'name' | 'confirmPassword',
  ) => {
    switch (type) {
      case 'email':
        if (email.length === 0) return `${t('email')}${t('is_required')}`
        if (!checkMail) return `${t('email')}${t('is_invalid')}`
        break;
      case 'password':
        if (password.length === 0) return `${t('password')}${t('is_required')}`
        if (password.length < 6) return `${t('password')}${t('is_too_short')}`
        if (!checkPass) return `${t('password')}${t('is_invalid')}`
        break;
      case 'confirmPassword':
        if (confirmPassword.length === 0)
          return `${t('confirm_password')}${t('is_required')}`
        if (confirmPassword.length < 6)
          return `${t('confirm_password')}${t('is_too_short')}`
        if (password !== confirmPassword)
          return `${t('confirm_password')}${t('is_not_same')}`
        if (!checkConfirmPass)
          return `${t('confirm_password')}${t('is_invalid')}`

        break;
      case 'name':
        if (fullName.length === 0) return `${t('full_name')}${t('is_required')}`
        if (fullName.length < 3) return `${t('full_name')}${t('is_too_short')}`
        if (fullName.length > 30) return `${t('full_name')}${t('is_too_long')}`
        if (!checkFullName) return `${t('full_name')}${t('is_invalid')}`
        break;
    }
    return 'hello'
  }

  const goLogin = () => {
    navigate('LOGIN_SCREEN')
  }
  const onSubmit = async () => {
    dispatch(signIn({ email, password, confirmPassword, fullName }));
    dispatch(setEmailSignIn(email));
  }

  useEffect(() => {
    const emailUser = store.email;
    const isVerified = store.isVerified;
    console.log(emailUser)
    if(emailUser && !isVerified) {
      navigate("VERIFICATION_CODE_SCREEN" );
    }
  }, [store]);


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
                    checkError(value, 'name')
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
                    checkError(value, 'email')
                  }}
                  value={email}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  blurOnSubmit={true}
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
                    checkError(value, 'password')
                  }}
                  value={password}
                  secureTextEntry
                  blurOnSubmit={true}
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
                  ref={passwordInputRef}
                  label={t('confirm_password')}
                  placeholder="•••••••••••••"
                  onChangeText={(value) => {
                    setConfirmPassword(value)
                    checkError(value, 'confirmPassword')
                  }}
                  value={confirmPassword}
                  secureTextEntry
                  blurOnSubmit={true}
                  placeholderTextColor={
                    checkPass ? colors.placeholder : colors.red
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
