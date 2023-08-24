import React from 'react'
import { Block } from '../Block'
import { useTheme } from '@themes'
import { ShadowBlockProps } from './type'
import { handleColor } from '@components/utils'

/**
 * Create a block with awesome shadow
 * @see https://www.figma.com/file/QniAD9a1zQX8Vn12K89a0n/UI?type=design&node-id=227-1784&mode=design&t=VeIGgE2wQFQ4JnWB-0
 */

export const ShadowBlock: React.FC<ShadowBlockProps> = React.memo((props) => {
  const {
    margin,
    marginTop,
    marginLeft,
    radius = 8,
    marginRight,
    height = 45,
    marginBottom,
    marginVertical,
    borderWidth = 1,
    shadowHeight = 5,
    borderColor = '#ccc',
    marginHorizontal = 0,
    backgroundColor = 'white',
    containerPaddingVertical,
    containerPaddingHorizontal,
    shadowBackgroundColor = '#ccc',
    ...rest
  } = props
  const { colors } = useTheme()

  return (
    <Block
      height={height}
      margin={margin}
      marginTop={marginTop}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginVertical={marginVertical}
      marginHorizontal={marginHorizontal}
      paddingVertical={containerPaddingVertical}
      paddingHorizontal={containerPaddingHorizontal}
    >
      <Block
        flex
        style={{
          backgroundColor: handleColor(colors, shadowBackgroundColor),
        }}
        {...rest}
        radius={radius}
        borderColor="transparent"
        padding={0}
        paddingHorizontal={0}
        paddingVertical={0}
        paddingLeft={0}
        paddingRight={0}
        paddingBottom={0}
        isPaddingIos={false}
        paddingTop={0}
      >
        <Block
          flex
          borderWidth={borderWidth}
          borderColor={borderColor}
          style={{
            backgroundColor: handleColor(colors, backgroundColor),
            transform: [{ translateY: -shadowHeight }],
          }}
          radius={radius}
          alignCenter
          justifyCenter
          {...rest}
        />
      </Block>
    </Block>
  )
})
