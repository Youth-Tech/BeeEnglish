import { Pressable, DocumentSelectionState } from 'react-native'
import React from 'react'
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

  const emailInputRef = React.useRef<DocumentSelectionState>()
  const passwordInputRef = React.useRef<DocumentSelectionState>()

  const onSubmit = () => {
    console.log('handleSubmit')
  }
  const goLogin = () => {
    navigate('LOGIN_SCREEN')
  }
  const handleLoginGoogle = () => { }
  const handleLoginFacebook = () => { }
  return (
    <Container>
      <DismissKeyBoardBlock>
        <Block flex paddingHorizontal={24} paddingTop={10} space="between">
          <Block>
            <Icon state='Back' onPress={goBack} />
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
                label={t('fullname')}
                placeholder={t('fullname_placeholder')}
                onChangeText={setName}
                value={name}
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
                blurOnSubmit={false}
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

            <ShadowButton
              onPress={onSubmit}
              buttonHeight={45}
              buttonWidth={194}
              buttonRadius={10}
              shadowButtonColor={colors.orangeLighter}
              buttonColor={colors.orangePrimary}
              shadowHeight={7}
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
  )
}
