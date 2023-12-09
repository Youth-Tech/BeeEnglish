import { debounce } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import {
  Text,
  Block,
  TextInput,
  Container,
  ShadowButton,
  DismissKeyBoardBlock,
} from '@components'
import { Icon } from '@assets'
import { useTheme } from '@themes'
import { useAppDispatch } from '@hooks'
import { AuthService } from '@services/AuthService'
import { DocumentSelectionState } from 'react-native'
import { RootStackParamList, goBack, navigate } from '@navigation'
import {defaultUserState, setAuthState, setLoadingStatusAction, setUserState} from '@redux/reducers'

export type SendPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SEND_PASSWORD_SCREEN'
>

export const SendPasswordScreen: React.FC<SendPasswordScreenProps> = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [email, setEmail] = React.useState('')
  const [checkMail, setCheckMail] = useState(true)

  const emailInputRef = React.useRef<DocumentSelectionState>()

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

  const checkError = debounce((value: string) => {
    if (!checkMail) onCheckEmail(value)
  }, 300)

  const onDisabled = () => {
    if (email.length <= 3) return true
    return !checkMail
  }

  const callAPI = async () => {
    try {
      dispatch(setLoadingStatusAction(true))
      await AuthService.forgotPassword({ email })
      navigate('VERIFICATION_CODE_SCREEN', { type: 'forgotPassword', email })
    } catch (error) {
      console.log(error)
    }
    dispatch(setLoadingStatusAction(false))
  }

  const onSubmit = async () => {
    callAPI()
    dispatch(setUserState(defaultUserState))
    dispatch(setAuthState({ forgotPasswordToken: undefined }))
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
            {t('forgot_password')}
          </Text>
          <Text size={'h4'} color={'textLabel'} marginTop={15} lineHeight={18}>
            {t('label_send_password')}
          </Text>
          <Block marginTop={25} marginBottom={25}>
            <TextInput
              ref={emailInputRef}
              placeholder="example@gmail.com"
              onChangeText={(value) => {
                setEmail(value), checkError(value)
              }}
              value={email}
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
              blurOnSubmit={false}
              // placeholderTextColor={checkMail ? colors.placeholder : colors.red}
              error={showError()}
              showError={!checkMail}
              onBlur={() => onCheckEmail(email)}
            />
          </Block>
          <Block justifyCenter alignCenter marginTop={150}>
            <ShadowButton
              onPress={() => onSubmit()}
              buttonHeight={40}
              buttonWidth={200}
              buttonRadius={10}
              buttonBorderSize={2}
              shadowButtonColor={colors.orangeLighter}
              buttonBorderColor={colors.orangePrimary}
              buttonColor={colors.orangePrimary}
              disabled={onDisabled()}
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
