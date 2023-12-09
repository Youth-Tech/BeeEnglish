import React from 'react'
import { Block, Text } from '@components'
import { useStyles } from './styles'
import { IconStatistical } from '@assets'
import { useTheme } from '@themes'
import { useTranslation } from 'react-i18next'
import { ItemStatisticalProps } from '../const'

const StatisticalComponent: React.FC<ItemStatisticalProps> = ({
  state = 'StreakIcon',
  label = 'attendance_series',
  value = 12,
}) => {
  const styles = useStyles()
  const { colors } = useTheme()
  const { t } = useTranslation()

  return (
    <Block row style={styles.boxItemStatistical}>
      <IconStatistical state={state} />
      <Block marginLeft={5} flex>
        <Text size={'h3'} fontFamily="bold" numberOfLines={1}>
          {value}
        </Text>
        <Text
          size={'h4'}
          fontFamily="semiBold"
          color={colors.greyPrimary}
          numberOfLines={1}
        >
          {
            //@ts-ignore
            t(label)
          }
        </Text>
      </Block>
    </Block>
  )
}

export default StatisticalComponent
