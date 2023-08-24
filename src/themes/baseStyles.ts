import { StyleSheet } from 'react-native'

export const baseStyles = StyleSheet.create({
  verticalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
})

export type BaseStyles = typeof baseStyles
