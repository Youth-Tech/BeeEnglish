import React, { FC } from 'react'

import { ViewProps } from 'react-native'
import { Edge, SafeAreaView } from 'react-native-safe-area-context'
import { makeStyles } from '@themes'

import { StatusBar } from '../StatusBar'

export type ContainerProps = {
  statusColor?: string
  edges?: Edge[]
  backgroundColor?: string
} & ViewProps

export const Container: FC<ContainerProps> = (props) => {
  const { statusColor, style, edges, children } = props
  const styles = useStyles(props)

  return (
    <SafeAreaView
      edges={edges ?? ['left', 'right']}
      style={[styles.root, style]}
    >
      <StatusBar statusColor={statusColor} />
      {children}
    </SafeAreaView>
  )
}

const useStyles = makeStyles<ContainerProps>()(({}) => ({
  root: ({ backgroundColor }) => ({
    flex: 1,
    backgroundColor: backgroundColor,
  }),
}))
