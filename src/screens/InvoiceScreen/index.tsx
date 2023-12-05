import React from 'react'
import { Block, Container, Image, Text } from '@components'
import { Icon, images } from '@assets'
import { goBack, navigateAndReset } from '@navigation'
import { heightScreen } from '@utils/helpers'
import { makeStyles, useTheme } from '@themes'
import { Invoice, PaymentService } from '@services/PaymentService'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'

export const InvoiceScreen: React.FC = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const styles = useStyles()
  const [invoiceData, setInvoiceData] = React.useState<Invoice>({
    paymentIntentId: '0',
    total: 0,
    currency: 'vnd',
    status: 'paid',
    periodStart: '00/00/0000',
    periodEnd: '00/00/0000',
  })
  const currencyFormat = (moneyAmount: number, unit: string) => {
    return new Intl.NumberFormat().format(moneyAmount) + ` ${unit}`
  }
  const getPaymentIntent = async () => {
    try {
      const response = await PaymentService.getPaymentIntent()
      console.log(response.data.data)
      setInvoiceData(response.data.data)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    getPaymentIntent()
  }, [])
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
              {t('invoice')}
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
            <Text size={'h2'} fontFamily={'bold'} marginTop={15}></Text>
            <Block
              row
              width={'100%'}
              space={'between'}
              paddingHorizontal={30}
              marginTop={10}
            >
              <Text size={'h3'} fontFamily={'semiBold'}>
                {t('plan_name')}:
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
                {t('price')}:
              </Text>
              <Text size={'h3'} fontFamily={'semiBold'}>
                {currencyFormat(invoiceData.total, invoiceData.currency)}
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
                {t('period_start_date')}:
              </Text>
              <Text size={'h3'} fontFamily={'semiBold'}>
                {invoiceData.periodStart}
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
                {t('period_end_date')}:
              </Text>
              <Text size={'h3'} fontFamily={'semiBold'}>
                {invoiceData.periodEnd}
              </Text>
            </Block>
            <Block paddingHorizontal={20} marginTop={20} alignCenter>
              <Text size={'h3'} fontFamily={'semiBold'} center>
                Lưu ý: Bạn sẽ nhận được tất cả các quyền lợi từ gói Premium
              </Text>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.orangeLight }]}
                onPress={() => {
                  navigateAndReset(
                    [
                      {
                        name: 'HOME_SCREEN',
                      },
                    ],
                    0,
                  )
                }}
              >
                <Text size={'h2'} fontFamily={'semiBold'} color={colors.black}>
                  {t('back_to_home')}
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
      </Block>
    </Container>
  )
}
const useStyles = makeStyles()(({ colors, normalize }) => ({
  image: {
    width: normalize.h(89),
    height: normalize.h(98),
  },
  button: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.greyLight,
    width: normalize.h(200),
    height: normalize.h(41.8),
    borderRadius: normalize.m(10),
    marginTop: normalize.v(40),
  },
}))
