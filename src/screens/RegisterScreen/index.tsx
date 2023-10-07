import {
  Pressable,
  DocumentSelectionState,
  KeyboardAvoidingView,
} from 'react-native'
import React, { useState } from 'react'
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

export const RegisterScreen = () => {
  const { colors, normalize } = useTheme()
  const { t } = useTranslation()
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [disabledLogin, setDisabledLogin] = React.useState(true)
  const [checkMail, setCheckMail] = useState(true)
  const [checkPass, setCheckPass] = useState(true)
  const [checkFullName, setCheckFullName] = useState(true)

  const emailInputRef = React.useRef<DocumentSelectionState>()
  const passwordInputRef = React.useRef<DocumentSelectionState>()

  const onSubmit = () => {
    console.log('handleSubmit')
  }
  const goLogin = () => {
    navigate('LOGIN_SCREEN')
  }
  const handleLoginGoogle = () => {}
  const handleLoginFacebook = () => {}
  React.useEffect(() => {
    email.length > 0 && password.length > 0
      ? setDisabledLogin(false)
      : setDisabledLogin(true)
  }, [email, password])

  const onCheckGmail = () => {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (pattern.test(email)) setCheckMail(true)
    else setCheckMail(false)
  }

  const onCheckPass = () => {
    if (password.length >= 6) setCheckPass(true)
    else setCheckPass(false)
  }
  const onCheckFullName = () => {
    const pattern = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/
    if (name.length >= 3 && pattern.test(name)) setCheckFullName(true)
    else setCheckFullName(false)
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Container>
        <DismissKeyBoardBlock>
          <Block flex paddingHorizontal={24} paddingTop={10} space="between">
            <Block>
              <Icon state="Back" onPress={goBack} />
              <Text
                color={colors.black}
                size={'heading'}
                fontFamily="bold"
                marginTop={20}
              >
                {t('sign_up')}
              </Text>
              <Block marginTop={25}>
                <TextInput
                  label={t('full_name')}
                  placeholder={t('full_name_placeholder')}
                  onChangeText={setName}
                  value={name}
                  returnKeyType="next"
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  blurOnSubmit={false}
                  style={{
                    backgroundColor: checkMail ? colors.white : colors.redLight,
                    color: checkMail ? colors.black : colors.red,
                  }}
                  placeholderTextColor={
                    checkMail ? colors.placeholder : colors.red
                  }
                  onBlur={onCheckFullName}
                />
              </Block>
              <Block marginTop={25}>
                <TextInput
                  ref={emailInputRef}
                  label={'E-mail'}
                  placeholder="example@gmail.com"
                  onChangeText={setEmail}
                  value={email}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  blurOnSubmit={true}
                  style={{
                    color: checkMail ? colors.black : colors.red,
                  }}
                  placeholderTextColor={
                    checkMail ? colors.placeholder : colors.red
                  }
                  onBlur={onCheckGmail}
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
                  blurOnSubmit={true}
                  style={{
                    color: checkMail ? colors.black : colors.red,
                  }}
                  placeholderTextColor={
                    checkMail ? colors.placeholder : colors.red
                  }
                  inputContainerStyle={{
                    backgroundColor: checkPass ? colors.white : colors.redLight,
                  }}
                  containerStyle={{
                    borderColor: checkPass ? colors.black : colors.red,
                  }}
                  onBlur={onCheckPass}
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
                  marginTop: normalize.v(57.4),
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
