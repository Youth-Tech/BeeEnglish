import React from 'react'
import { useTranslation } from 'react-i18next'

import { goBack, navigate } from '@navigation'
import { BackArrow, VietNamFlag } from '@assets'
import { makeStyles, normalize, useTheme } from '@themes'
import {
  Block,
  Container,
  DismissKeyBoardBlock,
  ShadowButton,
  Text,
  TextInput,
} from '@components'

export const PhoneRegistrationScreen = () => {
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const { t } = useTranslation()

  const { colors } = useTheme()

  const styles = useStyle()

  const onSubmit = () => {
    console.log('submit', phoneNumber)
    navigate('VERIFICATION_CODE_SCREEN')
  }

  return (
    <Container>
      <DismissKeyBoardBlock>
        <Block flex paddingHorizontal={24} paddingTop={10}>
          <BackArrow fill={'black'} onPress={goBack} />

          <Text color="black" size={'heading'} fontFamily="bold" marginTop={20}>
            {t('verify_account')}
          </Text>

          <Text size={'h4'} color={colors.textLabel} marginTop={10}>
            {t('sub_label_verify_account')}
          </Text>

          <TextInput
            containerStyle={styles.textInputContainerStyle}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="number-pad"
            leftIcon={<VietNamFlag />}
            inputStyle={styles.inputStyle}
          />

          <ShadowButton
            onPress={onSubmit}
            buttonHeight={45}
            buttonWidth={194}
            buttonRadius={10}
            shadowButtonColor={colors.orangeLighter}
            buttonColor={colors.orangePrimary}
            shadowHeight={7}
            containerStyle={{
              alignSelf: 'center',
            }}
            style={{
              marginTop: normalize.v(160),
            }}
          >
            <Text color="white" fontFamily="bold" size={'h3'}>
              {t('continue_button')}
            </Text>
          </ShadowButton>
        </Block>
      </DismissKeyBoardBlock>
    </Container>
  )
}

const useStyle = makeStyles()(({ colors, normalize, font }) => ({
  textInputContainerStyle: {
    marginTop: normalize.m(30),
  },
  inputStyle: {
    color: colors.black,
    fontSize: font.size.h3,
  },
}))
