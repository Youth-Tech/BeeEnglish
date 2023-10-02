import React from 'react'
import {
  Container,
  TextInput,
  ShadowButton,
  Block,
  DismissKeyBoardBlock,
  Text,
} from '@components'
import { Icon } from '@assets'
import { goBack, navigate } from '@navigation'
import { useTranslation } from 'react-i18next'

export const SendPasswordScreen = () => {
  const { t } = useTranslation()
  const [emailAddress, setemailAddress] = React.useState<string>('')
  const goRegister = () => {
    navigate('RESET_PASSWORD_SCREEN')
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
            {t('send_password')}
          </Text>
          <Text size={'h4'} color={'textLabel'} marginTop={15} lineHeight={18}>
            {t('label_send_password')}
          </Text>
          <Block marginTop={25} marginBottom={20}>
            <TextInput
              placeholder="abc@gmail.com"
              textContentType="emailAddress"
              value={emailAddress}
              onChangeText={setemailAddress}
            />
          </Block>
          <Block justifyCenter alignCenter marginTop={178}>
            <ShadowButton
              buttonHeight={40}
              buttonBorderSize={2}
              buttonBorderColor={'orangePrimary'}
              shadowHeight={10}
              buttonRadius={8}
              buttonWidth={200}
              shadowButtonColor={'orangeLighter'}
              onPress={() => {
                goRegister()
              }}
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
