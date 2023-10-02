import React from 'react'
import {
  TextInput,
  Text,
  Block,
  ShadowButton,
  Container,
  DismissKeyBoardBlock,
} from '@components'
import { BackArrow } from '@assets'
import { goBack } from '@navigation'
import { useTranslation } from 'react-i18next'
import { DocumentSelectionState } from 'react-native'

export const PasswordResetScreen = () => {
  const { t } = useTranslation()
  const [password, setPassword] = React.useState('')
  const [confirm, setConfirm] = React.useState('')
  const passwordRef = React.useRef<DocumentSelectionState>()
  const confirmRef = React.useRef<DocumentSelectionState>()

  const handlePasswordSubmit = () => {
    confirmRef.current?.focus()
  }

  return (
    <Container>
      <DismissKeyBoardBlock>
        <Block flex paddingHorizontal={24} paddingTop={10}>
          <BackArrow fill={'black'} onPress={goBack} />
          <Text
            color="black"
            size={'heading'}
            fontFamily="bold"
            marginTop={20}
            lineHeight={34}
          >
            {t('change_password')}
          </Text>
          <Text size={'h4'} color={'textLabel'} marginTop={15} lineHeight={18}>
            {t('label_new_password')}
          </Text>
          <Block marginTop={25} marginBottom={25}>
            <TextInput
              label="Mật khẩu"
              placeholder="•••••••••••••"
              textContentType="password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              ref={passwordRef}
              returnKeyType="next"
              onSubmitEditing={handlePasswordSubmit}
            />
          </Block>
          <Block marginBottom={25}>
            <TextInput
              label="Nhập lại mật khẩu"
              placeholder="•••••••••••••"
              textContentType="password"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
              ref={confirmRef}
            />
          </Block>
        </Block>
        <Block
          marginTop={50}
          marginBottom={50}
          marginLeft={50}
          marginRight={50}
        >
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
