import React from 'react'
import { Keyboard } from 'react-native'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import {
  Text,
  Block,
  Modal,
  Image,
  Container,
  ShadowButton,
  VerifyCodeInput,
  DismissKeyBoardBlock,
  VerifyCodeInputRefFunction,
} from '@components'
import {
  pop,
  goBack,
  navigate,
  navigateAndReset,
  RootStackParamList,
} from '@navigation'
import { makeStyles, useTheme } from '@themes'
import { BackArrow, images } from '@assets'
import { useAppDispatch, useAppSelector } from '@hooks'
import { AuthService } from '@services/AuthService'
import SendAgain from '@screens/VerificationCodeScreen/components/SendAgain'
import {
  setAuthState,
  setUserState,
  setTempLoginInfo,
  setForgotPasswordToken,
  setLoadingStatusAction,
} from '@redux/reducers'
import { DeviceInfoConfig } from '@configs'
import { TokenService, UserService } from '@services'
import { ModalFunction } from '@components/bases/Modal/type'

export type VerificationCodeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'VERIFICATION_CODE_SCREEN'
>

export const VerificationCodeScreen: React.FC<VerificationCodeScreenProps> = ({
  route,
}) => {
  const { type, email } = route.params

  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const styles = useStyles()
  const tempInfoLogin = useAppSelector((state) => state.root.auth.tempLoginInfo)
  const deviceId = useAppSelector((state) => state.root.auth.deviceId)

  const modalMigrateRef = React.useRef<ModalFunction>(null)

  const [value, setValue] = React.useState<string>('')
  const verifyCodeInputRef = React.createRef<VerifyCodeInputRefFunction>()
  const { t } = useTranslation()
  const { normalize } = useTheme()

  // const isVerified = useAppSelector((state) => state.root.user.isVerified)
  // const user = useAppSelector((state) => state.root.user)
  // const forgotToken = useAppSelector(
  //   (state) => state.root.auth.forgotPasswordToken,
  // )

  const onSubmit = (value: string) => {
    Keyboard.dismiss()
    switch (type) {
      case 'forgotPassword':
        handleVerifyForgotPassword(value)
        break
      case 'migrate':
        handleVerifyMigrateAccount(value)
        break
      case 'signUp':
        handleVerifyAccount(value)
        break
    }
  }

  const handleVerifyMigrateAccount = async (code: string) => {
    dispatch(setLoadingStatusAction(true))
    try {
      const verifyRes = await AuthService.verifyAccount({
        code,
      })
      if (verifyRes.status === 200) {
        const loginRes = await AuthService.login({
          email: tempInfoLogin?.email!,
          password: tempInfoLogin?.password!,
          deviceName: DeviceInfoConfig.deviceName,
          deviceId: deviceId ?? DeviceInfoConfig.deviceId,
        })

        if (loginRes.status === 200) {
          TokenService.setAccessToken(loginRes.data.data.tokens.accessToken)
          TokenService.setRefreshToken(loginRes.data.data.tokens.refreshToken)
          dispatch(setTempLoginInfo({ email: '', password: '' }))
          if (loginRes.data.data.restored) {
            modalMigrateRef?.current?.openModal()
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
    dispatch(setLoadingStatusAction(false))
  }

  const handleMigrateAccount = async () => {
    modalMigrateRef?.current?.dismissModal()
    dispatch(setLoadingStatusAction(true))
    try {
      const migrateRes = await UserService.migrateWithGuestAccount({
        deviceId: deviceId ?? DeviceInfoConfig.deviceId,
      })
      if (migrateRes.status === 200) {
        dispatch(setUserState(migrateRes.data.data))
        dispatch(
          setAuthState({
            isSignUp: false,
            isSignedIn: true,
            isLoginWithGuest: false,
          }),
        )
        pop(2)
      }
    } catch (e) {
      console.log(e)
    }
    dispatch(setLoadingStatusAction(false))
  }

  const handleNoAcceptMigrate = () => {
    modalMigrateRef?.current?.dismissModal()
    dispatch(
      setAuthState({
        isSignedIn: true,
        isSignUp: false,
        isLoginWithGuest: false,
      }),
    )
    pop(2)
  }

  const handleVerifyForgotPassword = async (code: string) => {
    try {
      dispatch(setLoadingStatusAction(true))
      const res = await AuthService.verifyForgotPassword({ code })
      if (res.status === 200) {
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
            value={value}
            cellCount={4}
            onEnd={onSubmit}
            setValue={setValue}
            canSubmitOnEnd={true}
            ref={verifyCodeInputRef}
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
      <Modal position={'center'} ref={modalMigrateRef}>
        <Block
          radius={10}
          margin={15}
          padding={15}
          backgroundColor={colors.white}
        >
          <Image
            width={120}
            height={80}
            alignSelf={'center'}
            resizeMode={'contain'}
            source={images.BeeWithHoney}
          />

          <Text center size={'h2'} marginVertical={25} fontFamily={'semiBold'}>
            {t('want_to_migrate')}
          </Text>

          <Block row space={'between'} marginTop={10}>
            <ShadowButton
              shadowHeight={5}
              buttonHeight={35}
              buttonRadius={10}
              buttonColor={'#ccc'}
              onPress={handleNoAcceptMigrate}
              containerStyle={styles.buttonStyle}
              shadowButtonColor={colors.greyLight}
            >
              <Text size="h3" fontFamily="bold" color="white">
                {t('no')}
              </Text>
            </ShadowButton>
            <ShadowButton
              shadowHeight={5}
              buttonHeight={35}
              buttonRadius={10}
              onPress={handleMigrateAccount}
              buttonColor={colors.orangePrimary}
              containerStyle={styles.buttonStyle}
              shadowButtonColor={colors.orangeLighter}
            >
              <Text size="h3" fontFamily="bold" color="white">
                {t('yes')}
              </Text>
            </ShadowButton>
          </Block>
        </Block>
      </Modal>
    </Container>
  )
}

const useStyles = makeStyles()(({}) => ({
  buttonStyle: {
    flex: 1,
  },
}))
