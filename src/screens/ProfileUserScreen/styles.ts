import { makeStyles, normalize } from '@themes'

export const useStyles = makeStyles()(({ colors }) => ({
  container: {
    flex: 1,
  },
  boxBackground: {
    position: 'absolute',
    top: 0,
    flex: 1,
  },
  backgroundContainer: {
    height: 310,
    top: normalize.m(-35),
    resizeMode: 'stretch',
  },
  title: {
    backgroundColor: colors.red,
  },
}))
