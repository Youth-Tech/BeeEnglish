import { makeStyles, normalize, fontFamily as fontFamilyApp } from '@themes'
import { getStatusBarHeight } from '@components/bases/StatusBar/status_bar_height'
import {handleFontSize} from "@components/utils";

export const useStyles = makeStyles()(({ colors }) => ({
  boxHeader: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: getStatusBarHeight(),
  },
  iconBack: {
    width: normalize.m(50),
    height: normalize.m(50),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleHeader: {
    fontFamily: fontFamilyApp['bold'],
    fontSize: normalize.m(handleFontSize('h2')),
    color: colors.black,
    flexShrink: 1,
  },
}))
