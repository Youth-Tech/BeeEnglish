import { StyleSheet } from 'react-native'
import React from 'react'
import {
  Block,
  Container,
  Image,
  ShadowButton,
  StatusBar,
  Text,
  LinearGradient,
} from '@components'
import { images } from '../../assets/images/index'

export const NavigateScreen = () => {
  return (
    <Container>
      <StatusBar statusColor="white"></StatusBar>
      <Block justifyCenter alignCenter backgroundColor="white" flex>
        <Image
          source={images.BeeHello}
          width={183}
          height={229}
          resizeMode="cover"
        />
        <Text marginTop={25} size={24} fontFamily="bold">
          BeeEnglish
        </Text>
        <Text marginTop={25} size={16} fontFamily="semiBold">
          Learn Today, Lead Tomorrow
        </Text>
      </Block>
      <Block backgroundColor="white">
        <Block marginHorizontal={25} marginBottom={25}>
          <ShadowButton
            buttonHeight={40}
            buttonBorderSize={2}
            buttonBorderColor={'#FFC107'}
            shadowHeight={10}
            buttonRadius={8}
            shadowButtonColor="#FFEFAD"
            buttonColor="#FFC107"
            labelSize={'h3'}
            fontFamily="bold"
            onPress={() => {
              console.log('press')
            }}
          >
            <Text>Đã có hoặc tạo tài khoản</Text>
          </ShadowButton>
          <Text
            marginTop={20}
            size={16}
            fontFamily="semiBold"
            center
            textDecorationLine="underline"
          >
            Tiếp tục bằng tài khoản khách
          </Text>
        </Block>
      </Block>
    </Container>
  )
}

const styles = StyleSheet.create({})
