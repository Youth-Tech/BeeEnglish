import React from 'react'
import {
  TextInput,
  Text,
  Block,
  ShadowButton,
  Container,
  DismissKeyBoardBlock,
} from '@components'
import { Icon } from '@assets'
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
          <Icon state='Back' onPress={goBack} />
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
              label="Password"
              placeholder="•••••••••••••"
              textContentType="password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              ref={passwordRef}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={handlePasswordSubmit}
              keyboardType='phone-pad'
            />
          </Block>
          <Block marginBottom={25}>
            <TextInput
              label="Confirm Password"
              placeholder="•••••••••••••"
              textContentType="password"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
              ref={confirmRef}
              keyboardType='phone-pad'
            />
          </Block>
          <Block marginTop={48} alignCenter>
          <ShadowButton
            buttonHeight={40}
            buttonBorderSize={2}
            buttonBorderColor={'orangePrimary'}
            shadowHeight={10}
            buttonRadius={8}
            shadowButtonColor={'orangeLighter'}
            buttonWidth={200}
            onPress={() => {}}
          >
            <Text fontFamily="bold" size={'h3'} color="white">
              {t('change_password')}
            </Text>
          </ShadowButton>
          </Block>
        </Block>
      </DismissKeyBoardBlock>
    </Container>
  )
}
