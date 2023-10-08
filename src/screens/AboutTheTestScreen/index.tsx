import React from 'react'
import { Text, Block, Container, ShadowButton, Image } from '@components'
import { Icon, images } from '@assets'
import { useTheme } from '@themes'

export const AboutTheTestScreen = () => {
  const { colors } = useTheme()
  return (
    <Container>
      <Block flex>
        <Block row alignCenter paddingHorizontal={25}>
          <Block>
            <Icon state="Back" />
          </Block>
          <Block flex paddingRight={25}>
            <Text size={'h2'} fontFamily="bold" center>
              Bài kiểm tra
            </Text>
          </Block>
        </Block>
        <Block marginTop={130} paddingHorizontal={25}>
          <Text size={'h2'} fontFamily="bold" numberOfLines={2} center>
            Thực hiện bài kiểm tra để chúng tôi biết năng lực của bạn
          </Text>
        </Block>
        <Block marginTop={40} alignCenter>
          <Image
            source={images.BeeHello}
            width={183}
            height={229}
            resizeMode="cover"
          />
        </Block>
      </Block>
      <Block marginBottom={40} paddingHorizontal={20}>
        <ShadowButton
          buttonHeight={40}
          buttonBorderSize={2}
          buttonBorderColor={colors.orangeLight}
          shadowHeight={6}
          buttonRadius={8}
          shadowButtonColor={colors.orangePrimary}
          buttonColor={colors.orangeLight}
          onPress={() => {
            console.log('press')
          }}
        >
          <Text size={'h3'} fontFamily="semiBold" color={colors.black}>
            Tiếp tục
          </Text>
        </ShadowButton>
      </Block>
    </Container>
  )
}
