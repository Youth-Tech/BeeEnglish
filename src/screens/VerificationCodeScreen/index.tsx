import React from 'react'
import { Keyboard, ToastAndroid } from 'react-native'
import { useTranslation } from 'react-i18next'

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
import { goBack } from '@navigation'

export const VerificationCodeScreen = () => {
  const [value, setValue] = React.useState<string>('')
  const verifyCodeInputRef = React.createRef<VerifyCodeInputRefFunction>()

  const { t } = useTranslation()

  const { normalize } = useTheme()

  const onReceiveAgain = () => {
    console.log('onReceiveAgain')
  }

  const onSubmit = (value: string) => {
    Keyboard.dismiss()
    console.log('submit with value', value)
    ToastAndroid.show('submit with value ' + value, ToastAndroid.SHORT)
  }

  return (
    <Container>
      <DismissKeyBoardBlock>
        <Block flex paddingHorizontal={24} paddingTop={10}>
          <BackArrow fill={'black'} onPress={goBack} />

          <Text color="black" size={'heading'} fontFamily="bold" marginTop={20}>
            {t('verify_account')}
          </Text>

          <Text size={'h4'} color={'textLabel'} marginTop={15} lineHeight={18}>
            {t('sub_label_code_verify', { val: 'vutran789jjjj@gmail.com' })}
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

            <Text
              onPress={onReceiveAgain}
              color="orangeDark"
              fontFamily="bold"
              size={'h4'}
            >
              {t('send_again')}
            </Text>
          </Block>
        </Block>
      </DismissKeyBoardBlock>
    </Container>
  )
}
