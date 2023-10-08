import React, { useState, useEffect } from 'react'
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
import { Pressable } from 'react-native'
import { goBack, navigate } from '@navigation'

export const ExamTestScreen = () => {
  const { colors } = useTheme()
  const [activeBlock, setActiveBlock] = useState(0)
  const [activeButton, setActiveButton] = useState(false)
  const onPressChange = (blockNumber: React.SetStateAction<number>) => {
    setActiveBlock(blockNumber)
    if (activeBlock == 1 || activeBlock == 2) {
      setActiveButton(false)
    }
  }
  const onPressButton = () => {
    setActiveButton(true)
  }
  const goAboutTheTest = () => {
    if (activeBlock === 1 && activeButton === true) {
      navigate('ABOUT_THE_TEST_SCREEN')
    } else if (activeBlock === 2) {
      console.log('tôi chưa cập nhật màn hình này!')
    } else {
      console.log('Bạn phải chọn một trình độ trước khi tiếp tục!')
    }
  }

  useEffect(() => {
    goAboutTheTest()
  }, [activeBlock, activeButton])

  return (
    <Container>
      <Block flex>
        <Block row alignCenter paddingHorizontal={25}>
          <Icon state="Back" onPress={goBack} />
        </Block>
        <Block marginTop={25} paddingHorizontal={25}>
          <Text size={'heading'} fontFamily="bold">
            Trình Độ Hiện Tại Của Bạn?
          </Text>
        </Block>
        <Block marginTop={65} alignCenter>
          <Pressable onPress={() => onPressChange(1)}>
            <ShadowBlock
              shadowBackgroundColor={
                activeBlock === 1 ? colors.orangeDark : colors.greyDark
              }
              shadowHeight={3}
              width={'100%'}
              height={100}
              row
              paddingHorizontal={13}
            >
              <Block paddingVertical={10}>
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
            </ShadowBlock>
          </Pressable>
          <Pressable onPress={() => onPressChange(2)}>
            <ShadowBlock
              shadowBackgroundColor={
                activeBlock === 2 ? colors.orangeDark : colors.greyDark
              }
              shadowHeight={3}
              width={'100%'}
              height={100}
              row
              marginTop={30}
              paddingHorizontal={13}
            >
              <Block paddingVertical={10}>
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
            </ShadowBlock>
          </Pressable>
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
          onPress={onPressButton}
        >
          <Text size={'h3'} fontFamily="bold" color={colors.white}>
            Tiếp tục
          </Text>
        </ShadowButton>
      </Block>
    </Container>
  )
}
