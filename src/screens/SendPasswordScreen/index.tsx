import React, { useState } from 'react'
import {
  Container,
  TextInput,
  ShadowButton,
  Block,
  DismissKeyBoardBlock,
  Text,
} from '@components'
import { Icon } from '@assets'
import { goBack, navigate } from '@navigation'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@themes'
import { AuthService } from '@services/AuthService'

export const SendPasswordScreen = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const [email, setEmail] = React.useState('')
  const [checkMail, setCheckMail] = useState(true)

  const onCheckEmail = (value: string) => {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (pattern.test(value)) setCheckMail(true)
    else setCheckMail(false)
  }
  const showError = () => {
    if (email.length === 0) return `${t('email')}${t('is_required')}`
    if (!checkMail) return `${t('email')}${t('is_invalid')}`
    return ''
  }

  const onSubmit = () => {
    AuthService.sendVerifyCode({ email })
    navigate('VERIFICATION_CODE_SCREEN')
  }

  const onDisabled = (value: string) => {
    if (value.length === 0) return true
    return !checkMail
  }
  return (
    <Container>
      <DismissKeyBoardBlock>
        <Block flex paddingHorizontal={24} paddingTop={10}>
          <Icon state="Back" onPress={goBack} />
          <Text
            color="black"
            size={'heading'}
            fontFamily="bold"
            marginTop={20}
            lineHeight={34}
          >
            {t('change_password')}
          </Text>
          <Text size={'h4'} color={'textLabel'} marginTop={15} lineHeight={18}>
            {t('label_send_password')}
          </Text>
          <Block marginTop={25} marginBottom={20}>
            <TextInput
              placeholder="example@gmail.com"
              textContentType="emailAddress"
              value={email}
              onChangeText={setEmail}
              error={showError()}
              showError={!checkMail}
              onBlur={() => onCheckEmail(email)}
              onSubmitEditing={onSubmit}
            />
          </Block>
          <Block justifyCenter alignCenter marginTop={178}>
            <ShadowButton
              onPress={onSubmit}
              buttonHeight={40}
              buttonWidth={200}
              buttonRadius={10}
              buttonBorderSize={2}
              shadowButtonColor={colors.orangeLighter}
              buttonBorderColor={colors.orangePrimary}
              buttonColor={colors.orangePrimary}
              disabled={onDisabled(email)}
              shadowHeight={7}
            >
              <Text color="white" fontFamily="bold" size={'h3'}>
                {t('send')}
              </Text>
            </ShadowButton>
          </Block>
        </Block>
      </DismissKeyBoardBlock>
    </Container>
  )
}
