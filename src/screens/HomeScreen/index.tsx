import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

// import { updateConfigAction } from '@redux/reducers'
import { Block, Container, ShadowButton, Text, TextInput } from '@components'
import { font, fontFamily } from '@themes'
import {Icon, LeftArrow} from "@assets/icons/IconSystem";

export const HomeScreen = () => {
  const [t] = useTranslation()
  const dispatch = useDispatch()

  return (
    <Container>
      <Block flex>
        <ShadowButton
          buttonWidth={200}
          buttonHeight={60}
          shadowButtonColor="orangeLight"
          buttonColor="orange"
          containerStyle={{
            marginTop: 20,
          }}
          onPress={() => {
            dispatch(updateConfigAction({ lang: 'vi' }))
          }}
        >
          <Text fontFamily="bold" size={'heading'}>
            {t('vi')}
          </Text>
        </ShadowButton>

          <Icon state={"Logout"} size={23}/>

        <ShadowButton
          buttonWidth={200}
          buttonHeight={60}
          shadowButtonColor="orangeLight"
          buttonColor="orange"
          shadowHeight={10}
          containerStyle={{
            marginTop: 20,
          }}
          onPress={() => {
            dispatch(updateConfigAction({ lang: 'en' }))
          }}
        >
          <Text fontFamily="bold" size={'heading'}>
            {t('en')}
          </Text>
        </ShadowButton>
        <TextInput
          label="Alo"
          containerStyle={{
            borderCurve: 'circular',
            marginHorizontal: 20,
          }}
        />
        <TextInput
          label="Alo"
          containerStyle={{
            borderCurve: 'circular',
            marginHorizontal: 20,
          }}
          labelStyle={{
            fontFamily: fontFamily.bold,
            fontSize: font.size.h3,
          }}
        />
      </Block>
    </Container>
  )
}
