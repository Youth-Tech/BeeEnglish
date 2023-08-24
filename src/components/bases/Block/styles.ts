import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    block: {
        flex: 1,
    },
    flexShrink: {
        flexShrink: 1,
    },
    flexGrow: {
        flexGrow: 1,
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
    alignCenter: {
        alignItems: 'center',
    },
    alignStart: {
        alignItems: 'flex-start',
    },
    alignEnd: {
        alignItems: 'flex-end',
    },
    justifyStart: {
        justifyContent: 'flex-start',
    },
    justifyEnd: {
        justifyContent: 'flex-end',
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 0.2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
    },
});
