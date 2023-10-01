import React from 'react'
import {
  Container,
  TextInput,
  ShadowButton,
  Block,
  DismissKeyBoardBlock,
  Text,
} from '@components'
import { BackArrow} from '@assets'
import { goBack } from '@navigation'
import { useTranslation } from 'react-i18next'

export const PasswordResetScreen = () => {
  const { t } = useTranslation()
  const [value, setValue] = React.useState<string>('')

  return (
    <Container>
      <DismissKeyBoardBlock>
        <Block flex paddingHorizontal={24} paddingTop={10}>
          <BackArrow fill={'black'} onPress={goBack} />
          <Text color="black" size={'heading'} fontFamily="bold" marginTop={20} lineHeight={34}>
            {t('change_password')}
          </Text>
          <Text size={'h4'} color={'textLabel'} marginTop={15} lineHeight={18}>
            {t('label_new_password')}
          </Text>
          <Block marginTop={25} marginBottom={25}>
            <TextInput
              label="Mật khẩu"
              placeholder="Mật khẩu"
              textContentType="password"
              secureTextEntry
              value={value}
              onChangeText={setValue}
            />
          </Block>
          <Block marginBottom={25}>
            <TextInput
              label="Nhập lại mật khẩu"
              placeholder="Mật khẩu"
              textContentType="password"
              secureTextEntry
              value={value}
              onChangeText={setValue}
            />
          </Block>
        </Block>
        <Block marginTop={50} marginBottom={50} marginLeft={50} marginRight={50}>
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
                {t('change_password')}
              </Text>
            </ShadowButton>
          </Block>
      </DismissKeyBoardBlock>
    </Container>
  )
}
