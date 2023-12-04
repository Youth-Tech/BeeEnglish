import React from 'react'
import { Block, ShadowButton, Text, TextInput } from '@components'
import PlanPackageItem, {
  TPlan,
} from '@screens/SubcriptionPlanScreen/components/PlanPackageItem'
import { Icon } from '@assets'
import { useTheme } from '@themes'
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import Card from '@screens/SubcriptionPlanScreen/components/Card'
import {
  PaymentService,
  Plan,
  SubscribePremiumReq,
} from '@services/PaymentService'
import { getStatusBarHeight } from '@components/bases/StatusBar/status_bar_height'
import { goBack } from '@navigation'

export const SubcriptionPlanScreen: React.FC = () => {
  const [currentPlan, setCurrentPlan] = React.useState<Plan>()
  const { colors, normalize } = useTheme()
  const { t } = useTranslation()
  const [packagePlans, setPackagePlans] = React.useState<Plan[]>([])
  const [selectedNumber, setSelectedNumber] = React.useState<number>(-1)
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null)

  // variables
  const snapPoints = React.useMemo(() => ['25%', '50%'], [])

  // callbacks
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present()
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
      setPackagePlans(response.data.data)
    } catch (e) {
      console.log(e)
    }
  }
  const subcribePremium = async (subcribeInfo: SubscribePremiumReq) => {
    try {
      const response = await PaymentService.subcribePremium(subcribeInfo)
      console.log(response.data.message)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    callAPIGetPrices()
  }, [])
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
              {packagePlans
                .sort(() => -1)
                .map((item, index) => (
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
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={BottomSheetBackdrop}
      >
        <Block flex paddingHorizontal={20} marginTop={15} space={'between'}>
          <Block>
            <Text size={'h1'} fontFamily={'bold'}>
              Checkout
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
                Pay with credit card
              </Text>
            </Block>
            <Block marginTop={10}>
              <Text>Card Information</Text>
              <TextInput
                placeholder={'Card number'}
                containerStyle={{ marginTop: 10 }}
                keyboardType={'numeric'}
              />
            </Block>
            <Block row>
              <TextInput
                placeholder={'MM / YY'}
                containerStyle={{ flex: 1 }}
                keyboardType={'numeric'}
              />
              <TextInput
                placeholder={'CVC'}
                containerStyle={{ flex: 1 }}
                keyboardType={'numeric'}
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
            onPress={handlePresentModalPress}
          >
            <Text size={'h3'} fontFamily="bold" color="black">
              {t('pay_for')}
              {' ' +
                currencyFormat(currentPlan?.unitAmount, currentPlan?.currency)}
            </Text>
          </ShadowButton>
        </Block>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}
