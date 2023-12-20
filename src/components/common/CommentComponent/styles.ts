import { makeStyles, normalize } from '@themes'

export const useStyles = makeStyles()(({ colors }) => ({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  boxContent: {
    flexDirection: 'row',
  },
  boxLines: {
    width: normalize.m(35),
    marginRight: normalize.m(10),
    alignItems: 'center',
  },
  line: {
    borderWidth: 1,
    borderColor: colors.greyLight,
    width: 1,
    // flexGrow: 1,
    borderRadius: normalize.m(10),
  },
  contentComment: {
    flexGrow: 1,
  },
}))
