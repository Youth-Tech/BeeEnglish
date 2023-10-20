import {fontFamily, makeStyles, normalize} from '@themes'
import {handleFontSize} from "@components/utils";

export const useStyles = makeStyles()(({colors}) => ({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    wordItem: {
        alignSelf: "center",
        borderRadius: normalize.m(3),
    },
    boxContent: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize.m(4),
        marginTop: normalize.m(20),
    },
    wordValue: {
        fontFamily: fontFamily['regular'],
        color: colors.black,
        fontSize: handleFontSize(14),
    },
    listParagraph: {
        marginBottom: normalize.m(20),
    },
    boxImagePost: {
        marginHorizontal: normalize.m(20),
    },
    image: {
        height: normalize.m(200),
        objectFit: "contain",
        borderRadius: normalize.m(8),
    },
    boxTitle: {
        backgroundColor: "rgba(36, 36, 36, 0.75)",
        position: 'absolute',
        width: '100%',
        bottom: 0,
        padding: normalize.m(10),
        borderBottomEndRadius: normalize.m(8),
        borderBottomStartRadius: normalize.m(8),
    },
    title: {
        color: colors.white
    },
    translateText: {
        color: colors.greyPrimary,
        paddingLeft: normalize.m(30),
        lineHeight: normalize.m(25)
    }
}))
