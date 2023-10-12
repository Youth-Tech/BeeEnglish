import React from 'react'
import { useTranslation } from 'react-i18next'

import { goBack, navigate } from '@navigation'
import { Icon, images } from '@assets'
import { useTheme } from '@themes'
import { Block, Container, Text, TextInput ,Image } from '@components'


export const DictionaryScreen = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <Container>
      <Block flex>
        <Block row paddingHorizontal={25} alignCenter>
          <Icon state="Back" onPress={goBack}></Icon>
          <Text center flex paddingRight={25} fontFamily='bold' size={'h2'}>Từ điển</Text>
        </Block>
        <Block marginTop={22} paddingLeft={25} row>
          <Image source={images.BeeHello} width={33.18} height={37.01}/>
          <Block marginLeft={15} width="100%" height={35}>
            <TextInput placeholder='English Vocabulary' ></TextInput>
          </Block>
          
        </Block>
      </Block>
    </Container>
  )
}
