import React from 'react'
import { Block, Container, Image, Text } from '@components'
import { Icon, images } from '@assets'
import { goBack } from '@navigation'
import { heightScreen } from '@utils/helpers'
import { useTheme } from '@themes'

export const InvoiceScreen: React.FC = () => {
  const { colors } = useTheme()
  return (
    <Container>
      <Block flex>
        <Image
          width={'100%'}
          resizeMode="contain"
          height={heightScreen}
          source={images.BG_Detail}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
          }}
        />
        <Block flex paddingHorizontal={20}>
          <Block row alignCenter space={'between'} marginTop={10}>
            <Icon state={'Back'} onPress={goBack} />
            <Text size={'h2'} fontFamily={'bold'}>
              Invoice
            </Text>
            <Block width={24} height={24} />
          </Block>
          <Block
            flex
            backgroundColor={'white'}
            marginTop={10}
            marginBottom={80}
            borderWidth={1}
            radius={20}
            borderColor={colors.borderColor}
            alignCenter
            paddingTop={30}
          >
            <Image
              source={images.Check}
              width={50}
              height={50}
              resizeMode={'contain'}
            />
            <Text size={'h2'} fontFamily={'bold'} marginTop={15}>
              Thanh toán thành công
            </Text>
            <Block
              row
              width={'100%'}
              space={'between'}
              paddingHorizontal={30}
              marginTop={20}
            >
              <Text size={'h3'} fontFamily={'semiBold'}>
                Tên gói:
              </Text>
              <Text size={'h3'} fontFamily={'semiBold'}>
                Premium Plan
              </Text>
            </Block>
            <Block
              row
              width={'100%'}
              space={'between'}
              paddingHorizontal={30}
              marginTop={20}
            >
              <Text size={'h3'} fontFamily={'semiBold'}>
                Giá tiền:
              </Text>
              <Text size={'h3'} fontFamily={'semiBold'}>
                75.000 vnd
              </Text>
            </Block>
            <Block
              row
              width={'100%'}
              space={'between'}
              paddingHorizontal={30}
              marginTop={20}
            >
              <Text size={'h3'} fontFamily={'semiBold'}>
                Ngày bắt đầu gói:
              </Text>
              <Text size={'h3'} fontFamily={'semiBold'}>
                1/12/2023
              </Text>
            </Block>
            <Block
              row
              width={'100%'}
              space={'between'}
              paddingHorizontal={30}
              marginTop={20}
            >
              <Text size={'h3'} fontFamily={'semiBold'}>
                Ngày kết thúc gói:
              </Text>
              <Text size={'h3'} fontFamily={'semiBold'}>
                1/12/2024
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
    </Container>
  )
}
