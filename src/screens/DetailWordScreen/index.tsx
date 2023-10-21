import React from 'react'
import { TouchableOpacity, Dimensions } from 'react-native'
import { Block, Container, Image, Text } from '@components'
import { useTranslation } from 'react-i18next'
import { Icon, images } from '@assets'
import Content from './components/Content'

export const DetailWordScreen = () => {
  const { t } = useTranslation()
  const height = Dimensions.get('screen').height
  return (
    <Container>
      <Image
        source={images.BG_Detail}
        width={'100%'}
        height={height}
        style={{
          position: 'absolute',
          zIndex: -1,
        }}
        resizeMode="contain"
      />
      <Block flex marginTop={10}>
        <Block row alignCenter space="between" marginHorizontal={24}>
          <Icon state="Back" />
          <Text color="black" size={'h3'} fontFamily="bold" center>
            {t('dictionary')}
          </Text>
          <Block width={24} />
        </Block>

        <Block
          margin={20}
          radius={10}
          backgroundColor="white"
          shadowColor="black"
          shadow
          height={height * 0.72 - 38}
        >
          <Block column alignCenter justifyCenter>
            <Text
              size={'h2'}
              color="black"
              fontFamily="bold"
              marginTop={15}
              lineHeight={18}
            >
              Chicken
            </Text>
            <Text
              size={'h3'}
              fontFamily="regular"
              marginTop={15}
              lineHeight={18}
            >
              /'tʃIk.In/
            </Text>
          </Block>

          <Block marginTop={15} row space="evenly">
            <Block
              width={50}
              height={50}
              alignCenter
              justifyCenter
              radius={10}
              backgroundColor="white"
              shadowColor="black"
              shadow
            >
              <TouchableOpacity>
                <Image
                  source={images.DW_Volume}
                  resizeMode="contain"
                  width={30}
                  height={30}
                />
              </TouchableOpacity>
            </Block>
            <Block
              width={50}
              height={50}
              alignCenter
              justifyCenter
              radius={10}
              backgroundColor="white"
              shadowColor="black"
              shadow
            >
              <TouchableOpacity>
                <Image
                  source={images.DW_Star}
                  resizeMode="contain"
                  width={30}
                  height={30}
                />
              </TouchableOpacity>
            </Block>
            <Block
              width={50}
              height={50}
              alignCenter
              justifyCenter
              radius={10}
              backgroundColor="white"
              shadowColor="black"
              shadow
            >
              <TouchableOpacity>
                <Image
                  source={images.DW_Copy}
                  resizeMode="contain"
                  width={30}
                  height={30}
                />
              </TouchableOpacity>
            </Block>
          </Block>

          <Content />
          <Block row alignCenter justifyCenter marginBottom={70}>
            <Text color="black" size={'h3'} fontFamily="bold" margin={5}>
              {t('video')}
            </Text>
            <TouchableOpacity>
              <Image source={images.Arrow_Right} width={12} height={12} />
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    </Container>
  )
}
