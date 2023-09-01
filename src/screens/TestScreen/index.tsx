import { StyleSheet, View } from 'react-native'
import React from 'react'
import { LineChart } from '@components'
import { widthScreen } from '@utils/helpers'
import { LineChartData } from '@components/bases/LineChart/type'
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
