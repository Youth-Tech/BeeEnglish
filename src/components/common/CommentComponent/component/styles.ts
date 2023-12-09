import { makeStyles, normalize } from '@themes'

export const useStyles = makeStyles()(() => ({
  boxAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: normalize.m(35),
    height: normalize.m(35),
    objectFit: 'contain',
    borderRadius: normalize.m(20),
    marginRight: normalize.m(10),
  },
  replyComment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: normalize.m(10),
  },
  ovalComment: {
    position: 'absolute',
    left: -normalize.m(63) / 2,
    top: -normalize.m(5),
    zIndex: 10,
  },
}))
