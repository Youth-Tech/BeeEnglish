import {
  Pressable,
  DocumentSelectionState,
  KeyboardAvoidingView,
} from 'react-native'
import React, {useEffect, useState} from 'react'
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
import {debounce} from 'lodash';

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


  const handleLoginGoogle = () => {}
  const handleLoginFacebook = () => {}
  useEffect(() => {
    email.length > 0 && password.length >= 6 && name.length >= 3
      ? setDisabledLogin(false)
      : setDisabledLogin(true)
  }, [email, password, name])

  const onCheckEmail = (value: string) => {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (pattern.test(value)) setCheckMail(true);
    else setCheckMail(false)
  }

  const onCheckPass = (value: string) => {
    if (value.length >= 6) setCheckPass(true);
    else setCheckPass(false)
  }
  const onCheckFullName = (value: string) => {

    const pattern = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}/
    console.log(value.length >= 3 && pattern.test(value))
    if (value.length >= 3 && pattern.test(value)) setCheckFullName(true);
    else setCheckFullName(false);
  }

  const checkError = debounce((value: string, type: 'email' | 'pass' | 'name') => {
    switch (type) {
      case 'email':
        if(!checkMail) onCheckEmail(value);
        break;
      case 'pass':
        if(!checkPass) onCheckPass(value);
        break;
      case 'name':
        if(!checkFullName) onCheckFullName(value);
        break;
    }
  }, 300);
  const showError = (type: 'email' | 'pass' | 'name') => {
    switch (type) {
      case 'email':
        if(email.length === 0) return 'Email is required';
        if (!checkMail) return 'Email invalidate';
        break;
      case 'pass':
        if(password.length === 0) return 'Password is required';
        if (password.length < 6) return 'Password must be at least 6 characters';
        if (!checkPass) return 'Password invalidate';
        break;
      case 'name':
        if(name.length === 0) return 'Full name is required';
        if (name.length < 3) return 'Full name must be at least 3 characters';
        if (!checkFullName) return 'Full name invalidate';
        break;
    }
    return '';
  };

  const goLogin = () => {
    navigate('LOGIN_SCREEN')
  }
  const onSubmit = () => {
    console.log("Vừa nhấn vô")
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
                  onChangeText={value => {
                    setName(value);
                    checkError(value,'name');
                  }}
                  value={name}
                  returnKeyType="next"
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  blurOnSubmit={false}
                  placeholderTextColor={
                    checkFullName ? colors.placeholder : colors.red
                  }
                  error={showError("name")}
                  showError={!checkFullName}
                  onBlur={() => onCheckFullName(name)}
                />
              </Block>
              <Block marginTop={25}>
                <TextInput
                  ref={emailInputRef}
                  label={'E-mail'}
                  placeholder="example@gmail.com"
                  onChangeText={value => {
                    setEmail(value);
                    checkError(value, 'email');
                  }}
                  value={email}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  blurOnSubmit={true}
                  placeholderTextColor={
                    checkMail ? colors.placeholder : colors.red
                  }
                  error={showError("email")}
                  showError={!checkMail}
                  onBlur={()=> onCheckEmail(email)}
                />
              </Block>
              <Block marginTop={25}>
                <TextInput
                  ref={passwordInputRef}
                  label={t('password')}
                  placeholder="•••••••••••••"
                  onChangeText={value => {
                    setPassword(value);
                    checkError(value, 'pass');
                  }}
                  value={password}
                  secureTextEntry
                  blurOnSubmit={true}
                  placeholderTextColor={
                    checkPass ? colors.placeholder : colors.red
                  }
                  error={showError("pass")}
                  showError={!checkPass}
                  onBlur={()=> onCheckPass(password)}
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
