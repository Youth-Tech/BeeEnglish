import React from 'react'
import { useTheme } from '@themes'
import { Icon, images } from '@assets'
import { useAppDispatch } from '@hooks'
import { heightScreen } from '@utils/helpers'
import { setRoleUser } from '@redux/reducers'
import { useTranslation } from 'react-i18next'
import { useRoute } from '@react-navigation/native'
import { Invoice, PaymentService } from '@services/PaymentService'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Block, Container, Image, ShadowButton, Text } from '@components'
import { goBack, navigateAndReset, RootStackParamList } from '@navigation'

export const InvoiceScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const { params } =
    useRoute<
      NativeStackScreenProps<RootStackParamList, 'INVOICE_SCREEN'>['route']
    >()
  const getMe = params.getMe
  const { t } = useTranslation()
  const { colors } = useTheme()
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
      dispatch(setRoleUser({ role: 'premium' }))
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    console.log('get me', getMe)
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
              <Text size={'h3'} fontFamily={'regular'}>
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
              <Text size={'h3'} fontFamily={'regular'}>
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
              <Text size={'h3'} fontFamily={'regular'}>
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
              <Text size={'h3'} fontFamily={'regular'}>
                {t('period_end_date')}:
              </Text>
              <Text size={'h3'} fontFamily={'semiBold'}>
                {invoiceData.periodEnd}
              </Text>
            </Block>
            <Block flex />
            <Block
              paddingHorizontal={20}
              marginTop={20}
              alignCenter
              marginBottom={20}
            >
              <ShadowButton
                onPress={() => {
                  navigateAndReset(
                    [
                      {
                        name: 'BOTTOM_TAB',
                      },
                    ],
                    0,
                  )
                }}
                buttonHeight={35}
                buttonWidth={194}
                buttonRadius={10}
                shadowButtonColor={colors.orangeLighter}
                buttonColor={colors.orangePrimary}
                shadowHeight={7}
              >
                <Text color="white" fontFamily="bold" size={'h3'}>
                  {t('back_to_home')}
                </Text>
              </ShadowButton>
            </Block>
          </Block>
        </Block>
      </Block>
    </Container>
  )
}
