import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, TouchableOpacity } from 'react-native'

import {
  defaultAuthState,
  defaultUserState,
  setAuthState,
  setRoleUser,
  setUserState,
  updateConfigAction,
} from '@redux/reducers'
import { Icon, images } from '@assets'
import { TokenService } from '@services'
import { LangType } from '@utils/helpers'
import { useAppDispatch, useAppSelector } from '@hooks'
import { initRun, oAuthSignOut } from '@utils/authUtils'
import { makeStyles, useTheme } from '@themes'
import { Block, Container, GuestModal, Image, Modal, Text } from '@components'
import { ModalFunction } from '@components/bases/Modal/type'
import {
  getIsLoginWithGuest,
  getLangConfig,
  getUserData,
} from '@redux/selectors'
import { goBack, navigate, navigateAndReset } from '@navigation'
import Toast from 'react-native-toast-message'
import { AuthService } from '@services/AuthService'
import { PaymentService } from '@services/PaymentService'

export const SettingScreen = () => {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const styles = useStyle()
  const { t } = useTranslation()
  const langConfig = useAppSelector(getLangConfig)
  const modalLanguageRef = React.useRef<ModalFunction>(null)
  const isSignedInOAuth = useAppSelector(
    (state) => state.root.auth.isSignedInOAuth,
  )
  const paymentStatus = useAppSelector(
    (state) => state.root.paymentReducer.status,
  )
  const userData = useAppSelector(getUserData)
  const isLoginWithGuest = useAppSelector(getIsLoginWithGuest)
  const role = useAppSelector((state) => state.root.user.role)
  const guestModalRef = React.useRef<ModalFunction>(null)
  const unsubcribeConfirmRef = React.useRef<ModalFunction>(null)
  const onPressPremiumUser = () => {
    if (isLoginWithGuest) {
      guestModalRef.current?.openModal()
    } else {
      if (role !== 'premium') {
        navigate('SUBSCRIPTION_SCREEN')
      }
    }
  }

  const onPressPassword = () => {
    if (isLoginWithGuest) {
      guestModalRef.current?.openModal()
    } else {
      navigate('CHANGE_PASSWORD_SCREEN')
    }
  }
  const clearUserData = () => {
    dispatch(setAuthState(defaultAuthState))
    dispatch(setUserState(defaultUserState))
    TokenService.clearToken()
    Toast.show({
      type: 'success',
      text1: t('success'),
      text2: t('logout_successfully'),
      position: 'bottom',
    })
  }
  const logOutAPI = async () => {
    try {
      const response = await AuthService.logOut()
      clearUserData()
      console.log(response.data.message)
    } catch (e) {
      console.log(e)
    }
  }

  const onPressLogout = () => {
    if (isSignedInOAuth && userData.provider !== null) {
      oAuthSignOut(userData.provider, () => {
        clearUserData()
        console.log('signOut success')
      })
    } else {
      logOutAPI()
    }
    navigateAndReset([{ name: 'NAVIGATE_SCREEN' }], 0)

    //re-gen deviceId
    initRun()
  }

  const onPressLanguage = () => {
    modalLanguageRef.current?.openModal()
  }

  const onLanguageChange = (lang: LangType) => {
    dispatch(updateConfigAction({ lang }))
    modalLanguageRef.current?.dismissModal()
  }
  const unsubscribePremium = async () => {
    try {
      const response = await PaymentService.unsubscribePremium()
      console.log(response.data.message)
      dispatch(setRoleUser({ role: 'user' }))
    } catch (e) {
      console.log(e)
    }
  }
  const handleUnsubcribe = () => {
    unsubcribeConfirmRef.current?.openModal()
  }
  console.log('alo')
  return (
    <Container hasScroll>
      <Block flex>
        <Block
          row
          alignCenter
          justifyCenter
          paddingVertical={12}
          paddingHorizontal={20}
        >
          <Icon state="LeftArrow" onPress={goBack} />
          <Block flex>
            <Text center size={'h2'} fontFamily="bold">
              {t('settings')}
            </Text>
          </Block>

          <Block width={24} height={24} />
        </Block>
        <Block marginHorizontal={20}>
          <Pressable
            onPress={onPressPremiumUser}
            style={styles.premiumUserSection}
            android_ripple={{ color: colors.orangeLighter }}
          >
            <Block row alignCenter gap={10}>
              <Text color={colors.white} fontFamily="bold" size={'h2'}>
                {role === 'premium'
                  ? t('you_are_premium')
                  : t('premium_membership')}
              </Text>
              <Block>
                <Icon state="Crown" fill={colors.white} />
              </Block>
            </Block>
            <Text
              color={colors.white}
              fontFamily="semiBold"
              size={'h5'}
              lineHeight={20}
            >
              {role === 'premium'
                ? t('you_receive_all_benefits')
                : t('upgrade_for_more_features')}
            </Text>
            <Text
              color={colors.white}
              fontFamily="semiBold"
              size={'h5'}
              lineHeight={20}
            >
              {role === 'premium' && paymentStatus === 'inactive'
                ? t('you_no_longer_subscribe_to_premium')
                : ''}
            </Text>
            {role === 'premium' && (
              <Block alignSelf={'flex-end'} row gap={5} marginTop={10}>
                <TouchableOpacity
                  style={styles.unsubButton}
                  onPress={() => {
                    navigate('INVOICE_SCREEN', { getMe: false })
                  }}
                >
                  <Text
                    size={'h5'}
                    fontFamily={'semiBold'}
                    color={colors.white}
                  >
                    {t('invoice')}
                  </Text>
                </TouchableOpacity>
                {paymentStatus === 'active' && (
                  <TouchableOpacity
                    style={styles.unsubButton}
                    onPress={handleUnsubcribe}
                  >
                    <Text
                      size={'h5'}
                      fontFamily={'semiBold'}
                      color={colors.white}
                    >
                      {t('unsubscribe')}
                    </Text>
                  </TouchableOpacity>
                )}
              </Block>
            )}
          </Pressable>
          <Text fontFamily="bold" size={'h2'} marginTop={32}>
            {t('account')}
          </Text>
          {/*<Pressable style={styles.options} onPress={onPressProfile}>*/}
          {/*  <Block row alignCenter>*/}
          {/*    <Icon state="UserOutline" />*/}
          {/*    <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>*/}
          {/*      {t('profile')}*/}
          {/*    </Text>*/}
          {/*  </Block>*/}
          {/*  <Icon state="RightArrow" />*/}
          {/*</Pressable>*/}
          <Pressable style={styles.options} onPress={onPressPassword}>
            <Block row alignCenter>
              <Icon state="Password" />
              <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>
                {t('password')}
              </Text>
            </Block>
            <Icon state="RightArrow" />
          </Pressable>
          {/*<Pressable style={styles.options} onPress={onPressNotification}>*/}
          {/*  <Block row alignCenter>*/}
          {/*    <Icon state="Notification" />*/}
          {/*    <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>*/}
          {/*      {t('notifications')}*/}
          {/*    </Text>*/}
          {/*  </Block>*/}
          {/*  <Icon state="RightArrow" />*/}
          {/*</Pressable>*/}
          <Pressable style={styles.options} onPress={onPressLogout}>
            <Block row alignCenter>
              <Icon state="Logout" />
              <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>
                {t('logout')}
              </Text>
            </Block>
            <Icon state="RightArrow" />
          </Pressable>
          <Text fontFamily="bold" size={'h2'} marginTop={32}>
            {t('more')}
          </Text>
          {/*<Pressable style={styles.options} onPress={onPressRate}>*/}
          {/*  <Block row alignCenter>*/}
          {/*    <Icon state="StartOutLine" />*/}
          {/*    <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>*/}
          {/*      {t('rate_review')}*/}
          {/*    </Text>*/}
          {/*  </Block>*/}
          {/*  <Icon state="RightArrow" />*/}
          {/*</Pressable>*/}
          {/*<Pressable style={styles.options} onPress={onPressHelp}>*/}
          {/*  <Block row alignCenter>*/}
          {/*    <Icon state="About" />*/}
          {/*    <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>*/}
          {/*      {t('help')}*/}
          {/*    </Text>*/}
          {/*  </Block>*/}
          {/*  <Icon state="RightArrow" />*/}
          {/*</Pressable>*/}
          <Pressable style={styles.options} onPress={onPressLanguage}>
            <Block row alignCenter>
              <Icon state="Language" />
              <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>
                {t('language')}
              </Text>
            </Block>
            <Icon state="RightArrow" />
          </Pressable>
        </Block>
      </Block>

      {/* modal language */}
      <Modal position="center" animationType="fade" ref={modalLanguageRef}>
        <Block
          radius={10}
          margin={30}
          paddingVertical={5}
          paddingHorizontal={20}
          backgroundColor={colors.white}
        >
          <Pressable onPress={() => onLanguageChange('vi')}>
            <Block row alignCenter gap={15}>
              <Icon state="VietNamFlag" />
              <Block
                row
                flex
                alignCenter
                space="between"
                paddingVertical={15}
                borderBottomWidth={1}
                borderColor={colors.greyLight}
              >
                <Text fontFamily="semiBold">{t('vn')}</Text>
                {langConfig === 'vi' && (
                  <Icon state="CheckNormal" fill={colors.orangeDark} />
                )}
              </Block>
            </Block>
          </Pressable>
          <Pressable onPress={() => onLanguageChange('en')}>
            <Block paddingVertical={15} row alignCenter gap={15}>
              <Icon state="UsFlag" />
              <Text fontFamily="semiBold" flex>
                {t('us')}
              </Text>
              {langConfig === 'en' && (
                <Icon state="CheckNormal" fill={colors.orangeDark} />
              )}
            </Block>
          </Pressable>
        </Block>
      </Modal>
      <GuestModal
        ref={guestModalRef}
        position={'center'}
        onButtonPress={() => {
          navigate('REGISTER_SCREEN', { isGuest: true })
          guestModalRef?.current?.dismissModal()
        }}
      />
      <Modal ref={unsubcribeConfirmRef} position={'center'}>
        <Block
          radius={15}
          height={300}
          paddingTop={41}
          marginBottom={30}
          marginHorizontal={20}
          backgroundColor={colors.white}
        >
          <Block alignCenter>
            <Image
              style={styles.image}
              source={images.BeeSad}
              resizeMode={'contain'}
            />
            <Text
              size={'h2'}
              fontFamily={'semiBold'}
              color={colors.black}
              marginTop={15}
            >
              {t('unsubscribe_premium')}
            </Text>
            <Text size={'h5'} fontFamily={'bold'} marginTop={12.77} center>
              {t('unsubscribe_note')}
            </Text>
          </Block>

          <Block row space={'between'} paddingHorizontal={20} marginTop={15}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                unsubscribePremium()
                unsubcribeConfirmRef.current?.dismissModal()
              }}
            >
              <Text size={'h2'} fontFamily={'semiBold'} color={colors.greyDark}>
                {t('yes')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.orangeLight }]}
              onPress={() => {
                unsubcribeConfirmRef.current?.dismissModal()
              }}
            >
              <Text size={'h2'} fontFamily={'semiBold'} color={colors.black}>
                {t('no')}
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </Modal>
    </Container>
  )
}

const useStyle = makeStyles()(({ colors, normalize }) => ({
  premiumUserSection: {
    paddingVertical: normalize.v(15),
    paddingHorizontal: normalize.h(20),
    backgroundColor: colors.orangePrimary,
    borderRadius: 15,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize.v(24),
    justifyContent: 'space-between',
  },
  unsubButton: {
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'baseline',
    borderColor: colors.white,
    paddingHorizontal: normalize.h(5),
    paddingVertical: normalize.v(3),
  },
  image: {
    width: normalize.h(89),
    height: normalize.h(98),
  },
  button: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.greyLight,
    width: normalize.h(128.7),
    height: normalize.h(41.8),
    borderRadius: normalize.m(10),
  },
}))
