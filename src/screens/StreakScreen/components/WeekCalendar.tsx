import React from 'react'
import { Block, LinearGradient, Text } from '@components'
import { baseStyles, useTheme } from '@themes'
import StreakDay, {
  StreakDayProps,
} from '@screens/StreakScreen/components/StreakDay'

export interface WeekCalendarProps {
  data: StreakDayProps[]
}
const DAYS_OF_WEEK: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const WeekCalendar: React.FC<WeekCalendarProps> = (props) => {
  const { data } = props
  const { colors } = useTheme()

  return (
    <Block height={100} radius={10} overflow={'hidden'}>
      <LinearGradient
        colors={[colors.greyLight, colors.red]}
        containerStyle={{ flex: 1 }}
      />
      <Block
        margin={1}
        radius={10}
        alignCenter
        justifyCenter
        paddingHorizontal={17}
        backgroundColor={'white'}
        style={baseStyles.absoluteFill}
      >
        <Block row>
          {DAYS_OF_WEEK.map((item, index) => (
            <Block key={`item-date-${index}`} marginLeft={index > 0 ? 10 : 0}>
              <Block width={30} height={30} justifyCenter alignCenter>
                <Text size={'h5'} fontFamily={'semiBold'} lineHeight={18}>
                  {item}
                </Text>
              </Block>
            </Block>
          ))}
        </Block>
        <Block marginTop={6} row>
          {data.map((item, index) => (
            <Block key={`item-date-${index}`} marginLeft={index > 0 ? 10 : 0}>
              <StreakDay date={item.date} type={item.type} />
            </Block>
          ))}
        </Block>
      </Block>
    </Block>
  )
}

export default WeekCalendar
