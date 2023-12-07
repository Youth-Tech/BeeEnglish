import React from 'react'
import { Block, Text } from '@components'
import { useTheme } from '@themes'
import CrownIcon from '@screens/SubcriptionPlanScreen/components/CrownIcon'
import CheckBox from '@screens/SubcriptionPlanScreen/components/CheckBox'
import { Pressable } from 'react-native'
import { Plan } from '@services/PaymentService'
import { useTranslation } from 'react-i18next'

export type TPlan = 'month' | 'year' | 'lifetime'
export interface PlanPackageItemProps {
  data: Plan
  isChecked: boolean
  type: TPlan
  onPress: () => void
}
const PlanPackageItem: React.FC<PlanPackageItemProps> = (props) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const { data, isChecked, type, onPress } = props

  const currencyFormat = (moneyAmount: number, unit: string) => {
    return new Intl.NumberFormat().format(moneyAmount) + ` ${unit}`
  }

  React.useEffect(() => {
    console.log('hello' + isChecked)
  }, [isChecked])
  const renderColor = (type: TPlan) => {
    switch (type) {
      case 'month':
        return {
          primaryColor: '#d896ff',
          secondaryColor: '#d896ff' + 30,
        }
      case 'year':
        return {
          primaryColor: '#00d2ff',
          secondaryColor: '#00d2ff' + 30,
        }
      case 'lifetime':
        return {
          primaryColor: '#ff5252',
          secondaryColor: '#ff5252' + 30,
        }
    }
  }
  const renderTitle = (type: TPlan) => {
    switch (type) {
      case 'month':
        return t('month_plan')
      case 'year':
        return t('year_plan')
      case 'lifetime':
        return t('life_time_plan')
    }
  }
  return (
    <Pressable onPress={onPress}>
      <Block
        row
        alignCenter
        radius={20}
        paddingVertical={15}
        paddingHorizontal={20}
        backgroundColor={renderColor(type).secondaryColor}
        gap={10}
      >
        <Block
          width={60}
          height={60}
          radius={35}
          alignCenter
          justifyCenter
          backgroundColor={renderColor(type).primaryColor}
        >
          <CrownIcon />
        </Block>
        <Block flex gap={5}>
          <Text size={'h2'} fontFamily={'bold'}>
            {renderTitle(type)}
          </Text>
          <Block>
            <Text size={'h4'} fontFamily={'semiBold'}>
              Nhận 50 điểm mật ong hằng ngày
            </Text>
            <Text size={'h4'} fontFamily={'semiBold'} color={colors.black}>
              Nhân đôi số điểm nhận được khi làm nhiệm vụ
            </Text>
          </Block>
          <Text size={'h2'} fontFamily={'bold'} color={colors.orangeThick}>
            {currencyFormat(data.unitAmount, data.currency)}
          </Text>
        </Block>
        <CheckBox
          isCheck={isChecked}
          style={{
            width: 24,
            height: 24,
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 12,
          }}
        />
      </Block>
    </Pressable>
  )
}
export default PlanPackageItem
