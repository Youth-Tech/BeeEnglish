import {
  Keyboard,
  ToastAndroid,
  KeyboardAvoidingView,
  DocumentSelectionState,
} from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import {
  Text,
  Block,
  Container,
  TextInput,
  ShadowButton,
  DismissKeyBoardBlock,
} from '@components'
import { useTheme } from '@themes'
import { BackArrow } from '@assets'
import { AuthService } from '@services/AuthService'
import { useValidateInput } from '@utils/validateInput'
import { RootStackParamList, goBack, pop } from '@navigation'

export type ChangePasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CHANGE_PASSWORD_SCREEN'
>

export const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const validate = useValidateInput()

  const firstTime = React.useRef(true)
  const confirmRef = React.useRef<DocumentSelectionState>()
  const passwordRef = React.useRef<DocumentSelectionState>()
  const oldPasswordRef = React.useRef<DocumentSelectionState>()

  const [oldPassword, setOldPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('')

  const checkPass = firstTime.current || validate.validatePassword(newPassword)
  const checkOldPass =
    firstTime.current || validate.validatePassword(oldPassword)
  const checkConfirmPass =
    firstTime.current ||
    validate.validateConfirmPassword(confirmNewPassword, newPassword)

  const disabledButton =
    !checkConfirmPass ||
    !checkOldPass ||
    !checkPass ||
    oldPassword.length === 0 ||
    newPassword.length === 0 ||
    confirmNewPassword.length === 0

  const handleNewPasswordSubmit = () => {
    confirmRef.current?.focus()
  }

  const handleOldPasswordSubmit = () => {
    passwordRef.current?.focus()
  }

  const showError = (type: 'password' | 'confirmPassword' | 'oldPassword') => {
    switch (type) {
      case 'password':
        if (newPassword.length === 0)
          return `${t('new_password')}${t('is_required')}`
        if (newPassword.length < 8)
          return `${t('new_password')}${t('is_too_short')}`
        if (!checkPass) return `${t('new_password')}${t('is_invalid')}`
        break
      case 'confirmPassword':
        if (confirmNewPassword.length === 0)
          return `${t('confirm_password')}${t('is_required')}`
        if (confirmNewPassword.length < 8)
          return `${t('confirm_password')}${t('is_too_short')}`
        if (newPassword !== confirmNewPassword)
          return `${t('confirm_password')}${t('is_not_same')}`
        if (!checkConfirmPass)
          return `${t('confirm_password')}${t('is_invalid')}`
        break
      case 'oldPassword':
        if (oldPassword.length === 0)
          return `${t('old_password')}${t('is_required')}`
        if (oldPassword.length < 8)
          return `${t('old_password')}${t('is_too_short')}`
        if (!checkOldPass) return `${t('old_password')}${t('is_invalid')}`
        break
    }
    return ''
  }

  const callAPI = async () => {
    try {
      const res = await AuthService.changePassword({
        confirmPassword: confirmNewPassword,
        newPassword: newPassword,
        oldPassword: oldPassword,
      })

      if (res.status === 200) {
        pop(1)
        ToastAndroid.show(t('change_pass_success'), ToastAndroid.LONG)
      }
    } catch (error) {
      ToastAndroid.show(t('old_password_is_wrong'), ToastAndroid.LONG)
      oldPasswordRef.current?.focus()
    }
  }

  const onSubmit = () => {
    callAPI()
  }

  React.useEffect(() => {
    if (firstTime.current) firstTime.current = false
  })

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Container hasScroll>
        <DismissKeyBoardBlock>
          <Block flex>
            <Block paddingHorizontal={24} paddingTop={10}>
              <BackArrow fill={'black'} onPress={goBack} />
              <Text
                color="black"
                marginTop={20}
                lineHeight={34}
                size={'heading'}
                fontFamily="bold"
              >
                {t('change_password')}
              </Text>
              <Text
                size={'h4'}
                marginTop={15}
                lineHeight={18}
                color={'textLabel'}
              >
                {t('label_new_password')}
              </Text>
              <Block marginTop={25} marginBottom={25}>
                <TextInput
                  value={oldPassword}
                  ref={oldPasswordRef}
                  secureTextEntry
                  returnKeyType="next"
                  blurOnSubmit={false}
                  showError={!checkOldPass}
                  label={t('old_password')}
                  placeholder="•••••••••••••"
                  onChangeText={setOldPassword}
                  error={showError('oldPassword')}
                  onSubmitEditing={handleOldPasswordSubmit}
                  placeholderTextColor={
                    checkOldPass ? colors.placeholder : colors.red
                  }
                />
              </Block>
              <Block marginBottom={25}>
                <TextInput
                  ref={passwordRef}
                  secureTextEntry
                  value={newPassword}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  showError={!checkPass}
                  label={t('new_password')}
                  placeholder="•••••••••••••"
                  error={showError('password')}
                  onChangeText={setNewPassword}
                  onSubmitEditing={handleNewPasswordSubmit}
                  placeholderTextColor={
                    checkPass ? colors.placeholder : colors.red
                  }
                />
              </Block>
              <Block marginBottom={25}>
                <TextInput
                  ref={confirmRef}
                  secureTextEntry
                  blurOnSubmit={false}
                  returnKeyType="default"
                  value={confirmNewPassword}
                  label={t('re_new_password')}
                  placeholder="•••••••••••••"
                  showError={!checkConfirmPass}
                  error={showError('confirmPassword')}
                  onChangeText={setConfirmNewPassword}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  placeholderTextColor={
                    checkConfirmPass ? colors.placeholder : colors.red
                  }
                />
              </Block>
            </Block>
            <Block
              alignCenter
              justifyCenter
              marginTop={50}
              marginLeft={50}
              marginRight={50}
              marginBottom={50}
            >
              <ShadowButton
                buttonRadius={8}
                buttonHeight={40}
                buttonWidth={200}
                shadowHeight={10}
                onPress={onSubmit}
                buttonBorderSize={2}
                disabled={disabledButton}
                buttonColor={'orangePrimary'}
                buttonBorderColor={'orangePrimary'}
                shadowButtonColor={'orangeLighter'}
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
