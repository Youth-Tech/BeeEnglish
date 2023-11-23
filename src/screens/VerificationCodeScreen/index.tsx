import React from 'react'
import { Keyboard } from 'react-native'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import {
  Text,
  Block,
  Container,
  VerifyCodeInput,
  DismissKeyBoardBlock,
  VerifyCodeInputRefFunction,
} from '@components'
import {
  goBack,
  navigate,
  navigateAndReset,
  RootStackParamList,
} from '@navigation'
import { useTheme } from '@themes'
import { BackArrow } from '@assets'
import { useAppDispatch } from '@hooks'
import { AuthService } from '@services/AuthService'
import SendAgain from '@screens/VerificationCodeScreen/components/SendAgain'
import { setForgotPasswordToken, setLoadingStatusAction } from '@redux/reducers'

export type VerificationCodeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'VERIFICATION_CODE_SCREEN'
>

export const VerificationCodeScreen: React.FC<VerificationCodeScreenProps> = ({
  route,
}) => {
  const { type, email } = route.params
  const [value, setValue] = React.useState<string>('')
  const verifyCodeInputRef = React.createRef<VerifyCodeInputRefFunction>()
  const { t } = useTranslation()
  const { normalize } = useTheme()

  const dispatch = useAppDispatch()
  // const isVerified = useAppSelector((state) => state.root.user.isVerified)
  // const user = useAppSelector((state) => state.root.user)
  // const forgotToken = useAppSelector(
  //   (state) => state.root.auth.forgotPasswordToken,
  // )

  const onSubmit = (value: string) => {
    Keyboard.dismiss()
    if (type === 'signUp') {
      // dispatch(verifyAccount(value))
      handleVerifyAccount(value)
    } else {
      // dispatch(verifyForgotPassword(value))
      handleVerifyForgotPassword(value)
    }
  }

  const handleVerifyForgotPassword = async (code: string) => {
    try {
      dispatch(setLoadingStatusAction(true))
      const res = await AuthService.verifyForgotPassword({ code })
      if(res.status === 200){
        dispatch(setForgotPasswordToken(res.data.data))
        navigate('RESET_PASSWORD_SCREEN')
      }
    } catch (e) {
      console.log(e)
    }
    dispatch(setLoadingStatusAction(false))
  }

  const handleVerifyAccount = async (code: string) => {
    try {
      dispatch(setLoadingStatusAction(true))
      const res = await AuthService.verifyAccount({
        code,
      })
      if (res.status === 200) {
        navigateAndReset(
          [
            {
              name: 'LOGIN_SCREEN',
            },
          ],
          0,
        )
        Toast.show({
          type: 'success',
          text1: t('congratulation'),
          text2: t('register_success'),
          position: 'top',
        })
      }
    } catch (e) {
      console.log(e)
    }
    dispatch(setLoadingStatusAction(false))
  }

  //
  // useEffect(() => {
  //   if (isVerified) {
  //     navigateAndReset(
  //       [
  //         {
  //           name: 'LOGIN_SCREEN',
  //         },
  //       ],
  //       0,
  //     )
  //     Toast.show({
  //       type: 'success',
  //       text1: t('congratulation'),
  //       text2: t('register_success'),
  //       position: 'top',
  //     })
  //   }
  // }, [isVerified])
  //
  // useEffect(() => {
  //   if (!user.email && forgotToken) {
  //     navigate('RESET_PASSWORD_SCREEN')
  //   }
  // }, [forgotToken])

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
            <SendAgain />
          </Block>
        </Block>
      </DismissKeyBoardBlock>
    </Container>
  )
}
