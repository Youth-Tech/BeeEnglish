import React, { useState } from 'react'
import {
  Block,
  Container,
  DismissKeyBoardBlock,
  ShadowButton,
  Text,
  TextInput,
} from '@components'
import { BackArrow } from '@assets'
import { goBack, navigate } from '@navigation'
import { useTranslation } from 'react-i18next'
import {
  DocumentSelectionState,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native'
import { useValidateInput } from '@utils/validateInput'
import { useTheme } from '@themes'
import { useAppSelector } from '@hooks'
import { AuthService } from '@services/AuthService'

export const PasswordResetScreen = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [checkPass, setCheckPass] = useState(true)
  const [checkConfirmPass, setCheckConfirmPass] = useState(true)
  const passwordRef = React.useRef<DocumentSelectionState>()
  const confirmRef = React.useRef<DocumentSelectionState>()
  const forgotPasswordToken = useAppSelector(
    (state) => state.root.auth.forgotPasswordToken,
  )
  const handlePasswordSubmit = () => {
    confirmRef.current?.focus()
  }
  const validate = useValidateInput()

  const onCheckPass = (value: string, type: 'password' | 'confirmPassword') => {
    if (type === 'password') {
      setCheckPass(validate.validatePassword(value))
    } else {
      setCheckConfirmPass(validate.validateConfirmPassword(value, password))
    }
  }

  const showError = (type: 'password' | 'confirmPassword') => {
    switch (type) {
      case 'password':
        if (password.length === 0) return `${t('password')}${t('is_required')}`
        if (password.length < 8) return `${t('password')}${t('is_too_short')}`
        if (!checkPass) return `${t('password')}${t('is_invalid')}`
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
    }
    return 'hello'
  }

  const callAPI = async () => {
    if (!forgotPasswordToken) return
    await AuthService.resetPassword({
      forgotPasswordToken,
      newPassword: password,
      confirmPassword,
    })
    navigate('LOGIN_SCREEN')
  }
  const onSubmit = () => {
    callAPI()
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Container hasScroll>
        <DismissKeyBoardBlock>
          <Block flex>
            <Block paddingHorizontal={24} paddingTop={10}>
              <BackArrow fill={'black'} onPress={goBack} />
              <Text
                color="black"
                size={'heading'}
                fontFamily="bold"
                marginTop={20}
                lineHeight={34}
              >
                {t('enter_password')}
              </Text>
              <Text
                size={'h4'}
                color={'textLabel'}
                marginTop={15}
                lineHeight={18}
              >
                {t('label_new_password')}
              </Text>
              <Block marginTop={25} marginBottom={25}>
                <TextInput
                  ref={passwordRef}
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
                    }
                  }}
                  returnKeyType="next"
                  value={password}
                  secureTextEntry
                  blurOnSubmit={false}
                  placeholderTextColor={
                    checkPass ? colors.placeholder : colors.red
                  }
                  error={showError('password')}
                  showError={!checkPass}
                  onBlur={() => onCheckPass(password, 'password')}
                  onSubmitEditing={handlePasswordSubmit}
                />
              </Block>
              <Block marginBottom={25}>
                <TextInput
                  ref={confirmRef}
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
            </Block>
            <Block
              marginTop={50}
              marginBottom={50}
              marginLeft={50}
              marginRight={50}
              justifyCenter
              alignCenter
            >
              <ShadowButton
                buttonHeight={40}
                buttonWidth={200}
                buttonBorderSize={2}
                buttonBorderColor={'orangePrimary'}
                shadowHeight={10}
                buttonRadius={8}
                shadowButtonColor={'orangeLighter'}
                onPress={onSubmit}
              >
                <Text fontFamily="bold" size={'h3'} color="white">
                  {t('change_password')}
                </Text>
              </ShadowButton>
            </Block>
          </Block>
        </DismissKeyBoardBlock>
      </Container>
    </KeyboardAvoidingView>
  )
}
