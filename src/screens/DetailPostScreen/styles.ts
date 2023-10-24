import {fontFamily, makeStyles, normalize} from '@themes'
import {handleFontSize} from "@components/utils";
import {getStatusBarHeight} from "@components/bases/StatusBar/status_bar_height";

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
        // marginHorizontal: normalize.m(20),
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
    },
    boxComment: {
        flex: 1,
        backgroundColor: colors.white,
        marginTop: getStatusBarHeight(),

    },
    headerComment: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: colors.greenLighter,
        paddingVertical: normalize.m(10),
        paddingHorizontal: normalize.m(20),
    },
    buttonCancel: {
        position: "absolute",
        left: normalize.m(10),
    },
    inputBoxSend: {
        flexDirection: 'row',
        marginHorizontal: normalize.m(20),
        marginVertical: normalize.m(10),
        alignItems: 'center',
    }
}))
