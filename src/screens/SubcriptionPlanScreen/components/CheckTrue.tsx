import * as React from 'react'
import Svg, { Circle, Path, SvgProps } from 'react-native-svg'

const CheckTrue = ({ fill = '#3A7EFC', ...props }: SvgProps) => (
  <Svg {...props}>
    <Circle cx={12} cy={11.999} r={10} fill={fill} />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.768 15.639a1.001 1.001 0 0 1-1.479.07l-2.996-2.993a.999.999 0 1 1 1.415-1.413l2.285 2.283 4.299-4.291c.39-.39 1.024-.39 1.415 0a.998.998 0 0 1 0 1.412l-4.94 4.932Z"
      fill={'#fff'}
    />
  </Svg>
)
export default CheckTrue
