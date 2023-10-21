import React from 'react'
import { Icon } from '@assets'
import { useTheme } from '@themes'
import { Block, Text } from '@components'

export type TStreakDay = 'normal' | 'current' | 'isAttendance'
export interface StreakDayProps {
  date: string
  type: TStreakDay
}
const StreakDay: React.FC<StreakDayProps> = ({ date, type }) => {
  const { colors } = useTheme()
  return (
    <Block
      width={30}
      height={30}
      radius={15}
      borderWidth={2}
      borderColor={type === 'normal' ? colors.white : colors.orangeDark}
      backgroundColor={
        type === 'isAttendance' ? colors.orangePrimary : colors.white
      }
      justifyCenter
      alignCenter
    >
      <Text
        size={'h4'}
        lineHeight={18}
        fontFamily={'semiBold'}
        color={type === 'isAttendance' ? colors.white : colors.black}
      >
        {date}
      </Text>
      {type === 'isAttendance' && (
        <Icon
          state={'Fire'}
          width={12}
          height={12}
          style={{ position: 'absolute', right: -4, top: -2 }}
        />
      )}
    </Block>
  )
}
export default StreakDay
