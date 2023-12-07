import React from 'react'
import { Block, BottomSheetTextInput, ShadowButton, Text } from '@components'
import PlanPackageItem, {
  TPlan,
} from '@screens/SubcriptionPlanScreen/components/PlanPackageItem'
import { Icon } from '@assets'
import { useTheme } from '@themes'
import { ScrollView, TextInput } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import Card from '@screens/SubcriptionPlanScreen/components/Card'
import {
  CardInformation,
  PaymentService,
  Plan,
  SubscribePremiumReq,
} from '@services/PaymentService'
import { getStatusBarHeight } from '@components/bases/StatusBar/status_bar_height'
import { goBack, replace } from '@navigation'
import { handleErrorMessage } from '@utils/errorUtils'
import { useAppDispatch } from '@hooks'

export const SubcriptionPlanScreen: React.FC = () => {
  const [currentPlan, setCurrentPlan] = React.useState<Plan>()
  const { colors, normalize } = useTheme()
  const { t } = useTranslation()
  const [packagePlans, setPackagePlans] = React.useState<Plan[]>([])
  const [selectedNumber, setSelectedNumber] = React.useState<number>(-1)
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null)
  const [cardNumber, setCardNumber] = React.useState('')
  const [expiryDate, setExpiryDate] = React.useState('')
  const [cvc, setCvc] = React.useState('')
  const [disabledPayButton, setDisabledPayButton] = React.useState(false)
  const expiryDateRef = React.useRef<TextInput>(null)
  const cvcRef = React.useRef<TextInput>(null)
  // variables
  const snapPoints = React.useMemo(() => ['1%', '50%'], [])

  // callbacks
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present()
    bottomSheetModalRef.current?.snapToIndex(1)
  }, [])
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])
  const handleSelectedItem = (index: number) => {
    setSelectedNumber(index)
  }
  const currencyFormat = (moneyAmount: number, unit: string) => {
    return new Intl.NumberFormat().format(moneyAmount) + ` ${unit}`
  }
  const renderByType = (interval: string) => {
    switch (interval) {
      case 'month':
        return 'month'
      case 'year':
        return 'year'
      case 'one-time':
        return 'lifetime'
      default:
        return ''
    }
  }

  const callAPIGetPrices = async () => {
    try {
      const response = await PaymentService.getPrices()
      const pricesData = response.data.data.sort(
        (a, b) => a.unitAmount - b.unitAmount,
      )
      setPackagePlans(pricesData)
    } catch (e) {
      console.log(e)
    }
  }

  const subcribePremium = async (subcribeInfo: SubscribePremiumReq) => {
    try {
      const response = await PaymentService.subcribePremium(subcribeInfo)
      console.log(response.data.message)
      replace('INVOICE_SCREEN', { getMe: true })
    } catch (e) {
      console.log(e)
    }
  }

  const handleSubmitPayment = () => {
    console.log('hey')
    const expiredMonth = Number(expiryDate.split(' / ')[0])
    if (expiredMonth > 12) {
      expiryDateRef.current?.focus()
      handleErrorMessage('Error', 'Invalid month')
      return
    }
    const expiredYear = Number(expiryDate.split(' / ')[1])
    const cardInfo: CardInformation = {
      number: cardNumber,
      exp_month: expiredMonth,
      exp_year: expiredYear,
      cvc: cvc,
    }
    subcribePremium({ priceId: currentPlan?.id!, card: cardInfo })
  }

  React.useEffect(() => {
    callAPIGetPrices()
  }, [])

  React.useEffect(() => {
    if (
      cardNumber.length === 0 ||
      expiryDate.length === 0 ||
      cvc.length === 0
    ) {
      setDisabledPayButton(true)
    } else {
      setDisabledPayButton(false)
    }
  }, [cardNumber, expiryDate, cvc])

  return (
    <BottomSheetModalProvider>
      <Block flex>
        <ScrollView>
          <Block flex paddingHorizontal={20}>
            <Block paddingTop={10 + getStatusBarHeight()}>
              <Icon state={'Back'} onPress={goBack} />
            </Block>
            <Text size={'heading'} fontFamily={'bold'} marginTop={20}>
              {t('join_premium_plan')}
            </Text>

            <Block style={{ minHeight: 5 }}>
              {packagePlans.map((item, index) => (
                <Block key={item.id} marginTop={20}>
                  <PlanPackageItem
                    data={item}
                    isChecked={selectedNumber === index}
                    type={renderByType(item.interval) as TPlan}
                    onPress={() => {
                      handleSelectedItem(index)
                      setCurrentPlan(item)
                    }}
                  />
                </Block>
              ))}
            </Block>
          </Block>
        </ScrollView>
        <Block width={'100%'} absolute bottom={0}>
          <Block row paddingHorizontal={20} space={'between'}>
            <Text size={'h1'} fontFamily={'bold'}>
              {currencyFormat(
                currentPlan?.unitAmount ?? 0,
                currentPlan?.currency ?? 'VND',
              )}
            </Text>
            <Block width={150}>
              <ShadowButton
                shadowHeight={6}
                buttonHeight={40}
                buttonRadius={25}
                buttonColor={colors.orangeLight}
                shadowButtonColor={colors.orangePrimary}
                containerStyle={{
                  marginBottom: normalize.v(20),
                }}
                onPress={handlePresentModalPress}
                disabled={selectedNumber === -1}
              >
                <Text size={'h3'} fontFamily="bold" color="black">
                  {t('pay_now')}
                </Text>
              </ShadowButton>
            </Block>
          </Block>
        </Block>
      </Block>
      <BottomSheetModal
        index={1}
        enablePanDownToClose
        snapPoints={snapPoints}
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        backdropComponent={BottomSheetBackdrop}
      >
        <Block flex paddingHorizontal={20} marginTop={15} space={'between'}>
          <Block>
            <Text size={'h1'} fontFamily={'bold'}>
              {t('checkout')}
            </Text>
            <Block
              borderWidth={1}
              borderColor={colors.black}
              paddingVertical={5}
              paddingHorizontal={10}
              marginTop={10}
              radius={10}
              alignSelf={'baseline'}
              row
              alignCenter
              gap={10}
            >
              <Card />
              <Text size={'h3'} fontFamily={'semiBold'}>
                {t('pay_with_credit_card')}
              </Text>
            </Block>
            <Block marginTop={10}>
              <Text>{t('card_information')}</Text>
              <BottomSheetTextInput
                value={cardNumber}
                keyboardType={'numeric'}
                placeholder={'Card number'}
                containerStyle={{ marginTop: 10 }}
                onChangeText={(text: string) => {
                  const cardNumberText = text
                    .replace(/[^\dA-Z]/g, '')
                    .replace(/(.{4})/g, '$1 ')
                    .trim()
                  setCardNumber(cardNumberText)
                }}
                returnKeyType="next"
                onSubmitEditing={() => {
                  expiryDateRef.current?.focus()
                }}
                blurOnSubmit={false}
              />
            </Block>
            <Block row gap={5}>
              <BottomSheetTextInput
                ref={expiryDateRef}
                placeholder={'MM / YY'}
                containerStyle={{ flex: 1 }}
                keyboardType={'numeric'}
                value={expiryDate}
                onChangeText={(text) => {
                  const expiryText = text
                    .replace(/[^\dA-Z]/g, '')
                    .replace(/(.{2})/g, '$1 / ')
                  setExpiryDate(expiryText)
                  if (expiryText.length > 7) {
                    setExpiryDate(expiryText.substring(0, 7))
                  }
                }}
                returnKeyType="next"
                onSubmitEditing={() => {
                  cvcRef.current?.focus()
                }}
                blurOnSubmit={false}
              />
              <BottomSheetTextInput
                ref={cvcRef}
                placeholder={'CVC'}
                containerStyle={{ flex: 1 }}
                keyboardType={'numeric'}
                value={cvc}
                onChangeText={(text) => {
                  const cvcText = text.replace(/[^\dA-Z]/g, '').trim()
                  setCvc(cvcText)
                  if (text.length > 3) {
                    setCvc(text.substring(0, 3))
                  }
                }}
              />
            </Block>
          </Block>
          <ShadowButton
            shadowHeight={6}
            buttonHeight={40}
            buttonRadius={25}
            buttonColor={colors.orangeLight}
            shadowButtonColor={colors.orangePrimary}
            containerStyle={{
              marginBottom: normalize.v(20),
            }}
            onPress={handleSubmitPayment}
            disabled={disabledPayButton}
          >
            <Text size={'h3'} fontFamily="bold" color="black">
              {t('pay_for')}
              {' ' +
                currencyFormat(
                  currentPlan?.unitAmount ?? 0,
                  currentPlan?.currency ?? 'VND',
                )}
            </Text>
          </ShadowButton>
        </Block>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}
