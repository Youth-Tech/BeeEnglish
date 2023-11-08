import React from 'react'
import { Pressable, ToastAndroid } from 'react-native'
import { useTranslation } from 'react-i18next'

import {
  setAuthState,
  setUserState,
  defaultAuthState,
  defaultUserState,
} from '@redux/reducers'
import { Icon } from '@assets'
import { useAppDispatch } from '@hooks'
import { Block, Container, Text } from '@components'
import { goBack, navigateAndReset } from '@navigation'
import { makeStyles, normalize, useTheme } from '@themes'

export const SettingScreen = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const styles = useStyle()
  const dispatch = useAppDispatch()
  const onPressPremiumUser = () => {
    ToastAndroid.show(t('function_in_develop'), ToastAndroid.SHORT)
  }
  const onPressProfile = () => {}
  const onPressPassword = () => {}
  const onPressNotification = () => {}
  const onPressLogout = () => {
    dispatch(setAuthState(defaultAuthState))
    dispatch(setUserState(defaultUserState))
    navigateAndReset([{ name: 'LOGIN_SCREEN' }], 0)
  }
  const onPressRate = () => {}
  const onPressHelp = () => {}
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

          <Block width={24} height={24}></Block>
        </Block>
        <Block marginHorizontal={20}>
          <Block
            backgroundColor={colors.orangePrimary}
            radius={10}
            marginTop={24}
          >
            <Pressable
              onPress={onPressPremiumUser}
              style={styles.premiumUserSection}
              android_ripple={{ color: colors.orangeLighter }}
            >
              <Block row>
                <Text color={colors.white} fontFamily="bold" size={'h2'}>
                  {t('premium_membership')}
                </Text>
                <Block marginLeft={12}>
                  <Icon state="Crown" fill={colors.white}></Icon>
                </Block>
              </Block>
              <Text
                color={colors.white}
                fontFamily="semiBold"
                size={'h5'}
                lineHeight={20}
              >
                {t('upgrade_for_more_features')}
              </Text>
            </Pressable>
          </Block>
          <Text fontFamily="bold" size={'h2'} marginTop={32}>
            {t('account')}
          </Text>
          <Pressable style={styles.options} onPress={onPressProfile}>
            <Block row alignCenter>
              <Icon state="UserOutline" />
              <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>
                {t('profile')}
              </Text>
            </Block>
            <Icon
              state="RightArrow"
              onPress={() => {
                console.log('press')
              }}
            ></Icon>
          </Pressable>
          <Pressable style={styles.options} onPress={onPressPassword}>
            <Block row alignCenter>
              <Icon state="Password"></Icon>
              <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>
                {t('password')}
              </Text>
            </Block>
            <Icon
              state="RightArrow"
              onPress={() => {
                console.log('press')
              }}
            ></Icon>
          </Pressable>
          <Pressable style={styles.options} onPress={onPressNotification}>
            <Block row alignCenter>
              <Icon state="Notification"></Icon>
              <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>
                {t('notifications')}
              </Text>
            </Block>
            <Icon
              state="RightArrow"
              onPress={() => {
                console.log('press')
              }}
            ></Icon>
          </Pressable>
          <Pressable style={styles.options} onPress={onPressLogout}>
            <Block row alignCenter>
              <Icon state="Logout"></Icon>
              <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>
                {t('logout')}
              </Text>
            </Block>
            <Icon
              state="RightArrow"
              onPress={() => {
                console.log('press')
              }}
            ></Icon>
          </Pressable>
          <Text fontFamily="bold" size={'h2'} marginTop={32}>
            {t('more')}
          </Text>
          <Pressable style={styles.options} onPress={onPressRate}>
            <Block row alignCenter>
              <Icon state="StartOutLine"></Icon>
              <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>
                {t('rate_review')}
              </Text>
            </Block>
            <Icon
              state="RightArrow"
              onPress={() => {
                console.log('press')
              }}
            ></Icon>
          </Pressable>
          <Pressable style={styles.options} onPress={onPressHelp}>
            <Block row alignCenter>
              <Icon state="About" />
              <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>
                {t('help')}
              </Text>
            </Block>
            <Icon
              state="RightArrow"
              onPress={() => {
                console.log('press')
              }}
            />
          </Pressable>
        </Block>
      </Block>
    </Container>
  )
}

const useStyle = makeStyles()(({}) => ({
  premiumUserSection: {
    paddingVertical: normalize.v(18),
    paddingHorizontal: normalize.h(20),
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: normalize.v(24),
  },
}))
