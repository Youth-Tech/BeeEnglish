import React, { useState } from 'react'
import { Text, Block, Container, Image } from '@components'
import { Icon, images } from '@assets'
import { useTheme } from '@themes'
import { goBack, navigate } from '@navigation'
import { useTranslation } from 'react-i18next'
import { ImageBackground, Pressable } from 'react-native'

export const DetailLessonScreen = () => {
  const { colors } = useTheme()
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
        <ImageBackground
          source={images.LessonTitle}
          style={{
            paddingHorizontal: 80,
            paddingVertical: 17.5,
            position: 'absolute',
            alignSelf: 'center',
            top: 30,
            zIndex: 1,
          }}
          resizeMode="contain"
        >
          <Block width={100} alignCenter>
            <Text fontFamily="bold" size={'h2'}>
              {t('lesson')}
            </Text>
          </Block>
        </ImageBackground>
        <Block
          shadow
          marginVertical={26}
          marginHorizontal={25}
          radius={10}
          backgroundColor={colors.white}
          flex
          alignCenter
        >
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
                paddingHorizontal: 40,
                paddingVertical: 45,
                marginTop: 65,
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
                paddingHorizontal: 40,
                paddingVertical: 45,
                marginTop: 65,
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
