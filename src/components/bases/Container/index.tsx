import React, { FC } from 'react'

import {ViewProps, ScrollView} from 'react-native'
import { Edge, SafeAreaView } from 'react-native-safe-area-context'
import { makeStyles, useTheme } from '@themes'

import { StatusBar } from '../StatusBar'
import { Block } from '../Block'
export type ContainerProps = {
  statusColor?: string
  edges?: Edge[]
  backgroundColor?: string
  hasScroll?: boolean
} & ViewProps

export const Container: FC<ContainerProps> = (props) => {
  const { statusColor, style, edges, children } = props
  const styles = useStyles(props)
  const { colors } = useTheme()
  const Wrapper = props.hasScroll ? ScrollView : Block

  return (
    <SafeAreaView
      edges={edges ?? ['left', 'right']}
      style={[styles.root, style]}
    >
      <StatusBar statusColor={statusColor} />
      <Wrapper
        style={{ flex: 1, backgroundColor: colors.white }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Wrapper>
    </SafeAreaView>
  )
}

const useStyles = makeStyles<ContainerProps>()(({}) => ({
  root: ({ backgroundColor }) => ({
    flex: 1,
    backgroundColor: backgroundColor,
  }),
}))
