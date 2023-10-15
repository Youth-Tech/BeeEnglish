import React from 'react'
import { useTranslation } from 'react-i18next'
import { Block, Image, Text } from '@components'
import { useTheme } from '@themes'
import { Icon } from '@assets'

export const LearnedWordItem = () => {
  const { colors } = useTheme()
  return (
    <Block backgroundColor={colors.greyLighter} width={146} height={151}>
      <Block paddingHorizontal={15} paddingTop={17}>
        <Icon state="WaveAudio" stroke={colors.orangePrimary}></Icon>
        <Block row>
          <Text fontFamily="bold" size={'h3'}>
            Chicken
          </Text>
          <Text fontFamily="regular" size={'h4'} color={colors.greyPrimary}>
            /HetCuu/
          </Text>
        </Block>
        <Text>Con gà</Text>
      </Block>
      <Block row>
        <Block radius={100} width={5} height={5} backgroundColor={colors.greenLighter}></Block>
        <Text size={'h5'} fontFamily="bold">
          Độ Khó: siêu dễ
        </Text>
      </Block>
    </Block>
  )
}
