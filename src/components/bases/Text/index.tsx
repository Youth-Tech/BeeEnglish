// import { theme } from '@theme';

import React from 'react'
import {StyleSheet, Text as RNText} from 'react-native'
import {fontFamily as fontFamilyApp, normalize, useTheme} from '@themes'
import {
    handleColor,
    handleFontSize,
    handleMargin,
    handlePadding,
} from '@components/utils'
import {CommonTextProps} from './type'

export const Text = ({
                         size = 14,
                         color = 'black',
                         lineHeight,
                         fontWeight,
                         fontFamily = 'regular',
                         flex,
                         flexShrink,
                         flexGrow,
                         padding,
                         margin,
                         style,
                         children,
                         numberOfLines,
                         center,
                         right,
                         left,
                         justify,
                         paddingTop,
                         paddingBottom,
                         paddingLeft,
                         paddingRight,
                         marginBottom,
                         marginLeft,
                         marginRight,
                         marginTop,
                         paddingVertical,
                         paddingHorizontal,
                         marginVertical,
                         marginHorizontal,
                         textDecorationLine,
                         ...textProps
                     }: CommonTextProps) => {
    const {colors} = useTheme()

    const textStyle: {} = [
        flex && {flex: 1},
        flexShrink && {flexShrink: 1},
        flexGrow && {flexGrow: 1},
        {color: handleColor(colors, color)},
        center && {textAlign: 'center'},
        right && {textAlign: 'right'},
        left && {textAlign: 'left'},
        justify && {textAlign: 'justify'},
        padding && {...handlePadding(normalize.m(padding))},
        margin && {...handleMargin(normalize.m(margin))},
        paddingTop && {paddingTop: normalize.v(paddingTop)},
        paddingRight && {paddingRight: normalize.h(paddingRight)},
        paddingBottom && {paddingBottom: normalize.v(paddingBottom)},
        paddingLeft && {paddingLeft: normalize.h(paddingLeft)},
        marginBottom && {marginBottom: normalize.v(marginBottom)},
        marginTop && {marginTop: normalize.v(marginTop)},
        marginRight && {marginRight: normalize.h(marginRight)},
        marginLeft && {marginLeft: normalize.h(marginLeft)},
        paddingHorizontal && {
            paddingHorizontal: normalize.h(paddingHorizontal),
        },
        paddingVertical && {paddingVertical: normalize.v(paddingVertical)},
        marginHorizontal && {marginHorizontal: normalize.h(marginHorizontal)},
        marginVertical && {marginVertical: normalize.v(marginVertical)},
        {lineHeight: lineHeight ? normalize.m(lineHeight) : handleFontSize(size) * 1.2},
        {fontSize: handleFontSize(size)},
        {fontFamily: fontFamilyApp[fontFamily]},
        fontWeight && {fontWeight: fontWeight},
        textDecorationLine && {textDecorationLine},
        {...StyleSheet.flatten(style)},
    ]

    return (
        <RNText style={textStyle} {...textProps} numberOfLines={numberOfLines}>
            {children}
        </RNText>
    )
}
