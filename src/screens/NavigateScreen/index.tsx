import { Pressable } from 'react-native'
import React from 'react'
import { Block, Container, Image, ShadowButton, Text } from '@components'
import { images } from '../../assets/images/index'
import { useTheme } from '@themes'

export const NavigateScreen = () => {
  const { colors } = useTheme()
  return (
    <Container>
      <Block backgroundColor={colors.white} flex>
        <Block marginTop={80} alignCenter>
          <Image
            source={images.BeeHello}
            width={183}
            height={229}
            resizeMode="cover"
          />
          <Text marginTop={25} size={'h1'} fontFamily="bold">
            BeeEnglish
          </Text>
          <Text marginTop={25} size={'h3'} fontFamily="semiBold">
            Learn Today, Lead Tomorrow
          </Text>
        </Block>
      </Block>

      <Block backgroundColor={colors.white}>
        <Block marginHorizontal={25} marginBottom={25}>
          <ShadowButton
            buttonHeight={40}
            buttonBorderSize={2}
            buttonBorderColor={colors.orangePrimary}
            shadowHeight={10}
            buttonRadius={8}
            shadowButtonColor={colors.orangeLighter}
            buttonColor={colors.orangePrimary}
            onPress={() => {
              console.log('press')
            }}
          >
            <Text size={'h3'} fontFamily="bold" color={colors.white}>
              Đã có hoặc tạo tài khoản
            </Text>
          </ShadowButton>
          <Pressable onPress={() => {}}>
            <Text
              marginTop={20}
              size={'h3'}
              fontFamily="semiBold"
              center
              textDecorationLine="underline"
            >
              Tiếp tục bằng tài khoản khách
            </Text>
          </Pressable>
        </Block>
      </Block>
    </Container>
  )
}


