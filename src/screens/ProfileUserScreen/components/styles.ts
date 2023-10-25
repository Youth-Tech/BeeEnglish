import { makeStyles, normalize, fontFamily as fontFamilyApp } from '@themes'
import { handleFontSize } from '@components/utils'
import {getStatusBarHeight} from "@components/bases/StatusBar/status_bar_height";

export const useStyles = makeStyles()(({ colors }) => ({
  boxHeaderContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: getStatusBarHeight() + normalize.v(10),
    paddingHorizontal: normalize.m(20),
    paddingBottom: normalize.v(10),
  },
  accountBee: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    borderRadius: 50,
    elevation: 5,
  },
  titleAccount: {
    fontFamily: fontFamilyApp['bold'],
    fontSize: handleFontSize('h2'),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    gap: normalize.h(20),
  },
  backgroundHeader: {
    position: 'absolute',
    top: 0,
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: colors.white,
    zIndex: -10
  },
  // styles for boxUserCard
  boxUserCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxAvatar: {
    alignItems: 'center',
  },
  avatarUser: {
    width: normalize.m(133),
    height: normalize.m(133),
    borderRadius: normalize.m(133),
  },
  buttonBrush: {
    width: normalize.m(28),
    height: normalize.m(28),
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.orangeDark,
    borderRadius: normalize.m(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
}))
