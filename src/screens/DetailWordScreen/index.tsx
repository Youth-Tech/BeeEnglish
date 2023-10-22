import React from 'react'
import { TouchableOpacity, Dimensions } from 'react-native'
import { Block, Container, Image, Text } from '@components'
import { useTranslation } from 'react-i18next'
import { Icon, images } from '@assets'
import Content from './components/Content'
import VolumeIcon from '@assets/icons/Volume'
import StarIcon from '@assets/icons/Star'
import CopyIcon from '@assets/icons/Copy'
import RightArrowIcon from '@assets/icons/RightArrow'

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
          radius={15}
          backgroundColor="white"
          shadow
          style={{
            shadowColor:"#D6D6D6",
            elevation: 15,
          }}
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
                <VolumeIcon />
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
                <StarIcon />
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
                <CopyIcon />
              </TouchableOpacity>
            </Block>
          </Block>

          <Content />
          <Block row alignCenter justifyCenter marginBottom={70}>
            <Text color="black" size={'h3'} fontFamily="bold" margin={5}>
              {t('video')}
            </Text>
            <TouchableOpacity>
              <RightArrowIcon />
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    </Container>
  )
}
