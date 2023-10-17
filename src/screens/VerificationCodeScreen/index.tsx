import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard, ToastAndroid } from 'react-native'

import {
  Text,
  Block,
  Container,
  VerifyCodeInput,
  DismissKeyBoardBlock,
  VerifyCodeInputRefFunction,
} from '@components'
import { useTheme } from '@themes'
import { BackArrow } from '@assets'
import { goBack, navigate } from '@navigation'
import { useAppDispatch, useAppSelector } from '@hooks'
import { verifyAccount, verifyForgotPassword } from '@redux/actions/auth.action'
import SendAgain from "@screens/VerificationCodeScreen/components/SendAgain";
export const VerificationCodeScreen = () => {
  const [value, setValue] = React.useState<string>('')
  const verifyCodeInputRef = React.createRef<VerifyCodeInputRefFunction>()
  const { t } = useTranslation()
  const { normalize } = useTheme()
  const email = useAppSelector((state) => state.root.auth.email)


  const dispatch = useAppDispatch()
  const isVerified = useAppSelector((state) => state.root.user.isVerified)
  const user = useAppSelector((state) => state.root.user)
  const forgotToken = useAppSelector((state) => state.root.auth.forgotPasswordToken)

  const onSubmit = (value: string) => {
    Keyboard.dismiss()
    ToastAndroid.show('submit with value ' + value, ToastAndroid.SHORT)
    if (value && !user.email) dispatch(verifyForgotPassword(value));
    else dispatch(verifyAccount(value));
  }

  useEffect(() => {
    if (isVerified) {
      navigate('BOTTOM_TAB')
    }
  }, [isVerified])

  useEffect(() => {
    if (!user.email && forgotToken) {
      navigate('RESET_PASSWORD_SCREEN')
    }
  }, [forgotToken])

  return (
    <Container>
      <DismissKeyBoardBlock>
        <Block flex paddingHorizontal={24} paddingTop={10}>
          <BackArrow fill={'black'} onPress={goBack} />

          <Text color="black" size={'heading'} fontFamily="bold" marginTop={20}>
            {t('verify_account')}
          </Text>

          <Text size={'h4'} color={'textLabel'} marginTop={15} lineHeight={18}>
            {t('sub_label_code_verify', { val: email })}
          </Text>

          <VerifyCodeInput
            ref={verifyCodeInputRef}
            onEnd={onSubmit}
            canSubmitOnEnd={true}
            cellCount={4}
            value={value}
            setValue={setValue}
            inputContainerStyle={{
              marginTop: normalize.m(120),
            }}
          />
          <Block row marginTop={38} justifyCenter>
            <Text size={'h4'} color={'greySuperDark'} fontFamily="bold">
              {t('without_code').concat(' ')}
            </Text>
            <SendAgain/>
          </Block>
        </Block>
      </DismissKeyBoardBlock>
    </Container>
  )
}
