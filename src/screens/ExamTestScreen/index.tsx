import React from 'react'
import {
  Text,
  Block,
  Container,
  ShadowButton,
  Image,
  ShadowBlock,
} from '@components'
import { Icon, images } from '@assets'
import { useTheme } from '@themes'

export const ExamTestScreen = () => {
  const { colors } = useTheme()
  return (
    <Container>
      <Block flex>
        <Block row alignCenter paddingHorizontal={25}>
          <Icon state="Back" />
        </Block>
        <Block marginTop={25} paddingHorizontal={25}>
          <Text size={'heading'} fontFamily="bold">
            Trình Độ Hiện Tại Của Bạn?
          </Text>
        </Block>
        <Block marginTop={65} alignCenter>
          <ShadowBlock
            shadowHeight={3}
            width={320}
            height={100}
            paddingHorizontal={20}
          >
            <Block row>
              <Block padding={10}>
                <Image source={images.BeeDiscovery} width={66} height={80} />
              </Block>
              <Block paddingHorizontal={10} paddingVertical={25}>
                <Text fontFamily="semiBold" size={'h3'}>
                  Lần đầu bạn học tiếng anh?
                </Text>
                <Text lineHeight={40} fontFamily="regular" size={'h4'}>
                  Bắt đầu ngay!
                </Text>
              </Block>
            </Block>
          </ShadowBlock>
          <ShadowBlock
            width={320}
            height={100}
            paddingHorizontal={20}
            marginTop={30}
            shadowHeight={3}
          >
            <Block row>
              <Block padding={10}>
                <Image source={images.BeeGraduated} width={66} height={80} />
              </Block>
              <Block paddingHorizontal={10} paddingVertical={25}>
                <Text fontFamily="semiBold" size={'h3'}>
                  Đã biết tiếng Anh trước đó
                </Text>
                <Text lineHeight={40} fontFamily="regular" size={'h4'}>
                  Trả lời một số câu hỏi nào!
                </Text>
              </Block>
            </Block>
          </ShadowBlock>
        </Block>
      </Block>
      <Block marginBottom={80} paddingHorizontal={80}>
        <ShadowButton
          buttonHeight={40}
          buttonBorderSize={2}
          buttonBorderColor={colors.orangePrimary}
          shadowHeight={6}
          buttonRadius={8}
          shadowButtonColor={colors.orangeLighter}
          buttonColor={colors.orangePrimary}
          onPress={() => {
            console.log('press')
          }}
        >
          <Text size={'h3'} fontFamily="bold" color={colors.white}>
            Tiếp tục
          </Text>
        </ShadowButton>
      </Block>
    </Container>
  )
}
