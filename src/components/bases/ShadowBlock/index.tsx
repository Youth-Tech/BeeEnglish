import React from 'react'
import { Block } from '../Block'
import { useTheme } from '@themes'
import { ShadowBlockProps } from './type'
import { handleColor } from '@components/utils'
import { Text } from '../Text'

/**
 * Create a block with awesome shadow
 * @see https://www.figma.com/file/QniAD9a1zQX8Vn12K89a0n/UI?type=design&node-id=227-1784&mode=design&t=VeIGgE2wQFQ4JnWB-0
 */

export const ShadowBlock: React.FC<ShadowBlockProps> = (props) => {
  const {
    top,
    left,
    flex,
    style,
    right,
    margin,
    bottom,
    zIndex,
    absolute,
    children,
    marginTop,
    marginLeft,
    radius = 8,
    marginRight,
    shadowLabel,
    height = 45,
    marginBottom,
    marginVertical,
    borderWidth = 1,
    shadowHeight = 5,
    borderColor = '#ccc',
    marginHorizontal = 0,
    shadowLabelTextStyle,
    backgroundColor = 'white',
    shadowPosition = 'bottom',
    shadowLabelContainerStyle,
    shadowColor = '#ccc',

    containerPaddingTop,
    containerPaddingRight,
    containerPaddingLeft,
    containerPaddingBottom,
    containerPaddingVertical,
    containerPaddingHorizontal,

    ...rest
  } = props
  const { colors } = useTheme()

  const containerStyle = [
    {
      backgroundColor: handleColor(colors, backgroundColor),
    },
    style,
    {
      transform: [
        {
          translateY: shadowHeight * (shadowPosition === 'bottom' ? -1 : 1),
        },
      ],
    },
  ]

  return (
    <Block
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      zIndex={zIndex}
      height={height}
      margin={margin}
      absolute={absolute}
      marginTop={marginTop}
      flex={flex ? flex : 0}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginVertical={marginVertical}
      paddingTop={containerPaddingTop}
      paddingLeft={containerPaddingLeft}
      marginHorizontal={marginHorizontal}
      paddingRight={containerPaddingRight}
      paddingBottom={containerPaddingBottom}
      paddingVertical={containerPaddingVertical}
      paddingHorizontal={containerPaddingHorizontal}
    >
      <Block
        flex
        column
        {...rest}
        padding={0}
        radius={radius}
        paddingTop={0}
        paddingLeft={0}
        paddingRight={0}
        paddingBottom={0}
        paddingVertical={0}
        isPaddingIos={false}
        paddingHorizontal={0}
        borderColor="transparent"
        backgroundColor={handleColor(colors, shadowColor)}
      >
        {shadowPosition === 'top' && (
          <Block
            {...shadowLabelContainerStyle}
            backgroundColor="transparent"
            style={{ transform: [{ translateY: shadowHeight }] }}
          >
            {shadowLabel && (
              <Text {...shadowLabelTextStyle}>{shadowLabel}</Text>
            )}
          </Block>
        )}
        <Block
          flex
          {...rest}
          radius={radius}
          borderLeftWidth={borderWidth}
          borderRightWidth={borderWidth}
          borderBottomWidth={borderWidth}
          borderColor={handleColor(colors, shadowColor)}
          borderTopWidth={shadowPosition === 'top' ? 0 : borderWidth}
          style={containerStyle}
        >
          {children}
        </Block>
      </Block>
    </Block>
  )
}
