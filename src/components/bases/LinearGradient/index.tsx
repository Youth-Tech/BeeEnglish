import React from 'react'
import { StyleSheet } from 'react-native'
import Svg, {
  Defs,
  Rect,
  LinearGradient as LGSVG,
  Stop,
} from 'react-native-svg'
import { Block } from '../Block'
import { LinearGradientProps } from './type'
import { useTheme } from '@themes'
import { handleColor } from '@components/utils'

export const LinearGradient: React.FC<LinearGradientProps> = ({
  colors,
  orientation = 'vertical',
  containerStyle,
  revers = false,
  transform = {},
}) => {
  const { colors: colorsTheme } = useTheme()
  return (
    <Block style={[{ ...containerStyle }]}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
        <Defs>
          <LGSVG
            id="grad"
            x1="0%"
            y1="0%"
            x2={`${orientation === 'vertical' ? 0 : 100}%`}
            y2={`${orientation === 'horizontal' ? 0 : 100}%`}
            {...transform}
          >
            {revers
              ? colors?.reverse()?.map((color, index) => {
                  return (
                    <Stop
                      key={color + index}
                      offset={index}
                      stopColor={handleColor(colorsTheme, color)}
                    />
                  )
                })
              : colors?.map((color, index) => {
                  return (
                    <Stop
                      key={color + index}
                      offset={index}
                      stopColor={handleColor(colorsTheme, color)}
                    />
                  )
                })}
          </LGSVG>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
    </Block>
  )
}
