import React from 'react'
import { useTranslation } from 'react-i18next'
import { goBack, navigate } from '@navigation'
import { Icon, images } from '@assets'
import { useTheme } from '@themes'
import { Block, Container, Text, TextInput, Image } from '@components'

export const DictionaryScreen = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <Container>
      <Block flex >
        <Block row paddingHorizontal={25} alignCenter>
          <Icon state="Back" onPress={goBack}></Icon>
          <Text center flex paddingRight={25} fontFamily="bold" size={'h2'}>
            Từ điển
          </Text>
        </Block>
        <Block marginTop={22} paddingHorizontal={25} row>
          <Image source={images.BeeDiscovery} width={33.18} height={37.01} />
          <Block marginLeft={15} width="100%" height={35}>
            <TextInput
              containerStyle={{ height: '100%', width: '100%' }}
              placeholderTextColor={colors.greyPrimary}
              inputContainerStyle={{
                height: '100%',
                width: '100%',
                borderRadius: 30,
                shadowColor: colors.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 5,
              }}
              placeholder="English Vocabulary"
              rightIcon={
                <Icon state="Microphone" color={colors.greyPrimary}></Icon>
              }
            />
          </Block>
        </Block>
        <Block row alignCenter marginTop={24} paddingLeft={25}>
          <Icon state="History"></Icon>
          <Text fontFamily="semiBold" marginLeft={5} size={'h4'}>
            Lịch sử
          </Text>
        </Block>
        <Block marginTop={15} radius={15} shadow paddingHorizontal={25} width="100%"></Block>
      </Block>
    </Container>
  )
}
