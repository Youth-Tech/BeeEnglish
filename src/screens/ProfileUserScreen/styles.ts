import { makeStyles, normalize,} from '@themes'

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
    width: '100%',
    aspectRatio: 1,
    top: normalize.m(-55),
    resizeMode: 'contain',
  },
  title: {
    backgroundColor: colors.red
  }
}))
