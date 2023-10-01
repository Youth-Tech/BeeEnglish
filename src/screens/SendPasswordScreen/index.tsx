import React, { useState } from 'react'
import {
  Container,
  TextInput,
  ShadowButton,
  Block,
  DismissKeyBoardBlock,
  Text,
} from '@components'
import { BackArrow } from '@assets'
import { goBack } from '@navigation'
import { useTranslation } from 'react-i18next'

export const SendPasswordScreen = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <DismissKeyBoardBlock>
        <Block flex paddingHorizontal={24} paddingTop={10}>
          <BackArrow fill={'black'} onPress={goBack} />
          <Text color="black" size={'heading'} fontFamily="bold" marginTop={20}>
            {t('send_password')}
          </Text>
          <Text size={'h4'} color={'textLabel'} marginTop={15} lineHeight={18}>
            {t('label_send_password')}
          </Text>
          <Block marginTop={20} marginBottom={20}>
            <TextInput placeholder="Email" textContentType="emailAddress" />
          </Block>
          <Block marginTop={20} marginBottom={20}>
            <ShadowButton
              buttonHeight={40}
              buttonBorderSize={2}
              buttonBorderColor={'orangePrimary'}
              shadowHeight={10}
              buttonRadius={8}
              shadowButtonColor={'orangeLighter'}
              onPress={() => {}}
            >
              <Text fontFamily="bold" size={'h3'} color="white">
                {t('send_password')}
              </Text>
            </ShadowButton>
          </Block>
        </Block>
      </DismissKeyBoardBlock>
    </Container>
  )
}
