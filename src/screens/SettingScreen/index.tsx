import React from 'react'
import { Block, Container, Text } from '@components'
import { Icon } from '@assets'
import { useTheme } from '@themes'
import { goBack } from '@navigation'
import { useTranslation } from 'react-i18next'

export const SettingScreen = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
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
        <Block marginHorizontal={25}>
          <Block
            backgroundColor={colors.orangePrimary}
            radius={10}
            marginTop={24}
          >
            <Block paddingVertical={18} paddingHorizontal={20}>
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
            </Block>
          </Block>
          <Text fontFamily="bold" size={'h2'} marginTop={32}>
            {t('account')}
          </Text>
          <Block row alignCenter space="between" marginTop={24}>
            <Block row alignCenter>
              <Icon state="UserOutline" />
              <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>
                Profile
              </Text>
            </Block>
            <Icon state="RightArrow"></Icon>
          </Block>
          <Block row alignCenter space="between" marginTop={24}>
            <Block row alignCenter>
              <Icon state="Password"></Icon>
              <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>
                {t('password')}
              </Text>
            </Block>
            <Icon state="RightArrow"></Icon>
          </Block>
          <Block row alignCenter space="between" marginTop={24}>
            <Block row alignCenter>
              <Icon state="Notification"></Icon>
              <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>
                {t('notifications')}
              </Text>
            </Block>
            <Icon state="RightArrow"></Icon>
          </Block>
          <Block row alignCenter space="between" marginTop={24}>
            <Block row alignCenter>
              <Icon state="Logout"></Icon>
              <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>
                {t('logout')}
              </Text>
            </Block>
            <Icon state="RightArrow"></Icon>
          </Block>
          <Text fontFamily="bold" size={'h2'} marginTop={32}>
            {t('more')}
          </Text>
          <Block row alignCenter space="between" marginTop={24}>
            <Block row alignCenter>
              <Icon state="StartOutLine"></Icon>
              <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>
                {t('rate_review')}
              </Text>
            </Block>
            <Icon state="RightArrow"></Icon>
          </Block>
          <Block row alignCenter space="between" marginTop={24}>
            <Block row alignCenter>
              <Icon state="About"></Icon>
              <Text marginLeft={12} fontFamily="semiBold" size={'h3'}>
                {t('help')}
              </Text>
            </Block>
            <Icon state="RightArrow"></Icon>
          </Block>
        </Block>
      </Block>
    </Container>
  )
}
