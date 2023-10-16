import React, { useState } from 'react'
import { Text, Block, Container, Image } from '@components'
import { Icon, images } from '@assets'
import { useTheme } from '@themes'
import { goBack, navigate } from '@navigation'
import { useTranslation } from 'react-i18next'
import { ImageBackground, Pressable } from 'react-native'
import FastImage from 'react-native-fast-image'

export const DetailLessonScreen = () => {
  const { colors, normalize } = useTheme()
  const { t } = useTranslation()
  const [activeBlock, setActiveBlock] = useState(0)

  const onPressChange = (blockNumber: number) => {
    setActiveBlock(blockNumber)
    if (blockNumber === 1) {
      console.log('Chúng tôi chưa cập nhật màn hình này hehe')
    } else if (blockNumber === 2) {
      console.log('Chúng tôi chưa cập nhật màn hình này hehe haha')
    }
  }
  return (
    <Container>
      <ImageBackground source={images.BGDetailLesson} style={{ flex: 1 }}>
        <Block space="between" row paddingHorizontal={25}>
          <Icon state="Back" onPress={goBack}></Icon>
          <Icon state="MenuHeading" onPress={() => {}}></Icon>
        </Block>

        <Block
          shadow
          marginVertical={26}
          marginHorizontal={25}
          radius={10}
          backgroundColor={colors.white}
          flex
          alignCenter
        >
          <Block absolute alignSelf="center" top={-16} zIndex={1}>
            <FastImage
              source={images.LessonTitle}
              style={{ width: normalize.h(210.5), height: normalize.h(37.84) }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text
              fontFamily="bold"
              size={'h2'}
              alignSelf="center"
              style={{ position: 'absolute', top: 10 }}
            >
              {t('lesson')}
            </Text>
          </Block>
          <Pressable onPress={() => onPressChange(1)}>
            <ImageBackground
              source={
                activeBlock === 1
                  ? images.OrangePrimaryFrame
                  : images.OrangeLightFrame
              }
              resizeMode="contain"
              style={{
                alignItems: 'center',
                paddingHorizontal: normalize.h(40),
                paddingVertical: normalize.v(40),
                marginTop: normalize.v(65),
              }}
            >
              <Block alignCenter>
                <Image
                  source={images.Vocabulary}
                  width={75}
                  height={75}
                ></Image>
                <Text center fontFamily="bold" size={'h3'}>
                  {t('vocabulary')}
                </Text>
              </Block>
            </ImageBackground>
          </Pressable>
          <Pressable onPress={() => onPressChange(2)}>
            <ImageBackground
              source={
                activeBlock === 2
                  ? images.OrangePrimaryFrame
                  : images.OrangeLightFrame
              }
              resizeMode="contain"
              style={{
                alignItems: 'center',
                paddingHorizontal: normalize.h(40),
                paddingVertical: normalize.v(40),
                marginTop: normalize.v(65),
              }}
            >
              <Block alignCenter>
                <Image
                  source={images.MultipleChoice}
                  width={75}
                  height={75}
                ></Image>
                <Text center fontFamily="bold" size={'h3'}>
                  {t('multiple_choice')}
                </Text>
              </Block>
            </ImageBackground>
          </Pressable>
        </Block>
      </ImageBackground>
    </Container>
  )
}
