import { StyleSheet, View } from 'react-native'
import React from 'react'
import {
  Block,
  LineChart,
  LinearGradient,
  ShadowButton,
  Text,
} from '@components'
import { widthScreen } from '@utils/helpers'
import { LineChartData } from '@components/bases/LineChart/type'
import { useTranslation } from 'react-i18next'
import { font, fontFamily } from '@themes'
import i18next from 'i18n/i18n'
import { LanguageType } from 'i18n/locales'
const data = [
  { id: 0, label: 'Mon', x: 0, y: 0 },
  { id: 1, label: 'Tues', x: 1, y: 4 },
  { id: 2, label: 'Wed', x: 2, y: 30 },
  { id: 3, label: 'Thur', x: 3, y: 15 },
  { id: 4, label: 'Fri', x: 4, y: 40 },
  { id: 5, label: 'Sat', x: 5, y: 50 },
  { id: 6, label: 'Sun', x: 6, y: 40 },
]
type Props = {}
export const TestScreen = (props: Props) => {
  const handleItemClick = (item: LineChartData) => {
    console.log(`Item ${item.id} clicked`)
  }
  const { t } = useTranslation();
  const ChangeLanguage = (lng: LanguageType) => {
    i18next.changeLanguage(lng)
  }
  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        <LineChart
          width={widthScreen}
          height={300}
          data={data}
          haveDots
          haveXAxis
          haveHorizontalGuides
          lineColor="#FFEFAD"
          onItemClick={handleItemClick}
        />
      </View>
      <Text
        style={{
          fontFamily: fontFamily.bold,
          fontSize: font.size.h1,
          margin: 20,
          lineHeight: 30,
        }}
      >
        {t('sign-up')}
      </Text>
      <Block width={'50%'}>
        <ShadowButton
          labelSize={'h2'}
          buttonRadius={8}
          fontFamily="bold"
          buttonHeight={45}
          shadowHeight={10}
          buttonBorderSize={2}
          buttonColor="#FFEFAD"
          labelColor="primaryText"
          shadowButtonColor="#FFC107"
          onPress={() => { ChangeLanguage('en') }}
          buttonBorderColor={
            <Block style={StyleSheet.absoluteFill}>
              <LinearGradient
                colors={['#FFEFAD', '#FFC107']}
                containerStyle={{ width: '100%', height: '100%' }}
              />
            </Block>
          }
        />
      </Block>
      <Block width={'50%'}>
        <ShadowButton
          labelSize={'h2'}
          buttonRadius={8}
          fontFamily="bold"
          buttonHeight={45}
          shadowHeight={10}
          buttonBorderSize={2}
          buttonColor="#FFEFAD"
          labelColor="primaryText"
          shadowButtonColor="#FFC107"
          onPress={() => { ChangeLanguage('vi') }}
          buttonBorderColor={
            <Block style={StyleSheet.absoluteFill}>
              <LinearGradient
                colors={['#FFEFAD', '#FFC107']}
                containerStyle={{ width: '100%', height: '100%' }}
              />
            </Block>
          }
        />
      </Block>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  chartWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
