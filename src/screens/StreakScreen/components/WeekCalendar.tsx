import React from 'react'

import {
  StreakDay,
  StreakDayProps,
} from '@screens/StreakScreen/components/StreakDay'
import { useAppSelector } from '@hooks'
import { getDateName } from '@utils/dateUtils'
import { baseStyles, useTheme } from '@themes'
import { getLangConfig } from '@redux/selectors'
import { Block, LinearGradient, Text } from '@components'

export interface WeekCalendarProps {
  data: StreakDayProps[]
}

export const WeekCalendar: React.FC<WeekCalendarProps> = (props) => {
  const { data } = props
  const { colors } = useTheme()
  const lang = useAppSelector(getLangConfig)
  const daysName = data.map((item) => {
    return getDateName(new Date(item.date), lang, 'short').split(',')[0]
  })

  return (
    <Block
      height={100}
      radius={10}
      overflow={'hidden'}
    >
      <LinearGradient
        containerStyle={{ flex: 1 }}
        colors={[colors.greyLight, colors.red]}
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
          {daysName.map((item, index) => (
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
