import React, { useEffect, useState } from 'react'
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
import { debounce } from 'lodash'
import { useTheme } from '@themes'
import { AuthService } from '@services/AuthService'
import { useAppSelector } from '@hooks'

export const PasswordResetScreen = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [checkPass, setCheckPass] = useState(true)
  const [checkConfirmPass, setCheckConfirmPass] = useState(true)
  const [disabled, setDisabled] = React.useState(true)

  // const dispatch = useAppDispatch()
  const forgotPasswordToken = useAppSelector((state) => state.root.auth.forgotPasswordToken)

  useEffect(() => {
    newPassword.length >= 6 && confirmPassword.length >= 6
      ? setDisabled(false)
      : setDisabled(true)
  }, [newPassword, confirmPassword])
  const passwordRef = React.useRef<DocumentSelectionState>()
  const confirmRef = React.useRef<DocumentSelectionState>()

  const handlePasswordSubmit = () => {
    confirmRef.current?.focus()
  }
  // check pass
  const onCheckPass = (value: string, type: 'password' | 'confirmPassword') => {
    if (value.length >= 6) {
      if (type === 'password') setCheckPass(true)
      if (type === 'confirmPassword') setCheckConfirmPass(true)
    } else {
      if (type === 'password') setCheckPass(false)
      if (type === 'confirmPassword') setCheckConfirmPass(false)
    }
    if (type === 'confirmPassword') {
      if (value === newPassword) setCheckConfirmPass(true)
      else setCheckConfirmPass(false)
    }
    if (type === 'password') {
      if (value === confirmPassword && !checkConfirmPass)
        setCheckConfirmPass(true)
      else setCheckConfirmPass(false)
    }
  }
  const checkError = debounce(
    (value: string, type: 'password' | 'confirmPassword') => {
      switch (type) {
        case 'password':
          if (!checkPass) onCheckPass(value, 'password')
          break
        case 'confirmPassword':
          if (!checkConfirmPass) onCheckPass(value, 'confirmPassword')
          break
      }
    },
    300,
  )
  const showError = (type: 'password' | 'confirmPassword') => {
    switch (type) {
      case 'password':
        if (newPassword.length === 0)
          return `${t('password')}${t('is_required')}`
        if (newPassword.length < 6)
          return `${t('password')}${t('is_too_short')}`
        if (!checkPass) return `${t('password')}${t('is_invalid')}`
        break
      case 'confirmPassword':
        if (confirmPassword.length === 0)
          return `${t('confirm_password')}${t('is_required')}`
        if (confirmPassword.length < 6)
          return `${t('confirm_password')}${t('is_too_short')}`
        if (newPassword !== confirmPassword)
          return `${t('confirm_password')}${t('is_not_same')}`
        if (!checkConfirmPass)
          return `${t('confirm_password')}${t('is_invalid')}`
        break
    }
    return ''
  }

  const callAPI = async () => {
    if (!forgotPasswordToken) return;
    await AuthService.resetPassword({
      forgotPasswordToken,
      newPassword,
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
                  label={t('password')}
                  placeholder="•••••••••••••"
                  textContentType="password"
                  value={newPassword}
                  onChangeText={(value) => {
                    setNewPassword(value)
                    checkError(value, 'password')
                  }}
                  secureTextEntry
                  ref={passwordRef}
                  returnKeyType="next"
                  onSubmitEditing={handlePasswordSubmit}
                  blurOnSubmit={false}
                  placeholderTextColor={
                    checkPass ? colors.placeholder : colors.red
                  }
                  error={showError('password')}
                  showError={!checkPass}
                  onBlur={() => onCheckPass(newPassword, 'password')}
                />
              </Block>
              <Block marginBottom={25}>
                <TextInput
                  label={t('confirm_password')}
                  placeholder="•••••••••••••"
                  textContentType="password"
                  value={confirmPassword}
                  onChangeText={(value) => {
                    setConfirmPassword(value)
                    checkError(value, 'confirmPassword')
                  }}
                  secureTextEntry
                  ref={confirmRef}
                  blurOnSubmit={false}
                  returnKeyType="default"
                  onSubmitEditing={() => {
                    Keyboard.dismiss()
                  }}
                  placeholderTextColor={
                    checkPass ? colors.placeholder : colors.red
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
                buttonRadius={10}
                buttonBorderSize={2}
                shadowButtonColor={colors.orangeLighter}
                buttonBorderColor={colors.orangePrimary}
                buttonColor={colors.orangePrimary}
                shadowHeight={7}
                onPress={() => {
                  onSubmit()
                }}
                disabled={disabled}
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
