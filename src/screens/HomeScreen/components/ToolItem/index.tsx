import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Icon, TIcon } from '@assets'
import { Block, Text } from '@components'
import { useTheme } from '@themes'

interface Props {
  icon: TIcon
  name: string
  onPress: () => void
}

export const ToolItem = (props: Props) => {
  const { icon, name, onPress } = props
  const { colors } = useTheme()
  return (
    <Pressable onPress={onPress}>
      <Block width={59} alignCenter>
        <Icon state={icon} />
        <Text
          size={'h5'}
          fontFamily="semiBold"
          color={colors.black}
          marginTop={5}
        >
          {name}
        </Text>
      </Block>
    </Pressable>
  )
}
